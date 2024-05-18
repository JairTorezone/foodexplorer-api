const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");
const { diskStorage } = require("multer");

class DishImageController {
  async update(request, response) {
    const avatarFilename = request.file.filename;

    const { dish_id } = request.params;

    const diskStorage = new DiskStorage();

    const dishId = await knex("dish").where({ id: dish_id }).first();

    if (!dishId) {
      throw new AppError(
        "Somente usuário autenticado podem mudar a foto de perfil",
        401
      );
    }

    if (dishId.imageUrl) {
      await diskStorage.deleteFile(dishId.imageUrl);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    dishId.imageUrl = filename;

    await knex("dish").update(dishId).where({ id: dish_id });

    return response.json({ dishId });
  }
}

module.exports = DishImageController;
