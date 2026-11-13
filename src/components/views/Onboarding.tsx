"use client";

import { useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, TrackPill } from "../ui-bits";
import { topics, topicById } from "@/content/topics";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { useProfile, recommend, type Profile, type Background, type Goal, type Pace } from "@/lib/profile";
import { useProgress } from "@/lib/progress";

export default function Onboarding({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const setProfileStore = useProfile((s) => s.setProfile);
  const progress = useProgress((s) => s._state);

  const [background, setBackground] = useState<Background | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [pace, setPace] = useState<Pace | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const rec = background && goal && pace ? recommend({ background, goal, pace }, progress.topics) : null;
  const firstProject: Project | undefined = projects.find((p) => p.id === rec?.firstProject);

  const submit = () => {
    if (!background || !goal || !pace) return;
    const p: Profile = { background, goal, pace };
    setProfileStore(p);
    setSubmitted(true);
  };

  const Option = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`text-start rounded-xl border px-4 py-3 text-sm transition-colors ${
        active ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-secondary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.onboarding.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.onboarding.body}</p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <fieldset>
          <legend className="font-semibold mb-3">{t.onboarding.q1}</legend>
          <div className="grid sm:grid-cols-3 gap-3">
            {t.onboarding.q1opts.map((o) => (
              <Option key={o.value} label={o.label} active={background === o.value} onClick={() => { setBackground(o.value as Background); setSubmitted(false); }} />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold mb-3">{t.onboarding.q2}</legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.onboarding.q2opts.map((o) => (
              <Option key={o.value} label={o.label} active={goal === o.value} onClick={() => { setGoal(o.value as Goal); setSubmitted(false); }} />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold mb-3">{t.onboarding.q3}</legend>
          <div className="grid sm:grid-cols-3 gap-3">
            {t.onboarding.q3opts.map((o) => (
              <Option key={o.value} label={o.label} active={pace === o.value} onClick={() => { setPace(o.value as Pace); setSubmitted(false); }} />
            ))}
          </div>
        </fieldset>
        <div className="flex items-center gap-3">
          <button
            onClick={submit}
            disabled={!background || !goal || !pace}
            className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-medium disabled:opacity-40"
          >
            {t.onboarding.submit}
          </button>
        </div>
      </GlassCard>

      {submitted && rec ? (
        <GlassCard strong className="p-6">
          <h2 className="text-xl font-bold">{t.onboarding.resultTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.onboarding.resultPace[rec.paceNoteKey]}</p>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">{t.onboarding.resultTrack}</h3>
              <div className="mt-2"><TrackPill track={rec.track === "core" ? "core" : rec.track} locale={locale} /></div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">{t.onboarding.resultStart}</h3>
              <ul className="mt-2 space-y-2">
                {rec.startTopicIds.map((id) => {
                  const tt = topicById.get(id);
                  if (!tt) return null;
                  return (
                    <li key={id}>
                      <button onClick={() => navigate("topic", id)} className="w-full text-start rounded-xl border border-border px-4 py-3 hover:bg-secondary glass-hover">
                        <span className="font-medium">{tt.title[locale]}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">{tt.summary[locale]}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {rec.skimIds.length ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.topics.skipAhead}: {rec.skimIds.map((id) => topicById.get(id)?.title[locale]).filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </div>

            {firstProject ? (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">{t.onboarding.resultProject}</h3>
                <button onClick={() => navigate("project", firstProject.id)} className="mt-2 w-full text-start rounded-xl border border-border px-4 py-3 hover:bg-secondary">
                  <span className="font-medium">{firstProject.title[locale]}</span>
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate("roadmap")} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              {t.roadmap.title} →
            </button>
            <button onClick={() => navigate("topics")} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              {t.topics.title} →
            </button>
          </div>
        </GlassCard>
      ) : null}
    </div>
  );
}
