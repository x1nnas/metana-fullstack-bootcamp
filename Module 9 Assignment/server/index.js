import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import blogsRouter from "./routes/blogsRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port or default to 3000

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/blogs", blogsRouter); // Route for blog-related operations
app.use("/api/users", userRouter); // Route for user-related operations
app.use("/api/auth", authRouter); // Route for authentication-related operations

// Root route to check server status
app.get("/", (req, res) => {
  res.send("Portfolio Backend Server is running"); // Simple response for server status
});

const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist"))); // Serve files from the "dist" folder

  // Handle all other routes by serving the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
