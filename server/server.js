const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { executeQuery } = require('./db');
const cors = require('cors');
const multer = require('multer');  // Import multer correctly
const path = require('path');  // Import path

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve static files

// MySQL database connection
const db = mysql.createConnection({
  host: 'betujs3vzxpfziuw3obt-mysql.services.clever-cloud.com',
  user: 'ubijhxjyhsd7f4dd',
  password: 'xNYh8rJMO0ZluUey6U8h',
  database: 'betujs3vzxpfziuw3obt',
  connectTimeout: 30000 // 30 seconds
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }  
});

const upload = multer({ storage: storage });

// API endpoint to add a new food item
app.post('/api/add-food', upload.single('foodimage'), (req, res) => {
  // console.log(req.file);
  try {
    const { foodname, foodtype, foodvariant, foodprice, fooddescription } = req.body;
    const foodimage = req.file ? req.file.filename : null;
  
    if (!foodname || !foodtype || !foodvariant || !foodprice || !fooddescription || !foodimage) {
      return res.status(400).json({ error: 'All fields are required' });
    }     

    const sql = 'INSERT INTO foods (foodname, foodtype, foodvariant, foodprice, fooddescription, foodimage) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [foodname, foodtype, foodvariant, foodprice, fooddescription, foodimage];

    db.query(sql, values, (err, result) => { 
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ success: true, message: 'Food item added successfully' });
    });
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to fetch all food items
app.get('/api/food', (req, res) => {
  const sql = 'SELECT * FROM foods';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching food items:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});

// API endpoint to sign up a user
app.post('/api/signup', (req, res) => {
  try {
    const { name, username, email, password, phone, address } = req.body;

    const sql = 'INSERT INTO users (name, username, email, password, phone, address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, username, email, password, phone, address];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ success: true, message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to log in a user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);

    if (email === "admin@gmail.com" && password === "Positivity@123") {
      return res.status(200).json({ success: true, email: "admin@gmail.com", userId: 0, message: 'Admin login successful' });
    }

    if (user.length === 0) {
      return res.status(401).json({ error: 'Enter Valid Email and Password' });
    }

    const passwordMatch = password === user[0].password;
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }
  
    res.status(200).json({ success: true, email: user[0].email, userId: user[0].id, message: 'User login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});    

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
