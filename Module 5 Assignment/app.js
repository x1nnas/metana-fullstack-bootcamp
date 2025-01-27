const express = require("express");
const cors = require("cors");
const config = require("./config");
const blogsRouter = require("./routes/blogsRouter");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
const mongooseConnection = require("./db/dbconn");

const app = express();
const port = config.port || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Use morgan for logging HTTP requests
app.use(morgan("dev"));

// Use the blogs router for routes starting with /blogs
app.use("/blogs", blogsRouter);

// Use the user router for routes starting with /users
app.use("/users", userRouter);

// Ensure the mongoose connection is established before starting the server
mongooseConnection.on("connected", () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

mongooseConnection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
