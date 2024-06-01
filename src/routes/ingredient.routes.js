const { Router } = require("express");
const IngredientController = require("../controllers/IngredientController");

const ingredientRoutes = Router();
const ingredientController = new IngredientController();

ingredientRoutes.get("/", ingredientController.index);

module.exports = ingredientRoutes;
