export default function StatsSection() {
    return (
      <section className="bg-gray-50 dark:bg-gray-800 py-6 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 transition-all duration-300 opacity-100">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</p>
              <p className="text-gray-600 dark:text-gray-400">Detection Accuracy</p>
            </div>
            
            <div className="p-4 transition-all duration-300 opacity-100">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1M+</p>
              <p className="text-gray-600 dark:text-gray-400">Analyses Performed</p>
            </div>
            
            <div className="p-4 transition-all duration-300 opacity-100">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
            
            <div className="p-4 transition-all duration-300 opacity-100">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">4</p>
              <p className="text-gray-600 dark:text-gray-400">Media Types Supported</p>
            </div>
          </div>
        </div>
      </section>
    );
  }