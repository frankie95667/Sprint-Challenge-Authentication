const knex = require('knex');

const knexConfig = require('../knexfile.js');
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = knex(knexConfig[NODE_ENV]);
