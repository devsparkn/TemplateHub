import React from "react";
import { motion } from "framer-motion";
const Experience = () => {
  return (
    <div className="mt-32">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 tracking-wider uppercase">
          Professional Background
        </span>
        <h3 className="section-title text-center mx-auto mb-6 after:left-1/2 after:-translate-x-1/2">
          Experience
        </h3>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          My professional journey and work history.
        </p>
      </motion.div>

      <div className="space-y-12 max-w-3xl mx-auto">
        {[
          {
            years: "2025 - Present",
            title: "Jr. Full Stack Developer",
            company: "Bottrion Systems Pvt. Ltd.",
            description:
              "Worked on many projects and implemented new features. Developed responsive web applications for clients across various industries, collaborated with designers and product managers.",
          },
          {
            years: "2017 - 2020",
            title: "Web Developer",
            company: "Digital Solutions LLC",
            description:
              "Developed responsive websites and web applications for clients across various industries, collaborated with designers and product managers.",
          },
          {
            years: "2015 - 2017",
            title: "Junior Developer",
            company: "WebTech Agency",
            description:
              "Assisted senior developers in building websites, learned modern web development practices, and contributed to client projects.",
          },
        ].map((experience, index) => (
          <motion.div
            key={index}
            className="relative pl-10 pb-10 md:pl-16 border-l-2 border-primary-500 dark:border-primary-400 last:border-0 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-primary-500 dark:bg-primary-400 z-10"></div>
            <div className="absolute -left-8 top-0 h-14 w-14 rounded-full bg-primary-100 dark:bg-primary-900/30 z-0"></div>

            <div className="md:flex md:items-start md:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-primary-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    {experience.years}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {experience.title}
                </h4>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-4">
                  {experience.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-3 py-1 text-sm font-medium text-primary-800 dark:text-primary-300">
                  {index === 0
                    ? "Current"
                    : `${experience.years.split("-")[1].trim()} years`}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
