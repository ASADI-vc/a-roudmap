# STATUS

Last updated: 2026-11-14 (this file is updated at each milestone)

## Completed
- Environment inspected: Bun 1.3.14, Next.js 16.1.1 + TypeScript + Tailwind 4 + shadcn/ui scaffold; dev server on port 3000 (auto-run); single-route preview gateway constraint identified and recorded (docs/DECISIONS.md D-001).
- Governance: PLAN.md, docs/DECISIONS.md created.
- Phase 1 (Research): complete. 43 source notes (39 delegated + 4 vendor/Puter notes by lead) in research/sources/, indexed in research/INDEX.md; 2 sources partially accessible (CS2023 zip, SWEBOK partial), 0 fully inaccessible; no fabrication found in spot checks.
- Phase 2 (Synthesis): complete. research/SYNTHESIS.md, research/CLAIMS.md (38 claims c-001..c-038), research/GAPS.md, content/CURRICULUM.md. Knowledge graph implemented as data (src/content/topics.ts) with 35 topics across core + 3 tracks; validated by scripts/validate-content.ts.
- Phase 3 (Product): complete. Bilingual SPA (hash routing #/fa/... #/en/...), liquid-glass design system with light/dark + RTL/LTR, home, onboarding (deterministic recommendations), interactive roadmap + accessible list mode, topics list with search/filters, topic detail (all required fields), projects with rubrics, evidence page (claims registry), sources library + methodology, progress tracking (localStorage, export/import/reset, shared across languages), language switch preserving progress.
- Phase 4 (Assistant): complete. Build-time retrieval index (scripts/gen-kb.ts → src/content/generated/kb.json, 419 chunks from topics+sources+claims), client-side lexical retrieval with cross-language scoring and translation dedup, application-controlled agentic loop (searchKnowledge/getTopic/getPrerequisites/getProgress-with-consent/proposeLearningPlan, max 5 iterations), Puter user-pays integration (js.puter.com/v2, streaming chat), sanitized markdown rendering, citation resolution to retrieved records only, full error states; site fully usable without Puter.
- Phase 5 (Verification): complete. 87 content-validation assertions green; 25 unit tests green (bun test); E2E via agent-browser across 14 scenarios (onboarding, roadmap, topic completion, progress export/import, language switch preserving state, search fa/en/mixed, RTL, assistant error states, injection-defense unit checks); visual inspection desktop+mobile both languages light/dark; dev.log clean. See docs/VERIFICATION.md.
- Phase 6 (Deployment): complete at the available level. The app is served through the platform's preview gateway (verified: HTTP 200 + correct assets via the same reverse proxy the public preview URL uses — see docs/VERIFICATION.md §7). The sandbox does not expose the literal external bot-id, so the preview link is delivered via the chat/preview panel rather than printed here. Puter SDK verified loading at runtime; live chat round-trip UNVERIFIED (requires a user Puter sign-in by design).

## Current task
- None — all plan phases closed at the achievable level.

## Blockers
- Live AI chat end-to-end cannot be verified in the sandbox: Puter user-pays model requires each user to sign in to their own Puter account (by design, no shared account is allowed). SDK load + UI error states verified; live model round-trip marked UNVERIFIED in docs/VERIFICATION.md.
- IP-based country locale detection not implemented as a hard guarantee: this host exposes no trusted country metadata; documented browser-language fallback is active instead (docs/DECISIONS.md D-001, D-013).

## Exact next steps (for any continuing session)
1. Read PLAN.md and docs/DECISIONS.md; this STATUS.md is the checkpoint.
2. If a Puter test account becomes authorized: open /#/en/assistant and /#/fa/assistant, sign in, run the scripted question set in docs/VERIFICATION.md §6, record results, clear the UNVERIFIED marker on Phase 4/6.
3. To grow content: edit src/content/topics.ts (bilingual fields), run `bun run validate:content` then `bun run gen:kb` (regenerates the retrieval index), restart dev server.
4. To refresh research: add research/sources/<new-id>.md, register it in research/INDEX.md, then update research/CLAIMS.md and the evidence page data (src/content/claims.ts).
