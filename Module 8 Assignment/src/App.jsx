import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import BlogPosts from "./pages/BlogPosts";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPosts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
