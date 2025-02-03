// db/blogQueries.js
const pool = require("./dbconn"); // Import PostgreSQL pool

// Function to get all blogs
const getAllBlogs = async () => {
  const result = await pool.query("SELECT * FROM blogs");
  return result.rows;
};

// Function to get a blog by ID
const getBlogById = async (id) => {
  const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return result.rows[0];
};

// Function to create a new blog
const createBlog = async (title, content, author) => {
  const result = await pool.query(
    "INSERT INTO blogs (title, content, author, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [title, content, author]
  );
  return result.rows[0];
};

// Function to update a blog by ID
const updateBlog = async (id, title, content, author) => {
  const result = await pool.query(
    "UPDATE blogs SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *",
    [title, content, author, id]
  );
  return result.rows[0];
};

// Function to delete a blog by ID
const deleteBlog = async (id) => {
  const result = await pool.query(
    "DELETE FROM blogs WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
