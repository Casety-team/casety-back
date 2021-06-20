const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
let router = require("express").Router();

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/all/", controller.allAccess);
  app.get("/api/user/", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/mod/",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/user/all/", [authJwt.verifyToken], controller.findOne);
  app.get("/api/user/:id", controller.findOne);
  app.put("/api/user/:id", controller.update);
  app.delete("/api/user/:id", controller.delete);
};
