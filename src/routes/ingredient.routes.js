const { Router } = require("express");
const IngredientController = require("../controllers/IngredientController");

const ingredientRoutes = Router();
const ingredientController = new IngredientController();

ingredientRoutes.get("/:dish_id", ingredientController.index);

module.exports = ingredientRoutes;
