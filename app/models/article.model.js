module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "articles",
    {
      name: {
        type: Sequelize.STRING,
      },
      categorieId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Article;
};
