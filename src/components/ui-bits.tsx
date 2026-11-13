"use client";

import type { ReactNode } from "react";
import type { TrackId, Locale } from "@/content/types";
import { tracks } from "@/content/tracks";
import { formatNum } from "@/lib/locale";

export const trackById = new Map(tracks.map((tr) => [tr.id, tr]));

export function GlassCard({
  children,
  className = "",
  hover = false,
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  strong?: boolean;
}) {
  return (
    <div className={`glass ${strong ? "glass-strong" : ""} ${hover ? "glass-hover" : "glass-blur"} rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs ${className}`}>
      {children}
    </span>
  );
}

export function TrackPill({ track, locale }: { track: TrackId; locale: Locale }) {
  const tr = trackById.get(track);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium track-bg-${track} track-${track}`}>
      {tr ? tr.title[locale] : track}
    </span>
  );
}

export function SectionTitle({ title, body }: { title: string; body?: string }) {
  return (
    <div className="mb-6 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
      {body ? <p className="mt-2 text-muted-foreground leading-relaxed">{body}</p> : null}
    </div>
  );
}

export function StatusBadge({ status, t }: { status: "not-started" | "in-progress" | "done"; t: { statusDone: string; statusInProgress: string; statusNotStarted: string } }) {
  const label = status === "done" ? t.statusDone : status === "in-progress" ? t.statusInProgress : t.statusNotStarted;
  const cls =
    status === "done"
      ? "bg-primary/15 text-primary border-primary/30"
      : status === "in-progress"
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
        : "text-muted-foreground";
  return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs ${cls}`}>{label}</span>;
}

export function ProgressRing({ done, total, locale }: { done: number; total: number; locale: Locale }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const r = 15;
  const circ = 2 * Math.PI * r;
  return (
    <div className="inline-flex items-center gap-3">
      <svg width="44" height="44" viewBox="0 0 44 44" role="img" aria-label={`${pct}%`}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="currentColor" className="text-border" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="4"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
        />
        <text x="22" y="26" textAnchor="middle" fontSize="10" fill="currentColor" className="text-foreground">
          {formatNum(pct, locale)}%
        </text>
      </svg>
      <span className="text-sm text-muted-foreground">
        {formatNum(done, locale)} / {formatNum(total, locale)}
      </span>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <GlassCard className="p-8 text-center">
      <p className="font-medium">{title}</p>
      {body ? <p className="mt-1 text-sm text-muted-foreground">{body}</p> : null}
    </GlassCard>
  );
}
