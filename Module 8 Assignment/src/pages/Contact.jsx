import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-black text-white pt-16 relative overflow-hidden">
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent pointer-events-none" />

      {/* Grid background overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/grid.svg')] bg-cover pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 py-12 z-10">
        {/* Page title */}
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center drop-shadow">
          Get in Touch
        </h2>
        {/* Subtitle */}
        <p className="text-lg text-white/80 mb-8 text-center">
          Feel free to reach out for collaborations or inquiries!
        </p>
        {/* Contact form container */}
        <div className="bg-black border border-yellow-600/30 rounded-lg shadow-lg p-8">
          {/* Name input field */}
          <div className="mb-6">
            <label
              className="block text-yellow-300 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full bg-black text-white border border-yellow-500/30 rounded px-4 py-2 focus:outline-none focus:border-yellow-400"
              id="name"
              type="text"
              placeholder="Your name"
            />
          </div>
          {/* Email input field */}
          <div className="mb-6">
            <label
              className="block text-yellow-300 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full bg-black text-white border border-yellow-500/30 rounded px-4 py-2 focus:outline-none focus:border-yellow-400"
              id="email"
              type="email"
              placeholder="Your email"
            />
          </div>
          {/* Message textarea */}
          <div className="mb-6">
            <label
              className="block text-yellow-300 text-sm font-medium mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full bg-black text-white border border-yellow-500/30 rounded px-4 py-2 focus:outline-none focus:border-yellow-400"
              id="message"
              rows="5"
              placeholder="Your message"
            ></textarea>
          </div>
          {/* Submit button */}
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded transition">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;