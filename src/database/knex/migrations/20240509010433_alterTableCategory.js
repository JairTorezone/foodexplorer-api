exports.up = (knex) =>
  knex.schema.alterTable("category", (table) => {
    table.integer("dish_id").references("id").inTable("dish");
  });

exports.down = (knex) => knex.schema.dropTable("users");
