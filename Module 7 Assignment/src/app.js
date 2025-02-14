const express = require('express');
const app = express();
const path = require('path');
const nodemon = require('nodemon');

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

// Handle 404
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});