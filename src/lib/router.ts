// Hash router: parseRoute("#/fa/topics/t-git") -> { locale, view, params }
// Views: home | onboarding | roadmap | topics | topic | projects | project | evidence | sources | source | methodology | assistant | progress
export type View =
  | "home"
  | "onboarding"
  | "roadmap"
  | "topics"
  | "topic"
  | "projects"
  | "project"
  | "evidence"
  | "sources"
  | "source"
  | "methodology"
  | "assistant"
  | "progress";

export interface Route {
  locale: "fa" | "en" | null; // null only for the bare root
  view: View;
  param: string | null;
}

const views: View[] = [
  "home",
  "onboarding",
  "roadmap",
  "topics",
  "topic",
  "projects",
  "project",
  "evidence",
  "sources",
  "source",
  "methodology",
  "assistant",
  "progress",
];

export function parseRoute(hash: string): Route {
  let h = hash.replace(/^#\/?/, "");
  if (!h) return { locale: null, view: "home", param: null };
  const parts = h.split("/").filter(Boolean);
  let locale: "fa" | "en" | null = null;
  if (parts[0] === "fa" || parts[0] === "en") {
    locale = parts[0];
    parts.shift();
  }
  const view = (parts[0] as View) || "home";
  if (!views.includes(view)) return { locale: locale ?? null, view: "home", param: null };
  return { locale, view, param: parts[1] ?? null };
}

export function buildRoute(locale: "fa" | "en", view: View, param?: string | null): string {
  const base = `#/${locale}`;
  if (!param) return `${base}/${view === "home" ? "" : view}`.replace(/\/$/, "");
  return `${base}/${view}/${param}`;
}

export function href(locale: "fa" | "en", view: View, param?: string | null): string {
  return buildRoute(locale, view, param);
}

/** Equivalent page in the other language: same view+param, other locale. */
export function swapLocale(hash: string): { href: string; nextLocale: "fa" | "en" } | null {
  const r = parseRoute(hash);
  const next: "fa" | "en" = r.locale === "fa" ? "en" : "fa";
  if (!r.locale) return null; // root without locale — let auto-selection handle it
  return { href: buildRoute(next, r.view, r.param), nextLocale: next };
}
