// Up
exports.up = (knex) => knex.schema.createTable('roles', (t) => {
  t.bigIncrements().primary();
  t.string('name').notNullable();
  t.boolean('user_role').notNullable().defaultTo(false);
  t.text('description');
  t.timestamps();

  t.unique('name');
});

// Down
exports.down = (knex) => knex.schema.dropTable('roles');
