'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wherex'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Conexión a BDD OK!");
});
module.exports = dbConn;