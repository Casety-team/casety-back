module.exports = (app) => {
  const locker_type = require("../controllers/locker_type.controller.js");
  let router = require("express").Router();

  router.post("/", locker_type.create);
  router.get("/", locker_type.findAll);
  router.get("/:id", locker_type.findOne);
  router.get("/types/:name", locker_type.findOneName);
  router.put("/:id", locker_type.update);
  router.delete("/:id", locker_type.delete);
  router.delete("/", locker_type.deleteAll);

  app.use("/api/locker_types", router);
};
