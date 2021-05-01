module.exports = (app) => {
  const shop = require("../controllers/shop.controller.js");
  let router = require("express").Router();

  router.post("/", shop.buy);
  router.get("/success/:token/", shop.verifPay);
  router.get("/error/", shop.error);
  router.get("/genere/:reserverId", shop.findOneCode);

  app.use("/stripe/charge", router);
};
