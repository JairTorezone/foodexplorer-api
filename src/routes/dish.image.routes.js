const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const DishImageController = require("../controllers/DishImageController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishImageRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishImageController = new DishImageController();

dishImageRoutes.patch(
  "/images/:dish_id",
  ensureAuthenticated,
  upload.single("imageUrl"),
  dishImageController.update
);

module.exports = dishImageRoutes;
