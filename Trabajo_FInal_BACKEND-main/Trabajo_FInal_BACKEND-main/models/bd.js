var mysql = require("mysql");
var util = require("util");

// Conexión a la base de datos
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

pool.query = util.promisify(pool.query);

module.exports = pool;
