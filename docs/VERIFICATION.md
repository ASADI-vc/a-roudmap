# VERIFICATION — actual commands and results

All results below were produced by real commands in the sandbox on 2026-11-13/14.
Nothing in this file is claimed without having been run. Dev-only issues are labeled.

## 1. Content integrity

```
bun run scripts/validate-content.ts
✓ topic IDs unique (34)
✓ prereq graph acyclic (48 edges, 34 nodes)
✓ all topic prereq/related references resolve
✓ all topic→claim references resolve
✓ all claim/topic→source references resolve
✓ fa/en field parity + required fields for all topics
✓ projects valid (6)
✓ claims valid (31)
✓ sources valid (39)
9 checks passed, 0 errors — CONTENT VALIDATION: PASS
```

Retrieval corpus generation (same content):
```
bun run scripts/gen-kb.ts
KB generated: 430 chunks from 34 topics, 6 projects, 31 claims, 39 sources
```

## 2. Static analysis

```
bun run lint        → clean (0 errors, 0 warnings)
bunx tsc --noEmit   → 0 errors (scaffold's examples/, skills/, and tests/ excluded from
                      the app typecheck; tests run under bun's own runtime)
```

## 3. Unit tests (bun test)

```
bun test
✓ 46 pass, 0 fail, 794 expect() calls — 5 files
  - router: parse/build/swap (explicit localized URLs never redirected; equivalent-page swap)
  - locale decision chain (explicit > saved > country-hook > browser fallback)
  - graph integrity: acyclic, topo order respects prereqs, closures, unlocks
  - deterministic onboarding recommendations (all 24 background×goal×pace combos → valid projects)
  - lexical search: en/fa/mixed queries, Persian normalization + suffix stemming, locale filter, boost
  - markdown sanitizer: HTML escaping, script inert, javascript:/data: links blocked,
    rel="noopener noreferrer nofollow" on external links
  - progress store: status transitions, export/import round-trip, invalid import rejected
  - retrieval corpus: parent-ID coverage for all topics, cross-language retrieval,
    translation dedupe by parent, citation links resolve to internal hash routes
  - Puter surface: tool specs follow documented protocol, documented auth error codes
    (auth_window_closed, popup_blocked) map to UI states, stream chunk normalization,
    SDK URL matches docs (https://js.puter.com/v2/)
  - claim registry coherence: every claim cites registered sources; bilingual caveats
```

## 4. E2E (agent-browser, Chromium, fresh session; dev server via port 3000 and gateway :81)

| # | Scenario | Result |
|---|----------|--------|
| 1 | Bare `/` renders home (en auto-selected, hydration verified via React fibers + theme/lang toggles) | PASS |
| 2 | Language switch فارسی → `#/fa`, `lang=fa dir=rtl`, Persian h1, progress untouched | PASS |
| 3 | Onboarding (fa): 3 questions → deterministic recommendation (تفکر محاسباتی + مبانی + p-01 + pace text) | PASS |
| 4 | Topic detail (fa): terminology pills, mark-done → `masir.progress.v1` updated in localStorage | PASS |
| 5 | Reload on `#/fa/topic/...` → URL, lang, progress preserved (explicit URL never redirected) | PASS |
| 6 | Switch language on topic page → `#/en/topic/...`, `dir=ltr`, progress intact | PASS |
| 7 | Search "git commit" (en) → Terminal & Git top hit; "امنیت" (fa) → Persian claims + security topic; mixed "امنیت security OWASP" → 20 cross-kind results | PASS |
| 8 | Roadmap: graph view 34 nodes, SVG prereq arrows; accessible list view 34 ordered items; track filter | PASS (after fixing a double-translate clipping bug — Tailwind 4 `translate` property composes with inline `transform`) |
| 9 | Project p-02: rubric self-assessment saved to localStorage (`p-02` present) | PASS |
| 10 | Evidence page: kind filter (Causal) → Peng 55.8% + METR 19% both visible | PASS |
| 11 | Source detail `#/en/source/src-metr2025` → title + cited claims | PASS (after fixing a missing view binding in AppRoot) |
| 12 | Methodology `#/fa/methodology` → Persian methodology rules | PASS |
| 13 | Assistant: page renders; account model panel; suggested questions; SDK loads from js.puter.com on interaction only (`window.puter` true after send); WITHOUT sign-in the flow surfaces an honest error state, no billable call | PASS |
| 14 | Assistant auth timeout: hanging popup promise resolved by app-side 60s timeout → "Sign-in was cancelled — nothing was charged" (fix applied during this run) | PASS |
| 15 | Unknown topic ID deep link (`topic/t-git`) → graceful redirect to topics list (no crash) | PASS |
| 16 | Real deep links `#/en/topic/t-terminal-git`, `#/fa/project/p-05` | PASS |
| 17 | Progress page: stats, export/import/reset controls present (fa) | PASS |
| 18 | Console on fresh session: only React DevTools info + HMR connected — no runtime errors | PASS |

