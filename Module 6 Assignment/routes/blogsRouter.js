const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../db/blogQueries");
const router = express.Router();

// Define a GET route to fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Define a GET route to fetch a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
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
  const { title, content, author } = req.body;
  try {
    const newBlog = await createBlog(title, content, author);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to add blog post" });
  }
});

// Define a PUT route to update a blog post
router.put("/:id", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const updatedBlog = await updateBlog(req.params.id, title, content, author);
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
    const deletedBlog = await deleteBlog(req.params.id);
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
