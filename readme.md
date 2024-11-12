
# EzyMetrics API

## Description
EzyMetrics API is designed to manage leads and campaigns, generate reports, and send alerts via email. It provides endpoints for retrieving, reporting, and alerting based on lead data.

## Installation
1. Clone the repository:
   ```bash
   git clone -:(https://github.com/JanardanTripathi/EzyMetrics-Integration)
   ```
2. Navigate to the project directory:
   ```bash
   cd ezy-metrics-backend
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env` file:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ezy_metrics
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

## API Endpoints

### 1. Get All Leads
- **URL:** `/api/leads`
- **Method:** `GET`
- **Response:**
  - **200 OK**: Returns a list of all leads in JSON format.
  - **500 Internal Server Error**: Database error.

### 2. Generate CSV Report of Leads
- **URL:** `/api/reports/leads`
- **Method:** `GET`
- **Response:**
  - **200 OK**: Returns a CSV file containing all leads.
  - **500 Internal Server Error**: Error writing CSV file.

### 3. Send Email Alerts
- **URL:** `/api/alerts/send`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
      "to": "recipient@example.com",
      "subject": "Alert Subject",
      "text": "Alert message content."
  }
  ```
- **Response:**
  - **200 OK**: Confirmation message of email sent.
  - **500 Internal Server Error**: Error sending email.

## Example Requests

### 1. Get All Leads
```bash
curl -X GET http://localhost:3000/api/leads
```

### 2. Generate CSV Report of Leads
```bash
curl -X GET http://localhost:3000/api/reports/leads --output leads_report.csv
```

### 3. Send Email Alerts
```bash
curl -X POST http://localhost:3000/api/alerts/send -H "Content-Type: application/json" -d '{
    "to": "recipient@example.com",
    "subject": "Test Alert",
    "text": "This is a test alert."
}'
```

## Testing the API
You can test the API using [Postman](https://www.postman.com/) or [curl](https://curl.se/). Make sure your server is running before making requests.

## Conclusion
This API provides essential functionalities for managing leads and campaigns, along with reporting and alerting features. Ensure to test all endpoints and customize the environment variables as per your setup.
