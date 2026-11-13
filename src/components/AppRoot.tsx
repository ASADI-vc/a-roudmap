"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { parseRoute, buildRoute, swapLocale, href, type Route, type View } from "@/lib/router";
import { decideLocale, PREF_KEY, type Locale } from "@/lib/locale";
import { dict, type Dict } from "@/content/i18n";
import { useProgress, counts } from "@/lib/progress";
import { useProfile } from "@/lib/profile";

import Home from "./views/Home";
import Onboarding from "./views/Onboarding";
import Roadmap from "./views/Roadmap";
import TopicsView from "./views/TopicsView";
import TopicDetail from "./views/TopicDetail";
import ProjectsView from "./views/ProjectsView";
import ProjectDetail from "./views/ProjectDetail";
import Evidence from "./views/Evidence";
import SourcesView from "./views/SourcesView";
import Assistant from "./views/Assistant";
import ProgressView from "./views/ProgressView";

export interface AppCtx {
  locale: Locale;
  t: Dict;
  route: Route;
  navigate: (view: View, param?: string | null, locale?: Locale) => void;
}

const NAV: Array<{ view: View; key: keyof Dict["nav"] }> = [
  { view: "roadmap", key: "roadmap" },
  { view: "topics", key: "topics" },
  { view: "projects", key: "projects" },
  { view: "evidence", key: "evidence" },
  { view: "sources", key: "sources" },
  { view: "assistant", key: "assistant" },
];

