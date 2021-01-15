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

//locker
db.locker = require("./locker.model.js")(sequelize, Sequelize);

//Locker_type
db.locker_type = require("./locker_type.model.js")(sequelize, Sequelize);

//Code
db.code = require("./code.model.js")(sequelize, Sequelize);

//reserver
db.reserver = require("./reserver.model.js")(sequelize, Sequelize);

//location
db.location = require("./location.model.js")(sequelize, Sequelize);

//lockers foreign_key
db.locker.belongsTo(db.location, {
  through: "lockers",
  foreignKey: "locationId",
});

//lockers_types foreign_key
db.locker.belongsTo(db.locker_type, {
  through: "lockers",
  foreignKey: "locker_type_id",
});

//Reservers LockersID foreign_key
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
