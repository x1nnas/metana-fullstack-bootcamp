const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// Define a GET route to fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Define a GET route to fetch a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Define a POST route to add a new blog post
router.post("/", async (req, res) => {
  try {
    const newBlogPost = new Blog(req.body);
    const savedBlog = await newBlogPost.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to add blog post" });
  }
});

// Define a PUT route to update a blog post
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog post" });
  }
});

// Define a DELETE route to delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (deletedBlog) {
      res.json({ message: "Blog post deleted successfully" });
    } else {
      res.status(404).json({ error: "Blog post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

module.exports = router;
