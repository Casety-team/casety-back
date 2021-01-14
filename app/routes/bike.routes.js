module.exports = app => {
  const bike = require("../controllers/bike.controller.js");
  let router = require("express").Router();

  router.post("/", bike.create);
  router.get("/", bike.findAll);
  router.get("/:id", bike.findOne);
  router.put("/:id", bike.update);
  router.delete("/:id", bike.delete);
  router.delete("/", bike.deleteAll);
  
  app.use('/api/bikes', router);
};