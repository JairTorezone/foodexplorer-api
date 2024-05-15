const { response } = require("express");
const knex = require("../database/knex");

class OrderController {
  async create(request, response) {
    const { priceTotal, item_product } = request.body;
    const { user_id } = request.params;
    const { dish_id, discount } = request.query;

    const [order_id] = await knex("order").insert({
      priceTotal,
      user_id,
    });

    const itemProductInsert = item_product.map((amount_item) => {
      return {
        order_id,
        dish_id: dish_id,
        amount_item,
        discount,
      };
    });

    await knex("item_product").insert(itemProductInsert);

    const allItemProduct = await knex("item_product");

    return response.status(201).json();
  }
}

module.exports = OrderController;
