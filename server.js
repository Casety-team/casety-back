const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  host : 'localhost',
  port : 8080,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to casety application." });
});

//users
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

//reserver
require("./app/routes/reserver.routes")(app);

//locker
require("./app/routes/locker.routes")(app);

//location
require("./app/routes/location.routes")(app);

//shop
require("./app/routes/shop.routes")(app);

const PORT = process.env.PORT || 4545;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}