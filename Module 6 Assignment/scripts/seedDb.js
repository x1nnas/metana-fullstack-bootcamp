const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const users = [
  { username: "Alice", email: "alice@example.com", password: "password123" },
  { username: "Bob", email: "bob@example.com", password: "password123" },
];

const blogs = [
  { title: "First Post", content: "This is the first post.", author: 1 },
  { title: "Second Post", content: "This is the second post.", author: 1 },
  { title: "Third Post", content: "This is the third post.", author: 2 },
];

async function seedDb() {
  try {
    await client.connect();
    console.log("Connected to the PostgreSQL database");

    // Clear existing data
    await client.query("DELETE FROM blogs");
    await client.query("DELETE FROM users");

    // Insert data into the users table
    for (const user of users) {
      await client.query(
        "INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW())",
        [user.username, user.email, user.password]
      );
    }
    console.log("Inserted data into the users table");

    // Insert data into the blogs table
    for (const blog of blogs) {
      await client.query(
        "INSERT INTO blogs (title, content, author, created_at) VALUES ($1, $2, $3, NOW())",
        [blog.title, blog.content, blog.author]
      );
    }
    console.log("Inserted data into the blogs table");
  } catch (err) {
    console.error("Error seeding the database", err.stack);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

seedDb();
