const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool({ connectionString });

//db.query("SELECT * FROM USERS").then((result) => console.log(result.rows));
//> `console.log(result)` would give you the response from the database
//> console.log(result.rows) would give you the data itself that we requested in the query

module.exports = db;
