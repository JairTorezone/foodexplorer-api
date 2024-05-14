const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FavoriteDishController {
  async create(request, response) {
    const { user_id, dish_id } = request.body;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não cadastrado");
    }

    const dish = await knex("dish").where({ id: dish_id }).first();

    if (!dish) {
      throw new AppError("Prato não cadastrado");
    }

    await knex("favorite").insert({ user_id, dish_id });

    return response.json();
  }

  async index(request, response) {
    const { user_id } = request.params;

    let dish = await knex("favorite")
      .select(["dish.imageUrl", "dish.name"])
      .innerJoin("dish", "dish.id", "favorite.dish_id")
      .where({ user_id: user_id });

    return response.json(dish);
  }
}

module.exports = FavoriteDishController;
