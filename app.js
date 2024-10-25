const express = require('express');
const connection = require('./db'); // Import the database connection
const { createObjectCsvWriter } = require('csv-writer');
const nodemailer = require('nodemailer');
const campaignsRouter = require('./routes/campaigns'); // Import campaigns route

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to EzyMetrics API! \n Created By Janardan Tripathi');
});

// Route to get all leads
app.get('/api/leads', (req, res) => {
    const query = 'SELECT * FROM leads';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Integrate campaigns route
app.use('/api/campaigns', campaignsRouter);

// Endpoint to generate CSV report of leads
app.get('/api/reports/leads', (req, res) => {
    const query = 'SELECT * FROM leads';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        const csvWriter = createObjectCsvWriter({
            path: 'leads_report.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'phone', title: 'Phone' },
                { id: 'created_at', title: 'Created At' },
            ],
        });

        csvWriter.writeRecords(results)
            .then(() => {
                res.download('leads_report.csv', 'leads_report.csv', (err) => {
                    if (err) {
                        res.status(500).send({ error: 'Could not download the file.' });
                    }
                });
            })
            .catch(error => res.status(500).json({ error: 'Error writing CSV file' }));
    });
});

// Endpoint for sending email alerts
app.post('/api/alerts/send', (req, res) => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email' });
        }
        res.json({ message: 'Email sent: ' + info.response });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
