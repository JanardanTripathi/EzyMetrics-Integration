const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection

// Get all campaigns
router.get('/', (req, res) => {
    connection.query('SELECT * FROM campaigns', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
