module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "categories",
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

  return Category;
};
