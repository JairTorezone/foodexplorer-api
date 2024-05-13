exports.up = (knex) =>
  knex.schema.alterTable("category", (table) => {
    table
      .integer("dish_id")
      .references("id")
      .inTable("dish")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("users");

//   knex.schema.alterTable("dish", (table) => {
//     table.dropColumn("category_id");
//   });

// exports.down = (knex) => knex.schema.dropTable("dish");
