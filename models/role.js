// Dependencies

// Relationships
const { Model: { ManyToManyRelation, HasManyRelation } } = require('objection');

// Base model
const BaseModel = require('./base');

// Role model
class Role extends BaseModel {
  static get tableName() {
    return 'roles';
  }

  static get relationMappings() {
    const User = require('./user'); // eslint-disable-line global-require
    const ACL = require('./acl'); // eslint-disable-line global-require

    return {
      users: {
        relation   : ManyToManyRelation,
        modelClass : User,
        join       : {
          from    : 'roles.id',
          to      : 'users.id',
          through : {
            from : 'users_roles.role_id',
            to   : 'users_roles.user_id',
          },
        },
      },

      operations: {
        relation   : HasManyRelation,
        modelClass : ACL,
        join       : {
          from : 'roles.id',
          to   : 'acls.role_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type       : 'object',
      required   : ['name'],
      properties : {
        id          : { type: 'bigInteger' },
        name        : { type: 'string' },
        user_role   : { type: 'boolean' },
        description : { type: 'string' },
      },
    };
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

// Exports
module.exports = Role;
