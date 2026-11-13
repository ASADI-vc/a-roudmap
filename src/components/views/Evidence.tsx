"use client";

import { useMemo, useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, Pill, SectionTitle } from "../ui-bits";
import { claims, claimById } from "@/content/claims";
import { sourceById } from "@/content/sources";
import type { ClaimKind } from "@/content/types";
import { formatNum } from "@/lib/locale";

const KINDS: ClaimKind[] = ["causal", "observed", "survey", "forecast", "recommendation"];

export default function Evidence({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const [kindFilter, setKindFilter] = useState<"all" | ClaimKind>("all");

  const kindCls = (k: ClaimKind) =>
    k === "causal"
      ? "bg-primary/10 text-primary border-primary/30"
      : k === "observed"
        ? "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30"
        : k === "survey"
          ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
          : k === "forecast"
            ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30"
            : "bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-500/30";

  const shown = useMemo(() => claims.filter((c) => kindFilter === "all" || c.kind === kindFilter), [kindFilter]);

  const highlight = (title: string, body: string, accent: string) => (
    <GlassCard className={`p-5 ${accent}`}>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </GlassCard>
  );

  return (
    <div className="space-y-8">
      <SectionTitle title={t.evidence.title} body={t.evidence.body} />

      <div className="grid gap-4 lg:grid-cols-2">
        {highlight(t.evidence.disagreementsTitle, t.evidence.disagreementsBody, "border-primary/30")}
        {highlight(t.evidence.juniorTitle, t.evidence.juniorBody, "border-amber-500/30")}
        {highlight(t.evidence.trustTitle, t.evidence.trustBody, "border-teal-500/30")}
        {highlight(t.evidence.gapTitle, t.evidence.gapBody, "border-rose-500/30")}
      </div>

      <section aria-labelledby="claims-h">
        <h2 id="claims-h" className="text-xl font-bold mb-3">{t.common.claims} ({formatNum(claims.length, locale)})</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setKindFilter("all")}
            className={`rounded-full border px-3 py-1.5 text-xs ${kindFilter === "all" ? "bg-primary/10 text-primary border-primary/30 font-medium" : "border-border hover:bg-secondary"}`}
          >
            {t.common.all}
          </button>
          {KINDS.map((k) => (
            <button
              key={k}
              onClick={() => setKindFilter(k)}
              className={`rounded-full border px-3 py-1.5 text-xs ${kindFilter === k ? "font-medium " + kindCls(k) : "border-border hover:bg-secondary"}`}
            >
              {t.evidence.kindLabels[k]}
            </button>
          ))}
        </div>
        <div className="grid gap-3">
          {shown.map((c) => (
            <GlassCard key={c.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Pill className={kindCls(c.kind)}>{t.evidence.kindLabels[c.kind]}</Pill>
                <Pill className="text-muted-foreground">{c.id}</Pill>
                {c.volatile ? <Pill className="bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30">volatile</Pill> : null}
              </div>
              <p className="text-[15px] leading-relaxed">{c.statement[locale]}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                <strong className="font-semibold">{locale === "fa" ? "محدودیت‌ها: " : "Caveats: "}</strong>
                {c.caveats[locale]}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.sourceIds.map((sid) => (
                  <button key={sid} onClick={() => navigate("source", sid)} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-secondary">
                    {sourceById.get(sid)?.title.slice(0, 48)}… →
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
