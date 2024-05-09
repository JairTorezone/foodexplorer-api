const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishController {
  async create(request, response) {
    const { name, description, price, imageUrl } = request.body;

    if (!name) {
      throw new AppError("Nome do prato é obrigatório");
    }

    if (!description) {
      throw new AppError("Descreva o prato");
    }

    await knex("dish").insert({ name, description, price, imageUrl });

    return response.status(201).json({ name, description, price, imageUrl });
  }
}

module.exports = DishController;
