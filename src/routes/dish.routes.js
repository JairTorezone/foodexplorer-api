const { Router } = require("express");
const DishController = require("../controllers/DishController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishRoutes = Router();

const dishController = new DishController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", verifyUserAuthorization(["admin"]), dishController.create);
dishRoutes.put(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishController.update
);
dishRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  dishController.delete
);

dishRoutes.get("/:id", dishController.showId);
dishRoutes.get("/", dishController.index);

module.exports = dishRoutes;
