const db = require("../models");
const Bike = db.bike;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //!empty value
  if (!req.body.name){
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  const bike = {
    name: req.body.name
  }

  Bike.create(bike)
    .then(data =>{
      res.send(data);
    })
    .catch(error => {
      res.Status(500).send({
        message:
          error.message || 'Some error occured while creating the locker' 
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Bike.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || 'Some error occured while retrieving Bikes' 
      });
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Bike.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: "Error retrieving Bike with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Bike.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Bike was updated successfully.'
        });
      } else {
        res.send({
          message: 'Cannot update Bike with id=${id}. Maybe Bike was not found or req.body is empty!'
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: 'Error updating Locker with id=' + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Bike.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bike was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Bike with id=${id}. Maybe Bike was not found!`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: "Could not delete Bike with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Bike.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Bikes were deleted successfully!` });
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all Bikes."
      });
    });
};