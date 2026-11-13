"use client";

import { useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, Pill } from "../ui-bits";
import { projects } from "@/content/projects";
import { topicById } from "@/content/topics";
import type { Project } from "@/content/types";
import { useProgress, statusOf, type ProjectAssessment } from "@/lib/progress";
import { formatDate } from "@/lib/locale";

export default function ProjectDetail({ ctx, projectId }: { ctx: AppCtx; projectId: string | null }) {
  const project = projectId ? projects.find((p) => p.id === projectId) : undefined;
  const navigate = ctx.navigate;
  if (!project) {
    navigate("projects");
    return null;
  }
  return <ProjectForm key={project.id} ctx={ctx} project={project} />;
}

function ProjectForm({ ctx, project }: { ctx: AppCtx; project: Project }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);
  const setProjectAssessment = useProgress((s) => s.setProjectAssessment);
  const [levels, setLevels] = useState<Record<string, number>>(() => progress.projects[project.id]?.levels ?? {});
  const [savedFlash, setSavedFlash] = useState(false);

  const save = () => {
    const a: ProjectAssessment = { levels, savedAt: new Date().toISOString() };
    setProjectAssessment(project.id, a);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate("projects")} className="text-sm text-muted-foreground hover:text-foreground">
        ← {t.projects.title}
      </button>

      <GlassCard strong className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.trackFocus.map((tr) => (
            <Pill key={tr} className={`track-${tr}`}>{tr}</Pill>
          ))}
          <span className="text-xs text-muted-foreground ms-auto">
            {t.common.lastReview}: {formatDate(project.lastReview, locale)}
          </span>
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">{project.title[locale]}</h1>
        <div className="prose-masir mt-4 text-[15px]">{project.spec[locale]}</div>
      </GlassCard>

      <GlassCard className="p-6 glass-reading">
        <h2 className="font-bold mb-3">{t.projects.constraints}</h2>
        <ul className="grid gap-2">
          {project.constraints[locale].map((c, i) => (
            <li key={i} className="flex gap-2 text-[15px]">
              <span aria-hidden="true" className="text-amber-600 dark:text-amber-400">▸</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <h2 className="font-bold mt-6 mb-3">{t.projects.acceptance}</h2>
        <ul className="grid gap-2">
          {project.acceptance[locale].map((c, i) => (
            <li key={i} className="flex gap-2 text-[15px]">
              <span aria-hidden="true" className="text-primary">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-6 glass-reading border-primary/20">
        <h2 className="font-bold mb-2">{t.projects.aiPolicy}</h2>
        <p className="text-[15px] leading-relaxed">{project.aiPolicy[locale]}</p>
      </GlassCard>

      <section aria-labelledby="rubric-h">
        <h2 id="rubric-h" className="text-lg font-bold mb-1">{t.projects.rubric}</h2>
        <p className="text-xs text-muted-foreground mb-4">{t.projects.rubricHint}</p>
        <div className="grid gap-4">
          {project.rubric.map((r) => (
            <GlassCard key={r.id} className="p-5">
              <h3 className="font-semibold text-sm">{r.criterion[locale]}</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {r.levels[locale].map((label, levelIdx) => (
                  <button
                    key={levelIdx}
                    onClick={() => setLevels((l) => ({ ...l, [r.id]: levelIdx }))}
                    aria-pressed={levels[r.id] === levelIdx}
                    className={`rounded-xl border px-3 py-2.5 text-xs leading-snug transition-colors ${
                      levels[r.id] === levelIdx
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <span className="block font-bold mb-1">{t.projects.rubricLevels[levelIdx]}</span>
                    {label}
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button onClick={save} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            {t.projects.saveAssessment}
          </button>
          {savedFlash ? <span className="text-sm text-primary">{t.projects.savedNote}</span> : null}
        </div>
      </section>

      <section aria-labelledby="ptopics-h" className="pb-8">
        <h2 id="ptopics-h" className="text-lg font-bold mb-3">{t.projects.topics}</h2>
        <div className="flex flex-wrap gap-2">
          {project.topicIds.map((id) => (
            <button key={id} onClick={() => navigate("topic", id)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
              {topicById.get(id)?.title[locale]} →
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}
