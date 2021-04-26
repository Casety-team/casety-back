const db = require("../models");
const Categorie = db.categorie;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //!empty value
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const categorie = {
    name: req.body.name,
  };

  Categorie.create(categorie)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the categorie",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Categorie.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while retrieving categories",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Categorie.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving categorie with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Categorie.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "categorie was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update categorie with id=${id}. Maybe categorie was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating categorie with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Categorie.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "categorie was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete categorie with id=${id}. Maybe categorie was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete categorie with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Categorie.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} categories were deleted successfully!` });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all categories.",
      });
    });
};
