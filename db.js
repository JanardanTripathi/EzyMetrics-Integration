// db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,       // Correctly access DB_HOST
    user: process.env.DB_USER,       // Correctly access DB_USER
    password: process.env.DB_PASSWORD,// Correctly access DB_PASSWORD
    database: process.env.DB_NAME     // Correctly access DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
