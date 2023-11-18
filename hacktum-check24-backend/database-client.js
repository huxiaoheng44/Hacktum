const { Pool } = require("pg");

// const pool = new Pool({
//   host: process.env['DB_HOSTNAME'] || 'localhost',
//   database: process.env['DB_DATABASE_NAME'] || 'check24',
//   user: "postgres"
// });

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "local_db",
  password: "password",
  port: 5433, // Default PostgreSQL port
});

const getDatabaseClient = async () => await pool.connect();

module.exports = {
  getDatabaseClient,
};
