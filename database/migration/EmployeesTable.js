const dbCon = require('../../config/connection.js');

const sql = "CREATE TABLE IF NOT EXISTS employees (" +
    "id INT AUTO_INCREMENT PRIMARY KEY, " +
    "first_name VARCHAR(255), " +
    "last_name VARCHAR(255), " +
    "username VARCHAR(225), " +
    "password VARCHAR(255), " +
    "'created_at' DATETIME NOT NULL, " +
    "'updated_at' DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,)" ;

dbCon.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});
