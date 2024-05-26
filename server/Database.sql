-- CREATE TABLE users (
--  id INT AUTO_INCREMENT PRIMARY KEY,
--  name VARCHAR(255) NOT NULL,
--  username VARCHAR(255) NOT NULL,
--  email VARCHAR(255) NOT NULL,
--  password VARCHAR(255) NOT NULL,
--  phone VARCHAR(15) NOT NULL,
--  address VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE foods (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     foodname VARCHAR(500) NOT NULL,
--     foodtype VARCHAR(500) NOT NULL,
--     foodvariant VARCHAR(500) NOT NULL
--     foodprice VARCHAR(500) NOT NULL,
--     fooddescription VARCHAR(500) NOT NULL,
--     foodimage VARCHAR(500) NOT NULL,
-- );


-- CREATE TABLE cart (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     userId INT NOT NULL,
--     foodId INT NOT NULL,
--     quantity INT NOT NULL,
--     FOREIGN KEY (userId) REFERENCES users(id),
--     FOREIGN KEY (foodId) REFERENCES foods(id)
-- );

-- CREATE TABLE TableBooked (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     members INT NOT NULL,
--     date DATE NOT NULL,
--     timing VARCHAR(50) NOT NULL
-- );
  