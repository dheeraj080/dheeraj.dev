/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { NavbarProps } from "../types";

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const location = useLocation();
  
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Work", path: "/" },
    { label: "About", path: "/identity" }
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3" aria-label="Main Navigation">
      <div className="bg-nav-bg backdrop-blur-xl border border-border-subtle p-1.5 rounded-full flex gap-1 text-[13px] font-semibold shadow-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`${
                isActive 
                  ? "bg-text-primary text-surface shadow-lg" 
                  : "text-text-secondary hover:text-text-primary"
              } px-5 py-2 rounded-full transition-all duration-300`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <button 
        onClick={toggleTheme}
        className="w-11 h-11 rounded-full bg-nav-bg backdrop-blur-xl border border-border-subtle flex items-center justify-center text-text-primary shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        title={theme === 'dark' ? "Lumos" : "Nox"}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <div className="relative w-5 h-5">
          <Sun className={`absolute inset-0 w-5 h-5 transition-transform duration-500 ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
          <Moon className={`absolute inset-0 w-5 h-5 transition-transform duration-500 ${theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`} />
        </div>
      </button>
    </nav>
  );
};
