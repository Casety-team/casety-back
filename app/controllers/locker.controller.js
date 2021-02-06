const db = require("../models");
const Locker = db.locker;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //!empty value
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const locker = {
    name: req.body.name,
    locationId: req.body.locationId,
    locker_type_id: req.body.locker_type_id,
  };

  Locker.create(locker)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.Status(500).send({
        message:
          error.message || "Some error occured while creating the locker",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Locker.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occured while retrieving lockers",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Locker.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving locker with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Locker.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Locker was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Locker with id=${id}. Maybe Locker was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Locker with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Locker.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Locker was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Locker with id=${id}. Maybe Locker was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete Locker with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Locker.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Lockers were deleted successfully!` });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all Lockers.",
      });
    });
};
