"use client";

import { useMemo, useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, StatusBadge, TrackPill } from "../ui-bits";
import { topics, topicById } from "@/content/topics";
import { projects } from "@/content/projects";
import { claims } from "@/content/claims";
import { sources } from "@/content/sources";
import { LexicalIndex, type Doc, type SearchRecord } from "@/lib/search";
import { useProgress, statusOf, type TopicStatus } from "@/lib/progress";
import { formatNum } from "@/lib/locale";

type KindFilter = "all" | "topic" | "project" | "claim" | "source";
type StatusFilter = "all" | TopicStatus;
type TrackFilter = "all" | "core" | "frontend" | "backend" | "aiapps";

export default function TopicsView({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [track, setTrack] = useState<TrackFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  // build the search index once from all content (bilingual)
  const { index, records } = useMemo(() => {
    const recs: Array<{ id: string; parentKey: string; locale: "fa" | "en"; text: string; rec: SearchRecord; boost?: number }> = [];
    for (const tt of topics) {
      for (const l of ["fa", "en"] as const) {
        recs.push({
          id: `topic-${tt.id}-${l}`,
          parentKey: `topic:${tt.id}`,
          locale: l,
          boost: 1.2,
          text: `${tt.title[l]} ${tt.summary[l]} ${tt.why[l]} ${tt.terms.map((x) => x[l]).join(" ")}`,
          rec: {
            kind: "topic",
            id: tt.id,
            title: tt.title[l],
            excerpt: tt.summary[l],
            href: `#/${l}/topic/${tt.id}`,
          },
        });
      }
    }
    for (const p of projects) {
      for (const l of ["fa", "en"] as const) {
        recs.push({
          id: `proj-${p.id}-${l}`,
          parentKey: `project:${p.id}`,
          locale: l,
          text: `${p.title[l]} ${p.spec[l]}`,
          rec: { kind: "project", id: p.id, title: p.title[l], excerpt: p.spec[l].slice(0, 140), href: `#/${l}/project/${p.id}` },
        });
      }
    }
    for (const c of claims) {
      for (const l of ["fa", "en"] as const) {
        recs.push({
          id: `claim-${c.id}-${l}`,
          parentKey: `claim:${c.id}`,
          locale: l,
          boost: 1.1,
          text: `${c.statement[l]}`,
          rec: { kind: "claim", id: c.id, title: `${c.id} — ${c.statement[l].slice(0, 60)}…`, excerpt: c.statement[l], href: `#/${l}/evidence` },
        });
      }
    }
    for (const s of sources) {
      for (const l of ["fa", "en"] as const) {
        recs.push({
          id: `src-${s.id}-${l}`,
          parentKey: `source:${s.id}`,
          locale: l,
          text: `${s.title} ${s.org} ${s.desc[l]}`,
          rec: { kind: "source", id: s.id, title: s.title, excerpt: s.desc[l], href: `#/${l}/source/${s.id}` },
        });
      }
    }
    return { index: new LexicalIndex(recs as Doc[]), records: recs };
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    let hits: SearchRecord[] = [];
    if (q.length >= 2) {
      hits = index
        .search(q, 40)
        .map((h) => records.find((r) => r.id === h.doc.id)?.rec)
        .filter((r): r is SearchRecord => !!r);
      // dedupe by kind+id (both locales)
      const seen = new Set<string>();
      hits = hits.filter((h) => {
        const k = `${h.kind}:${h.id}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    const filterRec = (r: SearchRecord) =>
      (kind === "all" || r.kind === kind) &&
      (r.kind !== "topic" || track === "all" || topicById.get(r.id)?.track === track);

    if (q.length >= 2) return hits.filter(filterRec);

    // no query: list topics (optionally filtered), sorted by track+order
    const out: SearchRecord[] = [];
    for (const tt of [...topics].sort((a, b) => (a.track === b.track ? a.order - b.order : a.track.localeCompare(b.track)))) {
      if (track !== "all" && tt.track !== track) continue;
      if (status !== "all" && statusOf(progress, tt.id) !== status) continue;
      out.push({
        kind: "topic",
        id: tt.id,
        title: tt.title[locale],
        excerpt: tt.summary[locale],
        href: `#/${locale}/topic/${tt.id}`,
      });
    }
    return out;
  }, [query, index, records, kind, track, status, locale, progress]);

  const selectCls = "rounded-lg border border-border bg-transparent px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.topics.title}</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">{t.topics.body}</p>
      </div>

      <GlassCard className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            aria-label={t.common.search}
            className="flex-1 min-w-56 rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm placeholder:text-muted-foreground"
          />
          <label className="sr-only" htmlFor="kind-f">{t.common.all}</label>
          <select id="kind-f" value={kind} onChange={(e) => setKind(e.target.value as KindFilter)} className={selectCls}>
            <option value="all">{t.common.all}</option>
            <option value="topic">{t.topics.title}</option>
            <option value="project">{t.projects.title}</option>
            <option value="claim">{t.evidence.title.split(" ")[0]}</option>
            <option value="source">{t.sources.title}</option>
          </select>
          <label className="sr-only" htmlFor="track-f">{t.topics.track}</label>
          <select id="track-f" value={track} onChange={(e) => setTrack(e.target.value as TrackFilter)} className={selectCls}>
            <option value="all">{t.topics.track}: {t.common.all}</option>
            <option value="core">{t.nav.topics} — core</option>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
            <option value="aiapps">aiapps</option>
          </select>
          {kind === "topic" || kind === "all" ? (
            <>
              <label className="sr-only" htmlFor="status-f">{t.topics.status}</label>
              <select id="status-f" value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} className={selectCls}>
                <option value="all">{t.topics.status}: {t.common.all}</option>
                <option value="not-started">{t.roadmap.statusNotStarted}</option>
                <option value="in-progress">{t.roadmap.statusInProgress}</option>
                <option value="done">{t.roadmap.statusDone}</option>
              </select>
            </>
          ) : null}
        </div>
      </GlassCard>

      {results.length === 0 ? (
        <GlassCard className="p-8 text-center text-muted-foreground">{t.common.noResults}</GlassCard>
      ) : (
        <div className="grid gap-3">
          {results.map((r) => {
            const status = r.kind === "topic" ? statusOf(progress, r.id) : null;
            return (
              <GlassCard key={`${r.kind}:${r.id}`} hover className="p-4">
                <button
                  onClick={() => {
                    if (r.kind === "claim") navigate("evidence");
                    else navigate(r.kind === "topic" ? "topic" : r.kind === "project" ? "project" : "source", r.id);
                  }}
                  className="w-full text-start"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {r.kind === "topic" ? <TrackPill track={topicById.get(r.id)?.track ?? "core"} locale={locale} /> : <KindPill kind={r.kind} t={t} />}
                    {status ? <StatusBadge status={status} t={t.roadmap} /> : null}
                    <span className="text-xs text-muted-foreground ms-auto">{r.kind === "topic" ? formatNum(topicById.get(r.id)?.order ?? 0, locale) : ""}</span>
                  </div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{r.excerpt}</p>
                </button>
              </GlassCard>
            );
          })}
        </div>
      )}
      <p className="text-xs text-muted-foreground">{formatNum(results.length, locale)} {t.topics.count}</p>
    </div>
  );
}

function KindPill({ kind, t }: { kind: SearchRecord["kind"]; t: AppCtx["t"] }) {
  const label = kind === "project" ? t.projects.title : kind === "claim" ? t.evidence.title.split(" ")[0] : kind === "source" ? t.sources.title : t.topics.title;
  return <span className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{label}</span>;
}
