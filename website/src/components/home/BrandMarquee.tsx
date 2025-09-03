"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { OrganicWaves } from "./GradientLines";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiVercel,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiMongodb,
} from "react-icons/si";

const clientLogos = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "React", icon: SiReact, color: "text-sky-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
  { name: "Framer Motion", icon: SiFramer, color: "text-pink-500" },
  { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "GitHub", icon: SiGithub, color: "text-black dark:text-white" },
];

const BrandMarquee = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OrganicWaves />
      </div>
      <div className="pt-4 relative z-10">
        <p className="text-center text-sm uppercase text-gray-500 dark:text-slate-400 tracking-widest mb-6">
          Powered by the modern web ecosystem
        </p>
        <Marquee gradient={false} speed={50}>
          {clientLogos.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div key={idx} className="flex items-center justify-center px-8">
                <Icon
                  className={`${client.color} transition duration-300`}
                  size={60}
                  title={client.name}
                />
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandMarquee;
