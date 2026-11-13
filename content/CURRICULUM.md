# Curriculum — Masir / مسیر

Human-readable design. The machine-readable, validated source of truth is `src/content/topics.ts`
(and `projects.ts`, `claims.ts`, `sources.ts`). Everything on the site — pages, search index,
assistant retrieval corpus — is generated from those files.

## Audience → journeys

| Audience | Journey | Entry |
|----------|---------|-------|
| Beginner | understand roadmap → pick start → first useful task | Onboarding → core topics 1-2 → project p-01 |
| CE student | map academic subjects → find practical gaps | Roadmap (core) + topic "crosswalk" notes + evidence page |
| Working developer | AI-era practices without repeating basics | Topics filtered by `skip-ahead` tags + t-ai-assisted-workflow + evidence page |

## Shared foundation (track `core`, 17 topics)

Recommended order (topological over prerequisites + editorial weighting):

1. `t-computational-thinking` — decomposition, abstraction, algorithms-as-recipes
2. `t-programming-basics` — JavaScript path (c-e1); variables, control, functions, arrays/objects
3. `t-reading-tracing-code` — read/trace/explain before writing (c-023, c-030)
4. `t-terminal-git` — shell basics, git as time machine, commits/branches
5. `t-debugging-testing` — hypotheses, breakpoints, unit tests as spec
6. `t-typescript` — types as thinking tool
7. `t-data-structures` — arrays, maps/sets, stacks/queues, trees/graphs intro
8. `t-algorithms-core` — complexity, search/sort, recursion; when to optimize
9. `t-http-web` — HTTP, client/server, status codes, devtools network tab (src-mdn-http)
10. `t-databases-sql` — relational model, SQL, simple schema design (src-postgres-manual)
11. `t-os-concepts` — processes, memory, files/permissions — the developer-relevant subset
12. `t-requirements-design` — requirements → acceptance criteria → tradeoffs (src-se2024 REQ)
13. `t-security-privacy` — OWASP vocabulary, secrets, validation, privacy basics, dependency hygiene
    (src-owasp-top10, c-016, c-017)
14. `t-deployment-cicd` — environments, builds, pipelines, twelve-factor config (src-12factor)
15. `t-observability-ops` — logs/metrics/alerts, golden signals (src-srebook, c-027)
16. `t-communication-collab` — specs, PR reviews, questions that get answers
17. `t-ai-assisted-workflow` — spec-first, context, bounded delegation, diff review, independent
    testing, when not to use AI (c-005, c-007, c-030, c-032)

## Specialization tracks

**frontend (6):** `t-html-css-foundations`, `t-js-deep` (event loop/async/DOM), `t-react-essentials`
(c-e2), `t-web-accessibility` (WCAG 2.2 AA, c-035), `t-frontend-state-data`, `t-frontend-quality-perf`

**backend (6):** `t-node-server-basics`, `t-api-design`, `t-data-modeling`, `t-auth-basics`,
`t-caching-async-patterns`, `t-ops-containers`

**aiapps (5):** `t-llm-fundamentals`, `t-prompting-patterns`, `t-rag-embeddings`, `t-agents-tools`,
`t-ai-safety-eval`

**Branch stubs (named, not implemented, clearly labeled):** mobile, data engineering,
DevOps/SRE, ML engineering, security engineering. The roadmap page lists them as
"branches you can take later" without pretending they are complete tracks.

## AI practices integrated everywhere (not a bolt-on)

Every topic carries an `aiGuidance` field: what to delegate, what never to delegate, what to verify.
The core topic t-ai-assisted-workflow formalizes the loop (spec → context → bounded generation →
review diff → independent test → commit), and every project rubric scores *review and verification*
behavior, not just output (c-004, c-016, c-017).

## Project milestones (6)

| ID | Project | Combines | Rubric scored on |
|----|---------|----------|------------------|
| p-01 | CLI notes tool (TypeScript) | 2,3,4,5,16 | working features, tests, git history, README |
| p-02 | REST API + SQLite | 9,10,13,14 + node/api | spec adherence, validation, security checks, deploy |
| p-03 | Accessible dashboard | frontend topics | a11y audit, data fetching, performance budget |
| p-04 | Full-stack tracker w/ auth | backend+frontend | auth flows, data model, review evidence |
| p-05 | RAG-lite study assistant (Puter) | aiapps topics | grounding/citations, injection handling, cost bounds |
| p-06 | Capstone: deploy + document | everything | production checks, write-up, maintenance plan |

Each project stores: specification, constraints, acceptance criteria, rubric (4-5 criteria with
levels). Completion = self-assessed rubric + acceptance criteria all met.

## Understanding checks (completion = demonstrated understanding, c-024)

Every topic defines: an exercise (build/trace/predict), an independent check (predict-then-run,
explain-in-own-words, from-scratch rebuild), and observable completion criteria. The check is designed
so that asking an AI for the answer defeats its purpose — predict-before-run tasks, tracing with
justification, teaching-back prompts.

## Content sources & citations

Topics cite claim IDs and source IDs (validated by scripts/validate-content.ts). Learning resources
are official documentation first (verified free unless marked), the four curricula/standards where
relevant, and are labeled with language + level + free/paid.
