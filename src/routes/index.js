const { Router } = require("express");
const usersRoutes = require("../routes/users.routes");
const categoryRoutes = require("../routes/category.routes");
const dishRoutes = require("../routes/dish.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/category", categoryRoutes);
routes.use("/dish", dishRoutes);

module.exports = routes;
