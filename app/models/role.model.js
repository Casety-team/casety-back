module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "roles",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Role;
};
