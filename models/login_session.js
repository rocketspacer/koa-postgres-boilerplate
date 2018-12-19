// Dependencies
const uuid = require('uuid');

// Relationships
const { Model: { BelongsToOneRelation } } = require('objection');

// Base model
const BaseModel = require('./base');

// LoginSession model
class LoginSession extends BaseModel {
  static get tableName() {
    return 'login_sessions';
  }

  static get relationMappings() {
    const User = require('./user'); // eslint-disable-line global-require

    return {
      user: {
        relation   : BelongsToOneRelation,
        modelClass : User,
        join       : {
          from : 'login_sessions.user_id',
          to   : 'users.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type       : 'object',
      required   : ['user_id'],
      properties : {
        id        : { type: 'bigInteger' },
        uid       : { type: 'string' },
        user_id   : { type: 'bigInteger' },
        issued_at : { type: 'timestamp' },
      },
    };
  }

  async refresh() {
    this.uid = uuid.v4().replace(/-/g, '');
    this.issued_at = Date.now();
    return this.$query().patch(this);
  }

  $beforeInsert() {
    this.uid = uuid.v4().replace(/-/g, '');

    const now = new Date();
    this.created_at = now.toISOString();
    this.issued_at = now.getTime();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

// Exports
module.exports = LoginSession;
