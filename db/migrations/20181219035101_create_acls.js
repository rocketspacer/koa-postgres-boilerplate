// Up
exports.up = (knex) => knex.schema.createTable('acls', (t) => {
  t.bigIncrements().primary();
  t.bigInteger('role_id').notNullable();
  t.string('operation_id').notNullable();
  t.timestamps();

  t.unique(['role_id', 'operation_id']);

  t.foreign('role_id').references('id').inTable('roles')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
});

// Down
exports.down = (knex) => knex.schema.dropTable('acls');
