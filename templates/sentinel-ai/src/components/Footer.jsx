import Link from "next/link";
import { Shield, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { href: "#", text: "Pricing" },
        { href: "#", text: "API" },
        { href: "#", text: "Browser Extension" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us" },
        { href: "#", text: "Blog" },
        { href: "#", text: "Careers" },
        { href: "#", text: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "#", text: "Privacy Policy" },
        { href: "#", text: "Terms of Service" },
        { href: "#", text: "Cookie Policy" },
        { href: "#", text: "Compliance" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://twitter.com", icon: <Twitter size={18} />, label: "Twitter" },
    { href: "https://linkedin.com", icon: <Linkedin size={18} />, label: "LinkedIn" },
    { href: "mailto:info@sentinelai.com", icon: <Mail size={18} />, label: "Email" },
  ];

  const bottomLinks = [
    { href: "#", text: "Help Center" },
    { href: "#", text: "System Status" },
    { href: "#", text: "Security" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-cyan-400 dark:to-blue-500">
                Sentinel AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Advanced deepfake detection platform for images, videos, audio, and text content
              with industry-leading accuracy.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-gray-900 dark:text-white font-medium mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(({ href, text }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Sentinel AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end space-x-6">
            {bottomLinks.map(({ href, text }) => (
              <Link
                key={text}
                href={href}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
