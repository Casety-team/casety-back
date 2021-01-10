module.exports = app => {
  const shop = require("../controllers/shop.controller.js");
  let router = require("express").Router();

  router.post("/", shop.buy);
  router.post("/buy/user", shop.addBuyUser);
  
  app.use('/stripe/charge', router);
};