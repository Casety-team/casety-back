module.exports = app => {
  const location = require("../controllers/location.controller.js");
  let router = require("express").Router();

  router.post("/", location.create);
  router.get("/", location.findAll);
  router.get("/:id", location.findOne);
  router.put("/:id", location.update);
  router.delete("/:id", location.delete);
  router.delete("/", location.deleteAll);
  
  app.use('/api/locations', router);
};