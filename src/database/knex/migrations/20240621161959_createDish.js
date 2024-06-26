exports.up = (knex) =>
  knex.schema.createTable("dish", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("category").notNullable();
    table.text("imageUrl");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

    table.float("price").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("dish");