export default function AppRoot() {
  const [hash, setHash] = useState<string>(typeof window === "undefined" ? "" : window.location.hash || "");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // --- route + locale bootstrap (runs once per hash change) ---
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const route = useMemo(() => parseRoute(hash), [hash]);

  // initial locale decision when URL has no explicit locale (bare root)
  const [autoLocale, setAutoLocale] = useState<Locale | null>(null);
  useEffect(() => {
    if (!route.locale && autoLocale === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time bootstrap
      setAutoLocale(decideLocale(null).locale);
    }
  }, [route.locale, autoLocale]);

  const locale: Locale = route.locale ?? autoLocale ?? "en";
  const t = dict(locale);

  // keep document attrs + font in sync
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    document.documentElement.style.setProperty(
      "--font-app",
      locale === "fa" ? "var(--font-vazir)" : "var(--font-inter)",
    );
  }, [locale]);

  // if user hit bare "/" and auto-locale is fa, rewrite the hash so the URL is explicit
  useEffect(() => {
    if (!route.locale && autoLocale) {
      const target = buildRoute(autoLocale, route.view, route.param);
      if (window.location.hash !== target) {
        window.history.replaceState(null, "", target);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- URL normalization after replaceState
        setHash(target);
      }
    }
  }, [route.locale, autoLocale, route.view, route.param]);

  // theme bootstrap
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time bootstrap from storage
    setTheme(localStorage.getItem("masir.theme") === "dark" || (localStorage.getItem("masir.theme") !== "light" && (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false)) ? "dark" : "light");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("masir.theme", theme);
  }, [theme]);

  const navigate = useCallback(
    (view: View, param?: string | null, loc?: Locale) => {
      const target = buildRoute(loc ?? locale, view, param ?? null);
      window.location.hash = target;
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [locale],
  );

  const ctx: AppCtx = { locale, t, route, navigate };

  // language switch: explicit preference + equivalent page, progress untouched (IDs are language-independent)
  const onSwitchLang = () => {
    const sw = swapLocale(window.location.hash || "");
    const next: Locale = locale === "fa" ? "en" : "fa";
    try {
      localStorage.setItem(PREF_KEY, next);
    } catch {
      /* ignore */
    }
    if (sw) window.location.hash = sw.href;
    else window.location.hash = buildRoute(next, "home");
  };

  const progress = useProgress((s) => s._state);
  const c = counts(progress);
  const profile = useProfile((s) => s.profile);

  const view = route.view;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="ambient" aria-hidden="true">
        <div className="ambient-blob" />
      </div>

      <a href="#main" className="skip-link glass glass-blur rounded-lg px-3 py-2 text-sm">
        {t.common.skipToContent}
      </a>

      <header className="sticky top-0 z-40 glass glass-header glass-blur border-x-0 border-t-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href={href(locale, "home")}
            onClick={(e) => {
              e.preventDefault();
              navigate("home");
            }}
            className="flex items-center gap-2 font-bold text-lg shrink-0"
          >
            <span aria-hidden="true" className="inline-block h-6 w-6 rounded-lg track-bg-core text-track-core text-center leading-6 font-black">
              م
            </span>
            <span>{t.brand}</span>
            <span className="hidden sm:inline text-xs font-normal text-muted-foreground ms-1">{t.brandNote}</span>
          </Link>

          <nav aria-label={locale === "fa" ? "ناوبری اصلی" : "Primary"} className="hidden md:flex items-center gap-1 ms-2">
            {NAV.map((n) => (
              <Link
                key={n.view}
                href={href(locale, n.view)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(n.view);
                }}
                aria-current={view === n.view ? "page" : undefined}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  view === n.view || (n.view === "topics" && view === "topic") || (n.view === "projects" && view === "project") || (n.view === "sources" && view === "source")
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-secondary"
                }`}
              >
                {t.nav[n.key]}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2">
            {c.done > 0 || c.inProgress > 0 ? (
              <span className="hidden sm:inline-flex text-xs text-muted-foreground rounded-full border border-border px-2.5 py-1" title={t.progress.languageIndependent}>
                {c.done} {t.progress.stats.done}
              </span>
            ) : null}
            <button
              onClick={onSwitchLang}
              className="rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-colors"
              aria-label={locale === "fa" ? "Switch to English" : "تغییر به فارسی"}
            >
              {locale === "fa" ? "English" : "فارسی"}
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-border h-8 w-8 grid place-items-center hover:bg-secondary transition-colors"
              aria-label={theme === "dark" ? t.common.light : t.common.dark}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button
              onClick={() => navigate("progress")}
              className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
            >
              {t.progress.title}
            </button>
          </div>
        </div>
        {/* mobile nav */}
        <nav aria-label={locale === "fa" ? "ناوبری موبایل" : "Mobile"} className="md:hidden border-t border-border/60">
          <div className="mx-auto max-w-6xl px-4 flex gap-1 overflow-x-auto py-1.5">
            {NAV.map((n) => (
              <Link
                key={n.view}
                href={href(locale, n.view)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(n.view);
                }}
                aria-current={view === n.view ? "page" : undefined}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                  view === n.view ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary"
                }`}
              >
                {t.nav[n.key]}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main id="main" className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-8">
        {view === "home" && <Home ctx={ctx} />}
        {view === "onboarding" && <Onboarding ctx={ctx} />}
        {view === "roadmap" && <Roadmap ctx={ctx} />}
        {view === "topics" && <TopicsView ctx={ctx} />}
        {view === "topic" && <TopicDetail ctx={ctx} topicId={route.param} />}
        {view === "projects" && <ProjectsView ctx={ctx} />}
        {view === "project" && <ProjectDetail ctx={ctx} projectId={route.param} />}
        {view === "evidence" && <Evidence ctx={ctx} />}
        {view === "sources" && <SourcesView ctx={ctx} sourceId={route.param} />}
        {view === "source" && <SourcesView ctx={ctx} sourceId={route.param} />}
        {view === "methodology" && <SourcesView ctx={{ ...ctx, route: { ...ctx.route, view: "sources", param: null } }} sourceId={null} methodologyOnly />}
        {view === "assistant" && <Assistant ctx={ctx} />}
        {view === "progress" && <ProgressView ctx={ctx} />}
      </main>

      <footer className="mt-auto border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid gap-2 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-medium text-foreground">{t.brand} · {t.brandNote}</span>
            <button onClick={() => navigate("methodology")} className="underline underline-offset-2 hover:text-foreground">
              {t.nav.sources}
            </button>
            <button onClick={() => navigate("evidence")} className="underline underline-offset-2 hover:text-foreground">
              {t.nav.evidence}
            </button>
          </div>
          <p>{t.footer.tagline}</p>
          <p className="text-xs">{t.footer.repoNote}</p>
          <p className="text-xs">{t.footer.disclaimer}</p>
          {profile ? null : (
            <button onClick={() => navigate("onboarding")} className="justify-self-start mt-1 rounded-lg border border-border px-3 py-1.5 hover:bg-secondary">
              {t.nav.onboarding}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
