// Import the PostgreSQL client library
import pg from "pg";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Create a connection pool using environment variables for configuration
const pool = new pg.Pool({
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASS, // Database password
  database: process.env.DB_NAME, // Database name
  host: process.env.DB_HOST, // Database host (e.g., localhost)
  port: process.env.DB_PORT, // Database port (default is 5432 for PostgreSQL)
});

// Export the connection pool for use in other modules
export default pool;