"use client";

import { useMemo, useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, StatusBadge, TrackPill } from "../ui-bits";
import { topics, topicById, branchStubs } from "@/content/topics";
import { tracks } from "@/content/tracks";
import { topoOrder, type GraphStats } from "@/lib/graph";
import { useProgress, statusOf } from "@/lib/progress";
import { formatNum } from "@/lib/locale";

const TRACK_X = { core: 0, frontend: 1, backend: 2, aiapps: 3 } as const;

export default function Roadmap({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const progress = useProgress((s) => s._state);
  const [view, setView] = useState<"graph" | "list">("graph");
  const [trackFilter, setTrackFilter] = useState<"all" | "core" | "frontend" | "backend" | "aiapps">("all");

  // layout: topological depth = longest prereq chain within the whole graph
  const { positions, edges, height, colWidth } = useMemo(() => {
    const order = topoOrder(topics);
    const depth = new Map<string, number>();
    for (const id of order) {
      const tt = topicById.get(id)!;
      const d = tt.prereqs.length === 0 ? 0 : Math.max(...tt.prereqs.map((p) => (depth.get(p) ?? 0) + 1));
      depth.set(id, d);
    }
    const colW = 232;
    const rowH = 118;
    const byTrack: Record<string, Array<{ id: string; depth: number; y: number }>> = { core: [], frontend: [], backend: [], aiapps: [] };
    const usedY = new Map<string, number>();
    for (const tr of tracks) {
      let y = 0;
      const nodes = topics
        .filter((tt) => tt.track === tr.id)
        .sort((a, b) => (depth.get(a.id) ?? 0) - (depth.get(b.id) ?? 0) || a.order - b.order);
      for (const n of nodes) {
        usedY.set(n.id, y);
        byTrack[tr.id].push({ id: n.id, depth: depth.get(n.id) ?? 0, y });
        y += rowH;
      }
    }
    const maxY = Math.max(...tracks.map((tr) => byTrack[tr.id].length * rowH));
    const pos = new Map<string, { x: number; y: number }>();
    for (const tr of tracks) {
      for (const n of byTrack[tr.id]) {
        pos.set(n.id, { x: TRACK_X[tr.id as keyof typeof TRACK_X] * colW + colW / 2 + 24, y: n.y + 52 });
      }
    }
    const e: Array<{ from: string; to: string }> = [];
    for (const tt of topics) for (const p of tt.prereqs) e.push({ from: p, to: tt.id });
    return { positions: pos, edges: e, height: maxY + 40, colWidth: colW };
  }, []);

  const width = colWidth * 4;

  const filteredTopics = useMemo(
    () => topics.filter((tt) => trackFilter === "all" || tt.track === trackFilter),
    [trackFilter],
  );

  const listOrder = useMemo(() => topoOrder(topics), []);

  const selectCls = "rounded-lg border border-border bg-transparent px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold">{t.roadmap.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.roadmap.body}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-border overflow-hidden" role="tablist" aria-label={t.roadmap.graphView}>
          <button
            role="tab"
            aria-selected={view === "graph"}
            onClick={() => setView("graph")}
            className={`px-4 py-2 text-sm ${view === "graph" ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary"}`}
          >
            {t.roadmap.graphView}
          </button>
          <button
            role="tab"
            aria-selected={view === "list"}
            onClick={() => setView("list")}
            className={`px-4 py-2 text-sm ${view === "list" ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary"}`}
          >
            {t.roadmap.listView}
          </button>
        </div>
        <label className="sr-only" htmlFor="roadmap-track">{t.roadmap.trackFilter}</label>
        <select id="roadmap-track" value={trackFilter} onChange={(e) => setTrackFilter(e.target.value as typeof trackFilter)} className={selectCls}>
          <option value="all">{t.roadmap.trackFilter}: {t.common.all}</option>
          {tracks.map((tr) => (
            <option key={tr.id} value={tr.id}>{tr.title[locale]}</option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">{formatNum(topics.length, locale)} {t.roadmap.topicCount} · 48 {t.roadmap.legendEssential}</span>
      </div>

      {view === "graph" ? (
        <GlassCard className="p-2 overflow-x-auto">
          <div className="relative" style={{ minWidth: width + 48, height }}>
            <svg width={width + 48} height={height} className="absolute inset-0" aria-hidden="true">
              {edges
                .filter((e) => positions.has(e.from) && positions.has(e.to))
                .filter((e) => filteredTopics.some((tt) => tt.id === e.to) && filteredTopics.some((tt) => tt.id === e.from))
                .map((e, i) => {
                  const a = positions.get(e.from)!;
                  const b = positions.get(e.to)!;
                  const x1 = a.x;
                  const y1 = a.y + 26;
                  const x2 = b.x;
                  const y2 = b.y - 30;
                  const mid = (y1 + y2) / 2;
                  return (
                    <path
                      key={i}
                      d={`M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`}
                      fill="none"
                      className="stroke-primary/40"
                      strokeWidth="1.5"
                      strokeDasharray="none"
                      markerEnd="url(#arrow)"
                    />
                  );
                })}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/50" />
                </marker>
              </defs>
            </svg>
            {/* track headers */}
            {tracks.map((tr, i) => (
              <div
                key={tr.id}
                className="absolute text-xs font-semibold"
                style={{ insetInlineStart: i * colWidth + colWidth / 2 + 24 - 80, top: 0, width: 160, textAlign: "center" }}
              >
                <span className={`inline-block rounded-full px-3 py-1 track-bg-${tr.id} track-${tr.id}`}>{tr.title[locale]}</span>
              </div>
            ))}
            {/* nodes */}
            {filteredTopics.map((tt) => {
              const p = positions.get(tt.id);
              if (!p) return null;
              const status = statusOf(progress, tt.id);
              return (
                <button
                  key={tt.id}
                  onClick={() => navigate("topic", tt.id)}
                  className={`absolute glass glass-hover rounded-xl p-2.5 text-start w-[212px] ${
                    status === "done" ? "border-primary/50 bg-primary/5" : status === "in-progress" ? "border-amber-500/50" : ""
                  }`}
                  style={{ insetInlineStart: p.x, top: p.y - 26, transform: "translateX(-50%)" }}
                >
                  <span className={`block text-[10px] font-bold track-${tt.track} mb-1`}>{formatNum(tt.order, locale)}</span>
                  <span className="block text-xs font-medium leading-snug line-clamp-2">{tt.title[locale]}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>
      ) : (
        <ol className="grid gap-2">
          {listOrder
            .filter((id) => filteredTopics.some((tt) => tt.id === id))
            .map((id, idx) => {
              const tt = topicById.get(id)!;
              const status = statusOf(progress, id);
              return (
                <li key={id}>
                  <GlassCard hover className="p-3 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-primary w-8 text-center">{formatNum(idx + 1, locale)}</span>
                    <TrackPill track={tt.track} locale={locale} />
                    <button onClick={() => navigate("topic", id)} className="font-medium text-start hover:underline">
                      {tt.title[locale]}
                    </button>
                    <span className="ms-auto flex items-center gap-2">
                      {tt.prereqs.length ? (
                        <span className="text-xs text-muted-foreground">
                          {t.roadmap.legendEssential}: {tt.prereqs.map((p) => topicById.get(p)?.title[locale]).join("، ")}
                        </span>
                      ) : null}
                      <StatusBadge status={status} t={t.roadmap} />
                    </span>
                  </GlassCard>
                </li>
              );
            })}
        </ol>
      )}

      <GlassCard className="p-5 border-dashed">
        <p className="text-sm leading-relaxed text-muted-foreground">{t.roadmap.branchNote}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {branchStubs.map((b) => (
            <span key={b.id} className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
              {b[locale]} · <span className="opacity-70">{locale === "fa" ? "در انتظار ساخت" : "not built"}</span>
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
