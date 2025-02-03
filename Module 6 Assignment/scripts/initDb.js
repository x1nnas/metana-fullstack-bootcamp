const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Read the SQL file
const setupDbSql = fs.readFileSync(path.join(__dirname, 'setup-db.sql'), 'utf-8');

// Create a new PostgreSQL client using the connection string from environment variables
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

// Function to execute the SQL script
async function initDb() {
    try {
        // Connect to the PostgreSQL database
        await client.connect();
        console.log('Connected to the PostgreSQL database');

        // Execute the SQL script
        await client.query(setupDbSql);
        console.log('Database setup completed successfully');
    } catch (err) {
        console.error('Error setting up the database', err.stack);
    } finally {
        // Close the database connection
        await client.end();
        console.log('Database connection closed');
    }
}

// Run the initDb function
initDb();