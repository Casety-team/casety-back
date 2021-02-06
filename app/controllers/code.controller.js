const db = require("../models");
const Code = db.code;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //!empty value
  if ((!req.body.code_unlock, !req.body.code_secure)) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const code = {
    code_unlock: req.body.code_unlock,
    code_secure: req.body.code_secure,
  };

  Code.create(code)
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
  const code_unlock = req.query.code_unlock;

  let condition = code_unlock
    ? { code_unlock: { [Op.like]: `%${code_unlock}%` } }
    : null;
  Code.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occured while retrieving Codes",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Code.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error retrieving Code with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Code.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Code was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Code with id=${id}. Maybe Code was not found or req.body is empty!",
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

  Code.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Code was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Code with id=${id}. Maybe Code was not found!`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete Code with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Code.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Codes were deleted successfully!` });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all Codes.",
      });
    });
};
