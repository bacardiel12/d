const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',      // your database user
  host: 'postgres',   // your database host
  database: 'postgres', // your database name
  password: 'test', // your database password
  port: 5432,          // your database port
});

module.exports = pool;
