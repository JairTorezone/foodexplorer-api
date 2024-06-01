const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishController {
  async create(request, response) {
    const { name, description, price, imageUrl, ingredients, category } =
      request.body;

    if (!name) {
      throw new AppError("Nome do prato é obrigatório");
    }

    if (!description) {
      throw new AppError("Descreva o prato");
    }

    const [dish_id] = await knex("dish").insert({
      name,
      description,
      price,
      imageUrl,
    });

    const ingredientInsert = ingredients.map((title) => {
      return {
        dish_id,
        title,
      };
    });

    await knex("ingredients").insert(ingredientInsert);

    const categoryInsert = category.map((title) => {
      return {
        dish_id,
        title,
      };
    });

    await knex("category").insert(categoryInsert);

    return response.status(201).json();
  }

  async showId(request, response) {
    const { id } = request.params;

    const dish = await knex("dish").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("title");
    const category = await knex("category").where({ dish_id: id });

    return response.json({ ...dish, ingredients, category });
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let dish;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dish = await knex("ingredients")
        .select([
          "dish.id",
          "dish.name",
          "dish.description",
          "dish.imageUrl",
          "dish.price",
        ])
        .whereLike("dish.name", `%${name}%`)
        .whereIn("title", filterIngredients)
        .innerJoin("dish", "dish.id", "ingredients.dish_id")
        .orderBy("dish.name");
    } else {
      dish = await knex("dish").whereLike("name", `%${name}%`).orderBy("name");
    }

    const allIngredients = await knex("ingredients");
    const allDish = await knex("dish");

    const allDishesResult = allDish.map((dish) => {
      const result = allIngredients.filter((tag) => tag.dish_id === dish.id);

      return {
        ...dish,
        ingredients: result,
      };
    });

    return response.json(allDishesResult);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dish").where({ id }).delete();

    return response.json("Deletado com sucesso");
  }

  async update(request, response) {
    const { name, description, updated_at, price, category, ingredients } =
      request.body;
    const { id } = request.params;

    const dishId = await knex("dish").where({ id }).first();

    if (!dishId) {
      throw new AppError("Prato não encontrado");
    }

    if (name === "") {
      throw new AppError("Nome não pode esta vazio");
    }

    if (description === "") {
      throw new AppError("Descrição não pode esta vazio");
    }

    if (isNaN(price)) {
      throw new AppError("Valor do preço inválido");
    }

    if (price < 1) {
      throw new AppError("Digite o valor do prato");
    }

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).delete();
      const ingredientInsert = ingredients.map((ingredient) => {
        return {
          title: ingredient,
          dish_id: id,
        };
      });

      await knex("ingredients").insert(ingredientInsert);
    }

    if (category) {
      await knex("category").where({ dish_id: id }).delete();
      const categoryInsert = category.map((item) => {
        return {
          dish_id: id,
          title: item,
        };
      });

      await knex("category").insert(categoryInsert);
    }

    dishId.name = name ?? dishId.name;
    dishId.description = description ?? dishId.description;
    dishId.price = price ?? dishId.price;
    dishId.updated_at = new Date();

    await knex("dish").where({ id }).update({
      name: dishId.name,
      description: dishId.description,
      price: dishId.price,
    });

    return response.json({ price });
  }
}

module.exports = DishController;
