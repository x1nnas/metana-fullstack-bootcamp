const express = require("express");
const cors = require("cors");
const config = require("./config");
const blogsRouter = require("./routes/blogsRouter");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
const pool = require('./db/dbconn.js'); // Import postgres pool

const app = express();
const port = config.port || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use morgan for logging HTTP requests
app.use(morgan("dev"));

// Define a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

// Use the blogs router for routes starting with /blogs
app.use("/blogs", blogsRouter);

// Use the user router for routes starting with /users
app.use("/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server and ensure database connection
const startServer = async () => {
    try {
      // Ensure the database connection is established
      await pool.connect();
  
      console.log('Connected to PostgreSQL');
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    } catch (error) {
      console.error('Failed to connect to PostgreSQL:', error);
      process.exit(1); // Exit the process with a failure code
    }
  };
  
  startServer();

module.exports = app;