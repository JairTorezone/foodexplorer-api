const { Router } = require("express");
const usersRoutes = require("../routes/users.routes");
const categoryRoutes = require("../routes/category.routes");
const dishRoutes = require("../routes/dish.routes");
const favoriteDishRoutes = require("../routes/favorite.dish.routes");
const orderRoutes = require("../routes/order.routes");
const sessionsRoutes = require("../routes/sessions.routes");
const dishImageRoutes = require("./dish.image.routes");

const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);
routes.use("/category", categoryRoutes);
routes.use("/dish", dishRoutes);
routes.use("/dish", dishImageRoutes);
routes.use("/favorite", favoriteDishRoutes);
routes.use("/order", orderRoutes);

module.exports = routes;
