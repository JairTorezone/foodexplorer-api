exports.up = (knex) =>
  knex.schema.alterTable("dish", (table) => {
    table.dropColumn("category_id");
  });

exports.down = (knex) => knex.schema.dropTable("dish");
