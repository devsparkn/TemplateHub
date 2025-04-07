import { Lock, Layers } from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Security & <span className="text-blue-600 dark:text-blue-400">Transparency</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We prioritize your privacy and maintain the highest standards of data security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
              <Lock className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              Privacy First Approach
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {[
                'GDPR and CCPA compliant data handling',
                'No permanent storage of your analyzed content',
                'End-to-end encryption for all uploads',
                'Regular security audits by third-party experts'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2 mt-1">✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
              <Layers className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
              Transparent Verification
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {[
                'Blockchain-backed verification of analysis results',
                'Detailed confidence scores and analysis metrics',
                'Continuous model improvements with community feedback',
                'Open methodology and research publications'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2 mt-1">✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}