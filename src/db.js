<<<<<<< HEAD
const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
=======
const knex = require('knex');
const config = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
module.exports = knex(config[env]);
>>>>>>> 222126396ae93864d164b26c1d673408ba07bd7c
