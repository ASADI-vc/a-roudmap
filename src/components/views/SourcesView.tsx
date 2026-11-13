"use client";

import type { AppCtx } from "../AppRoot";
import { GlassCard, Pill, SectionTitle } from "../ui-bits";
import { sources } from "@/content/sources";
import { claims } from "@/content/claims";
import { topics } from "@/content/topics";
import { formatNum } from "@/lib/locale";

const TYPE_LABEL: Record<string, { fa: string; en: string }> = {
  curriculum: { fa: "برنامه درسی/استاندارد", en: "Curriculum / standard" },
  "peer-reviewed": { fa: "داوری‌شده", en: "Peer-reviewed" },
  "meta-analysis": { fa: "فراتحلیل", en: "Meta-analysis" },
  survey: { fa: "نظرسنجی", en: "Survey" },
  "official-docs": { fa: "مستندات رسمی", en: "Official docs" },
  "industry-report": { fa: "گزارش صنعت", en: "Industry report" },
  standards: { fa: "استاندارد", en: "Standards" },
  "vendor-docs": { fa: "مستندات فروشنده", en: "Vendor docs" },
  practitioner: { fa: "تجربه‌ی عملی", en: "Practitioner" },
};

export default function SourcesView({
  ctx,
  sourceId,
  methodologyOnly = false,
}: {
  ctx: AppCtx;
  sourceId: string | null;
  methodologyOnly?: boolean;
}) {
  const { locale, t, navigate } = ctx;

  const Methodology = (
    <section aria-labelledby="method-h" className="space-y-4">
      <SectionTitle title={t.sourcesPage.title} body={t.sourcesPage.body} />
      <GlassCard className="p-6 glass-reading">
        <h2 id="method-h" className="font-bold mb-3">{t.sourcesPage.methodTitle}</h2>
        <ul className="grid gap-2">
          {t.sourcesPage.methodItems.map((m, i) => (
            <li key={i} className="flex gap-2 text-[15px] leading-relaxed">
              <span aria-hidden="true" className="text-primary">§</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
      <GlassCard className="p-6">
        <h2 className="font-bold mb-2">{t.sourcesPage.accessTitle}</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><span className="text-primary">●</span> {t.sourcesPage.accessFull}</li>
          <li><span className="text-amber-600 dark:text-amber-400">◐</span> {t.sourcesPage.accessPartial}</li>
          <li><span className="text-rose-600 dark:text-rose-400">○</span> {t.sourcesPage.accessInaccessible}</li>
        </ul>
      </GlassCard>
      <GlassCard className="p-6">
        <h2 className="font-bold mb-2">{t.sourcesPage.corpusTitle}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{t.sourcesPage.corpusBody}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatNum(topics.length, locale)} {t.topics.count} · {formatNum(claims.length, locale)} {t.common.claims} · {formatNum(sources.length, locale)} {t.sources.title}
        </p>
      </GlassCard>
    </section>
  );

  if (methodologyOnly) return <div className="max-w-3xl mx-auto">{Methodology}</div>;

  const source = sourceId ? sources.find((s) => s.id === sourceId) : undefined;

  if (source) {
    const citingClaims = claims.filter((c) => c.sourceIds.includes(source.id));
    return (
      <article className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate("sources")} className="text-sm text-muted-foreground hover:text-foreground">
          ← {t.sources.title}
        </button>
        <GlassCard strong className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Pill>{TYPE_LABEL[source.type]?.[locale] ?? source.type}</Pill>
            <Pill className="text-muted-foreground">{source.year === "unknown" ? "—" : source.year}</Pill>
            <Pill className={source.accessStatus === "full" ? "text-primary" : source.accessStatus === "partial" ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}>
              {source.accessStatus === "full" ? t.sourcesPage.accessFull : source.accessStatus === "partial" ? t.sourcesPage.accessPartial : t.sourcesPage.accessInaccessible}
            </Pill>
          </div>
          <h1 className="text-2xl font-bold leading-snug" lang="en">{source.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {source.org} · <a href={source.url} target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-2 break-all">{source.url}</a>
          </p>
          <div className="prose-masir mt-4 text-[15px]">{source.desc[locale]}</div>
        </GlassCard>
        {citingClaims.length ? (
          <GlassCard className="p-6">
            <h2 className="font-bold mb-3">{t.common.claims}</h2>
            <ul className="grid gap-2">
              {citingClaims.map((c) => (
                <li key={c.id} className="text-sm leading-relaxed">
                  <Pill className="text-primary">{c.id}</Pill>
                  <span className="ms-2">{c.statement[locale]}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("evidence")} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              {t.evidence.title} →
            </button>
          </GlassCard>
        ) : null}
      </article>
    );
  }

  return (
    <div className="space-y-6">
      {Methodology}
      <section aria-labelledby="lib-h">
        <h2 id="lib-h" className="text-xl font-bold mb-1">{t.sources.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t.sources.body}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {sources.map((s) => (
            <GlassCard key={s.id} hover className="p-4">
              <button onClick={() => navigate("source", s.id)} className="w-full text-start">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Pill className="text-muted-foreground">{TYPE_LABEL[s.type]?.[locale] ?? s.type}</Pill>
                  <Pill className="text-muted-foreground">{s.year === "unknown" ? "—" : s.year}</Pill>
                  <span className={`ms-auto text-xs ${s.accessStatus === "full" ? "text-primary" : s.accessStatus === "partial" ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {s.accessStatus === "full" ? "●" : s.accessStatus === "partial" ? "◐" : "○"}
                  </span>
                </div>
                <h3 className="font-medium text-sm leading-snug" lang="en">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.desc[locale]}</p>
              </button>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
