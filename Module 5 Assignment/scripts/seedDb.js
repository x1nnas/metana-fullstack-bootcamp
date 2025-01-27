require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path if necessary
const Blog = require('../models/Blog'); // Adjust the path if necessary

// MongoDB connection URI from .env file
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected');
        seedDatabase();
    })
    .catch((err) => console.log('MongoDB connection error:', err));

// Seed the database with initial data
async function seedDatabase() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Blog.deleteMany({});

        // Create sample users
        const users = await User.insertMany([
            { username: 'user1', email: 'user1@example.com', password: 'password1' },
            { username: 'user2', email: 'user2@example.com', password: 'password2' },
            { username: 'user3', email: 'user3@example.com', password: 'password3' }
        ]);

        // Create sample blogs
        await Blog.insertMany([
            { title: 'First Blog Post', content: 'Content of the first blog post', author: users[0]._id },
            { title: 'Second Blog Post', content: 'Content of the second blog post', author: users[1]._id },
            { title: 'Third Blog Post', content: 'Content of the third blog post', author: users[2]._id }
        ]);

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}