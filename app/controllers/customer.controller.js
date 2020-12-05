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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Customer was updated successfully.'
        });
      } else {
        res.send({
          message: 'Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!'
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: 'Error updating Customer with id=' + id
      });
    });
};

