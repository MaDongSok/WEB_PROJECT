require("dotenv").config();
const express = require("express");
const db = require("./data"); 
const app = express();

app.use(express.static('frontend'));

app.use(express.json());
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
require("dotenv").config();

app.get("/testdb", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) {
      res.send("Database error");
    } else {
      res.json(result);
    }
  });
});
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});