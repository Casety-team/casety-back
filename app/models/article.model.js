module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "articles",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.TEXT,
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
