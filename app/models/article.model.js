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
      picture_url: {
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
