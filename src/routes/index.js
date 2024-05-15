const { Router } = require("express");
const usersRoutes = require("../routes/users.routes");
const categoryRoutes = require("../routes/category.routes");
const dishRoutes = require("../routes/dish.routes");
const favoriteDishRoutes = require("../routes/favorite.dish.routes");
const orderRoutes = require("../routes/order.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/category", categoryRoutes);
routes.use("/dish", dishRoutes);
routes.use("/favorite", favoriteDishRoutes);
routes.use("/order", orderRoutes);

module.exports = routes;
