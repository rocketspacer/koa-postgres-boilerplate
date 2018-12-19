// Dependencies
const { Model } = require('objection');
const { DbErrors } = require('objection-db-errors');
const Knex = require('knex');

// Config
const dbConfig = require('../knexfile');

// Knex
const knex = new Knex(dbConfig);

// Model
Model.knex(knex);

// Exports
module.exports = DbErrors(Model);
