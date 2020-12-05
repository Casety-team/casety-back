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

exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  // const lastname = req.query.lastname;
  // const email = req.query.email;
  // const password = req.query.password;

  let condition = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : null;
  Customer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || 'Some error occured while retrieving customers' 
      });
    });
}
