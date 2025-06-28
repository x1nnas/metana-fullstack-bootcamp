import express from "express";

const router = express.Router(); // Create a new router instance

// Mock user data for demonstration purposes
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Route to fetch all users
router.get("/", (req, res) => {
  res.json(users); // Send the list of users as a JSON response
});

// Route to fetch a single user by ID
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id)); // Find user by ID
  if (!user) return res.status(404).json({ message: "User not found" }); // Handle not found
  res.json(user); // Send the user as a JSON response
});

export default router; // Export the router for use in the main application
