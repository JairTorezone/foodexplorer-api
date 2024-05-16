const { Router } = require("express");
const FavoriteDishController = require("../controllers/FavoriteDishController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoriteDishRoutes = Router();
const favoriteDishController = new FavoriteDishController();

favoriteDishRoutes.post(
  "/",
  ensureAuthenticated,
  favoriteDishController.create
);
favoriteDishRoutes.get("/", ensureAuthenticated, favoriteDishController.index);

module.exports = favoriteDishRoutes;
