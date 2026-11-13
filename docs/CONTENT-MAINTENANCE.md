# Content Maintenance Guide

## Refresh research (sources)
1. Add `research/sources/<new-source-id>.md` using the template in any existing note (real URL,
   access date, own-words summary, limitations, confidence). Never copy substantial text.
2. Register it in `research/INDEX.md` (right section) and add a bilingual description to
   `src/content/sources.ts` (keep the `src-…` ID identical to the file name).
3. If it supports a claim: update `research/CLAIMS.md` and `src/content/claims.ts` (same claim ID).
4. Run `bun run scripts/validate-content.ts` — reference integrity is enforced.

## Review time-sensitive claims
Claims marked `volatile: true` (adoption stats, survey numbers, labor data) must be re-checked at
every refresh: c-003, c-004, c-005, c-007, c-010, c-011, c-012, c-013, c-014, c-017, c-018, c-019.
Check for newer editions: DORA (annual), Stack Overflow (annual), JetBrains (annual), Octoverse
(annual), WEF (biennial-ish), McKinsey SOAI (multiple per year), METR follow-ups, Canaries
revisions, OWASP LLM Top 10 (2026 edition supersedes the 2025 one referenced), OWASP Top 10,
WCAG, SWEBOK. Update numbers **with** geography/population/date and adjust caveats.

## Update curriculum (topics / projects)
1. Edit `src/content/topics-*.ts` or `projects.ts` — every field must exist in **both** fa and en
   (validator enforces parity, required fields, and no placeholders).
2. Keep prerequisites **acyclic**; the validator runs a cycle check on every build.
3. Resources: official docs first; record language/level/free status honestly; only URLs you
   verified return real content.
4. Bump `lastReview` on topics you touched.
5. If the graph changed or content changed: `bun run scripts/validate-content.ts`.

## Rebuild search & retrieval indexes
The site search index is built client-side from content at runtime — no action needed.
The assistant corpus is build-time:
```bash
bun run scripts/gen-kb.ts   # regenerates src/content/generated/kb.json from topics/projects/claims/sources
```
Re-run after ANY content change, or the assistant will cite stale data.

## Update both languages
Write natively in each language — not literal translation. Persian prose uses Persian digits in
`fa` strings (UI formatting handles it via Intl); code identifiers/numbers in examples stay Latin.
Show original English technical terms in parentheses on first use in fa content.

## Test & redeploy
```bash
bun run scripts/validate-content.ts && bun run scripts/gen-kb.ts
bun run lint && bunx tsc --noEmit && bun test
# browser spot-checks (agent-browser): onboarding, one topic completion, language switch,
# assistant error state — see docs/VERIFICATION.md for the full scenario list
```
The platform runs the dev server automatically; the preview URL reflects changes after
Next.js hot reload. For a cold start, restart the dev server from the platform controls.

## When to reconsider retrieval (embeddings)
Trigger conditions (recorded in docs/DECISIONS.md D-008): corpus grows beyond ~2,000 chunks, or
lexical recall degrades on the standard question set (see tests: fa/en/mixed retrieval), or users
routinely ask questions whose chunks rank below the top-6 cut. Evaluate cost/hosting before adding
an embedding provider; the retrieval module is isolated (`src/lib/retrieval.ts`) so the swap is local.
