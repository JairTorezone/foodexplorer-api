exports.up = (knex) =>
  knex.schema.alterTable("dish", (table) => {
    table.dropColumn("image");
    table.text("imageUrl");
  });

exports.down = (knex) => knex.schema.dropTable("dish");
