// Up
exports.up = (knex) => knex.schema.createTable('users', (t) => {
  t.bigIncrements().primary();
  t.string('uid').notNullable();
  t.string('name').notNullable();
  t.string('email').notNullable();
  t.string('password_hash').notNullable();
  t.timestamps();

  t.unique('uid');
  t.unique('email');
});

// Down
exports.down = (knex) => knex.schema.dropTable('users');
