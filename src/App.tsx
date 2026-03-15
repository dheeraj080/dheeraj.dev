import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";
import BlogSection from "./components/BlogSection";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import ProjectDetail from "./pages/ProjectDetail";

// 1. Created a Layout wrapper for consistent styling across all pages
const Layout = ({ children }) => (
  <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
    <Navbar />
    <div className="max-w-3xl mx-auto px-6">{children}</div>
  </div>
);

function Portfolio() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Updating every second ensures the minute flip is always accurate
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <header className="py-16">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
              Dheeraj Kamble
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-2">
              Software Engineer
            </p>
          </div>
        </div>

        <nav className="flex gap-5 mt-6" aria-label="Social links">
          <SocialLink
            href="https://github.com/dheeraj080"
            icon={<Github size={20} />}
            label="GitHub"
          />
          <SocialLink
            href="https://linkedin.com/in/yourusername"
            icon={<Linkedin size={20} />}
            label="LinkedIn"
          />
          <SocialLink
            href="mailto:dheeraj@example.com"
            icon={<Mail size={20} />}
            label="Email"
          />
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <FileDown size={20} />
            <span className="text-sm font-medium">Resume</span>
          </a>
        </nav>
      </header>

      <main className="pb-16 space-y-20">
        <section aria-labelledby="about-heading">
          <h2
            id="about-heading"
            className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-5"
          >
            About
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              Building scalable web applications with a focus on performance and
              user experience. Passionate about clean code, functional
              programming, and open source.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-2">
              <span>📍 India</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span>🕒 {formattedTime} Local Time</span>
            </p>
          </div>
        </section>

        <Projects />
        <BlogSection />
        <ContactForm />
      </main>
    </>
  );
}

// Helper component for cleaner social icon rendering
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
  >
    {icon}
  </a>
);

// 2. Utility to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
