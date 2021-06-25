module.exports = (sequelize, Sequelize) => {
  const Basket = sequelize.define(
    "baskets",
    {
      price: Sequelize.INTEGER,
      code_unlock: Sequelize.INTEGER,
      code_secure: Sequelize.INTEGER,
      pay: {
        type: Sequelize.ENUM,
        values: ["false", "true"],
      },
      marketToken: Sequelize.STRING,
      paymentIntent: Sequelize.STRING,
      link: Sequelize.STRING,
      userId: Sequelize.INTEGER,
      reserverId: Sequelize.INTEGER,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Basket;
};
