require("dotenv").config();

// Access environment variables
const port = process.env.PORT;

// Define configuration object
const config = {
  mongodbUri: process.env.MONGODB_URI,
};

module.exports = {
  port,
  config,
};
