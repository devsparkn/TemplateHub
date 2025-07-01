"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { OrganicWaves } from "./GradientLines";
const clientLogos = [
  {
    name: "Melita",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/67e1212ca4365330f663f8c0_Melita%20Study.png",
  },
  {
    name: "Tele2",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/67e116cf0b1a1d16ffb8bfcd_Tele%20(1).png",
  },
  {
    name: "Equitel",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/6752d7db38482a35156c0fd4_Equitel.png",
  },
  {
    name: "Carrefour",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/6752d7e52ad7b45b19c8cb31_Carrefour.png",
  },
  {
    name: "UNDO",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/6752d7ec4783956b48bb26c3_UNDO.png",
  },
  {
    name: "Vodafone",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/6752d814fa6a47810cc73593_Vodaphone.png",
  },
  {
    name: "Daily Telecom",
    src: "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce077bb/6752d81b86a183f92de1918b_Daily%20Telecom.png",
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
