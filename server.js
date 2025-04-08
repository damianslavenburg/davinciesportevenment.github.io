// server.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'esportsecret', resave: false, saveUninitialized: false }));
app.use(express.static('public'));

// Check login status middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.redirect('/login.html');
  next();
}

// Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      return res.redirect('/stream.html');
    }
    res.send('Onjuiste login');
  });
});

// Handle registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err) => {
    if (err) return res.send('Fout bij registreren');
    res.redirect('/login.html');
  });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login.html'));
});

// Beschermde stream route
app.get('/stream.html', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stream.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
