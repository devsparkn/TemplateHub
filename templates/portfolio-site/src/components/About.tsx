"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Download } from "lucide-react";
import Skills from "./Skills";
import Experience from "./Experience";
export function About() {
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
        <Skills />
        <Experience />
      </div>
    </section>
  );
}
