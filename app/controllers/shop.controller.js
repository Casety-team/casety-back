const stripe = require("stripe")("sk_test_51I6xfpGWsM2bVeofyFZIeZkKZzRvf1dFMVAGg8kbTFBCzVwMwDwBmltXp4kieQ1gsV7D0tkRrAixGuTkjTqtMWZa00P7efLinB");

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
}
