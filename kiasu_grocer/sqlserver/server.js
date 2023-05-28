const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const db = new sqlite3.Database('./data/sample.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS productS(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    price INTEGER,
    description TEXT,
    discount INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

// API for getting users

app.get('/api/users', (req, res) => {
  db.all(`SELECT * FROM users;`, (error, rows) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(rows);
    }
  });
});


app.get('/api/users/create', (req, res) => {
  const { name, email } = req.query;

  if (!name || !email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(`INSERT INTO users (name, email) VALUES (?, ?);`, [name, email], (error) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'User created successfully' });
    }
  });
});

// API for getting products
app.get('/api/products', (req, res) => {
  db.all(`SELECT * FROM products;`, (error, rows) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/products/create', (req, res) => {
  const { name, price, description, discount,user_id } = req.query;
  
  if (!name || !price || !description || !discount || !user_id) {
    
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(`INSERT INTO products (name, price, description, discount, user_id) VALUES (?, ?, ?, ?, ?);`, [name, price, description, discount], (error) => {

    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Product created successfully' });
    }
  });
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

