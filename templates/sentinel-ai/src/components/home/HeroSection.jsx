import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-900/30 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjEiIGZpbGw9IiMxRTQwQUYiLz48L3N2Zz4=')]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-500/10 to-transparent" style={{ transform: 'translate(50%, 50%)', borderRadius: '50%' }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <div className="transition-all duration-300 opacity-100">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500">
            AI-Powered Deepfake Detection
            <br />
            <span className="text-gray-900 dark:text-white">Stay Ahead of Deception!</span>
          </h1>
          
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-gray-900 dark:text-gray-300">
            Sentinel AI uses advanced machine learning to detect deepfakes across images, 
            videos, audio, and text with industry-leading accuracy.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-300 opacity-100">
          <Link href="/dashboard" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <button className="relative px-8 py-3 bg-white dark:bg-gray-800 rounded-lg flex items-center gap-2 font-medium text-gray-900 dark:text-white">
              Try Sentinel AI Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <button
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 rounded-lg flex items-center gap-2 justify-center font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
          >
            Learn More
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}