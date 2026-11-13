import type { Metadata, Viewport } from "next";
import { Inter, Vazirmatn, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Masir · مسیر — Software Engineering Learning Path",
  description:
    "A research-backed, bilingual (Persian/English) software engineering learning platform for the AI era: roadmap, projects, evidence, and a knowledge-grounded assistant. مسیر یادگیری مهندسی نرم‌افزار.",
  keywords: ["software engineering", "learning path", "roadmap", "AI-assisted development", "Persian", "فارسی", "مهندسی نرم‌افزار"],
  authors: [{ name: "Masir" }],
  alternates: { canonical: "/", languages: { fa: "/#/fa", en: "/#/en" } },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#101715" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${vazirmatn.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
