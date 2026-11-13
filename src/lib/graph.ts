import type { Topic } from "@/content/types";

export interface GraphStats {
  nodeCount: number;
  edgeCount: number;
  acyclic: boolean;
  cyclePath?: string[];
  invalidRefs: string[];
}

/** Validate the prerequisite graph: acyclicity + reference integrity. */
export function checkGraph(topics: Topic[]): GraphStats {
  const byId = new Map<string, Topic>(topics.map((t) => [t.id, t] as [string, Topic]));
  const invalidRefs: string[] = [];
  for (const t of topics) {
    for (const p of t.prereqs) if (!byId.has(p)) invalidRefs.push(`${t.id}->${p}`);
    for (const r of t.related) if (!byId.has(r)) invalidRefs.push(`${t.id}~${r}`);
  }
  const state = new Map<string, "visiting" | "done">();
  let cyclePath: string[] | undefined;
  const stack: string[] = [];
  const dfs = (id: string) => {
    if (cyclePath) return;
    const st = state.get(id);
    if (st === "done") return;
    if (st === "visiting") {
      cyclePath = [...stack.slice(stack.indexOf(id)), id];
      return;
    }
    state.set(id, "visiting");
    stack.push(id);
    const node = byId.get(id);
    for (const p of node?.prereqs ?? []) dfs(p);
    stack.pop();
    state.set(id, "done");
  };
  for (const t of topics) dfs(t.id);
  const edgeCount = topics.reduce((n, t) => n + t.prereqs.length, 0);
  return {
    nodeCount: topics.length,
    edgeCount,
    acyclic: !cyclePath,
    cyclePath,
    invalidRefs,
  };
}

/** Topological order honoring prereqs, tie-broken by track order. */
export function topoOrder(topics: Topic[]): string[] {
  const byId = new Map<string, Topic>(topics.map((t) => [t.id, t] as [string, Topic]));
  const visited = new Set<string>();
  const out: string[] = [];
  const visit = (t: Topic) => {
    if (visited.has(t.id)) return;
    visited.add(t.id);
    for (const p of t.prereqs) {
      const pt = byId.get(p);
      if (pt && !visited.has(pt.id)) visit(pt);
    }
    out.push(t.id);
  };
  const ordered = [...topics].sort((a, b) =>
    a.track === b.track ? a.order - b.order : a.track.localeCompare(b.track),
  );
  for (const t of ordered) visit(t);
  return out;
}

/** All transitive prerequisites (closure). */
export function prereqClosure(topics: Topic[], id: string): string[] {
  const byId = new Map<string, Topic>(topics.map((t) => [t.id, t] as [string, Topic]));
  const seen = new Set<string>();
  const walk = (tid: string) => {
    const t = byId.get(tid);
    for (const p of t?.prereqs ?? []) {
      if (!seen.has(p)) {
        seen.add(p);
        walk(p);
      }
    }
  };
  walk(id);
  return [...seen];
}

/** Direct children (topics that list id as an essential prereq). */
export function unlocks(topics: Topic[], id: string): string[] {
  return topics.filter((t) => t.prereqs.includes(id)).map((t) => t.id);
}
