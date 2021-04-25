require("dotenv").config();
const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

const stripe = require("stripe")(process.env.API_KEY_STRIPE);

const getRetrieve = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(req);
  return paymentIntent;
};

exports.create = (req, res) => {
  if (!req.body.price) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const basket = {
    userId: req.body.userId,
    reservationId: req.body.reservationId,
    price: req.body.price,
  };

  Basket.create(basket)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the basket",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Basket.findAll({ where: condition, raw: true })
    .then((data) => {
      data.map(async (r) => {
        console.log(r);
        const test = await stripe.paymentIntents
          .retrieve(r.paymentIntent)
          .then((stripeData) => {
            res.send([r, stripeData]);
          });
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occured while retrieving baskets",
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

  const project = await Basket.findAll({ where: { code_unlock: unlock } }).then(
    (items) => {
      console.log(items.length);
      if (items.length > 0) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  );
};
