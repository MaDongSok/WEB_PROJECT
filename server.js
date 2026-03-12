require("dotenv").config();
const express = require("express");
const db = require("./data"); 
const app = express();

app.use(express.json()); // Only need this once
app.use(express.static('frontend')); // Serves your HTML files

// --- ROUTES ---

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    
    if (result.length > 0) {
      res.json({ success: true, message: 'Success' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Register Route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Error' });
    res.json({ success: true });
  });
});

// Test Route
app.get("/testdb", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) res.send("Database error");
    else res.json(result);
  });
});

// START SERVER (Keep this at the very bottom)
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});