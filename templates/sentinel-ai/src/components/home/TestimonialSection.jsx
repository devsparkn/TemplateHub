import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Trusted by <span className="text-blue-600 dark:text-blue-400">Professionals</span> Worldwide
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See what experts and organizations are saying about Sentinel AI's deepfake detection capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Sentinel AI has transformed how we verify content in our newsroom. The accuracy is impressive."
            author="Sarah Johnson"
            role="Digital News Editor"
          />
          <TestimonialCard 
            quote="As a cybersecurity professional, I recommend Sentinel AI to all my clients concerned about deepfakes."
            author="Michael Chen"
            role="Cybersecurity Consultant"
          />
          <TestimonialCard 
            quote="The API integration was seamless, and the detection capabilities exceed our expectations."
            author="David Rodriguez"
            role="CTO, TruthMedia"
          />
        </div>
      </div>
    </section>
  );
}