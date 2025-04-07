import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl p-8 md:p-12 border border-blue-100 dark:border-blue-700/50 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent dark:via-cyan-400 blur-sm"></div>
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent dark:via-blue-400 blur-sm"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Protect Yourself from Deepfakes Today
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of individuals and organizations using Sentinel AI to verify digital content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="relative group inline-block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <button className="relative px-8 py-4 bg-white dark:bg-gray-800 rounded-lg font-medium text-lg text-gray-900 dark:text-white">
                Try Sentinel AI Free
              </button>
            </Link>
            
            <Link href="/api-docs" className="px-8 py-4 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 rounded-lg font-medium text-lg transition-colors hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white">
              Explore API
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}