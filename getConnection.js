var mysql = require('mysql');

var pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

const getConnection = function (callback) {
  pool.getConnection(function (err, connection) {
    callback(err, connection);
  });
};

module.exports = getConnection;
