import React, { useState } from "react";
import { Link } from "react-router-dom";

// Navigation component for rendering the site's navigation menu
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu visibility

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility

  const menuItems = ["Home", "About", "Projects", "Blogs", "Contact"]; // Navigation menu items

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:flex space-x-8 items-center">
        {menuItems.map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`} // Generate route paths dynamically
            className="relative text-white hover:text-yellow-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={toggleMobileMenu} // Toggle mobile menu on button click
          className="inline-flex items-center justify-center p-2 text-white hover:text-yellow-600"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:hidden bg-white/10 backdrop-blur px-6 py-4`}
      >
        {menuItems.map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`} // Generate route paths dynamically
            onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on link click
            className="block text-white py-2 border-b border-white/20 hover:text-blue-400 transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navigation;
