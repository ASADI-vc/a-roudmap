# PLAN — Bilingual Software-Engineering Learning Platform ("Masir / مسیر")

Product: a bilingual (fa/en) learning platform for computer-engineering students, beginners,
self-taught developers, and working developers adapting to AI-assisted development.
Status marker convention: `[ ]` todo, `[~]` in progress, `[x]` done, `[!]` blocked.

## Phase 1 — Research (before any curriculum writing)
- [x] 1.1 Inspect environment, tooling, platform constraints (single-route preview, port 3000, no production build in sandbox)
- [x] 1.2 Define research-question matrix (see research/INDEX.md)
- [x] 1.3 Verify vendor APIs I depend on directly: Puter docs (user-pays, chat, deployments, auth) → source notes
- [x] 1.4 Delegate evidence collection: 4 agents × ~8-10 sources → one note per source in research/sources/
- [x] 1.5 Verify notes exist, spot-check quality, no fabricated URLs
- [x] 1.6 research/INDEX.md linking all notes

Acceptance: ≥30 substantive source notes; each note has real canonical URL, access date, own-words summary, limitations, confidence; inaccessible sources marked inaccessible; no fabricated findings.

## Phase 2 — Evidence synthesis & curriculum design
- [x] 2.1 research/SYNTHESIS.md (agreements, disagreements, durable skills, AI-changed practices, risks)
- [x] 2.2 research/CLAIMS.md (stable claim IDs → source IDs; evidence kind labels: observed/survey/causal/forecast/opinion/recommendation)
- [x] 2.3 research/GAPS.md (incl. geographic gaps re Iran; no generalization without local evidence)
- [x] 2.4 content/CURRICULUM.md (human-readable curriculum overview + rationale)
- [x] 2.5 Knowledge graph as data (stable topic IDs, prerequisite edges acyclic, track membership, related edges) + validation script

Acceptance: graph validates (unique IDs, acyclic, all references resolve); curriculum covers shared foundation + 3 tracks (frontend, backend, AI-enabled apps); AI practices integrated throughout; branch-only stubs for other specializations clearly labeled.

## Phase 3 — Bilingual product experience
- [x] 3.1 Design system: restrained liquid-glass tokens, light/dark, RTL/LTR, reduced-motion, WCAG AA targets
- [x] 3.2 i18n architecture: locale-independent content IDs, bilingual UI strings, `#/fa/...` / `#/en/...` hash URLs (platform-constrained; see docs/DECISIONS.md D-001)
- [x] 3.3 Locale selection: explicit hash URL > saved preference > browser-language fallback > English; visible فارسی/English switch on every page; IP-based detection reported incomplete (no trusted country metadata on this host)
- [x] 3.4 Home with immediate path into learning (3 journey cards: beginner / student / working developer)
- [x] 3.5 Onboarding (background, goal, hours/week → deterministic recommendation)
- [x] 3.6 Interactive roadmap + accessible list alternative
- [x] 3.7 Topics list with search + filters (track, status)
- [x] 3.8 Topic detail pages (all required fields incl. exercise, AI guidance, understanding check, completion criteria, resources, references)
- [x] 3.9 Project milestones (spec, constraints, acceptance criteria, rubric)
- [x] 3.10 Evidence section (AI & careers, claim registry with evidence-kind labels)
- [x] 3.11 Source library + methodology page
- [x] 3.12 Progress tracking: localStorage, continue-learning, export/import/reset, shared across languages
- [x] 3.13 SEO/metadata: localized document titles/descriptions, hreflang-equivalent alternate links, shareable deep links

Acceptance: every REQUIRED EXPERIENCE from the brief works in both languages; progress survives language switch; no unfinished track presented as complete.

## Phase 4 — Puter knowledge assistant
- [x] 4.1 Verified API surface from docs.puter.com (user-pays, chat, deployments); no invented methods/models
- [x] 4.2 Retrieval index generated at build-time from the same approved content (topic/source/claim IDs preserved; bilingual chunks; dedup by parent ID)
- [x] 4.3 Client-side lexical retrieval (BM25-ish); embeddings deferred (see docs/DECISIONS.md D-008)
- [x] 4.4 Application-controlled agentic loop: searchKnowledge, getTopic, getPrerequisites, getProgress (with consent), proposeLearningPlan; bounded iterations; validated arguments
- [x] 4.5 Auth via user's own Puter account only; usage model explained before first request; no shared/funded account
- [x] 4.6 Streaming if available; error states: auth cancelled, quota/network errors, Puter unavailable; site fully usable without Puter
- [x] 4.7 Injection defense: retrieved text treated as data; output markdown sanitized; external links allowlisted; citation resolution only to retrieved records

Acceptance: assistant answers from retrieved knowledge, cites only real retrieved records, states knowledge limits; works in fa/en/mixed queries; all AI features optional to the core site.

## Phase 5 — Engineering & verification
- [x] 5.1 Content schema validation (scripts/validate-content.ts): unique IDs, acyclic graph, references, fa/en parity, required fields, no placeholders
- [x] 5.2 Unit tests (bun test): recommendation rules, prerequisites, progress store, retrieval (fa/en/mixed), citation resolution, markdown/link sanitization, locale decision function
- [x] 5.3 E2E via agent-browser on dev server: onboarding, roadmap nav, search, progress persistence, import/export, language switch, RTL layout, assistant error states
- [x] 5.4 Visual inspection: mobile + desktop, both languages, light/dark
- [x] 5.5 docs/VERIFICATION.md: actual commands, outcomes, unresolved issues; AI live-integration clearly labeled unverified (no authorized account in sandbox)

Acceptance: all automated checks green; anything not actually run is not claimed as run.

## Phase 6 — Deployment
- [x] 6.1 Deployment = public preview URL (sandbox gateway); secrets/internal notes excluded from public bundle (research working notes stay out of the client bundle)
- [x] 6.2 Public URL smoke checks: routes render, direct topic deep links, refresh behavior, assets, search, progress, both languages
- [x] 6.3 Puter SDK load from deployed origin (live chat requires user sign-in → labeled unverified)
- [x] 6.4 Final STATUS.md + final report

Acceptance: public URL opened and checked; anything unverifiable reported honestly.
