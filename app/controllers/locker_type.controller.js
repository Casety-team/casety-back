const db = require("../models");
const Locker_type = db.locker_type;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //!empty value
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //update all form
  const locker_type = {
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    price: req.body.price,
  };

  Locker_type.create(locker_type)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the locker_type",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Locker_type.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while retrieving locker_types",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Locker_type.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving locker_type with id=" + id,
      });
    });
};

exports.findOneName = (req, res) => {
  const name = req.params.name;
  Locker_type.findAll({ where: { name: { [Op.like]: `${name}` } } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving locker_type with name=" + name,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Locker_type.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Locker_type was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Locker_type with id=${id}. Maybe Locker_type was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Locker_type with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Locker_type.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Locker_type was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Locker_type with id=${id}. Maybe Locker_type was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete Locker_type with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Locker_type.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Locker_types were deleted successfully!` });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occurred while removing all Locker_types.",
      });
    });
};
