module.exports = (app) => {
  const categorie = require("../controllers/categorie.controller.js");
  const article = require("../controllers/article.controller.js");
  //comment
  let router = require("express").Router();

  router.post("/categorie/", categorie.create);
  router.post("/article/", article.create);

  router.get("/categorie/", categorie.findAll);
  router.get("/article/", article.findAll);

  router.get("/categorie/:id", categorie.findOne);
  router.get("/article/:id", article.findOne);

  router.put("/categorie/:id", categorie.update);
  router.put("/article/:id", article.update);

  router.delete("/categorie/:id", categorie.delete);
  router.delete("/article/:id", article.delete);

  router.delete("/categorie/", categorie.deleteAll);
  router.delete("/article/", article.deleteAll);

  app.use("/api/blog", router);
};
