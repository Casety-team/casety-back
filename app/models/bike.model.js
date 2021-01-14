module.exports = (sequelize, Sequelize) => {
  const Bike = sequelize.define('bikes', {
    name: {
      type: Sequelize.STRING,
    }
  }, 
  {
    paranoid: true,
    timestamps: true
  }
  );

  return Bike;
}