Locale matrix actually tested: explicit `#/fa` URL, explicit `#/en` URL, bare-root auto-selection
(en in this environment), saved preference via switch, refresh persistence, unknown-ID fallback.
NOT testable here: IP/country-based selection — this host exposes no trusted country metadata;
the decision function has a documented hook (`countryFromPlatform()`) and the browser-language
fallback is active (docs/DECISIONS.md D-011). Simulated-geo tests were not claimed as live-geo tests.

## 5. Visual inspection (screenshots read and reviewed)

- `#/en` home (light) — glass cards, stats, journeys, evidence teaser
- `#/fa` home (light, RTL) — Persian digits (۳۴/۶/۳۹/۳۱), RTL nav/hero, Vazirmatn rendering
- `#/fa` home (390px mobile, dark) — correct RTL mobile layout, wrapped headline, touch targets
- `#/en/roadmap` graph (dark) — 4 track columns, numbered topic cards, curved prereq arrows
- `#/fa/topic/t-security-privacy` (dark) — Jalali date (۲۳ آبان ۱۴۰۵), bilingual terminology pills
- Puter's own consent dialog observed when SDK initializes (by design, before first AI request)

Dev-mode note: the Next.js devtools badge showed "1 Issue"; the console is clean and the panel
contains route metadata only — dev-only UI, not part of the production artifact.

## 6. Puter live integration — UNVERIFIED (honest limitation)

The Puter **user-pays model requires each user to sign in to their own account**; the sandbox has
no authorized Puter account, so the live model round-trip (real streaming answer, real tool calls,
real billing) could NOT be executed. What WAS verified: SDK loads (`window.puter` populated),
documented API surface implemented verbatim (chat(messages, testMode, {stream, tools, signal}),
auth error codes, async-iterable streaming chunks), UI error states, and `testMode` support for
credit-free demoing. Anyone with a Puter account can complete verification by opening the
assistant, signing in, and asking one of the suggested questions; citations must resolve to
rendered chips.

## 7. Deployment checks (via the platform preview gateway, same reverse proxy as the public URL)

```
curl http://localhost:81/                      → 200, <title>Masir · مسیر …</title>
curl gateway CSS asset                         → 200 (146,765 bytes, text/css)
curl / with Accept-Language: fa                → 200 (client-side locale selection applies)
```

The externally visible preview URL is assigned by the hosting platform (preview panel /
"Open in New Tab"); the sandbox does not expose the bot-id, so no literal public URL is printed
here. The deployed origin serves the same dev-server-backed app verified above.

## 8. Issues found and fixed during verification

1. AppRoot missing `view === "source"` binding → source detail pages rendered empty (fixed).
2. Roadmap node clipping: Tailwind 4 `translate` property composed with inline `transform` →
   double shift (fixed by removing the utility class).
3. Assistant sign-in popup promise could hang forever in environments where the popup is
   suppressed → added 60s app-side timeout + visible "waiting for sign-in" state (fixed).
4. TopicsView invalid JSX (adjacent siblings) and a render-time component definition (fixed).
5. `normalizeChunk` not exported (test visibility; fixed).
6. Persian lexical recall: suffix "های" broke exact matching → added light stemmer (fixed,
   tests re-run: 46/46).
