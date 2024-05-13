const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class CategoryController {
  async create(request, response) {
    const { name, dish_id } = request.body;

    if (!name) {
      throw new AppError("Nome da categoria é obrigatório");
    }

    const checkCategoryExists = await knex("category").where({ name }).first();

    if (checkCategoryExists) {
      throw new AppError("Categoria já foi criada");
    }

    await knex("category").insert({ name, dish_id });

    return response.status(201).json({ name, dish_id });
  }
}

module.exports = CategoryController;
