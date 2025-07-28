import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Subtle gold gradient overlay (diagonal) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/15 to-transparent pointer-events-none"></div>

      {/* Subtle pattern overlay with low opacity */}
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto px-6 z-10">
        {/* Developer avatar */}
        <img
          src="/assets/avatar.png"
          alt="Developer"
          className="w-64 h-56 mx-auto rounded-full border-4 border-yellow-600 mb-12 shadow-lg"
        />
        {/* Developer introduction */}
        <h1 className="text-5xl sm:text-5xl font-extrabold mb-5 drop-shadow-lg">
          I'm Jose — Web Developer
        </h1>
        <p className="text-lg sm:text-xl mb-6 opacity-90 drop-shadow-md">
          I build clean, responsive websites & web apps with modern
          technologies.
        </p>

        {/* Call-to-action buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link
            to="/projects"
            className="bg-yellow-600 text-black px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="border border-yellow-600 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-600 hover:text-black transition"
          >
            Contact Me
          </Link>
        </div>

        {/* Social media links */}
        <div className="flex justify-center space-x-5 text-2xl text-yellow-500/90">
          <a href="https://github.com/x1nnas" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-yellow-400 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/jose-msferreira/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="hover:text-yellow-400 transition" />
          </a>
          <a
            href="mailto:jmsfbusiness@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaEnvelope className="hover:text-yellow-400 transition" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;