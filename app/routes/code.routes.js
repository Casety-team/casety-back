module.exports = app => {
  const code = require("../controllers/code.controller.js");
  let router = require("express").Router();

  router.post("/", code.create);
  router.get("/", code.findAll);
  router.get("/:id", code.findOne);
  router.put("/:id", code.update);
  router.delete("/:id", code.delete);
  router.delete("/", code.deleteAll);
  
  app.use('/api/codes', router);
};