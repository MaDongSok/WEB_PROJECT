const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myproject_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;