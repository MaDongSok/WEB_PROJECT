require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connection = require('./data.js'); // Import your DB connection

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));

const JWT_SECRET = 'your_jwt_secret'; // Change to a secure secret
// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ token });
    });
  });
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Hash error' });
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
      if (err) return res.status(500).json({ error: 'Registration failed' });
      res.json({ message: 'User registered' });
    });
  });
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));