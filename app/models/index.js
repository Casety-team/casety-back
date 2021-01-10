const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//users token
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

//reserver
db.reserver = require("./reserver.model.js")(sequelize, Sequelize);

//locker
db.locker = require("./locker.model.js")(sequelize, Sequelize);

//location
db.location = require("./location.model.js")(sequelize, Sequelize);

//userBuy
db.userBuy = require("./userBuy.model.js")(sequelize, Sequelize);


//User_Buy foreign_key
db.userBuy.belongsTo(db.user, {
  through: "id",
  foreignKey: "user_id",
});

//lockers foreign_key
db.locker.belongsTo(db.location, {
  through: "lockers",
  foreignKey: "locationId",
});

//Reservers foreign_key
db.locker.belongsToMany(db.user, {
  through: "reservers",
  foreignKey: "userId",
  foreignKey: "lockerId"
});

//User_roles foreign_key
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
