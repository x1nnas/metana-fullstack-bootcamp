import axios from "axios";

// Create an Axios instance with the base URL for the API
const API = axios.create({
  baseURL: "http://localhost:3000/api", // Backend API base URL
});

// Fetch all blogs from the backend
export const getAllBlogs = async () => {
  const res = await API.get("/blogs"); // GET request to fetch all blogs
  return res.data; // Return the response data
};

// Fetch a single blog by its ID
export const getBlogById = async (id) => {
  const res = await API.get(`/blogs/${id}`); // GET request to fetch a blog by ID
  return res.data; // Return the response data
};

// Create a new blog
export const createBlog = async (blogData) => {
  const res = await API.post("/blogs", blogData); // POST request to create a new blog
  return res.data; // Return the response data
};
