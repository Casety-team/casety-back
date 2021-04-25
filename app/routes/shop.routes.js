module.exports = (app) => {
  const shop = require("../controllers/shop.controller.js");
  let router = require("express").Router();

  router.post("/", shop.buy);
  router.get("/success/:token", shop.verifPay);

  app.use("/stripe/charge", router);
};
