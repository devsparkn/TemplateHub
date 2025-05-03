import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 px-8 pb-20 lg:pt-40 lg:pb-32 bg-white dark:bg-gray-900 gradient-background overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-primary-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-0 -right-10 w-72 h-72 bg-accent-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="max-w-2xl animate-slide-up">
            <div className="flex items-center mb-6">
              <div className="h-px w-10 bg-primary-500 mr-4"></div>
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                Full Stack Developer
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              <span className="block mb-2">Hello, I&#39;m</span>
              <span className="block text-gradient gradient-primary">
                Nadeem Chaudhary
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg">
              Crafting{" "}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                beautiful
              </span>
              ,{" "}
              <span className="font-semibold text-accent-500 dark:text-accent-400">
                responsive
              </span>
              , and{" "}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                user-friendly
              </span>{" "}
              websites with modern technologies.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {/* View My Work Button */}
              <Link
                href="/projects"
                className="relative inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 shadow-lg transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition duration-300"></span>
              </Link>

              {/* Download Resume Button */}
              <Link
                href="/resume.pdf"
                download
                className="relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10">Download CV</span>
                <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-0 transition duration-300"></span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex items-center gap-6">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                {/* GitHub Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484..."
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                {/* LinkedIn Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0..." />
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                {/* Twitter Icon */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.953 4.57a10 10..." />
                </svg>
              </Link>
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative animate-fade-in">
            {/* Background Orbs */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>

            {/* Circular Profile */}
            <div className="relative z-10 flex justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary-500 shadow-xl relative">
                <Image
                  src="/images/profile.png"
                  alt="Profile Image"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
