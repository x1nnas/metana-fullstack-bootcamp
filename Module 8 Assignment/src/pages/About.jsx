const About = () => {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/codingVid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/60 to-black/30 z-0"></div>

      {/* Content container with glass effect */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 text-white bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 drop-shadow-md">
          About Me
        </h2>
        <p className="text-lg mb-4 drop-shadow-sm leading-relaxed">
          I'm a dedicated developer with a passion for building user-friendly
          and innovative web applications. With experience in various
          technologies, I strive to create solutions that make a difference.
        </p>
        <p className="text-lg mb-4 drop-shadow-sm leading-relaxed">
          My journey started with a curiosity for coding, and over the years,
          I've honed my skills in web development, focusing on creating seamless
          user experiences.
        </p>
        <p className="text-lg drop-shadow-sm leading-relaxed">
          When I'm not coding, you can find me exploring new tech trends or
          working on personal projects.
        </p>
      </div>
    </section>
  );
};

export default About;
