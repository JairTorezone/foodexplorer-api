exports.up = (knex) =>
  knex.schema.createTable("item_product", (table) => {
    table.increments("id");
    table
      .integer("order_id")
      .references("id")
      .inTable("order")
      .onDelete("CASCADE");

    table
      .integer("dish_id")
      .references("id")
      .inTable("dish")
      .onDelete("CASCADE");

    table.integer("amount_item");
    table.float("discount");
  });

exports.down = (knex) => knex.schema.dropTable("item_product");
