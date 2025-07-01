"use client";

import { useState } from "react";
import {
  CheckCircle,
  Rocket,
  Wrench,
  MailCheck,
  ChevronDown,
  FileImage,
  Calendar,
  DollarSign,
  LayoutTemplate,
} from "lucide-react";

export default function RequestCustomTemplatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectName: "",
    budgetRange: "",
    timeline: "",
    customizationDetails: "",
    designPreferences: [] as string[],
    files: [] as File[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignPreferenceToggle = (style: string) => {
    setFormData((prev) => {
      const exists = prev.designPreferences.includes(style);
      const newPrefs = exists
        ? prev.designPreferences.filter((s) => s !== style)
        : [...prev.designPreferences, style];
      return { ...prev, designPreferences: newPrefs };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: Array.from(e.target.files as FileList),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // API integration would go here
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const designStyles = [
    "Modern Minimal",
    "Corporate Professional",
    "Creative Bold",
    "Elegant Luxury",
    "Dark Theme",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#f0f4f8] dark:from-[#0f172a] dark:to-[#1e293b] text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-8 lg:px-16">
        {/* Enhanced Hero */}
        <section className="text-center mb-20 px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100 mb-6 text-sm font-medium shadow-sm">
            <Rocket className="w-4 h-4 mr-2" />
            Premium Custom Templates
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Request Your Perfect Template
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
            Need a custom solution? Get a professionally designed template
            tailored to your exact needs. Our team delivers pixel-perfect,
            high-performance templates fast.
          </p>
        </section>

        {/* Form Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-20 border border-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 font-medium text-gray-700 dark:text-gray-300 block"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 font-medium text-gray-700 dark:text-gray-300 block"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="projectName"
                  className="mb-2 font-medium text-gray-700 dark:text-gray-300 block"
                >
                  Project Name
                </label>
                <input
                  id="projectName"
                  name="projectName"
                  placeholder="e.g. SaaS Dashboard Redesign"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="budgetRange"
                    className="mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select budget range</option>
                    <option value="$500 - $1,000">$500 - $1,000</option>
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="timeline"
                    className="mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 font-medium text-gray-700 dark:text-gray-300 block">
                  Design Style Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {designStyles.map((style) => {
                    const selected = formData.designPreferences.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleDesignPreferenceToggle(style)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors focus:outline-none focus:ring-2 ${
                          selected
                            ? "bg-purple-600 text-white border-transparent hover:bg-purple-700"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                        }`}
                        aria-pressed={selected}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="customizationDetails"
                  className="mb-2 font-medium text-gray-700 dark:text-gray-300 block"
                >
                  Customization Details
                </label>
                <textarea
                  id="customizationDetails"
                  name="customizationDetails"
                  required
                  rows={6}
                  placeholder={`Describe your requirements in detail...
- Specific features needed
- Brand colors to use
- Must-have components
- Any reference websites or designs`}
                  value={formData.customizationDetails}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label
                  htmlFor="fileUpload"
                  className="mb-2 font-medium text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <FileImage className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                  Attach Files (optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="fileUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 transition"
                  >
                    <svg
                      className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, PDF (MAX. 10MB)
                    </p>
                    <input
                      id="fileUpload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.pdf"
                    />
                  </label>
                </div>
                {formData.files.length > 0 && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {formData.files.length} file(s) selected
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-purple-500"
                >
                  Submit Request
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 dark:text-green-300">
                Request Submitted!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                Thanks for submitting your custom template request. We&apos;ll
                get back to you shortly via email.
              </p>
            </div>
          )}
        </section>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">
            Our Custom Template Process
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-card dark:bg-gray-700 hidden md:block"></div>

            {/* Timeline items */}
            <div className="grid md:grid-cols-2 gap-y-10">
              {[
                {
                  step: 1,
                  title: "Requirement Analysis",
                  description:
                    "We dive deep into your needs and business objectives",
                  icon: (
                    <Wrench className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  ),
                },
                {
                  step: 2,
                  title: "Design Proposal",
                  description:
                    "Our designers create mockups based on your requirements",
                  icon: (
                    <LayoutTemplate className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  ),
                },
                {
                  step: 3,
                  title: "Development Phase",
                  description:
                    "We build your template with modern technologies",
                  icon: (
                    <Rocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  ),
                },
                {
                  step: 4,
                  title: "Delivery & Support",
                  description:
                    "We deliver the final product and provide support",
                  icon: (
                    <MailCheck className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  ),
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className={`relative ${
                    index % 2 === 0
                      ? "md:text-right md:pr-12"
                      : "md:text-left md:pl-12 md:mt-20"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
                    {/* Icon */}
                    <div className="absolute top-6 -left-4 md:-left-4 w-10 h-10 p-2 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-gray-300">
                      {item.description}
                    </p>
                    <div className="mt-3 text-sm font-medium text-purple-600 dark:text-purple-400">
                      Step {item.step}/4
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How much does a custom template cost?",
                answer:
                  "Pricing depends on complexity, starting at $500 for basic templates. Enterprise solutions with advanced functionality typically range from $2,500 to $10,000. We provide detailed quotes after understanding your requirements.",
              },
              {
                question: "What's included in a custom template?",
                answer:
                  "Each custom template includes: responsive design for all devices, 3 rounds of revisions, complete documentation, 30 days of technical support, and source code delivery.",
              },
              {
                question: "How long does development take?",
                answer:
                  "Timelines vary based on complexity. Simple templates take 1-2 weeks, while more complex projects require 3-6 weeks. We provide a detailed timeline in our proposal after the initial consultation.",
              },
              {
                question: "What technologies do you use?",
                answer:
                  "We primarily work with React, Next.js, Tailwind CSS, and TypeScript. Our templates are compatible with modern frameworks and include responsive design principles. We can adapt to your specific tech stack requirements.",
              },
              {
                question: "Do you offer post-delivery support?",
                answer:
                  "Yes, all custom templates include 30 days of complimentary support. We also offer ongoing maintenance packages and priority support options for enterprise clients.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 py-6">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index ? "mt-4 opacity-100" : "h-0 opacity-0"
                  }`}
                >
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
