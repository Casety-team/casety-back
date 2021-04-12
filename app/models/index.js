const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

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

//reserver
db.reserver = require("./reserver.model.js")(sequelize, Sequelize);

//location
db.location = require("./location.model.js")(sequelize, Sequelize);

//basket
db.basket = require("./basket.model.js")(sequelize, Sequelize);

//lockers foreign_key [locationId]
db.locker.belongsTo(db.location, {
  through: "lockers",
  foreignKey: "locationId",
});

//lockers_types foreign_key [locker_type_id]
db.locker.belongsTo(db.locker_type, {
  through: "lockers",
  foreignKey: "locker_type_id",
});

//Reservers foreign_key [userId]
db.reserver.belongsTo(db.user, {
  through: "reservers",
  foreignKey: "userId",
});

//Reservers foreign_key [lockerId]
db.reserver.belongsTo(db.locker, {
  through: "reservers",
  foreignKey: "lockerId",
});

//Basket foreign_key [lockerId]
db.basket.belongsTo(db.reserver, {
  through: "baskets",
  foreignKey: "reserverId",
});

//User_roles foreign_key [roleId, userId]
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

//Roles foreign_key [userId, roleId]
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
