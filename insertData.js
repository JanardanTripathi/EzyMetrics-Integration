// insertData.js
const mysql = require('mysql2');
const faker = require('faker');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    // Insert 200 leads
    for (let i = 0; i < 200; i++) {
        const name = faker.name.findName();
        const email = faker.internet.email();
        const phone = faker.phone.phoneNumber();
        
        const leadQuery = 'INSERT INTO leads (name, email, phone) VALUES (?, ?, ?)';
        connection.query(leadQuery, [name, email, phone], (err) => {
            if (err) {
                console.error('Error inserting lead:', err);
            }
        });
    }

    // Insert 200 campaigns
    for (let i = 0; i < 200; i++) {
        const title = faker.company.catchPhrase();
        const startDate = faker.date.past();
        const endDate = faker.date.future();
        const budget = faker.commerce.price();

        const campaignQuery = 'INSERT INTO campaigns (title, start_date, end_date, budget) VALUES (?, ?, ?, ?)';
        connection.query(campaignQuery, [title, startDate, endDate, budget], (err) => {
            if (err) {
                console.error('Error inserting campaign:', err);
            }
        });
    }

    console.log('Data insertion completed.');
    connection.end();
});
