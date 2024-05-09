const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/", categoryController.create);

module.exports = categoryRoutes;
