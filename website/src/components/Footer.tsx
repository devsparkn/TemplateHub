import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
export function Footer() {
  return (
    <footer className="border-t bg-background px-8">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="9able Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="-ml-1 text-xl font-bold">able</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Next.js templates for fast, stunning, and functional websites.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/devsparkn"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/devsparkn"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/in/devsparkn"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://instagram.com/devsparkn"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/templates"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/license"
                  className="text-muted-foreground hover:text-foreground"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 9abel. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0 flex items-center gap-1">
            Made with <FaHeart className="text-red-500" aria-label="love" /> by{" "}
            <span className="font-medium">Nadeem</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
