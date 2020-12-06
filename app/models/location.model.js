module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define('locations', {
    name: {
      type: Sequelize.STRING(150) 
    },
    first_adress: {
      type: Sequelize.STRING 
    },
    second_adress: {
      type: Sequelize.STRING 
    },
    city: {
      type: Sequelize.STRING(100) 
    },
    zip_code: {
      type: Sequelize.INTEGER
    },
    transport: {
      type: Sequelize.TEXT
    },
    opening_hours: {
      type: Sequelize.INTEGER
    },
    closing_hours: {
      type: Sequelize.INTEGER
    }
  }, 
  {
    paranoid: true,
    timestamps: true
  }
  );

  return Location;
}