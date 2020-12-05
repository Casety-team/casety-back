const { sequelize } = require("../models");
const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.firstname){
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  const customer = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  }

  Customer.create(customer)
    .then(data =>{
      res.send(data);
    })
    .catch(error => {
      res.Status(500).send({
        message:
          error.message || 'Some error occured while creating the customer' 
      });
    });
};