# DECISIONS — significant decisions and reasoning

Format: D-### — decision — reasoning/consequences. Newest at the end.

## D-001 — Hash-based SPA routing inside a single exposed route
The hosting sandbox (this deployment environment) exposes exactly one externally visible route (`/`, per the platform's fullstack contract; only port 3000, and only `/` is reachable through the preview gateway). Multi-level path routes (`/fa/topics/x`) cannot be relied on as user-visible URLs here.
Decision: implement the whole product as one client-rendered app at `/` with deep-linkable hash URLs: `#/fa/...`, `#/en/...`. Explicit localized URLs (`#/fa/...`, `#/en/...`) are never redirected away from; there is no server redirect at all, so no redirect loops and no country-dependent caching are possible.
Consequence: path-form URLs from the brief (`/fa/...`) are approximated by hash-form URLs; documented honestly in README and the site's methodology page. If the product later moves to a host exposing full path routing, the internal router maps 1:1 onto real paths (route table is a pure function `parseRoute(hash) → {locale, view, params}`).

## D-002 — Static-first, no backend, no database
No custom accounts, no server-side state: learning progress is stored in `localStorage` under a versioned key with export/import/reset. Reasoning: the brief defaults to static-first and forbids unnecessary infrastructure; progress is personal and portable. Consequence: progress does not sync across devices by default (export/import covers migration).

## D-003 — Stack
Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui (per platform contract) + Zustand (client state) + next-themes (light/dark). No Prisma (no DB, D-002). No additional heavy dependencies. Testing via Bun's built-in test runner + a content-validation script + agent-browser E2E. Reasoning: content-heavy bilingual UI with interactive client features; keeps dependencies proportionate.

## D-004 — Beginner language path: JavaScript → TypeScript
One coherent beginner path (brief forbids competing beginner languages). Chosen: JavaScript (zero-install, immediate browser feedback, one language spanning frontend/backend) followed by TypeScript as types become useful. Python is documented as a strong alternative (readability, data/AI ecosystem). Corroborating evidence: Octoverse 2025 — TypeScript overtook Python and JavaScript in August 2025 as GitHub's most-used language (c-011), which supports the JS→TS-first editorial choice. Labeled as editorial recommendation in topic content.

## D-005 — First framework: React
Largest ecosystem, official docs of high quality (react.dev), TypeScript-first. Alternatives (Vue/Svelte/Angular) mentioned, not taught. Editorial choice, labeled.

## D-006 — Puter AI: user-pays, per-user auth
Assistant runs fully client-side using the Puter SDK; each user authenticates to their own Puter account and consumes their own allowance. No developer-funded shared account, no invented prices/quotas; the UI explains the account model before the first request (wording verified against docs.puter.com/user-pays-model/). Live model round-trip is UNVERIFIED in the sandbox because it requires a user sign-in (docs/VERIFICATION.md).

## D-007 — Application-controlled agentic workflow (not native model-side tool calling)
Puter's chat API is verified (docs.puter.com/AI/chat/); the docs describe model-level function calling for compatible models. Decision: implement the agent loop in application code — the app executes the bounded workflow (searchKnowledge → optional getTopic/getPrerequisites → getProgress only with consent → proposeLearningPlan) with hard bounds (≤5 tool iterations, bounded context) and validated arguments. Reasoning: deterministic bounds enforced by the app (not by model compliance), testable with mocks, works with any chat model, prevents unbounded billable retries. Limitation documented honestly on the methodology page.

## D-008 — Lexical retrieval first; embeddings deferred
Retrieval index generated at build time from the same approved content used by the site (topic/source/claim records; bilingual chunks sharing parent IDs → translated duplicates dedupable). Client-side lexical scoring (BM25-like with Persian normalization). Reasoning: corpus is small (~400 chunks); simple retrieval performs well in testing; embeddings add cost/hosting/model dependency that is not justified by an evaluation. Revisit trigger recorded in CONTENT-MAINTENANCE.md.

## D-009 — Typography
Persian: Vazirmatn (variable, self-hosted via next/font) — high-quality open Persian UI/text face, proper Persian digits support. English: Inter. Fallback to system fonts if font fetch fails. Latin code/numbers inside Persian text use a monospace stack; Persian digits are used for prose numbers in fa locale via locale formatting (Intl), while code snippets always use Western digits.

## D-010 — Liquid-glass design system, restrained
Glass = translucent surfaces + restrained `backdrop-filter` blur on layered backgrounds, with `@supports not (backdrop-filter: …)` opaque fallbacks and always-solid reading surfaces for long educational text. Accent palette: emerald/teal accent on neutral slate/stone surfaces (deliberately avoids blue/indigo per platform style rules). Light/dark via next-themes; `prefers-reduced-motion` disables decorative motion. Contrast: glass surfaces carry an opaque tint layer so AA contrast holds in both themes (checked visually in verification).

## D-011 — Locale selection without server country metadata
Priority implemented: (1) explicit hash locale `#/fa/…`/`#/en/…` (never redirected); (2) saved explicit preference (`localStorage`, set by the visible فارسی/English switch); (3) IP-based country detection — NOT AVAILABLE on this host (the preview gateway exposes no trusted country header); (4) therefore fallback: browser-language preference (`navigator.languages` containing fa) → Persian; else English. Per the brief, IP-based selection is reported as incomplete rather than claimed. If the host later provides `cf-ipcountry`-style trusted metadata, `src/lib/locale.ts` has a single decision function with a documented header-hook point.

## D-012 — Content as versioned TypeScript data
Curriculum lives in `src/content/*.ts` (typed, validated by scripts/validate-content.ts). Pages, search index, and retrieval chunks are generated from these same data — one source of truth; no duplicate content paths that could drift.

## D-013 — Geographic honesty
Survey/labor statistics are labeled with geography + date + population (mostly US/global). No Iran-specific AI-labor statistics were found that meet evidence standards; the evidence page states this gap explicitly instead of extrapolating (research/GAPS.md G-4).

## D-014 — Product name and domain split
Product name "Masir / مسیر" ("path") — short, bilingual-friendly, no trademark claims made. Working research notes stay in English (one consistent working language); all public-facing summaries (site content) are written natively in both fa and en, not machine-literal translations.
