import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ReduxProvider } from "@/lib/providers";
import { ToasterProvider } from "@/components/ToasterProvider";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import VisitorCounter from "@/components/VisitorCounter";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TemplateHub - Premium Next.js Templates",
  description:
    "Browse and purchase high-quality Next.js templates for your next project",
  keywords: ["Next.js", "React", "Templates", "Web Development"],
  authors: [{ name: "TemplateHub Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://templatehub.com",
    siteName: "TemplateHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "TemplateHub - Premium Next.js Templates",
    description:
      "Browse and purchase high-quality Next.js templates for your next project",
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
              <ErrorBoundary>
                <Navbar />
                {children}
                <Footer />
                <VisitorCounter />
              </ErrorBoundary>
            </ThemeProvider>
          </ReduxProvider>
        </AuthProvider>
        <ToasterProvider />
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
      </body>
    </html>
  );
}
