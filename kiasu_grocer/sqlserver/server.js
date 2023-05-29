const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(cors());

const db = new sqlite3.Database('./data/sample.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    passcode TEXT,
    email TEXT UNIQUE
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    price INTEGER,
    description TEXT,
    discount INTEGER,
    expiry_date TEXT,
    quantity INTEGER,
    image BLOB,
    vendor_id INTEGER,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
  )`);
});


///////////////////////////VENDORS//////////////////////////////
// API for getting vendors
app.get('/api/vendors', (req, res) => {
  db.all(`SELECT * FROM vendors;`, (error, rows) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(rows);
    }
  });
});

// API for creating vendors
app.get('/api/vendors/create', (req, res) => {
  const { passcode, email } = req.query;

  if (!passcode || !email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(`INSERT INTO vendors (passcode, email) VALUES (?, ?);`, [passcode, email], (error) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Vendor created successfully' });
    }
  });
});

app.get('/api/vendors/delete', (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.run(`DELETE FROM vendors WHERE email = ?;`, [email], (error) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Vendor deleted successfully' });
    }
  });
});

///////////////////////////PRODUCTS///////////////////////////////
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

// API for creating products
app.get('/api/products/create', (req, res) => {
  const { name, price, description, discount, expiry_date, quantity, image, vendor_id } = req.query;

  if (!name || !price || !description || !discount || !vendor_id || !quantity) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const params = [name, price, description, discount, expiry_date, quantity, vendor_id];
  let query = `INSERT INTO products (name, price, description, discount, expiry_date, quantity, vendor_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  if (image) {
    params.splice(6, 0, Buffer.from(image, 'base64'));
    query = `INSERT INTO products (name, price, description, discount, expiry_date, quantity, image, vendor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
  }

  db.run(query, params, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Product created successfully' });
    }
  });
});

const getProductById = (req, res, callback) => {
  const { id } = req.params;
  db.get(`SELECT * FROM products WHERE id = ?;`, [id], (error, row) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else if (!row) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      callback(row, res);
    }
  });
};

// API for getting a single product
app.get('/api/products/:id', (req, res) => getProductById(req, res, (row, res) => res.json(row)));

// API for updating products
app.get('/api/products/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description, discount, expiry_date, quantity, image } = req.query;

  if (!name || !price || !description || !discount || !quantity) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  let query = `UPDATE products SET name = ?, price = ?, description = ?, discount = ?, expiry_date = ?, quantity = ? WHERE id = ?;`;
  const params = [name, price, description, discount, expiry_date, quantity, id];

  if (image) {
    query = `UPDATE products SET name = ?, price = ?, description = ?, discount = ?, expiry_date = ?, quantity = ?, image = ? WHERE id = ?;`;
    params.splice(7, 0, Buffer.from(image, 'base64'));
  }

  getProductById(req, res, () =>
    db.run(query, params, (error) => {
      if (error) {
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json({ message: 'Product updated successfully' });
      }
    })
  );
});

// API for deleting products
app.get('/api/products/delete/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM products WHERE id = ?;`, [id], (error) => {
    if (error) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
