// Import required modules
const express = require('express');
const fs = require('fs');

// Create Express app
const app = express();

// Define a middleware function to log incoming requests
app.use((req, res, next) => {
    const { ip, headers } = req;
    const userAgent = headers['user-agent'];
    const logMessage = `IP Address: ${ip}, User-Agent: ${userAgent}\n`;

    // Log request information to a file
    fs.appendFile('request_logs.txt', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // Call the next middleware in the chain
    next();
});

// Define route for the homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Demo Website</h1>');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
