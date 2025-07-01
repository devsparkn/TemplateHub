import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="py-16 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Frequently Asked{" "}
              <span className="text-yellow-400">
            Questions
          </span>
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto">
            Find answers to common questions about our templates and services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
