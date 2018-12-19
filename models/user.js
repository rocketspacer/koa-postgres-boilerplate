// Dependencies
const shortid = require('shortid');
const bcrypt = require('bcryptjs');

// Constants
const SALT_ROUNDS = 10;

// Relationships
const { Model: { ManyToManyRelation } } = require('objection');

// Base model
const BaseModel = require('./base');

// User model
class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Role = require('./role'); // eslint-disable-line global-require

    return {
      roles: {
        relation   : ManyToManyRelation,
        modelClass : Role,
        join       : {
          from    : 'users.id',
          to      : 'roles.id',
          through : {
            from : 'users_roles.user_id',
            to   : 'users_roles.role_id',
          },
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type       : 'object',
      required   : ['name', 'email', 'password_hash'],
      properties : {
        id            : { type: 'bigInteger' },
        uid           : { type: 'string' },
        name          : { type: 'string' },
        email         : { type: 'string' },
        password_hash : { type: 'string' },
      },
    };
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static async getPasswordHash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  $beforeInsert() {
    this.uid = shortid.generate();
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

// Exports
module.exports = User;
