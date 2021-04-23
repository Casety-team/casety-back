require("dotenv").config();
const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

const stripe = require("stripe")(process.env.API_KEY_STRIPE, {
  maxNetworkRetries: 2,
});

exports.buy = async (req, res) => {
  const { nameProduct, unitAmount, idUser, reservationId } = req.body;
  const YOUR_DOMAIN = `http://localhost:3000/buy`;

  const token = (length) => {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(
          Math.floor(Math.random() * charactersLength) +
            Math.floor(100000 + Math.random() * 900000)
        )
      );
    }
    console.log(result.join(""));
  };

  const tokenSessionPayement = () => {
    return token(6);
  };
  console.log(tokenSessionPayement);

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
    success_url: `https://api.casety.fr/api/stripe/success/${tokenSessionPayement}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  // SAUVEGARDER TOKEN EN BDD
  // TODO: vérifier si création de la session a fonctionnée
  if (session.id) {
    insertbasket(
      idUser,
      reservationId,
      unitAmount,
      session.payment_intent,
      tokenSessionPayement
    );
  }
  // res.json({ id: session.id });
};

const generecode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const insertbasket = (
  idUser,
  reservationId,
  unitAmount,
  payment_intent,
  token
) => {
  const basket = {
    userId: idUser,
    price: unitAmount,
    code_unlock: generecode(),
    code_secure: generecode(),
    paymentIntent: payment_intent,
    reserverId: reservationId,
    token,
    pay: false,
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
  const getTokenByURL = req.params.code;
  await Basket.findAll({
    where: { token: getTokenByURL },
  }).then((items) => {
    console.log(items.length);
  });
};
