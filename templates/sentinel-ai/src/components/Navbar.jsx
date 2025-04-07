'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Sample login state
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // For demonstration, you might want to use a proper dark mode implementation
    document.documentElement.classList.toggle('dark');
  };

  // Sample user data
  const sampleUser = {
    name: "John Doe"
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500">
              Sentinel AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" text="Home" />
            <NavLink href="/dashboard" text="Dashboard" />
            <NavLink href="/about" text="About" />
            <NavLink href="/api-docs" text="API" />
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
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
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>{sampleUser.name}</span>
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative px-4 py-1.5 bg-white dark:bg-gray-800 rounded-lg font-medium">
                    Login
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-5 space-y-4">
            <MobileNavLink href="/" text="Home" />
            <MobileNavLink href="/dashboard" text="Dashboard" />
            <MobileNavLink href="/about" text="About" />
            <MobileNavLink href="/api-docs" text="API" />

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              {isLoggedIn ? (
                <>
                  <MobileNavLink href="/profile" text="Profile" />
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  Login
                </button>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-700 dark:text-gray-400">Dark Mode</span>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Nav Link component
const NavLink = ({ href, text }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-1 py-2 transition-colors ${
        isActive 
          ? "text-blue-600 dark:text-blue-400" 
          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {text}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
      )}
    </Link>
  );
};

// Mobile Nav Link component
const MobileNavLink = ({ href, text }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {text}
    </Link>
  );
};

export default Navbar;