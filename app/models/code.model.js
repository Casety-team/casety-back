module.exports = (sequelize, Sequelize) => {
  const Code = sequelize.define('codes', {
    code_unlock: {
      type: Sequelize.STRING,
    },
    code_secure: {
      type: Sequelize.STRING,
    }
  }, 
  {
    paranoid: true,
    timestamps: true
  }
  );

  return Code;
}