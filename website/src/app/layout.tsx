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
  title: "9abel - Premium Next.js Templates",
  description:
    "Browse and purchase high-quality Next.js templates for your next project",
  keywords: ["Next.js", "React", "Templates", "Web Development"],
  authors: [{ name: "9abel Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://9abel.com",
    siteName: "9abel",
  },
  twitter: {
    card: "summary_large_image",
    title: "9abel - Premium Next.js Templates",
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
                {children}
              </ErrorBoundary>
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
