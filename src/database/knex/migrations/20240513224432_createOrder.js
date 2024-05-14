exports.up = (knex) =>
  knex.schema.createTable("order", (table) => {
    table.increments("id");

    table.timestamp("created_at").default(knex.fn.now());
    table.float("priceTotal").notNullable();

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("order");
