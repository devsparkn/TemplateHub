"use client";

import { useState, useEffect, useRef } from "react";
import { Download, Folder, Terminal, Play, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedCommands, setCopiedCommands] = useState<Record<string, boolean>>(
    {}
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      id: 1,
      title: "Download the Template",
      icon: <Download className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />,
      description: "Get your chosen template from 9abel",
      details:
        "After purchasing or selecting a free template, click the download button to get the zip file.",
    },
    {
      id: 2,
      title: "Unzip the Template",
      icon: <Folder className="w-5 h-5 md:w-6 md:h-6 text-green-500" />,
      description: "Extract the downloaded files to your workspace",
      details:
        "Locate the downloaded zip file on your computer and extract its contents to a directory of your choice.",
      commands: [
        {
          os: "Windows",
          command: "Right-click the zip file → 'Extract All'",
        },
        {
          os: "macOS",
          command: "Double-click the zip file to extract",
        },
      ],
    },
    {
      id: 3,
      title: "Install Dependencies",
      icon: <Terminal className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />,
      description: "Set up your development environment",
      details:
        "Open your terminal in the project directory and run the installation command to get all necessary packages.",
      commands: [
        {
          os: "Windows/macOS/Linux",
          command: "npm install",
        },
      ],
    },
    {
      id: 4,
      title: "Run Development Server",
      icon: <Play className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />,
      description: "Launch your application locally",
      details:
        "Start the development server to see your template in action and begin customizing.",
      commands: [
        {
          os: "Windows/macOS/Linux",
          command: "npm run dev",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      stepRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    setMobileMenuOpen(false);
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const copyToClipboard = (text: string, commandId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommands((prev) => ({ ...prev, [commandId]: true }));
    setTimeout(
      () => setCopiedCommands((prev) => ({ ...prev, [commandId]: false })),
      2000
    );
  };

  return (
    <div className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
          Template <span className="text-yellow-400">Documentation</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn how to set up and run your Next.js templates in your local
          machine.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Steps Navigation */}
        <div
          className={`lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 lg:h-fit lg:sticky top-8 transition-all duration-300 ${
            mobileMenuOpen
              ? "fixed inset-x-4 top-20 z-50 max-h-[70vh] overflow-y-auto"
              : "hidden lg:block"
          }`}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            Setup Process
          </h2>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 md:p-4 rounded-lg cursor-pointer transition-all ${
                  activeStep === index
                    ? "bg-blue-50 dark:bg-blue-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => scrollToStep(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm md:text-base">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
              <Terminal className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
              Prerequisites
            </h3>
            <ul className="space-y-1 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Node.js v18 or higher
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                npm v9 or higher
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                Git (recommended for version control)
              </li>
            </ul>
          </div>
        </div>

        {/* Step Details */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="mb-12 md:mb-16 last:mb-0 scroll-mt-20 md:scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">
                      {step.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="prose prose-sm md:prose-base prose-blue dark:prose-invert max-w-none">
                    <p>{step.details}</p>
                  </div>

                  {step.commands && (
                    <div className="mt-4 md:mt-6">
                      <h3 className="font-medium mb-3 text-sm md:text-base">
                        {step.id === 2 ? "Unzip Steps:" : "Terminal Commands:"}
                      </h3>

                      <div className="space-y-3 md:space-y-4">
                        {step.commands.map((cmd, cmdIndex) => {
                          const commandId = `step-${step.id}-cmd-${cmdIndex}`;
                          return (
                            <div
                              key={cmdIndex}
                              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 md:p-4"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-xs md:text-sm">
                                  {cmd.os}:
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="cursor-pointer h-8 text-xs"
                                  onClick={() =>
                                    copyToClipboard(cmd.command, commandId)
                                  }
                                >
                                  {copiedCommands[commandId] ? (
                                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                                  ) : (
                                    <Copy className="w-3 h-3 md:w-4 md:h-4" />
                                  )}
                                  Copy
                                </Button>
                              </div>
                              <pre className="bg-gray-800 text-gray-100 dark:bg-gray-950 p-2 md:p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                                <code className="font-mono">{cmd.command}</code>
                              </pre>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step.id === 1 && (
                    <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-bold mb-2 text-sm md:text-base">
                        Tips
                      </h3>
                      <ul className="space-y-2 text-xs md:text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
                          <span>
                            Check template compatibility with your Next.js
                            version
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></div>
                          <span>
                            Review template documentation for any specific setup
                            requirements
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {step.id === 4 && (
                    <div className="mt-4 md:mt-6">
                      <h3 className="font-bold mb-2 text-sm md:text-base">
                        Troubleshooting
                      </h3>
                      <div className="space-y-3 text-xs md:text-sm">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <h4 className="font-medium text-orange-700 dark:text-orange-300">
                            Port already in use?
                          </h4>
                          <p className="mt-1">
                            If port 3000 is in use, you can specify a different
                            port:
                          </p>
                          <div className="mt-2 space-y-3 md:space-y-4">
                            {[
                              {
                                os: "Windows/macOS/Linux",
                                command: "npm run dev -- -p 3001",
                              },
                            ].map((cmd, cmdIndex) => {
                              const commandId = `trouble-port-${cmdIndex}`;
                              return (
                                <div
                                  key={cmdIndex}
                                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 md:p-4"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-xs md:text-sm">
                                      {cmd.os}:
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="cursor-pointer h-8 text-xs"
                                      onClick={() =>
                                        copyToClipboard(cmd.command, commandId)
                                      }
                                    >
                                      <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                      {copiedCommands[commandId]
                                        ? "Copied!"
                                        : "Copy"}
                                    </Button>
                                  </div>
                                  <pre className="bg-gray-800 text-gray-100 dark:bg-gray-950 p-2 md:p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                                    <code className="font-mono">
                                      {cmd.command}
                                    </code>
                                  </pre>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <h4 className="font-medium text-red-700 dark:text-red-300">
                            Dependency issues?
                          </h4>
                          <p className="mt-1">
                            Try deleting node_modules and package-lock.json,
                            then reinstall:
                          </p>
                          <div className="mt-2 space-y-3 md:space-y-4">
                            {[
                              {
                                os: "macOS/Linux",
                                command:
                                  "rm -rf node_modules package-lock.json && npm install",
                              },
                              {
                                os: "Windows (PowerShell)",
                                command:
                                  "rm -r -fo node_modules, package-lock.json; npm install",
                              },
                            ].map((cmd, cmdIndex) => {
                              const commandId = `trouble-dep-${cmdIndex}`;
                              return (
                                <div
                                  key={cmdIndex}
                                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 md:p-4"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-xs md:text-sm">
                                      {cmd.os}:
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="cursor-pointer h-8 text-xs"
                                      onClick={() =>
                                        copyToClipboard(cmd.command, commandId)
                                      }
                                    >
                                      <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                      {copiedCommands[commandId]
                                        ? "Copied!"
                                        : "Copy"}
                                    </Button>
                                  </div>
                                  <pre className="bg-gray-800 text-gray-100 dark:bg-gray-950 p-2 md:p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                                    <code className="font-mono">
                                      {cmd.command}
                                    </code>
                                  </pre>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
