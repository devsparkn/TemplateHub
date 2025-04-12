import Link from "next/link";
import { Upload } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Experience <span className="text-blue-600 dark:text-blue-400">Sentinel AI</span> in Action
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Try our interactive demo to see how Sentinel AI detects deepfakes across different media types.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500 rounded-lg blur-md opacity-75"></div>
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
              <div className="aspect-video rounded-md bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Upload an image, video, audio, or paste text to analyze</p>
                  <Link href="/detection" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-md transition-colors">
                    Try it Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {step}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-900 dark:text-white">
                      {step === 1 && 'Upload Content'}
                      {step === 2 && 'AI Analysis'}
                      {step === 3 && 'Detailed Results'}
                      {step === 4 && 'Take Action'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step === 1 && 'Upload the media you want to analyze or paste text directly.'}
                      {step === 2 && 'Our advanced AI models analyze the content for signs of manipulation.'}
                      {step === 3 && 'Get a comprehensive report with confidence scores and specific detection metrics.'}
                      {step === 4 && 'Make informed decisions based on our reliable detection results.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}