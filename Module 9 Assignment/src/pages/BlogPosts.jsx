import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../api/blogs";

const BlogPosts = () => {
  const { id } = useParams(); // Extract blog ID from URL parameters
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch blog data by ID
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id); // Fetch blog from API
        setBlog(data); // Set blog data
      } catch (err) {
        setError("Blog not found."); // Handle errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchBlog();
  }, [id]); // Dependency array ensures fetch runs when ID changes

  // Show loading state
  if (loading) {
    return (
      <section className="relative min-h-screen py-20 bg-black text-white px-6">
        <p className="text-center mt-20">Loading...</p>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="relative min-h-screen py-20 bg-black text-white px-6">
        <p className="text-center mt-20">{error}</p>
        <div className="text-center mt-6">
          <Link to="/blogs" className="text-yellow-500 hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  // Show blog content
  return (
    <section className="relative min-h-screen py-20 bg-black text-white overflow-hidden px-6">
      {/* Background gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/15 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto z-10 px-6">
        {/* Blog title */}
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 mt-10">
          {blog.title}
        </h1>
        {/* Blog publication date */}
        <p className="text-sm text-yellow-300 mb-6">
          Published on {new Date(blog.created_at).toLocaleDateString()}
        </p>
        {/* Blog content */}
        <p className="text-white/90 whitespace-pre-line leading-relaxed">
          {blog.content}
        </p>

        {/* Back to Blogs link */}
        <div className="mt-8">
          <Link to="/blogs" className="text-yellow-500 hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
