const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ascent-DB",
  password: "root",
  port: 5433,
});

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

module.exports = pool;
