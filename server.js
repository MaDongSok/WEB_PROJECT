const express = require("express");
const db = require("./db");

const app = express();

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});