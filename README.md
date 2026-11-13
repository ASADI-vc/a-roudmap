# Masir · مسیر — Bilingual Software Engineering Learning Platform

A research-backed Persian/English learning platform for computer engineering students,
beginners, self-taught developers, and working developers adapting to AI-assisted development.

- **34 topics** across a shared foundation + 3 tracks (frontend, backend, AI-enabled apps), each with
  exercise, AI-use guidance, independent understanding check, completion criteria, and cited evidence
- **6 project milestones** with specs, constraints, acceptance criteria, and self-assessment rubrics
- **31 evidence claims** with kind labels (observed / survey / causal / forecast / recommendation),
  caveats, and 39 registered research sources
- **Knowledge-grounded AI assistant** on Puter's user-pays model (per-user accounts, no shared keys),
  grounded in a build-time retrieval corpus generated from the same content the site renders
- **Fully bilingual (fa/en)**: native writing in both languages, RTL/LTR, shared locale-independent
  progress, explicit `#/fa/...` and `#/en/...` URLs

## Run

```bash
bun install          # (already installed in the sandbox)
bun run dev          # dev server on :3000 (auto-managed by the platform)
```

The externally visible URL is the platform's preview panel (same gateway, port 3000 behind it).

## Checks

```bash
bun run scripts/validate-content.ts   # content schema, acyclic graph, references, fa/en parity
bun run scripts/gen-kb.ts             # regenerate the assistant retrieval corpus (src/content/generated/kb.json)
bun run lint                          # ESLint
bunx tsc --noEmit                     # type check
bun test                              # 46 unit tests (router, locale, graph, recommendations, search,
                                      #  sanitizer, progress, retrieval, Puter surface)
```

## Architecture

```
src/content/            typed bilingual content (single source of truth)
  topics*.ts            34 topics: core(17) + frontend(6) + backend(6) + aiapps(5)
  projects.ts           6 project milestones with rubrics
  claims.ts             evidence claim registry (public)
  sources.ts            39 source records (public)
  i18n.ts               bilingual UI strings
  generated/kb.json     retrieval corpus (generated — never hand-edit)
src/lib/                router, locale decision, progress (localStorage), profile+recommendation,
                        search (BM25-like + Persian normalization/stemming), retrieval, Puter
                        integration, bounded assistant loop, markdown sanitizer
src/components/         AppRoot (shell) + views (home, onboarding, roadmap, topics, topic,
                        projects, project, evidence, sources, assistant, progress)
research/               one note per source, INDEX, SYNTHESIS, CLAIMS, GAPS (working docs)
docs/                   DECISIONS, VERIFICATION, CONTENT-MAINTENANCE
content/CURRICULUM.md   human-readable curriculum design
```

## Locale handling

Priority: explicit `#/fa|#/en` URL → saved preference → platform country metadata
(hook present; not available on this host — reported honestly) → browser language → English.
Progress is stored against language-independent topic IDs, so switching language never loses it.
Export/import/reset from the progress page.

## Documentation

- docs/DECISIONS.md — why every significant choice was made
- docs/VERIFICATION.md — what was actually tested and real results
- docs/CONTENT-MAINTENANCE.md — how to refresh sources, claims, topics, indexes, and redeploy
