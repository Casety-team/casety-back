const db = require("../models");
const Basket = db.basket;
const Op = db.Sequelize.Op;

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
      res.Status(500).send({
        message:
          error.message || "Some error occured while creating the basket",
      });
    });
};
