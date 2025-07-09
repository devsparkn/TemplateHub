import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/utils/testimonial";
import { Marquee } from "./magicui/marquee";
export default function TestimonialsSection() {
  // Split testimonials into two groups for the two rows
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-2 sm:mb-4">
            Loved by{" "}
              <span className="text-yellow-400">
            Devs
          </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto">
            9abel is popular among developers worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s]">
            {secondRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
