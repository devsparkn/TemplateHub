"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    setDarkMode(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 top-0 transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/profile.png"
                className="rounded-full h-12 w-12 bg-primary-400 "
                alt="Profile"
                width={100}
                height={100}
              />
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-300">
                Nadeem <span className="hidden sm:inline-block">Chaudhary</span>
              </div>
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-grow items-center justify-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors py-2"
                >
                  {item.label}
                  {pathname === item.href ? (
                    <motion.span
                      layoutId="navunderline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={darkMode ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-amber-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-indigo-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                  <MobileSidebar
                    pathname={pathname}
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface MobileSidebarProps {
  pathname: string;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

function MobileSidebar({
  pathname,
  toggleDarkMode,
  darkMode,
}: MobileSidebarProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400"
        >
          <div>
            <Image
              src="/images/profile.png"
              className="rounded-full h-12 w-12 bg-primary-400 "
              alt="Profile"
              width={100}
              height={100}
            />
          </div>
        </Link>
        <Sheet>
          <SheetTrigger asChild></SheetTrigger>
        </Sheet>
      </div>

      <div className="flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-violet-50 dark:bg-gray-800/60 text-violet-600 dark:text-violet-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/40"
            )}
          >
            {item.label}
            {pathname === item.href && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400" />
            )}
          </Link>
        ))}
      </div>

      <div className="mt-auto p-4 border-t dark:border-gray-800">
        <Button
          variant="outline"
          onClick={toggleDarkMode}
          className="w-full justify-between"
        >
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          {darkMode ? (
            <Sun className="h-4 w-4 text-amber-400 ml-2" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-600 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
}
