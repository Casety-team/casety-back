module.exports = (sequelize, Sequelize) => {
  const Reserver = sequelize.define('reservers', {
    date_start: {
      type: Sequelize.DATE
    },
    date_end: {
      type: Sequelize.DATE
    }
  }, 
  {
    paranoid: true,
    timestamps: true
  }
  );

  return Reserver;
}