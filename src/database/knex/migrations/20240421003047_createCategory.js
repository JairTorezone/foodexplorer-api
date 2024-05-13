exports.up = (knex) =>
  knex.schema.createTable("category", (table) => {
    table.increments("id");
    table.text("title").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("users");
