const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  host: "localhost",
  database: process.env.PSQL_DB,
  port: 5432,
});

module.exports = pool;
