module.exports = (sequelize, Sequelize) => {
  const Locker = sequelize.define(
    "lockers",
    {
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      to_rent: {
        type: Sequelize.ENUM,
        values: ["true", "false"],
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Locker;
};
