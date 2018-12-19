// Dependencies

// Relationships
const { Model: { BelongsToOneRelation } } = require('objection');

// Base model
const BaseModel = require('./base');

// Role model
class ACL extends BaseModel {
  static get tableName() {
    return 'acls';
  }

  static get relationMappings() {
    const Role = require('./role'); // eslint-disable-line global-require

    return {
      roles: {
        relation   : BelongsToOneRelation,
        modelClass : Role,
        join       : {
          from : 'acls.role_id',
          to   : 'roles.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type       : 'object',
      required   : ['operation_id'],
      properties : {
        id           : { type: 'bigInteger' },
        role_id      : { type: 'bigInteger' },
        operation_id : { type: 'string' },
      },
    };
  }

  static async getUserOperations({ user_id }) {
    return ACL
      .query()
      .distinct('operation_id')
      .select('operation_id')
      .whereIn('role_id', (query) => {
        query.select('roles.id').from('roles').join('users_roles', 'users_roles.role_id', 'roles.id').where({ user_id });
      })
      .map((o) => o.operation_id);
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

// Exports
module.exports = ACL;
