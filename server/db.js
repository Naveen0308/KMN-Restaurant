
const mysql = require('mysql');

// MySQL database connection
const db = mysql.createConnection({
  host: 'betujs3vzxpfziuw3obt-mysql.services.clever-cloud.com',
  user: 'ubijhxjyhsd7f4dd',
  password: 'xNYh8rJMO0ZluUey6U8h',
  database: 'betujs3vzxpfziuw3obt',
  connectTimeout: 30000  // 30 seconds  

});    
  
// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Function to execute a query
const executeQuery = (sql, values = []) => {
  //console.log('Executing query:', sql, 'with values:', values); // Add this line for more detailed logging
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });    
  });
};


module.exports = { executeQuery };
