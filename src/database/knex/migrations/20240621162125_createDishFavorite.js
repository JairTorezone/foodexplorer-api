exports.up = (knex) =>
  knex.schema.createTable("favorite", (table) => {
    table.increments("id");

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dish")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("favorite");
