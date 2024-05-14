exports.up = (knex) =>
  knex.schema.createTable("order_history", (table) => {
    table.increments("id");
    table.text("detail");

    table
      .enum("role", ["Pendente", "Preparando", "Entregue"], {
        useNative: true,
        enumName: "roles",
      })
      .notNullable()
      .default("Pendente");

    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("order_id")
      .references("id")
      .inTable("order")
      .onDelete("CASCADE");

    table
      .integer("item_product_id")
      .references("id")
      .inTable("item_product")
      .onDelete("CASCADE");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("order_history");
