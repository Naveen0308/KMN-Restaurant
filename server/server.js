const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { executeQuery } = require('./db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

app.post('/api/signup', (req, res) => {
  try {
    const { name, username, email, password, phone, address } = req.body;
  
    // Log received data
    //console.log('Received data:', req.body);

    const sql = 'INSERT INTO users (name, username, email, password, phone, address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, username, email, password, phone, address];

    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ success: true, message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  
  
      

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);

    // Check if the provided email is for the admin
    if (email === "admin@gmail.com" && password === "Positivity@123") {
      // Return success response for admin login
      return res.status(200).json({ success: true, email: "admin@gmail.com", userId: 0, message: 'Admin login successful' });
    }    
  
    // Check if user exists
    if (user.length === 0) {
      return res.status(401).json({ error: 'Enter Valid Email and Password' });  
    }     
      
    // Check if password matches for regular user
    const passwordMatch = password === user[0].password;
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }    
    
    // Return success response for regular user login
    res.status(200).json({ success: true, email: user[0].email, userId: user[0].id, message: 'User login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
