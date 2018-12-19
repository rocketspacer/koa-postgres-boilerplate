// Up
exports.up = (knex) => knex.schema.createTable('users_roles', (t) => {
  t.bigIncrements().primary();
  t.bigInteger('user_id').unsigned().notNullable();
  t.bigInteger('role_id').unsigned().notNullable();
  t.timestamps();

  t.unique(['user_id', 'role_id']);

  t.foreign('user_id').references('id').inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');

  t.foreign('role_id').references('id').inTable('roles')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
});

// Down
exports.down = (knex) => knex.schema.dropTable('users_roles');
