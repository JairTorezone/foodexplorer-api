const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const DishController = require("../controllers/DishController");

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishController = new DishController();

dishRoutes.post("/", dishController.create);
dishRoutes.get("/:id", dishController.showId);
dishRoutes.get("/", dishController.index);
dishRoutes.delete("/:id", dishController.delete);
dishRoutes.put("/:id", dishController.update);

module.exports = dishRoutes;
