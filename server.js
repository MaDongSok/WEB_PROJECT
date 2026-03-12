require("dotenv").config();
const express = require("express");
const db = require("./data"); 
const app = express();

app.use(express.json()); 
app.use(express.static('frontend')); 

// --- REGISTER ROUTE (Simple Version) ---
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if fields are empty
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ success: false, message: 'Database Error' });
        }
        res.json({ success: true });
    });
});

// --- LOGIN ROUTE (Simple Version) ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ success: false });
        
        if (result.length > 0) {
            res.json({ success: true, message: 'Login Success' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});