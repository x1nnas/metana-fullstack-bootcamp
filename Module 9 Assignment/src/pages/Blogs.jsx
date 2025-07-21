import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // State to store the list of blogs

  useEffect(() => {
    // Fetch all blogs from the API
    const fetchData = async () => {
      const data = await getAllBlogs(); // Fetch blogs from the backend
      setBlogs(data); // Update state with fetched blogs
    };

    fetchData(); // Trigger the fetch on component mount
  }, []); // Empty dependency array ensures fetch runs only once

  return (
    <section className="relative min-h-screen py-20 bg-black text-white overflow-hidden">
      {/* Background gradient and grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/15 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* Page title */}
        <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">
          My Blogs
        </h2>

        {/* Blog list */}
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-neutral-900 border border-yellow-500/20 rounded-xl shadow-md p-6"
            >
              {/* Blog title */}
              <h3 className="text-xl font-semibold text-yellow-400 mb-1">
                {blog.title}
              </h3>
              {/* Blog publication date */}
              <p className="text-sm text-yellow-300 mb-2">
                Published on {new Date(blog.created_at).toLocaleDateString()}
              </p>
              {/* Blog content preview */}
              <p className="text-white/80 mb-3">{blog.content}</p>
              {/* Link to full blog post */}
              <a
                href={`/blogs/${blog.id}`}
                className="inline-block text-yellow-500 hover:underline font-medium"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;