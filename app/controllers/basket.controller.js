require("dotenv").config();
const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

const stripe = require("stripe")(process.env.API_KEY_STRIPE);

exports.findAll = (req, res) => {
  const userId = req.params.userId;

  Basket.findAll({
    where: {
      userId: {
        [Op.eq]: userId,
      },
    },
  })
    .then((data) => {
      res.send([data]);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Error retrieving basket with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Basket.findByPk(id)
    .then(async (data) => {
      const requestInStripe = await stripe.paymentIntents
        .retrieve(data.paymentIntent)
        .then((stripeData) => {
          res.send([data, stripeData]);
        });
      requestInStripe;
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Error retrieving basket with id=" + id,
      });
    });
};

exports.unlock = async (req, res) => {
  if (!req.params.code) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const unlock = req.params.code;

  await Basket.findAll({ where: { code_unlock: unlock } }).then((items) => {
    if (items.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};

exports.token = async (req, res) => {
  if (!req.params.token) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const token = req.params.token;

  await Basket.findAll({ where: { marketToken: token } }).then((items) => {
    if (items.length > 0) {
      res.send(items);
    } else {
      res.send(false);
    }
  });
};
