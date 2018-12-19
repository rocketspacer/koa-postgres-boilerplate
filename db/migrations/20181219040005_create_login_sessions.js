// Up
exports.up = (knex) => knex.schema.createTable('login_sessions', (t) => {
  t.bigIncrements().primary();
  t.string('uid').notNullable();
  t.bigInteger('user_id').unsigned().notNullable();
  t.timestamp('issued_at').notNullable();
  t.timestamps();

  t.unique('uid');
  t.unique(['uid', 'user_id']);

  t.foreign('user_id').references('id').inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
});

// Down
exports.down = (knex) => knex.schema.dropTable('login_sessions');
