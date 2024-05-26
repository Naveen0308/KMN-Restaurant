const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer'); // Import multer correctly
const path = require('path'); // Import path
  
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
      
// Helper function to execute SQL queries
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {  
    db.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
  
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


app.post('/api/delete-food', (req, res) => {
  try {
    const { id } = req.body;
    const sql = 'DELETE FROM foods WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ success: true, message: 'Food item deleted successfully' });
    });
  } catch (error) {  
    console.error('Error deleting food item:', error);
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

// Define route for fetching food items by variant  
app.get('/api/food/by-variant/:variant', (req, res) => {
  const { variant } = req.params;

  // Query database to fetch food items by variant
  const sql = 'SELECT * FROM foods WHERE foodvariant = ?';
  db.query(sql, [variant], (err, rows) => {
    if (err) {
      console.error('Error fetching food items by variant:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Return fetched food items
    res.json(rows);
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

    // console.log(`Received login request for email: ${email}`);

    const user = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      // console.log(`User not found for email: ${email}`);
      return res.status(401).json({ error: 'Enter Valid Email and Password' });
    }  
    
    // console.log(`Stored password: ${user[0].password}`);
    // console.log(`Entered password: ${password}`);
  
    const passwordMatch = password === user[0].password;
    if (!passwordMatch) {
      // console.log(`Incorrect password for email: ${email}`);  
      return res.status(401).json({ error: 'Incorrect email or password' });
    }   

    // console.log(`User login successful for email: ${email}`);
    res.status(200).json({ success: true, email: user[0].email, userId: user[0].id, message: 'User login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});      

// API endpoint to fetch user details
// Define a route to handle GET requests for fetching user details based on user ID
app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId; // Extract user ID from the URL parameter

  // SQL query to select user details from the users table based on user ID
  const sql = 'SELECT * FROM users WHERE id = ?';

  // Execute the SQL query with the user ID parameter
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if user details are found
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Send the fetched user details as a JSON response
    res.status(200).json(result[0]); // Assuming you only want to send the first user found
  });
});  
    


  

// API endpoint to add a food item to the user's cart
app.post('/api/add-to-cart', (req, res) => {
  const items = req.body; // Assuming the request body contains an array of items [{ userId, foodId, quantity }]

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid input format' });
  }

  const values = items.map(item => [item.userId, item.foodId, item.quantity]);
  const sql = 'INSERT INTO cart (userId, foodId, quantity) VALUES ?';

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error adding items to cart:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ success: true, message: 'Items added to cart successfully' });
  });
});    
// API endpoint to fetch cart items for a userc
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT   cart.id, cart.quantity, 
      foods.foodimage, foods.foodname, foods.foodprice 
    FROM cart 
    JOIN foods ON cart.foodId = foods.id 
    WHERE cart.userId = ? AND cart.order_id IS NULL`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(result);
  });
});  



// API endpoint to update the quantity of a cart item
app.put('/api/update-cart/:cartId', (req, res) => {
  try {
    const { quantity } = req.body;
    const cartId = req.params.cartId;

    const sql = 'UPDATE cart SET quantity = ? WHERE id = ?';

    db.query(sql, [quantity, cartId], (err, result) => {
      if (err) {
        console.error('Error updating cart item:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ success: true, message: 'Cart item updated successfully' });
    });  
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  
      

app.delete('/api/remove-from-cart/:cartId', (req, res) => {
  try {
    const cartId = req.params.cartId;
    
    const sql = 'DELETE FROM cart WHERE id = ?';
  
    db.query(sql, [cartId], (err, result) => {
      if (err) {  
        console.error('Error removing item from cart:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }  
      res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    });  
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});   

app.post('/api/bookings', (req, res) => {
  const { userId, name, members, date, timing } = req.body;
  const sql = 'INSERT INTO TableBooked (userId, name, members, date, timing) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, name, members, date, timing], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Failed to book table');
    } else {
      res.status(200).send('Table booked successfully');
    }  
  });  
});  

app.post('/api/add-to-table', (req, res) => {
  const { name, members, date, timing,userId } = req.body;

  const sql = 'INSERT INTO TableBooked (name, members, date, timing,userId) VALUES (?, ?, ?, ?,?)';
  const values = [name, members, date, timing,userId];

  db.query(sql, values, (err, result) => {
    if (err) { 
      console.error('Error booking table:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ success: true, message: 'Table booked successfully' });
  });
});     

app.post('/api/order', (req, res) => {
  const { userId } = req.body;
  const sql = 'INSERT INTO orders (userId) VALUES (?)';  

  db.query(sql, [userId], (err, result) => {
    if (err) {  
      console.error('Error inserting data:', err);
      res.status(500).send('Failed to book table');
    } else {
      const insertedId = result.insertId; // Get the ID of the newly inserted row
      res.status(200).json({ message: 'Table booked successfully', orderId: insertedId });
    }
  });
});


app.post('/api/update-order-table', (req, res) => {
  const orderId = req.body.orderId;
  const tableId = req.body.tableId;
  const sql = 'UPDATE TableBooked SET order_id = ? WHERE id = ?';

  db.query(sql, [orderId,tableId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Failed to update table');
    } else {
      res.status(200).json({ message: 'Table updated successfully' });
    }
  });
});

app.post('/api/update-order-cart', (req, res) => {
  const orderId = req.body.orderId;
  const cartId = req.body.cartId;
  const tableId= req.body.tableId;
  const sql = 'UPDATE cart SET order_id = ?,tab_id=? WHERE id = ?';

  db.query(sql, [orderId,tableId,cartId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Failed to update cart');
    } else {
      res.status(200).json({ message: 'Cart updated successfully' });
    } 
  }); 
});     
  
  
  
app.get('/api/get-user-details/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }  
    const user = result[0];
    res.status(200).json(user);
  });    
}); 
 
  
app.get('/api/get-all-users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});  

app.get('/api/get-table-booking/:userId', (req, res) => {
  const userId = req.params.userId;
  let sql = `SELECT * FROM TableBooked WHERE userId = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'No booking found' });
      return;
    }
      
    // Format the date to DD-MM-YYYY
    const booking = result[0];
    const date = new Date(booking.date);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    
    booking.date = formattedDate;

    res.json(booking);
  });
});  

app.get('/api/food/filter', (req, res) => {
  const { variant } = req.query;

  // Construct the SQL query with optional filtering
  let sql = 'SELECT * FROM foods';
  const values = [];

  if (variant) {
    sql += ' WHERE foodvariant = ?';
    values.push(variant);
  }    
  
  // Execute the query
  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error fetching filtered food items:", error);
      return res.status(500).json({ error: "Internal server error" });
    }    

    res.json(results);
  });
});
  

    

       
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 