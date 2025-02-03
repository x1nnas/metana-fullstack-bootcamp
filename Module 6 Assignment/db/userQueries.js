// db/userQueries.js
const pool = require("./dbconn"); // Import PostgreSQL pool

// Function to get all users
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// Function to get a user by ID
const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Function to create a new user
const createUser = async (username, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [username, email, password]
  );
  return result.rows[0];
};

// Function to update a user by ID
const updateUser = async (id, username, email, password) => {
  const result = await pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
    [username, email, password, id]
  );
  return result.rows[0];
};

// Function to delete a user by ID
const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
