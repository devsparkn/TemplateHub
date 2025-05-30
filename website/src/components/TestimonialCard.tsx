import Image from "next/image";
import { cn } from "@/lib/utils";
interface Testimonial {
  id: number;
  name: string;
  handle?: string;
  text: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-sm h-full cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.02] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.name} avatar`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-black dark:text-white font-medium text-sm">
            {testimonial.name}
          </h3>
          {testimonial.handle && (
            <p className="text-zinc-500 text-xs">{testimonial.handle}</p>
          )}
        </div>
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
        {testimonial.handle &&
        testimonial.text.includes(testimonial.handle.slice(1)) ? (
          <span>
            {testimonial.text.split(testimonial.handle.slice(1))[0]}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {testimonial.handle}
            </span>
            {testimonial.text.split(testimonial.handle.slice(1))[1]}
          </span>
        ) : (
          testimonial.text
        )}
      </blockquote>
    </div>
  );
}
