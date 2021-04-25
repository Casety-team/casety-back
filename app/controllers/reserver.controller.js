const db = require("../models");
const Reserver = db.reserver;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if ((!req.body.date_start, !req.body.date_end)) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const reserver = {
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    lockerId: req.body.lockerId,
    userId: req.body.userId,
  };

  Reserver.create(reserver)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the reserver",
      });
    });
};

exports.findAll = (req, res) => {
  const date_start = req.query.date_start;

  let condition = date_start
    ? { date_start: { [Op.like]: `%${date_start}%` } }
    : null;
  Reserver.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while retrieving reservers",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Reserver.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving reserver with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Reserver.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Reserver was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Reserver with id=${id}. Maybe Reserver was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Reserver with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Reserver.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Reserver was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Reserver with id=${id}. Maybe Reserver was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete Reserver with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Reserver.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Reservers were deleted successfully!` });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all Reservers.",
      });
    });
};
