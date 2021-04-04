const db = require("../models");
const Location = db.location;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //!empty value
  if (
    (!req.body.name,
    !req.body.first_adress,
    !req.body.city,
    !req.body.zip_code,
    !req.body.transport,
    !req.body.opening_hours,
    !req.body.closing_hours,
    !req.body.latitude,
    !req.body.longitude)
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const location = {
    name: req.body.name,
    first_adress: req.body.first_adress,
    second_adress: req.body.second_adress,
    city: req.body.city,
    zip_code: req.body.zip_code,
    transport: req.body.transport,
    opening_hours: req.body.opening_hours,
    closing_hours: req.body.closing_hours,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  Location.create(location)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the location",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Location.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while retrieving locations",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving location with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Location.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Location with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete Location with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Locations were deleted successfully!` });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all Locations.",
      });
    });
};
