module.exports = (sequelize, Sequelize) => {
  const Locker = sequelize.define(
    "lockers",
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Locker;
};
