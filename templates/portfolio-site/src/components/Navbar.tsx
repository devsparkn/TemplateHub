"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed px-8 w-full z-50 top-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-3 z-10">
          <span className="self-center text-gradient gradient-primary text-2xl font-bold whitespace-nowrap">
            Portfolio
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
          </button>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-700 hover:bg-gray-100/80 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:focus:ring-gray-700"
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 md:relative transition-all duration-300 ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 md:max-h-96 opacity-0 md:opacity-100 invisible md:visible"
          }`}
          id="navbar-menu"
        >
          <ul
            className={`flex flex-col py-4 px-6 my-4 rounded-xl space-y-2 md:space-y-0 md:flex-row md:space-x-8 md:p-0 md:my-0 md:border-0 font-medium text-sm glass ${
              scrolled ? "md:bg-transparent" : "md:bg-transparent"
            }`}
          >
            <NavItem href="/" label="Home" active={pathname === "/"} />
            <NavItem href="/about" label="About" active={pathname === "/about"} />
            <NavItem href="/projects" label="Projects" active={pathname === "/projects"} />
            <NavItem href="/contact" label="Contact" active={pathname === "/contact"} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
}

function NavItem({ href, label, active }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`relative block py-2 px-3 rounded-lg md:p-0 transition-colors ${
          active
            ? "text-primary-600 dark:text-primary-400 font-semibold"
            : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
        }`}
      >
        {label}
        {active && (
          <span className="absolute -bottom-1 left-0 w-full md:w-2/3 h-0.5 bg-primary-500 dark:bg-primary-400 rounded-full" />
        )}
      </Link>
    </li>
  );
}
