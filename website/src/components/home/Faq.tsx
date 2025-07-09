import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FAQ() {
  const faqs = [
    {
      question: "What's included in the template packages?",
      answer:
        "Our templates include the complete source code, documentation, and assets needed to get your project up and running. You'll receive all the Next.js components, TypeScript types, and styling files.",
    },
    {
      question: "Can I use the templates for commercial projects?",
      answer:
        "Yes, all our templates come with a commercial license. You can use them for both personal and client projects without additional fees.",
    },
    {
      question: "Do you offer customization services?",
      answer:
        "Yes, we offer customization services for our templates. If you need specific features or design changes, please contact our support team for a quote.",
    },
    {
      question: "How often are templates updated?",
      answer:
        "We regularly update our templates to ensure compatibility with the latest Next.js versions and to add new features. All updates are free for existing customers.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We currently do not offer refunds. We encourage you to reach out to our support team with any concerns or issues — we're here to help and ensure you have the best experience possible.",
    },
    {
      question: "Can I preview the templates before purchasing?",
      answer:
        "Yes, all our templates have live demos that you can explore before making a purchase decision.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className=" mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about our templates and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-gray-950/[.1] bg-gray-950/[.02] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] rounded-xl backdrop-blur-sm transition-all hover:shadow-lg"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                <div className="flex items-start">
                  <span className="font-medium text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-300 ease-out">
                <div className="pl-10 border-l-2 border-blue-100 dark:border-gray-700">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support Section */}
        <div className="pt-16 text-center">
          <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-4 sm:p-8 border border-yellow-300 dark:border-yellow-600 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-yellow-300/30 dark:bg-yellow-600/30"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Still have questions?
              </h3>
              <p className="text-lg  text-zinc-700 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                Our support team is ready to help you
              </p>
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Contact Support
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
