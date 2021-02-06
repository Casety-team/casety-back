module.exports = (app) => {
  const locker = require("../controllers/locker.controller.js");
  let router = require("express").Router();

  router.post("/", locker.create);
  router.get("/", locker.findAll);
  router.get("/:id", locker.findOne);
  router.put("/:id", locker.update);
  router.delete("/:id", locker.delete);
  router.delete("/", locker.deleteAll);

  app.use("/api/lockers", router);
};
