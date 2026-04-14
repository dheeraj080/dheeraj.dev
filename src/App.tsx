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
import Blogs from './pages/Blogs';
import Preloader from './components/Preloader';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

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
      <div className="min-h-screen bg-bg text-fg font-sans selection:bg-accent selection:text-white transition-colors duration-400">
        {!preloaderComplete && <Preloader onComplete={() => setPreloaderComplete(true)} />}
        <Navbar toggleTheme={toggleTheme} isDark={isDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<Project />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
