"use client";

import type { AppCtx } from "../AppRoot";
import { GlassCard, Pill } from "../ui-bits";
import { projects } from "@/content/projects";
import { topicById } from "@/content/topics";
import { useProgress } from "@/lib/progress";
import { formatNum } from "@/lib/locale";

export default function ProjectsView({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);

  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold">{t.projects.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.projects.body}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => {
          const assessed = progress.projects[p.id];
          return (
            <GlassCard key={p.id} hover className="p-5 flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">{formatNum(p.order, locale)}</span>
                {p.trackFocus.map((tr) => (
                  <Pill key={tr} className={`track-${tr}`}>{tr}</Pill>
                ))}
                {assessed ? <Pill className="ms-auto bg-primary/10 text-primary">✓ {t.projects.rubric}</Pill> : null}
              </div>
              <h2 className="mt-3 text-lg font-semibold">{p.title[locale]}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-4">{p.spec[locale]}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {t.projects.topics}: {p.topicIds.map((id) => topicById.get(id)?.title[locale]).filter(Boolean).slice(0, 4).join(" · ")}
                {p.topicIds.length > 4 ? "…" : ""}
              </p>
              <button
                onClick={() => navigate("project", p.id)}
                className="mt-4 w-fit rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                {t.common.readMore} →
              </button>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
