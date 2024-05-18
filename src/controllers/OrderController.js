const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrderController {
  async create(request, response) {
    const { priceTotal, item_product } = request.body;
    const user_id = request.user.id;

    if (!item_product) {
      throw new AppError("Carrinho vazio");
    }

    const itemProductInsert = item_product.map((item, qtd) => {
      return {
        order_id,
        dish_id: item,
        amount_item: qtd,
      };
    });

    await knex("item_product").insert(itemProductInsert);

    let total;

    return response.status(201).json();
  }
}

module.exports = OrderController;
