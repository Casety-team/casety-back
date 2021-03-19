module.exports = (sequelize, Sequelize) => {
  const Basket = sequelize.define(
    "baskets",
    {
      price: {
        type: Sequelize.INTEGER,
      },
      code_unlock: Sequelize.INTEGER,
      code_secure: Sequelize.INTEGER,
      paymentIntent: Sequelize.STRING,
      reserverId: Sequelize.INTEGER,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return Basket;
};
