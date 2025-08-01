"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { OrganicWaves } from "./GradientLines";
const clientLogos = [
  {
    name: "Google",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/google.webp",
  },
  {
    name: "Microsoft",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/microsoft.png",
  },
  {
    name: "Cisco",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/cisco.png",
  },
  {
    name: "Zomato",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/zomato.png",
  },
  {
    name: "Better-Auth",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/better-auth.png",
  },
  {
    name: "Strapi",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/strapi.svg",
  },
  {
    name: "Neon",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/neon.svg",
  },
  {
    name: "Great Frontend",
    src: "https://aceternity.com/cdn-cgi/image/width=256/https://assets.aceternity.com/companies/greatfrontend.png",
  },
];

const BrandMarquee = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OrganicWaves />
      </div>
      <div className="pt-4">
        <p className="text-center text-sm uppercase text-gray-500 dark:text-slate-400 tracking-widest mb-6">
          Trusted by 100+ of the largest companies
        </p>
        <Marquee gradient={false} speed={50}>
          {clientLogos.map((client, idx) => (
            <div key={idx} className="flex items-center justify-center px-8">
              <Image
                src={client.src}
                alt={client.name}
                width={120}
                height={40}
                className="object-contain transition duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandMarquee;
