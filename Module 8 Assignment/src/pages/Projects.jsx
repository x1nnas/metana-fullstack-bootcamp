import React from "react";

const Projects = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pb-20 pt-16 bg-black text-white overflow-hidden">
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/15 to-transparent pointer-events-none"></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 z-10">
        {/* Page title */}
        <h2 className="text-3xl font-bold text-yellow-400 mb-10 drop-shadow-lg text-center">
          My Projects
        </h2>

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Project 1", "Project 2", "Project 3"].map((title, i) => (
            <div
              key={i}
              className="bg-black border border-yellow-600/30 rounded-lg shadow-lg p-12 min-h-[300px] hover:border-yellow-500 transition"
            >
              {/* Project title */}
              <h3 className="text-2xl font-semibold text-yellow-300 mb-3 drop-shadow-sm">
                {title}
              </h3>
              {/* Project description */}
              <p className="text-white/80 text-lg mb-4">
                A modern solution built with the latest technologies to solve
                real-world challenges.
              </p>
              {/* Link to project details */}
              <a
                href="#"
                className="inline-block text-yellow-400 hover:underline text-lg"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;