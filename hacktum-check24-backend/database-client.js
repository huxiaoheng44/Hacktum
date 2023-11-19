const { Pool } = require("pg");

const pool = new Pool({
  user: process.env["DB_USER"],
  host: "postgres",
  database: process.env["DB_NAME"],
  password: process.env["DB_PASSWORD"],
  port: process.env["DB_PORT"],
});

const getDatabaseClient = async () => await pool.connect();

module.exports = {
  getDatabaseClient,
};
