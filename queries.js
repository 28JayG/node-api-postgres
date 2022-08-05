const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  port: process.env.PSQL_PORT,
});

module.exports = pool;
