import React from "react";

const AdminDashboard = () => {
  // Dummy data for user management
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  ];

  return (
    <section className="min-h-screen py-24 px-6 bg-black text-white">
      {/* Dashboard title */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Users Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
          User Management
        </h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border border-yellow-500/30 rounded-md bg-neutral-900"
            >
              {/* Display user details */}
              <p>
                <span className="font-bold">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-bold">Role:</span> {user.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Creation (dummy form) */}
      <div>
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
          Create New Blog (Dummy)
        </h2>
        <form className="space-y-4">
          {/* Input for blog title */}
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full px-4 py-2 bg-neutral-800 border border-yellow-500/20 rounded text-white"
          />
          {/* Textarea for blog content */}
          <textarea
            placeholder="Blog Content"
            rows="5"
            className="w-full px-4 py-2 bg-neutral-800 border border-yellow-500/20 rounded text-white"
          ></textarea>
          {/* Submit button (disabled functionality) */}
          <button
            type="button"
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded"
          >
            Submit (disabled)
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminDashboard;
