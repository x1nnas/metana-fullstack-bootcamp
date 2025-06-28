// Import the database connection module
import db from "./dbconn.js";

// Fetch all blogs, ordered by creation date (newest first)
export const getAllBlogs = async () => {
  const result = await db.query("SELECT * FROM blogs ORDER BY created_at DESC");
  return result.rows; // Return all rows from the query result
};

// Fetch a single blog by its ID
export const getBlogById = async (id) => {
  const result = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
  return result.rows[0]; // Return the first row (blog with the given ID)
};

// Create a new blog and return the created blog object
export const createBlog = async (title, content) => {
  const result = await db.query(
    "INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  return result.rows[0]; // Return the newly created blog object
};
