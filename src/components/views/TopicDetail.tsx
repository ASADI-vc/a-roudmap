"use client";

import { useEffect } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, StatusBadge, TrackPill, Pill } from "../ui-bits";

function SectionH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold mt-8 mb-3 flex items-center gap-2">{children}</h2>;
}
import { topicById, topics } from "@/content/topics";
import { claimById } from "@/content/claims";
import { sourceById } from "@/content/sources";
import { useProgress, statusOf } from "@/lib/progress";
import { unlocks } from "@/lib/graph";
import { formatNum, formatDate } from "@/lib/locale";

export default function TopicDetail({ ctx, topicId }: { ctx: AppCtx; topicId: string | null }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);
  const setTopicStatus = useProgress((s) => s.setTopicStatus);
  const setExerciseDone = useProgress((s) => s.setExerciseDone);
  const setCheckDone = useProgress((s) => s.setCheckDone);

  const topic = topicId ? topicById.get(topicId) : undefined;

  useEffect(() => {
    if (!topic) navigate("topics");
  }, [topic, navigate]);

  if (!topic) return null;

  const status = statusOf(progress, topic.id);
  const exerciseDone = !!progress.exercises[topic.id];
  const checkDone = !!progress.checks[topic.id];
  const unlocked = unlocks(topics, topic.id);

  return (
    <article className="max-w-3xl mx-auto">
      <button onClick={() => navigate("topics")} className="text-sm text-muted-foreground hover:text-foreground mb-4">
        ← {t.topics.title}
      </button>

      <GlassCard strong className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <TrackPill track={topic.track} locale={locale} />
          <StatusBadge status={status} t={t.roadmap} />
          <span className="text-xs text-muted-foreground ms-auto">
            {t.common.lastReview}: {formatDate(topic.lastReview, locale)}
          </span>
        </div>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">{topic.title[locale]}</h1>

        {/* terminology */}
        <div className="mt-3 flex flex-wrap gap-2">
          {topic.terms.map((term, i) => (
            <Pill key={i} className="text-muted-foreground">{term[locale]}</Pill>
          ))}
        </div>

        <div className="prose-masir mt-5 text-[15px]">{topic.summary[locale]}</div>

        <div className="mt-5 flex flex-wrap gap-2">
          {status !== "done" ? (
            <button
              onClick={() => setTopicStatus(topic.id, "done")}
              className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              {t.topics.markDone}
            </button>
          ) : null}
          {status === "not-started" ? (
            <button
              onClick={() => setTopicStatus(topic.id, "in-progress")}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              {t.topics.markInProgress}
            </button>
          ) : null}
          {status !== "not-started" ? (
            <button
              onClick={() => setTopicStatus(topic.id, "not-started")}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary text-muted-foreground"
            >
              {t.topics.markReset}
            </button>
          ) : null}
        </div>
      </GlassCard>

      {/* prerequisites */}
      {topic.prereqs.length ? (
        <section aria-labelledby="prereq-h">
          <SectionH2>{t.common.prerequisites}</SectionH2>
          <div className="flex flex-wrap gap-2">
            {topic.prereqs.map((p) => (
              <button key={p} onClick={() => navigate("topic", p)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
                {topicById.get(p)?.title[locale]} →
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {/* outcomes */}
      <section aria-labelledby="outcomes-h">
        <SectionH2>{t.topics.outcomesTitle}</SectionH2>
        <ul className="grid gap-2">
          {topic.outcomes[locale].map((o, i) => (
            <li key={i} className="flex gap-2 text-[15px] leading-relaxed">
              <span aria-hidden="true" className="text-primary mt-0.5">◆</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* why */}
      <GlassCard className="p-5 mt-8 glass-reading">
        <h2 className="font-bold mb-2">{t.topics.whyTitle}</h2>
        <div className="prose-masir text-[15px]">{topic.why[locale]}</div>
      </GlassCard>

      {/* depth */}
      <section className="grid gap-4 sm:grid-cols-2 mt-8" aria-label={t.topics.essentialTitle}>
        <GlassCard className="p-5">
          <h3 className="font-semibold text-sm text-primary">{t.topics.essentialTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed">{topic.essential[locale]}</p>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="font-semibold text-sm text-muted-foreground">{t.topics.optionalTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed">{topic.optional[locale]}</p>
        </GlassCard>
      </section>

      {topic.skipAhead ? (
        <GlassCard className="p-4 mt-4 border-dashed">
          <p className="text-sm"><strong className="text-primary">{t.topics.skipAhead}:</strong> {topic.skipAhead[locale]}</p>
        </GlassCard>
      ) : null}

      {/* exercise */}
      <section aria-labelledby="exercise-h" className="mt-8">
        <SectionH2>{t.topics.exercise}</SectionH2>
        <GlassCard className="p-5 glass-reading">
          <p className="text-[15px] leading-relaxed">{topic.exercise[locale]}</p>
          <label className="mt-4 flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={exerciseDone}
              onChange={(e) => setExerciseDone(topic.id, e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            {t.topics.exercise} ✓
          </label>
        </GlassCard>
      </section>

      {/* AI guidance */}
      <section aria-labelledby="ai-h">
        <SectionH2>{t.topics.aiTitle}</SectionH2>
        <GlassCard className="p-5 glass-reading border-primary/20">
          <p className="text-[15px] leading-relaxed">{topic.aiGuidance[locale]}</p>
        </GlassCard>
      </section>

      {/* understanding check */}
      <section aria-labelledby="check-h">
        <SectionH2>{t.topics.checkTitle}</SectionH2>
        <GlassCard strong className="p-5">
          <p className="text-xs text-muted-foreground mb-3">{t.topics.checkHint}</p>
          <p className="text-[15px] leading-relaxed">{topic.check[locale]}</p>
          <label className="mt-4 flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={checkDone}
              onChange={(e) => setCheckDone(topic.id, e.target.checked)}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            {t.topics.checkTitle} ✓
          </label>
        </GlassCard>
      </section>

      {/* completion criteria */}
      <section aria-labelledby="completion-h">
        <SectionH2>{t.topics.completionTitle}</SectionH2>
        <ul className="grid gap-2">
          {topic.completion[locale].map((c, i) => (
            <li key={i} className="flex gap-2 text-[15px]">
              <span aria-hidden="true" className="text-primary">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* resources */}
      <section aria-labelledby="res-h">
        <SectionH2>{t.common.resources}</SectionH2>
        <div className="grid gap-2">
          {topic.resources.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex flex-wrap items-center gap-2 rounded-xl border border-border px-4 py-3 hover:bg-secondary text-sm"
            >
              <span className="font-medium">{r.title}</span>
              <Pill>{r.lang === "en" ? "EN" : r.lang === "fa" ? "FA" : "FA/EN"}</Pill>
              <Pill>{t.common.free}</Pill>
              <span className="text-xs text-muted-foreground">{r.level}</span>
            </a>
          ))}
        </div>
      </section>

      {/* evidence */}
      {topic.claims.length || topic.sources.length ? (
        <section aria-labelledby="ev-h">
          <SectionH2>{t.evidence.title.split(" ")[0]} · {t.common.evidenceLabel}</SectionH2>
          <div className="grid gap-2">
            {topic.claims.map((cid) => (
              <button key={cid} onClick={() => navigate("evidence")} className="text-start rounded-xl border border-border px-4 py-3 text-sm hover:bg-secondary">
                <Pill className="text-primary">{cid}</Pill>
                <span className="ms-2 line-clamp-2">{claimById.get(cid)?.statement[locale]}</span>
              </button>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {topic.sources.map((sid) => (
                <button key={sid} onClick={() => navigate("source", sid)} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary">
                  {sourceById.get(sid)?.title} →
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* unlocks */}
      {unlocked.length ? (
        <section aria-labelledby="unlock-h" className="mb-8">
          <SectionH2>{t.common.unlocks}</SectionH2>
          <div className="flex flex-wrap gap-2">
            {unlocked.map((u) => (
              <button key={u} onClick={() => navigate("topic", u)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
                {topicById.get(u)?.title[locale]} →
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
