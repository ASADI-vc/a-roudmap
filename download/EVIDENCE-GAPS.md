# Evidence Gaps & Limitations

Recorded honestly; nothing below is silently extrapolated.

## G-1 — Iran-specific evidence: none found
No Iran-specific AI-labor, AI-adoption, or developer-education statistics meeting evidence standards
were found in this research pass. Stack Overflow 2025's fetched pages do not list Iran among top
reporting countries (top: US 20.4%, Germany, India, UK, France); WEF Future of Jobs 2025 covers 55
economies and Iran is not among them; Octoverse 2025 names no Iran figures; US BLS is US-only by
definition. **Rule applied:** US/global statistics are never presented as applying to Iran. The
evidence page states this gap in both languages. (If a credible local source appears, register it in
research/sources/ and cite it on the evidence page.)

## G-2 — End-to-end delivery causality is thin
Task-level causal evidence exists (c-001); field causal evidence is one small-n RCT (c-002, n=16);
delivery-level evidence (DORA c-003) is survey-correlational. No source establishes a causal effect of
AI assistance on end-to-end delivery time or software quality at scale. The site presents task speed,
delivery performance, and quality as distinct dimensions.

## G-3 — Junior-employment evidence: one country, one payroll provider
c-013 rests on ADP administrative data (US firms only), with interpretation debates and three
revised vintages (13%→16%→19%). It is presented as US-specific and vintaged, never as a global
verdict on junior developers.

## G-4 — Novice-education research predates AI
Lister 2004 (c-023) is the strongest multi-national baseline on novice comprehension; no equivalent
multi-national AI-era replication was found. Barke 2023 (n=20, qualitative) partially bridges but is
small. Claim language stays "evidence predates AI tools; mechanism still applies."

## G-5 — Paywalled/blocked primaries
Adesope 2017 (Cloudflare): direction from ERIC abstract, values (0.51/0.93) from one independent
secondary summary. GitClear (403): figures from two independent secondary reports, mutually
consistent; the "~4x clones" headline could not be verified and is NOT used. McKinsey (bot-blocked):
78% verified from publisher-indexed text; 88% from the publisher's own announcement; the 2026 edition
was not accessible. BLS OOH (403): replaced with O*NET (official BLS-sourced data, different
occupation aggregation, labeled).

## G-6 — Vendor-interest sources
Ziegler/GitHub experiments (c-009) and Veracode (c-017) are vendor-run; GitClear sells code-analytics.
Their figures are used with the conflict-of-interest label and, where possible, corroborated by
independent studies (METR, DORA, OWASP).

## G-7 — Per-model tool-calling support on Puter is not enumerable
docs.puter.com documents the tool-calling protocol but does not guarantee which of 500+ models honor
`tools`. The assistant therefore uses defensive design: pre-retrieved context first, tool loop
optional and bounded, graceful degradation when a model never emits tool calls. Live model behavior
is UNVERIFIED (no authorized Puter account in the sandbox).

## G-8 — Survey populations are skewed
SO/JetBrains samples skew toward Stack Overflow/IDE users, English-adjacent, self-selected; WEF covers
large employers (≥500 employees). Percentages are not workforce censuses; presented with n and
methodology.

## G-9 — Platform constraints
This deployment environment exposes a single route and no trusted country metadata (see
docs/DECISIONS.md D-001, D-011). IP-based locale selection is therefore reported as incomplete, and
path-form URLs (`/fa/...`) are implemented as hash URLs (`#/fa/...`).
