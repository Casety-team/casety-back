module.exports = app => {
  const shop = require("../controllers/shop.controller.js");
  let router = require("express").Router();

  router.post("/", shop.buy);
  
  app.use('/stripe/charge', router);
};