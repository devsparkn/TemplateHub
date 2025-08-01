"use client";

import { useState } from "react";
import {
  CheckCircle,
  Rocket,
  Wrench,
  MailCheck,
  FileImage,
  Calendar,
  DollarSign,
  LayoutTemplate,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function RequestCustomTemplatePage() {
  const [submitted, setSubmitted] = useState(false);

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

  const designStyles = [
    "Modern Minimal",
    "Corporate Professional",
    "Creative Bold",
    "Elegant Luxury",
    "Dark Theme",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f4f4] via-white to-[#eaeaea] dark:from-[#0e1117] dark:via-[#0a0e14] dark:to-black">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-8 lg:px-16">
        {/* Enhanced Hero */}
        <section className="text-center mb-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 px-6 py-2 rounded-full">
              <LayoutTemplate className="w-5 h-5 mr-2" />
              <span>Custom Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Request Your Perfect{" "}
              <span className="text-yellow-500">Template</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto">
              Need a custom solution? Get a professionally designed template
              tailored to your exact needs. Our team delivers pixel-perfect,
              high-performance templates fast.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-20 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200">
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
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Budget Range Select */}
                <div>
                  <label
                    className="mb-2 font-medium text-gray-700 dark:text-gray-300 block"
                    htmlFor="budgetRange"
                  >
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Budget Range
                    </span>
                  </label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value: string) =>
                      setFormData((prev) => ({ ...prev, budgetRange: value }))
                    }
                  >
                    <SelectTrigger
                      id="budgetRange"
                      className="w-full py-6 px-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "$500 - $1,000",
                        "$1,000 - $2,500",
                        "$2,500 - $5,000",
                        "$5,000+",
                      ].map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeline Select */}
                <div>
                  <label
                    className="mb-2 font-medium text-gray-700 dark:text-gray-300 block"
                    htmlFor="timeline"
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      Timeline
                    </span>
                  </label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, timeline: value }))
                    }
                  >
                    <SelectTrigger
                      id="timeline"
                      className="w-full py-6 px-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1-2 weeks", "2-4 weeks", "1-2 months", "Flexible"].map(
                        (option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
                            ? "bg-yellow-500 text-white border-transparent hover:bg-yellow-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
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
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition"
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
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-yellow-500/20"
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

        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-20 text-gray-900 dark:text-white">
            Our Custom Template <span className="text-yellow-500">Process</span>
          </h2>

          <div className="relative max-w-6xl mx-auto px-4">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 transform -translate-x-1/2 z-0" />

            <div className="flex flex-col gap-20 relative z-10">
              {[
                {
                  step: 1,
                  title: "Requirement Analysis",
                  description:
                    "We dive deep into your needs and business objectives to understand your vision.",
                  icon: <Wrench className="w-5 h-5 text-white" />,
                },
                {
                  step: 2,
                  title: "Design Proposal",
                  description:
                    "Our designers create mockups based on your requirements and brand identity.",
                  icon: <LayoutTemplate className="w-5 h-5 text-white" />,
                },
                {
                  step: 3,
                  title: "Development Phase",
                  description:
                    "We build your template with modern technologies and best practices.",
                  icon: <Rocket className="w-5 h-5 text-white" />,
                },
                {
                  step: 4,
                  title: "Delivery & Support",
                  description:
                    "We deliver the final product and provide ongoing support.",
                  icon: <MailCheck className="w-5 h-5 text-white" />,
                },
              ].map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={item.step}
                    className={`relative md:flex md:items-center ${
                      isLeft ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    {/* Node (dot with icon) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 border-4 border-white dark:border-gray-900 items-center justify-center shadow-lg">
                      {item.icon}
                    </div>

                    {/* Connector line from node to card */}
                    <div
                      className={`hidden md:block absolute top-1/2 w-12 h-1 bg-gradient-to-r ${
                        isLeft
                          ? "left-1/2 from-yellow-600 to-yellow-400"
                          : "right-1/2 from-yellow-400 to-yellow-600"
                      } z-0`}
                    ></div>

                    {/* Card */}
                    <div
                      className={`relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 w-full md:max-w-md z-10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                        isLeft ? " md:ml-10" : " md:mr-10"
                      }`}
                    >
                      <div className="absolute -top-3 left-6 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Step {item.step}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
