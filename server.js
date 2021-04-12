const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  host: process.env.WEB_URL ? process.env.WEB_URL : "localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
const Role = db.role;

//Clear all data in dataBase
// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and Resync Db");
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "moderator",
//   });
//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CASETY application." });
});

//users
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//locker
require("./app/routes/locker.routes")(app);

//lockers_types
require("./app/routes/locker_type.routes")(app);

//location
require("./app/routes/location.routes")(app);

//reserver
require("./app/routes/reserver.routes")(app);

//shop
require("./app/routes/shop.routes")(app);

app.listen(() => {
  console.log(`Server is running on port ${process.env.DB_HOST}.`);
});
