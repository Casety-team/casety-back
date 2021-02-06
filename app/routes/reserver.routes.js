module.exports = (app) => {
  const reserver = require("../controllers/reserver.controller.js");
  let router = require("express").Router();

  router.post("/", reserver.create);
  router.get("/", reserver.findAll);
  router.get("/:id", reserver.findOne);
  router.put("/:id", reserver.update);
  router.delete("/:id", reserver.delete);
  router.delete("/", reserver.deleteAll);

  app.use("/api/reservers", router);
};
