require("dotenv").config();
const http = require("http");
const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

const stripe = require("stripe")(process.env.API_KEY_STRIPE, {
  maxNetworkRetries: 2,
});

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

  var test = getRandomString(6);

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
    success_url: `https://api.casety.fr/api/stripe/success/${test}`,
    cancel_url: `https:///api.casety.fr/stripe/error/`,
  });

  // SAUVEGARDER TOKEN EN BDD
  // TODO: vérifier si création de la session a fonctionnée
  if (session.id) {
    insertbasket(
      userId,
      reservationId,
      unitAmount,
      session.payment_intent,
      test
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
    userId: userId,
    price: unitAmount,
    code_unlock: generecode(),
    code_secure: generecode(),
    pay: "false",
    marketToken: test,
    paymentIntent: payment_intent,
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
  res.send("Success page stripe");
  // const getTokenByURL = req.params.code;
  // const toekn = res;
  // console.log("getTokenByURL =>", getTokenByURL);
  // console.log("toekn =>", toekn);
  // await Basket.findAll({
  //   where: { token: getTokenByURL },
  // }).then((items) => {
  //   console.log(items);
  //   console.log("items =>", items);
  // });
};

exports.error = async (req, res) => {
  res.send("error page stripe");
};
