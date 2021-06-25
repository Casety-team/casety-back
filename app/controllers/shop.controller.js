require("dotenv").config();
const http = require("http");
const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

const stripe = require("stripe")(process.env.API_KEY_STRIPE, {
  maxNetworkRetries: 2,
});

exports.findOneCode = async (req, res) => {
  if (!req.params.reserverId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const reserverId = req.params.reserverId;

  await Basket.findAll({ where: { reserverId: reserverId } })
    .then((items) => {
      res.send(items);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error Get basket with id",
      });
    });
};

exports.buy = async (req, res) => {
  const { nameProduct, unitAmount, userId, reservationId } = req.body;

  const getRandomString = (length) => {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };

  var token = getRandomString(6);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: nameProduct,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://casety.fr/stripe/charge/success/${token}/?sc_checkout=success`,
    cancel_url: `https://casety.fr/stripe/charge/error/?sc_checkout=cancel`,
  });

  // SAUVEGARDER TOKEN EN BDD
  // TODO: vérifier si création de la session a fonctionnée
  if (session.id) {
    insertbasket(
      userId,
      reservationId,
      unitAmount,
      session.payment_intent,
      token
    );
  }
  res.json({ id: session.id });
};

const generecode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const insertbasket = (
  userId,
  reservationId,
  unitAmount,
  payment_intent,
  test
) => {
  const basket = {
    price: unitAmount,
    code_unlock: generecode(),
    code_secure: generecode(),
    pay: "false",
    marketToken: test,
    paymentIntent: payment_intent,
    userId: userId,
    reserverId: reservationId,
  };
  Basket.create(basket)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log("Some error occured while creating the basket =>", error);
    });
};

// ROUTE /api/stripe/success/{token}
// - Récupère le basket qui a le même token et on valide le paiement
exports.verifPay = async (req, res) => {
  const project = await Basket.findOne({
    where: { marketToken: req.params.token },
  });

  if (project === null) {
    res.send("Not found!");
  } else {
    const test = {
      pay: "true",
    };
    Basket.update(test, {
      where: { marketToken: req.params.token },
    })
      .then((item) => {
        res.send(item);
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error updating User with Token=" + req.params.token,
        });
      });
  }
};

exports.error = async (req, res) => {
  res.send("error page stripe");
};
