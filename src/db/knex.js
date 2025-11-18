import knex from 'knex';
import { config } from '../config';

const db = knex({
  client: 'pg',
  connection: {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  },
  pool: { min: 0, max: 10 },
});

export default db;