import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ReduxProvider } from "@/lib/providers";
import { ToasterProvider } from "@/components/ToasterProvider";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "9abel - Next.js Templates for Developers & Businesses",
  description:
    "Explore and get premium Next.js templates to quickly build beautiful, responsive, and functional websites for your projects.",
  keywords: [
    "Next.js templates",
    "React templates",
    "Website templates",
    "Web development",
    "SaaS templates",
    "SaaS website",
    "UI templates",
    "Premium templates",
    "Premium websites",
    "professional website",
  ],
  authors: [{ name: "Nadeem Chaudhary" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://9abel.vercel.app/",
    siteName: "9abel",
    title: "9abel - Premium Next.js Templates",
    description:
      "Explore premium Next.js templates to quickly build beautiful and functional websites for your projects.",
    images: [
      {
        url: "https://9abel.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "9abel Next.js Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devsparkn",
    creator: "@devsparkn",
    title: "9abel - Premium Next.js Templates",
    description:
      "Explore premium Next.js templates to quickly build beautiful and functional websites.",
    images: ["https://9abel.vercel.app/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ErrorBoundary>{children}</ErrorBoundary>
            </ThemeProvider>
          </ReduxProvider>
        </AuthProvider>
        <ToasterProvider />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
