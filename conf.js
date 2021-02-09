require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: `${process.env.MYSQL_PASSWORD}`, //drM.
  database: `${process.env.MYSQL_DATABASE}`, //remote
});

module.exports = connection;
