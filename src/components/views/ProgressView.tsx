"use client";

import { useRef, useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, SectionTitle } from "../ui-bits";
import { useProgress, counts, statusOf } from "@/lib/progress";
import { topics, topicById } from "@/content/topics";
import { formatNum } from "@/lib/locale";

export default function ProgressView({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);
  const { setTopicStatus, resetAll, importState, exportState } = useProgress.getState();
  const fileRef = useRef<HTMLInputElement>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const c = counts(progress);
  const tracked = Object.entries(progress.topics).filter(([, v]) => v !== "not-started");

  const doExport = () => {
    const data = exportState();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `masir-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doImport = (file: File) => {
    file.text().then((txt) => {
      const ok = importState(txt);
      setFlash(ok ? t.progress.importSuccess : t.progress.importInvalid);
      setTimeout(() => setFlash(null), 3000);
    });
  };

  const doReset = () => {
    if (window.confirm(t.progress.resetConfirm)) resetAll();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SectionTitle title={t.progress.title} body={t.progress.body} />

      <GlassCard strong className="p-6">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{formatNum(c.done, locale)}</div>
            <div className="text-xs text-muted-foreground">{t.progress.stats.done}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{formatNum(c.inProgress, locale)}</div>
            <div className="text-xs text-muted-foreground">{t.progress.stats.inProgress}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{formatNum(c.projects, locale)}</div>
            <div className="text-xs text-muted-foreground">{t.progress.stats.projects}</div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">{t.progress.languageIndependent}</p>
      </GlassCard>

      <section aria-labelledby="tracked-h">
        <h2 id="tracked-h" className="text-lg font-bold mb-3">{t.topics.progressSummary}</h2>
        {tracked.length === 0 ? (
          <GlassCard className="p-6 text-center text-sm text-muted-foreground">{t.progress.empty}</GlassCard>
        ) : (
          <div className="grid gap-2">
            {tracked.map(([id, st]) => (
              <GlassCard key={id} className="p-3 flex flex-wrap items-center gap-3">
                <button onClick={() => navigate("topic", id)} className="font-medium text-sm hover:underline text-start">
                  {topicById.get(id)?.title[locale] ?? id}
                </button>
                <span className="ms-auto flex items-center gap-2">
                  <span className={`text-xs ${st === "done" ? "text-primary" : "text-amber-600 dark:text-amber-400"}`}>
                    {st === "done" ? t.roadmap.statusDone : t.roadmap.statusInProgress}
                  </span>
                  {st === "done" ? (
                    <button
                      onClick={() => setTopicStatus(id, "in-progress")}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      {t.topics.markInProgress}
                    </button>
                  ) : (
                    <button
                      onClick={() => setTopicStatus(id, "done")}
                      className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                      {t.topics.markDone}
                    </button>
                  )}
                </span>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      <GlassCard className="p-6">
        <h2 className="font-bold mb-4">{t.progress.title} — {t.common.export} / {t.common.import} / {t.common.reset}</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={doExport} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
            {t.progress.exportBtn}
          </button>
          <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
            {t.progress.importBtn}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="sr-only"
            aria-label={t.progress.importBtn}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) doImport(f);
              e.target.value = "";
            }}
          />
          <button onClick={doReset} className="rounded-lg border border-rose-500/40 text-rose-600 dark:text-rose-400 px-4 py-2 text-sm hover:bg-rose-500/10">
            {t.progress.resetBtn}
          </button>
        </div>
        {flash ? <p className="mt-3 text-sm text-primary">{flash}</p> : null}
      </GlassCard>
    </div>
  );
}
