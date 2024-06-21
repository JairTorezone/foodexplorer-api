const { Router } = require("express");
const usersRoutes = require("../routes/users.routes");

const dishRoutes = require("../routes/dish.routes");
const favoriteDishRoutes = require("../routes/favorite.dish.routes");
const orderRoutes = require("../routes/order.routes");
const sessionsRoutes = require("../routes/sessions.routes");
const dishImageRoutes = require("./dish.image.routes");
const ingredientRoutes = require("./ingredient.routes");

const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", usersRoutes);
routes.use("/dish", dishRoutes);
routes.use("/dish", dishImageRoutes);
routes.use("/ingredients", ingredientRoutes);
routes.use("/favorite", favoriteDishRoutes);
routes.use("/order", orderRoutes);

module.exports = routes;
