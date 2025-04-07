export default function TestimonialCard({ quote, author, role }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 opacity-100">
        <div className="text-blue-600 dark:text-blue-400 text-4xl font-serif mb-4">"</div>
        <p className="text-gray-700 dark:text-gray-300 mb-6 italic">{quote}</p>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{author}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    );
  }