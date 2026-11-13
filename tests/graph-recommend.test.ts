import { describe, test, expect } from "bun:test";
import { topics } from "../src/content/topics";
import { checkGraph, topoOrder, prereqClosure, unlocks } from "../src/lib/graph";
import { recommend } from "../src/lib/profile";
import { projects } from "../src/content/projects";

describe("knowledge graph integrity", () => {
  const g = checkGraph(topics);

  test("acyclic with all references valid", () => {
    expect(g.acyclic).toBe(true);
    expect(g.invalidRefs).toEqual([]);
    expect(g.nodeCount).toBe(topics.length);
  });

  test("topological order covers all topics and respects prereqs", () => {
    const order = topoOrder(topics);
    expect(order.length).toBe(topics.length);
    const pos = new Map(order.map((id, i) => [id, i]));
    for (const t of topics) {
      for (const p of t.prereqs) {
        expect(pos.get(p)!).toBeLessThan(pos.get(t.id)!);
      }
    }
  });

  test("prereqClosure and unlocks are consistent", () => {
    const closure = prereqClosure(topics, "t-react-essentials");
    expect(closure).toContain("t-programming-basics");
    expect(closure).toContain("t-js-deep");
    const unlocked = unlocks(topics, "t-programming-basics");
    expect(unlocked.length).toBeGreaterThan(2);
  });

  test("beginners can start immediately: the first core topic has no prereqs", () => {
    const first = topics.filter((t) => t.track === "core").sort((a, b) => a.order - b.order).slice(0, 2);
    expect(first[0].prereqs.length).toBe(0);
    // the second topic's prereqs stay inside the already-introduced first topic
    for (const p of first[1].prereqs) expect(p).toBe(first[0].id);
  });
});

describe("deterministic onboarding recommendations", () => {
  test("beginner starts at the very top of core", () => {
    const r = recommend({ background: "beginner", goal: "backend", pace: "light" }, {});
    expect(r.track).toBe("core");
    expect(r.startTopicIds[0]).toBe("t-computational-thinking");
    expect(r.firstProject).toBe("p-01");
  });

  test("student starts at reading/tracing and skips nothing silently", () => {
    const r = recommend({ background: "student", goal: "unsure", pace: "steady" }, {});
    expect(r.startTopicIds[0]).toBe("t-reading-tracing-code");
    expect(r.startTopicIds.length).toBeGreaterThan(1);
  });

  test("developer jumps to goal track entry + AI workflow", () => {
    const r = recommend({ background: "developer", goal: "frontend", pace: "intense" }, {});
    expect(r.startTopicIds).toContain("t-html-css-foundations");
    expect(r.startTopicIds).toContain("t-ai-assisted-workflow");
    expect(r.firstProject).toBe("p-03");
    expect(r.skimIds.length).toBeGreaterThan(0);
  });

  test("done topics are skipped", () => {
    const r = recommend(
      { background: "beginner", goal: "unsure", pace: "steady" },
      { "t-computational-thinking": "done", "t-programming-basics": "done" },
    );
    expect(r.startTopicIds).not.toContain("t-computational-thinking");
    expect(r.startTopicIds[0]).toBe("t-reading-tracing-code");
  });

  test("every recommended project exists", () => {
    const ids = new Set(projects.map((p) => p.id));
    for (const bg of ["beginner", "student", "developer"] as const)
      for (const goal of ["frontend", "backend", "aiapps", "unsure"] as const)
        for (const pace of ["light", "steady", "intense"] as const) {
          const r = recommend({ background: bg, goal, pace }, {});
          expect(ids.has(r.firstProject)).toBe(true);
        }
  });
});
