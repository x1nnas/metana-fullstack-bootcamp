import express from "express";
import { getAllBlogs, getBlogById, createBlog } from "../db/blogQueries.js";

const router = express.Router(); // Create a new router instance

// Route to fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await getAllBlogs(); // Fetch all blogs from the database
    res.json(blogs); // Send the blogs as a JSON response
  } catch {
    res.status(500).json({ error: "Database error" }); // Handle database errors
  }
});

// Route to fetch a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id); // Fetch the blog by ID
    if (!blog) return res.status(404).json({ error: "Blog not found" }); // Handle not found
    res.json(blog); // Send the blog as a JSON response
  } catch {
    res.status(500).json({ error: "Database error" }); // Handle database errors
  }
});

// Route to create a new blog
router.post("/", async (req, res) => {
  try {
    const blog = await createBlog(req.body.title, req.body.content); // Create a new blog
    res.status(201).json(blog); // Send the created blog as a JSON response
  } catch {
    res.status(500).json({ error: "Failed to create blog" }); // Handle creation errors
  }
});

export default router; // Export the router for use in the main application
