const { Router } = require("express");
const OrderController = require("../controllers/OrderController");

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post("/", orderController.create);

module.exports = orderRoutes;
