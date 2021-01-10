module.exports = (sequelize, Sequelize) => {
  const userBuy = sequelize.define("usersBuy", {
    user_id: {
      type: Sequelize.INTEGER,
    },
    buy: {
      type: Sequelize.BOOLEAN
    }
  }, 
  {
    paranoid: true,
    timestamps: true
  });

  return userBuy;
};