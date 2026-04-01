/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Project from './pages/Project';
import BlogArticle from './pages/BlogArticle';
import Work from './pages/Work';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className="min-h-screen bg-neutral-300 text-neutral-700 font-sans selection:bg-neutral-600 selection:text-neutral-100 transition-colors duration-300">
        <Navbar toggleTheme={toggleTheme} isDark={isDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
