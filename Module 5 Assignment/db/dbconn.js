require('dotenv').config();
const mongoose = require('mongoose');

// Load environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Export the mongoose connection
module.exports = mongoose.connection;