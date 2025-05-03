"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Download } from "lucide-react";
export function About() {
  const skills = [
    {
      category: "Frontend",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
      ],
      icon: (
        <svg
          className="w-6 h-6 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "RESTful APIs",
        "GraphQL",
      ],
      icon: (
        <svg
          className="w-6 h-6 text-accent-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
    },
    {
      category: "Tools",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "Docker",
        "Figma",
        "Vercel",
        "Netlify",
      ],
      icon: (
        <svg
          className="w-6 h-6 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      ),
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section className="py-24 px-8 bg-white dark:bg-gray-900 gradient-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>

      <div className="container relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            className="lg:w-1/2"
            variants={fadeInUpVariants}
            custom={0}
          >
            <div className="flex items-center mb-6">
              <div className="h-px w-10 bg-primary-500 mr-4"></div>
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                About Me
              </span>
            </div>
            <h2 className="section-title mb-8">My Journey</h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300 max-w-2xl">
              <motion.p variants={fadeInUpVariants} custom={1}>
                Hi there! I&#39;m a passionate web developer with a focus on
                creating beautiful, responsive, and user-friendly websites. With
                several years of experience in both frontend and backend
                development, I&#39;ve had the opportunity to work on a variety
                of projects across different industries.
              </motion.p>
              <motion.p variants={fadeInUpVariants} custom={2}>
                My journey in web development started when I was in college, and
                since then I&#39;ve been constantly learning and keeping up with
                the latest technologies. I believe in writing clean,
                maintainable code and delivering solutions that not only look
                great but also perform well.
              </motion.p>
              <motion.p variants={fadeInUpVariants} custom={3}>
                When I&#39;m not coding, you can find me hiking, reading, or
                experimenting with new recipes in the kitchen. I also enjoy
                attending tech meetups and conferences to connect with other
                developers and expand my knowledge.
              </motion.p>

              <motion.div
                className="flex gap-4 mt-8"
                variants={fadeInUpVariants}
                custom={4}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Contact Button */}
                  <Link
                    href="mailto:your.email@example.com"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-500 transition duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Me
                  </Link>

                  {/* Resume Button */}
                  <Link
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium shadow-sm transition duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Resume
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 tracking-wider uppercase">
              Expertise
            </span>
            <h3 className="section-title text-center mx-auto mb-6 after:left-1/2 after:-translate-x-1/2">
              My Skills
            </h3>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Here are some of the technologies and tools I work with on a daily
              basis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className=" bg-white dark:bg-gray-800 p-6 rounded-lg hover:border-primary-500 border-2 border-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                    {skill.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                    {skill.category}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {skill.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.05 + index * 0.1,
                      }}
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

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
                years: "2020 - Present",
                title: "Senior Frontend Developer",
                company: "TechCorp Inc.",
                description:
                  "Lead the frontend development team, implemented new features, optimized performance, and mentored junior developers.",
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
      </div>
    </section>
  );
}
