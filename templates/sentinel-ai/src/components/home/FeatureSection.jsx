import FeaturedCard from "./FeaturedCard";
import { Shield, Zap, Upload, Code, LineChart, Lock, Layers } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 transition-all duration-300 opacity-100">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Comprehensive <span className="text-blue-600 dark:text-blue-400">Deepfake Detection</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our advanced AI models analyze multiple aspects of media to identify manipulated content
            with exceptional accuracy across different formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeaturedCard 
            icon={<Shield className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />}
            title="Image Analysis"
            description="Detect facial manipulation, inconsistencies, and metadata tampering in images."
          />
          <FeaturedCard 
              icon={<Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
              title="Video Detection"
              description="Identify unnatural movements, audio-visual sync issues, and temporal artifacts."
            />
            
            <FeaturedCard 
              icon={<Upload className="w-8 h-8 text-orange-600 dark:text-orange-400" />}
              title="Audio Verification"
              description="Analyze voice patterns, spectral inconsistencies, and synthesis markers."
            />
            
            <FeaturedCard 
              icon={<Code className="w-8 h-8 text-green-600 dark:text-green-400" />}
              title="Text Authentication"
              description="Identify AI-generated content through linguistic pattern analysis."
            />
            
            <FeaturedCard 
              icon={<LineChart className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />}
              title="Real-time Analysis"
              description="Get instant results with detailed confidence scores and visualizations."
            />
            
            <FeaturedCard 
              icon={<Lock className="w-8 h-8 text-pink-600 dark:text-pink-400" />}
              title="Secure Processing"
              description="All uploads are processed securely and private data is never stored."
            />
            
            <FeaturedCard 
              icon={<Layers className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
              title="API Integration"
              description="Easily integrate Sentinel AI into your applications with our robust API."
            />
            
            <FeaturedCard 
              icon={<Shield className="w-8 h-8 text-red-600 dark:text-red-400" />}
              title="Browser Extension"
              description="Detect deepfakes in real-time while browsing with our extension."
            />
        </div>
      </div>
    </section>
  );
}