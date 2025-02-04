const pg = require("pg");
const env = require("dotenv");

env.config();

const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
};

const proConfig = {
    connectionString: process.env.DATABASE_URL // heroku addons
};

const db = new pg.Client(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = db;