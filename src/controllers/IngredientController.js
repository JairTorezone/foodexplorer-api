const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientController {
  async index(request, response) {
    const { dish_id } = request.body;

    const ingredients = await knex("ingredients")
      .where({ dish_id })
      .groupBy("title");

    return response.status(201).json(ingredients);
  }
}

module.exports = IngredientController;
