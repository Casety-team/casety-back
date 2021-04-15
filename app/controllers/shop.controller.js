require("dotenv").config();
const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

const stripe = require("stripe")(process.env.API_KEY_STRIPE, {
  maxNetworkRetries: 2,
});

exports.buy = async (req, res) => {
  const { nameProduct, unitAmount, idUser, reservationId } = req.body;
  const YOUR_DOMAIN = `http://api.casety.fr/`;

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
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  if (session.success_url) {
    insertbasket(idUser, reservationId, unitAmount, session.payment_intent);
  } else if (session.cancel_url) {
    console.log("error paiement");
  }
  res.json({ id: session.id });
};

const generecode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const insertbasket = (idUser, reservationId, unitAmount, payment_intent) => {
  const basket = {
    userId: idUser,
    price: unitAmount,
    code_unlock: generecode(),
    code_secure: generecode(),
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
