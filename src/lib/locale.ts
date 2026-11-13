// Locale decision — priority per docs/DECISIONS.md D-011:
// 1) explicit hash locale (handled by router before this function)
// 2) saved explicit preference (localStorage)
// 3) IP-based country detection — NOT AVAILABLE on this host (no trusted country header
//    is exposed through the preview gateway). Hook point documented below.
// 4) browser-language fallback: Persian preference -> fa, else en.
export type Locale = "fa" | "en";

export const PREF_KEY = "masir.lang.pref";
export const PROGRESS_KEY = "masir.progress.v1";
export const PROFILE_KEY = "masir.profile.v1";
export const THEME_KEY = "masir.theme";

export function savedPreference(): Locale | null {
  try {
    const v = localStorage.getItem(PREF_KEY);
    return v === "fa" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Country hook: if a trusted edge/proxy ever supplies country metadata (e.g. an injected
 * `x-country-code` header rendered into the document, or a platform API), map IR -> fa here.
 * This host exposes no such metadata; the function reports "no country data" by default.
 */
export function countryFromPlatform(): "IR" | string | null {
  try {
    // Read once from a data attribute a server renderer could inject. Nothing injects it here.
    const el = document.documentElement;
    const c = el.getAttribute("data-country");
    return c || null;
  } catch {
    return null;
  }
}

export function browserLocale(): Locale {
  const langs = Array.from(navigator.languages || [navigator.language || "en"]);
  for (const l of langs) {
    const base = l.toLowerCase().split("-")[0];
    if (base === "fa") return "fa";
  }
  return "en";
}

/** Full decision chain. explicitLocale is what the hash contained (or null). */
export function decideLocale(explicitLocale: Locale | null): { locale: Locale; basis: string } {
  if (explicitLocale) return { locale: explicitLocale, basis: "explicit-url" };
  const pref = savedPreference();
  if (pref) return { locale: pref, basis: "saved-preference" };
  const country = countryFromPlatform();
  if (country === "IR") return { locale: "fa", basis: "country-metadata" };
  const bl = browserLocale();
  return { locale: bl, basis: "browser-language" };
}

/** Persian-digit formatting helper (fa prose uses Persian digits; code stays Western). */
export function formatNum(n: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);
}

export function formatDate(iso: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      numberingSystem: locale === "fa" ? "arabext" : "latn",
    }).format(new Date(iso + "T00:00:00"));
  } catch {
    return iso;
  }
}
