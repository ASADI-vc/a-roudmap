// Generate the assistant's retrieval corpus from the SAME approved content the site uses.
// Output: src/content/generated/kb.json — chunks carry parent record IDs (language-independent).
// Run: bun run scripts/gen-kb.ts
import { writeFileSync, mkdirSync } from "fs";
import { topics } from "../src/content/topics";
import { projects } from "../src/content/projects";
import { claims } from "../src/content/claims";
import { sources } from "../src/content/sources";
import { dict } from "../src/content/i18n";
import type { Locale } from "../src/content/types";

type Chunk = {
  id: string;
  parent: string;
  locale: "fa" | "en";
  kind: "topic-summary" | "topic-why" | "topic-ai" | "topic-check" | "project" | "claim" | "source" | "guide";
  title: string;
  text: string;
  link?: string;
};

const chunks: Chunk[] = [];
const push = (c: Chunk) => chunks.push(c);

const trackNames: Record<string, Record<Locale, string>> = {
  core: { fa: "پایه مشترک", en: "Shared Foundation" },
  frontend: { fa: "فرانت‌اند", en: "Frontend" },
  backend: { fa: "بک‌اند", en: "Backend" },
  aiapps: { fa: "اپلیکیشن‌های هوش مصنوعی", en: "AI-Enabled Apps" },
};

for (const t of topics) {
  for (const l of ["fa", "en"] as const) {
    const d = dict(l);
    const trackName = trackNames[t.track][l];
    const prereqTitles = t.prereqs.map((p) => topics.find((x) => x.id === p)?.title[l] ?? p).join("، ");
    push({
      id: `kb-${t.id}-summary-${l}`,
      parent: `topic:${t.id}`,
      locale: l,
      kind: "topic-summary",
      title: t.title[l],
      link: `#/${l}/topic/${t.id}`,
      text: `[${d.nav.topics} — ${trackName}] ${t.title[l]}. ${t.summary[l]} ${l === "fa" ? "پیش‌نیازها" : "Prerequisites"}: ${prereqTitles || "—"}. ${l === "fa" ? "پیامدها" : "Outcomes"}: ${t.outcomes[l].join("؛ ")}.`,
    });
    push({
      id: `kb-${t.id}-why-${l}`,
      parent: `topic:${t.id}`,
      locale: l,
      kind: "topic-why",
      title: t.title[l],
      link: `#/${l}/topic/${t.id}`,
      text: `${l === "fa" ? "چرا مهم است" : "Why it matters"} (${t.title[l]}): ${t.why[l]}`,
    });
    push({
      id: `kb-${t.id}-ai-${l}`,
      parent: `topic:${t.id}`,
      locale: l,
      kind: "topic-ai",
      title: t.title[l],
      link: `#/${l}/topic/${t.id}`,
      text: `${l === "fa" ? "استفاده از هوش مصنوعی" : "AI guidance"} (${t.title[l]}): ${t.aiGuidance[l]}`,
    });
    push({
      id: `kb-${t.id}-check-${l}`,
      parent: `topic:${t.id}`,
      locale: l,
      kind: "topic-check",
      title: t.title[l],
      link: `#/${l}/topic/${t.id}`,
      text: `${l === "fa" ? "تمرین و آزمون درک" : "Exercise & understanding check"} (${t.title[l]}): ${t.exercise[l]} — ${t.check[l]}`,
    });
  }
}

for (const p of projects) {
  for (const l of ["fa", "en"] as const) {
    const d = dict(l);
    push({
      id: `kb-${p.id}-${l}`,
      parent: `project:${p.id}`,
      locale: l,
      kind: "project",
      title: p.title[l],
      link: `#/${l}/project/${p.id}`,
      text: `${d.projects.title} — ${p.title[l]}: ${p.spec[l]} ${l === "fa" ? "معیارهای پذیرش" : "Acceptance criteria"}: ${p.acceptance[l].join("؛ ")}`,
    });
  }
}

for (const c of claims) {
  for (const l of ["fa", "en"] as const) {
    const d = dict(l);
    push({
      id: `kb-${c.id}-${l}`,
      parent: `claim:${c.id}`,
      locale: l,
      kind: "claim",
      title: `${d.evidence.kindLabels[c.kind]} — ${c.id}`,
      link: `#/${l}/evidence`,
      text: `${d.evidence.kindLabels[c.kind]} [${c.id}]: ${c.statement[l]} ${l === "fa" ? "محدودیت‌ها" : "Caveats"}: ${c.caveats[l]}`,
    });
  }
}

for (const s of sources) {
  for (const l of ["fa", "en"] as const) {
    const d = dict(l);
    push({
      id: `kb-${s.id}-${l}`,
      parent: `source:${s.id}`,
      locale: l,
      kind: "source",
      title: s.title,
      link: `#/${l}/source/${s.id}`,
      text: `${d.sourcesPage.title} — ${s.title} (${s.org}, ${s.year}): ${s.desc[l]}`,
    });
  }
}

// methodology guides (bilingual, stable IDs)
for (const l of ["fa", "en"] as const) {
  const d = dict(l);
  push({
    id: `kb-guide-method-${l}`,
    parent: "guide:methodology",
    locale: l,
    kind: "guide",
    title: d.sourcesPage.methodTitle,
    link: `#/${l}/methodology`,
    text: d.sourcesPage.methodItems.join(" "),
  });
  push({
    id: `kb-guide-account-${l}`,
    parent: "guide:assistant",
    locale: l,
    kind: "guide",
    title: d.assistant.accountModel,
    link: `#/${l}/assistant`,
    text: d.assistant.accountBody,
  });
  push({
    id: `kb-guide-gap-${l}`,
    parent: "guide:gaps",
    locale: l,
    kind: "guide",
    title: d.evidence.gapTitle,
    link: `#/${l}/evidence`,
    text: d.evidence.gapBody,
  });
}

mkdirSync("src/content/generated", { recursive: true });
writeFileSync("src/content/generated/kb.json", JSON.stringify(chunks, null, 1));
console.log(`KB generated: ${chunks.length} chunks from ${topics.length} topics, ${projects.length} projects, ${claims.length} claims, ${sources.length} sources`);
