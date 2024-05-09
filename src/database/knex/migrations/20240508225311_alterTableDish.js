exports.up = (knex) =>
  knex.schema.alterTable("dish", (table) => {
    table.text("description").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("dish");
