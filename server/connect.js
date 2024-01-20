import mysql from 'mysql';
import env from './utils/validateEnv.js';

export const db = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
});
