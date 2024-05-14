const { Router } = require("express");
const FavoriteDishController = require("../controllers/FavoriteDishController");

const favoriteDishRoutes = Router();
const favoriteDishController = new FavoriteDishController();

favoriteDishRoutes.post("/", favoriteDishController.create);
favoriteDishRoutes.get("/:user_id", favoriteDishController.index);

module.exports = favoriteDishRoutes;
