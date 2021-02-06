module.exports = (sequelize, Sequelize) => {
  const locker_type = sequelize.define(
    "lockers_types",
    {
      name: {
        type: Sequelize.ENUM,
        values: ["bikes", "lockers"],
      },
      length: {
        type: Sequelize.INTEGER,
      },
      width: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return locker_type;
};
