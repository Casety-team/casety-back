module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      adress: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      terms: {
        type: Sequelize.ENUM,
        values: ["true", "false"],
      },
      newsletter: {
        type: Sequelize.ENUM,
        values: ["true", "false"],
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return User;
};
