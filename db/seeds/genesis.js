// Dependencies

// Models
const { User, Role } = require('../../models');

// Seed
exports.seed = async (knex) => {
  await User.query().delete();
  await Role.query().delete();

  const me = await User.query().insert({
    name          : 'Tuan Nguyen',
    email         : 'nmtuan.dev@gmail.com',
    password_hash : await User.getPasswordHash('123456'),
  });

  const meRole = await Role.query().insert({
    name      : `user_${me.id}`,
    user_role : true,
  });

  const userRole = await Role.query().insert({
    name        : 'User',
    description : 'Default user',
  });
  await userRole.$relatedQuery('operations').insert({ operation_id: 'auth.login' });
  await userRole.$relatedQuery('operations').insert({ operation_id: 'auth.logout' });
  await userRole.$relatedQuery('operations').insert({ operation_id: 'auth.register' });

  const adminRole = await Role.query().insert({
    name        : 'Admin',
    description : 'Admin user',
  });
  await adminRole.$relatedQuery('operations').insert({ operation_id: 'auth.login' });
  await adminRole.$relatedQuery('operations').insert({ operation_id: 'auth.logout' });
  await adminRole.$relatedQuery('operations').insert({ operation_id: 'auth.register' });
  await adminRole.$relatedQuery('operations').insert({ operation_id: 'user.list' });
  await adminRole.$relatedQuery('operations').insert({ operation_id: 'user.get' });

  await me.$relatedQuery('roles').relate(meRole.id);
  await me.$relatedQuery('roles').relate(userRole.id);
  await me.$relatedQuery('roles').relate(adminRole.id);
};
