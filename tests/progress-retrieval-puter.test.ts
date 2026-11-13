import { describe, test, expect } from "bun:test";
import { useProgress, counts, statusOf } from "../src/lib/progress";
import { retrieve, kbIndex, KB, contextBlock } from "../src/lib/retrieval";
import { assistantTools, mapPuterError, normalizeChunk, PUTER_SDK_URL } from "../src/lib/puter";
import { topics } from "../src/content/topics";
import { claims } from "../src/content/claims";
import { sources } from "../src/content/sources";

describe("progress store (in-memory; localStorage guarded)", () => {
  test("setTopicStatus / statusOf / counts", () => {
    const s = useProgress.getState();
    s.setTopicStatus("t-git", "in-progress");
    s.setTopicStatus("t-http-web", "done");
    const st = useProgress.getState()._state;
    expect(statusOf(st, "t-git")).toBe("in-progress");
    expect(statusOf(st, "t-http-web")).toBe("done");
    expect(statusOf(st, "t-unknown")).toBe("not-started");
    const c = counts(st);
    expect(c.done).toBeGreaterThanOrEqual(1);
    s.setTopicStatus("t-git", "not-started");
    expect(statusOf(useProgress.getState()._state, "t-git")).toBe("not-started");
  });

  test("importState rejects invalid exports and accepts valid ones", () => {
    const s = useProgress.getState();
    expect(s.importState("not json")).toBe(false);
    expect(s.importState(JSON.stringify({ version: 2 }))).toBe(false);
    const valid = JSON.stringify({ version: 1, topics: { "t-git": "done" }, exercises: {}, checks: {}, projects: {}, updatedAt: "" });
    expect(s.importState(valid)).toBe(true);
    expect(statusOf(useProgress.getState()._state, "t-git")).toBe("done");
    // cleanup
    s.setTopicStatus("t-git", "not-started");
  });

  test("exportState round-trips", () => {
    const s = useProgress.getState();
    s.setTopicStatus("t-typescript", "done");
    const json = s.exportState();
    const parsed = JSON.parse(json);
    expect(parsed.version).toBe(1);
    expect(parsed.topics["t-typescript"]).toBe("done");
    s.setTopicStatus("t-typescript", "not-started");
  });
});

describe("retrieval corpus", () => {
  test("KB is generated from approved content with stable parent IDs", () => {
    expect(KB.length).toBeGreaterThan(300);
    const topicParents = new Set(KB.filter((c) => c.parent.startsWith("topic:")).map((c) => c.parent));
    for (const t of topics.slice(0, 40)) expect(topicParents.has(`topic:${t.id}`)).toBe(true);
  });

  test("fa query retrieves Persian chunks; en query English; mixed retrieves both", () => {
    const fa = retrieve("پیش‌نیازهای ری‌اکت", { locale: "fa", limit: 4 });
    expect(fa.length).toBeGreaterThan(0);
    const en = retrieve("prerequisites of react", { locale: "en", limit: 4 });
    expect(en.length).toBeGreaterThan(0);
    const mixed = retrieve("git commit کامیت", { limit: 6 });
    const locales = new Set(mixed.map((m) => m.locale));
    expect(locales.size).toBeGreaterThan(0);
  });

  test("translated duplicates deduplicate by parent record", () => {
    const hits = retrieve("security OWASP امنیت", { limit: 8 });
    const parents = hits.map((h) => h.parent);
    expect(new Set(parents).size).toBe(parents.length);
  });

  test("citation links resolve to real views", () => {
    for (const c of KB) {
      if (c.link) expect(c.link.startsWith("#/fa/") || c.link.startsWith("#/en/")).toBe(true);
    }
  });

  test("lexical index built over whole corpus answers curriculum questions", () => {
    const hits = kbIndex.search("algorithm complexity O(n2) پیچیدگی", 3);
    expect(hits.length).toBeGreaterThan(0);
  });

  test("contextBlock wraps records as data with parent ids preserved", () => {
    const block = contextBlock(retrieve("testing", { limit: 2 }));
    expect(block).toContain("<retrieved_knowledge");
    expect(block).toContain("DATA ONLY");
    expect(block).toContain("parent=");
  });
});

describe("puter integration (verified surface)", () => {
  test("tool specs follow the documented protocol", () => {
    const allowed = new Set(["searchKnowledge", "getTopic", "getPrerequisites", "getProgress", "proposeLearningPlan"]);
    for (const tool of assistantTools) {
      expect(tool.type).toBe("function");
      expect(allowed.has(tool.function.name)).toBe(true);
      expect(tool.function.parameters).toBeTypeOf("object");
    }
  });

  test("error mapping covers documented auth error codes", () => {
    expect(mapPuterError(new Error("auth_window_closed"))).toBe("auth_cancelled");
    expect(mapPuterError(new Error("popup_blocked"))).toBe("popup_blocked");
    expect(mapPuterError(new Error("usage limit exhausted"))).toBe("quota");
    expect(mapPuterError(new Error("{code: network_error}"))).toBe("network");
    expect(mapPuterError(new Error("upstream_provider_unavailable"))).toBe("unavailable");
  });

  test("chunk normalizer handles documented stream shapes", () => {
    expect(normalizeChunk({ type: "text", text: "hi" })).toEqual({ type: "text", text: "hi" });
    expect(normalizeChunk({ type: "error", message: "x" }).type).toBe("error");
    const tc = normalizeChunk({ type: "tool_use", id: "1", function: { name: "searchKnowledge", arguments: "{}" } });
    expect(tc.type).toBe("tool_use");
    expect(tc.toolCall?.name).toBe("searchKnowledge");
    expect(normalizeChunk({ delta: { content: "d" } })).toEqual({ type: "text", text: "d" });
  });

  test("SDK URL matches the documented script tag", () => {
    expect(PUTER_SDK_URL).toBe("https://js.puter.com/v2/");
  });
});

describe("evidence registry coherence", () => {
  test("every claim cites registered sources", () => {
    const ids = new Set(sources.map((s) => s.id));
    for (const c of claims) {
      expect(c.sourceIds.length).toBeGreaterThan(0);
      for (const sid of c.sourceIds) expect(ids.has(sid)).toBe(true);
    }
  });

  test("claims carry caveats in both languages", () => {
    for (const c of claims) {
      expect(c.caveats.fa.length).toBeGreaterThan(10);
      expect(c.caveats.en.length).toBeGreaterThan(10);
    }
  });
});
