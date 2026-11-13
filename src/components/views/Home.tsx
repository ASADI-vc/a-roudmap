"use client";

import type { AppCtx } from "../AppRoot";
import { GlassCard, Pill, ProgressRing, TrackPill } from "../ui-bits";
import { topics, topicById } from "@/content/topics";
import { projects } from "@/content/projects";
import { claims } from "@/content/claims";
import { sources } from "@/content/sources";
import { useProgress, statusOf } from "@/lib/progress";
import { useProfile } from "@/lib/profile";
import { recommend } from "@/lib/profile";
import { formatNum } from "@/lib/locale";

export default function Home({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);
  const profile = useProfile((s) => s.profile);
  const total = topics.length;
  const doneCount = Object.values(progress.topics).filter((v) => v === "done").length;

  const rec = profile ? recommend(profile, progress.topics) : null;
  const continueTopicId =
    // last in-progress, else next recommended, else first core topic
    Object.entries(progress.topics).find(([, v]) => v === "in-progress")?.[0] ??
    rec?.startTopicIds[0] ??
    "t-computational-thinking";
  const continueTopic = topicById.get(continueTopicId);

  return (
    <div className="space-y-12">
      {/* hero */}
      <section className="pt-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{t.home.heroTitle}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t.home.heroBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("onboarding")}
              className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:opacity-90 transition-opacity"
            >
              {t.home.heroCta}
            </button>
            <button
              onClick={() => navigate("roadmap")}
              className="rounded-xl border border-border px-5 py-2.5 font-medium glass glass-hover hover:bg-secondary"
            >
              {t.home.heroCtaAlt}
            </button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: topics.length, l: t.home.quickStats[0].label },
            { v: projects.length, l: t.home.quickStats[1].label },
            { v: sources.length, l: t.home.quickStats[2].label },
            { v: claims.length, l: t.home.quickStats[3].label },
          ].map((s, i) => (
            <GlassCard key={i} className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{formatNum(s.v, locale)}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* continue learning */}
      <section aria-labelledby="continue-h">
        <h2 id="continue-h" className="text-xl font-bold mb-3">{t.home.continueTitle}</h2>
        {continueTopic ? (
          <GlassCard strong className="p-5 flex flex-wrap items-center gap-4">
            <TrackPill track={continueTopic.track} locale={locale} />
            <div className="flex-1 min-w-48">
              <p className="font-semibold">{continueTopic.title[locale]}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{continueTopic.summary[locale]}</p>
            </div>
            <ProgressRing done={doneCount} total={total} locale={locale} />
            <button
              onClick={() => navigate("topic", continueTopic.id)}
              className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              {t.topics.continueBtn}
            </button>
          </GlassCard>
        ) : (
          <GlassCard className="p-5 text-sm text-muted-foreground">{t.home.continueNone}</GlassCard>
        )}
      </section>

      {/* journeys */}
      <section aria-labelledby="journeys-h">
        <h2 id="journeys-h" className="text-xl font-bold mb-3">{t.home.journeysTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {t.home.journeys.map((j, i) => (
            <GlassCard key={i} hover className="p-5 flex flex-col">
              <h3 className="font-semibold text-lg">{j.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{j.body}</p>
              <button
                onClick={() => navigate("onboarding")}
                className="mt-4 justify-self-start rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary w-fit"
              >
                {j.cta} →
              </button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* evidence teaser */}
      <section aria-labelledby="ev-h">
        <GlassCard strong className="p-6">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex-1 min-w-72">
              <h2 id="ev-h" className="text-xl font-bold">{t.home.evidenceTeaserTitle}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{t.home.evidenceTeaserBody}</p>
              <button
                onClick={() => navigate("evidence")}
                className="mt-4 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
              >
                {t.home.evidenceCta} →
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Pill className="bg-primary/10 text-primary">+55.8% — Peng 2023</Pill>
              <Pill className="bg-amber-500/10 text-amber-600 dark:text-amber-400">−19% — METR 2025</Pill>
              <Pill className="bg-rose-500/10 text-rose-600 dark:text-rose-400">−7.2% stability — DORA 2024</Pill>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
