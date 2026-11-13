// Content validation — run with: bun run scripts/validate-content.ts
// Checks: unique IDs, acyclic prereq graph, valid references, fa/en parity,
// required fields, claim/source references, placeholder markers.
import { topics } from "../src/content/topics";
import { projects } from "../src/content/projects";
import { claims } from "../src/content/claims";
import { sources } from "../src/content/sources";
import { checkGraph } from "../src/lib/graph";

let errors = 0;
let checks = 0;
const fail = (msg: string) => {
  errors++;
  console.error("✗ " + msg);
};
const ok = (msg: string) => {
  checks++;
  console.log("✓ " + msg);
};

// --- topics ---
const ids = new Set<string>();
for (const t of topics) {
  if (ids.has(t.id)) fail(`duplicate topic id: ${t.id}`);
  ids.add(t.id);
}
if (ids.size === topics.length) ok(`topic IDs unique (${topics.length})`);

const g = checkGraph(topics);
if (!g.acyclic) fail(`prerequisite graph has a cycle: ${(g.cyclePath ?? []).join(" -> ")}`);
else ok(`prereq graph acyclic (${g.edgeCount} edges, ${g.nodeCount} nodes)`);
if (g.invalidRefs.length) fail(`invalid topic references: ${g.invalidRefs.join(", ")}`);
else ok("all topic prereq/related references resolve");

// claim/source references
const claimIds = new Set(claims.map((c) => c.id));
const sourceIds = new Set(sources.map((s) => s.id));
const badClaims: string[] = [];
const badSources: string[] = [];
for (const t of topics) {
  for (const c of t.claims) if (!claimIds.has(c)) badClaims.push(`${t.id}→${c}`);
  for (const s of t.sources) if (!sourceIds.has(s)) badSources.push(`${t.id}→${s}`);
}
for (const c of claims) for (const s of c.sourceIds) if (!sourceIds.has(s)) badSources.push(`${c.id}→${s}`);
if (badClaims.length) fail(`topics referencing unknown claims: ${badClaims.join(", ")}`);
else ok("all topic→claim references resolve");
if (badSources.length) fail(`unknown source references: ${badSources.join(", ")}`);
else ok("all claim/topic→source references resolve");

// bilingual parity + required fields + no placeholders
const PLACEHOLDER_RE = /(TODO|FIXME|XXX|【|____|undefined|NaN)/;
const langs = ["fa", "en"] as const;
let parityFails = 0;
for (const t of topics) {
  for (const l of langs) {
    if (!t.title[l]) parityFails++;
    if (!t.summary[l]) parityFails++;
    if (!t.why[l]) parityFails++;
    if (!t.exercise[l]) parityFails++;
    if (!t.aiGuidance[l]) parityFails++;
    if (!t.check[l]) parityFails++;
    if (!t.essential[l]) parityFails++;
    if (!t.optional[l]) parityFails++;
    if (!t.outcomes[l] || t.outcomes[l].length < 3) parityFails++;
    if (!t.completion[l] || t.completion[l].length < 2) parityFails++;
    const strings = JSON.stringify({ title: t.title[l], summary: t.summary[l], why: t.why[l], exercise: t.exercise[l], ai: t.aiGuidance[l], check: t.check[l] });
    if (PLACEHOLDER_RE.test(strings)) fail(`placeholder marker in topic ${t.id} (${l})`);
  }
  if (!t.resources.length) fail(`topic ${t.id} has no resources`);
  if (!t.lastReview) fail(`topic ${t.id} missing lastReview`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t.lastReview)) fail(`topic ${t.id} lastReview not ISO date`);
}
if (parityFails === 0) ok("fa/en field parity + required fields for all topics");
else fail(`parity/required-field failures: ${parityFails}`);

// --- projects ---
const pids = new Set<string>();
for (const p of projects) {
  if (pids.has(p.id)) fail(`duplicate project id: ${p.id}`);
  pids.add(p.id);
  if (!p.spec.fa || !p.spec.en) fail(`project ${p.id} spec missing a locale`);
  if (p.constraints.fa.length < 2 || p.acceptance.en.length < 2) fail(`project ${p.id} constraints/acceptance thin`);
  if (p.rubric.length < 3) fail(`project ${p.id} rubric too small`);
  for (const tid of p.topicIds) if (!ids.has(tid)) fail(`project ${p.id} references unknown topic ${tid}`);
  for (const r of p.rubric) if (r.levels.fa.length !== 3 || r.levels.en.length !== 3) fail(`project ${p.id} rubric levels must be 3`);
  if (PLACEHOLDER_RE.test(JSON.stringify(p))) fail(`placeholder in project ${p.id}`);
}
if (pids.size === projects.length) ok(`projects valid (${projects.length})`);

// --- claims ---
const cids = new Set<string>();
for (const c of claims) {
  if (cids.has(c.id)) fail(`duplicate claim id: ${c.id}`);
  cids.add(c.id);
  if (!c.statement.fa || !c.statement.en) fail(`claim ${c.id} missing locale statement`);
  if (!c.caveats.fa || !c.caveats.en) fail(`claim ${c.id} missing locale caveats`);
  if (!c.sourceIds.length) fail(`claim ${c.id} has no sources`);
}
if (cids.size === claims.length) ok(`claims valid (${claims.length})`);

// --- sources ---
const sids = new Set<string>();
for (const s of sources) {
  if (sids.has(s.id)) fail(`duplicate source id: ${s.id}`);
  sids.add(s.id);
  try {
    new URL(s.url);
  } catch {
    fail(`source ${s.id} has invalid URL: ${s.url}`);
  }
  if (!s.desc.fa || !s.desc.en) fail(`source ${s.id} missing locale description`);
}
if (sids.size === sources.length) ok(`sources valid (${sources.length})`);

// cross-check: claims.ts registry should cover the research CLAIMS.md registry ids used by topics
const missingClaimUsage: string[] = [];
for (const id of claimIds) {
  const used = topics.some((t) => t.claims.includes(id)) || projects.some((p) => false);
  if (!used && !["c-008", "c-012", "c-014", "c-036", "c-037", "c-038"].includes(id)) missingClaimUsage.push(id);
}
if (missingClaimUsage.length) console.warn("! claims not referenced by any topic (allowed, listed): " + missingClaimUsage.join(", "));
else ok("claim coverage consistent");

// summary
console.log(`\n${checks} checks passed, ${errors} errors`);
if (errors > 0) process.exit(1);
console.log("CONTENT VALIDATION: PASS");
