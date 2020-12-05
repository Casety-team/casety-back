module.exports = app => {
  const customer = require("../controllers/tutorial.controller.js");
  let router = require("express").Router();

  router.post("/", customer.create);
  router.get("/", customer.findAll);
  router.get("/:id", customer.findOne);
  router.put("/:id", customer.update);
  router.delete("/:id", customer.delete);
  router.delete("/", customer.deleteAll);
  
  app.use('/api/customer', router);
};