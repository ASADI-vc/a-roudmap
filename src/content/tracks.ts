import type { Track } from "./types";

export const tracks: Track[] = [
  {
    id: "core",
    title: { fa: "پایه مشترک", en: "Shared Foundation" },
    tagline: {
      fa: "مهارت‌هایی که در هر مسیری لازم می‌شوند — از تفکر محاسباتی تا استقرار و همکاری.",
      en: "Skills every path needs — from computational thinking to deployment and collaboration.",
    },
    color: "accent",
  },
  {
    id: "frontend",
    title: { fa: "توسعه فرانت‌اند", en: "Frontend Development" },
    tagline: {
      fa: "رابط‌های کاربری سریع، در دسترس و قابل نگهداری در وب.",
      en: "Fast, accessible, maintainable user interfaces on the web.",
    },
    color: "violet",
  },
  {
    id: "backend",
    title: { fa: "توسعه بک‌اند", en: "Backend Development" },
    tagline: {
      fa: "سرویس‌ها، داده‌ها و امنیت — منطقی که پشت صحنه اجرا می‌شود.",
      en: "Services, data and security — the logic behind the scenes.",
    },
    color: "amber",
  },
  {
    id: "aiapps",
    title: { fa: "اپلیکیشن‌های مبتنی بر هوش مصنوعی", en: "AI-Enabled Applications" },
    tagline: {
      fa: "ساختن محصولات با مدل‌های زبانی — با ارزیابی، ایمنی و درک هزینه.",
      en: "Building products with language models — with evaluation, safety and cost awareness.",
    },
    color: "rose",
  },
];
