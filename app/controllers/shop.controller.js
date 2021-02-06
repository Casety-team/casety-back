require("dotenv").config();
const db = require("../models");
const stripe = require("stripe")(process.env.API_KEY_STRIPE);

exports.buy = async (req, res) => {
  let { amount, id } = req.body;
  try {
    await stripe.paymentIntents.create({
      amount: amount,
      currency: "EUR",
      description: "Casety la sécurité ça ne se braque pas",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};
