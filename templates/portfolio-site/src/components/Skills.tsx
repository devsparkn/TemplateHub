import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
//   Database,
  Cloud,
  GitBranch,
  Github,
} from "lucide-react";
import { FaNodeJs } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { PiToolbox } from "react-icons/pi";
import { SiMongodb } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { VscVscode } from "react-icons/vsc";
import { IoLogoVercel } from "react-icons/io5";
import { SiNetlify } from "react-icons/si";
import { SiOverleaf } from "react-icons/si";
import { TbBrandSupabase } from "react-icons/tb";
const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      icon: <Code2 className="w-6 h-6 text-primary-500" />,
      items: [
        { name: "HTML", icon: <FaHtml5 className="w-4 h-4 text-primary-500" /> },
        { name: "CSS", icon: <FaCss3Alt className="w-4 h-4 text-primary-500" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="w-4 h-4 text-primary-500" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-primary-500" /> },
        { name: "React", icon: <FaReact className="w-4 h-4 text-primary-500" /> },
        { name: "Next.js", icon: <RiNextjsLine className="w-4 h-4 text-primary-500" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-primary-500" /> },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="w-6 h-6 text-accent-500" />,
      items: [
        { name: "Node.js", icon: <FaNodeJs className="w-4 h-4 text-accent-500" /> },
        { name: "Express", icon: <SiExpress className="w-4 h-4 text-accent-500" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-accent-500" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 text-accent-500" /> },
        { name: "RESTful APIs", icon: <Cloud className="w-4 h-4 text-accent-500" /> },
        { name: "Supabase", icon: <TbBrandSupabase className="w-4 h-4 text-accent-500" /> },
      ],
    },
    {
      category: "Tools",
      icon: <PiToolbox className="w-6 h-6 text-primary-500" />,
      items: [
        { name: "Git", icon: <GitBranch className="w-4 h-4 text-primary-500" /> },
        { name: "GitHub", icon: <Github className="w-4 h-4 text-primary-500" /> },
        { name: "VS Code", icon: <VscVscode className="w-4 h-4 text-primary-500" /> },
        { name: "Vercel", icon: <IoLogoVercel className="w-4 h-4 text-primary-500" /> },
        { name: "Netlify", icon: <SiNetlify className="w-4 h-4 text-primary-500" /> },
        { name: "Overleaf", icon: <SiOverleaf className="w-4 h-4 text-primary-500" /> },
      ],
    },
  ];

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
            className="bg-white dark:bg-gray-800 p-6 rounded-lg hover:border-primary-500 border-2 border-transparent"
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
                  {item.icon}
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
