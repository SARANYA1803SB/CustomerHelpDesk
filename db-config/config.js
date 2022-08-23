const path = require("path");
const dotenv = require('dotenv-safe').config({
    allowEmptyValues : true
  });

const DB_CONFIG = {
    db_host : process.env.DB_HOST,
    db_password : process.env.DB_PASSWORD,
    db_name : process.env.DB_NAME,
    db_user : process.env.DB_USER,
    migrationDirectory : path.join(__dirname, '/migrations')
}

module.exports = {
    DB_CONFIG,
}