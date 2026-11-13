# Claim Registry

Evidence kinds: `observed` (measured in a study), `survey` (self-reported perception), `causal`
(experiment/RCT or meta-analysis), `forecast` (projection), `opinion` (practitioner/editorial),
`recommendation` (editorial curriculum recommendation, reasoning given).
All statistics keep their geography, population, and date. Numbers are as printed in the source notes.

## AI productivity & delivery

**c-001** (causal, task-level) — In a randomized experiment, 95 programmers with GitHub Copilot
completed a standardized greenfield task (HTTP server in JS) **55.8% faster** than control
(71.2 vs 160.9 min; 95% CI [21%, 89%], p=0.0017); success rate did not differ significantly.
Scope: one task, Upwork-recruited freelancers, 2023-era Copilot. [src-peng2023, src-ziegler2023]

**c-002** (causal, field) — In a 2025 RCT, 16 experienced OSS maintainers using early-2025 AI tools
(Cursor Pro + Claude 3.5/3.7 Sonnet) on their own mature repos were **19% slower** across 246 issues;
before the study they forecast +24% speedup and afterwards still believed +20%. [src-metr2025]

**c-003** (survey, correlational) — DORA 2024 (n≈3,000; 39,000 = decade-cumulative): a 25% increase in
AI adoption is associated with +7.5% documentation quality, +3.4% code quality, **−1.5% delivery
throughput, −7.2% delivery stability**; 75.9% rely on AI at least partly; 39.2% report little/no trust
in AI-generated code. Correlation, not causation. [src-dora2024]

**c-004** (observed, correlational) — GitClear (211M changed lines, 2020-2024): refactoring/moved-code
share fell 24.1%→9.5%; copy/pasted lines rose 8.3%→12.3%; 2024 was the first year added duplicated
code exceeded refactoring; duplicated code blocks rose ~8x in 2024 (secondary coverage; the widely
quoted "~4x clones" headline could not be verified). [src-gitclear2025]

**c-005** (survey) — SO 2025 (n=49,009, 177 countries): 84% use or plan to use AI tools (up from 76%);
51% of professional developers use AI daily; **46% distrust accuracy vs 33% trust**; 66% frustrated by
"almost right" AI solutions; 45% say debugging AI code is more time-consuming; positive sentiment fell
to 60% (from 70%+). [src-so2025]

**c-006** (survey) — SO 2024 (n=65,437): 76% use/plan AI tools (62% currently using); favorability
72% (down from 77%); 45% of professional developers say AI tools are bad at complex tasks; 70% do not
see AI as a threat to their job; learners trust AI accuracy more than professionals (49% vs 42%).
[src-so2024]

**c-007** (survey) — JetBrains 2025 (n=24,534): 85% regularly use AI tools; 68% expect AI proficiency
to become a job requirement; most-delegated: boilerplate, information search, docs; least-delegated:
application logic, debugging, understanding code. [src-jetbrains2024]

**c-008** (survey) — JetBrains 2024 (n=23,262): self-estimated AI time savings cluster at 1-4 h/week;
self-reported benefits (67% less time searching) are perceptions, not measurements. [src-jetbrains2024]

**c-009** (survey, vendor-run) — Ziegler et al. experiments: task completion 55% faster in the
controlled task (same experiment family as c-001); >90% of 2,000+ Copilot users reported faster
completion (perception). [src-ziegler2023]

**c-010** (survey, organizational) — McKinsey State of AI: 78% of respondent organizations used AI in
≥1 business function (edition of 2025-03-12; up from 72%); ~88% reported in the 2025-11 edition per
the publisher's own announcement; self-reported, consultancy-run. [src-mckinsey-soai2025]

**c-011** (observed, platform telemetry) — Octoverse 2025: >180M developers on GitHub; 36M joined in
one year (+23%); **TypeScript overtook Python and JavaScript in Aug 2025 as the most-used language**;
1.1M public repos use an LLM SDK (+178% YoY); ~80% of new developers use Copilot in their first week;
explicit caveat: "observational signals rather than causal claims." [src-octoverse2025]

**c-012** (forecast) — WEF Future of Jobs 2025 (1,043 employers, 14.1M workers, 55 economies):
39% of workers' core skills expected to change by 2030; AI & big data = fastest-growing skills;
Software and Applications Developers among fastest-growing roles; 170M jobs created vs 92M displaced
projected 2025-2030 (employer-survey extrapolation). [src-wef2025]

## Employment (geography-labeled)

**c-013** (observed, administrative data) — Canaries in the Coal Mine (US ADP payroll, revised
Aug 2026): employment of 22-25-year-olds in the most AI-exposed occupations **19% below** the
kept-pace counterfactual (earlier vintages: 13% @2025-07, 16% @2025-09); operates via reduced hiring,
not separations; software development and customer service are the named case studies; no comparable
gap for older workers. US only. [src-stanford-canaries2025]

**c-014** (observed, official statistics; OOH page blocked) — US O*NET (source: BLS, 2025 wage data):
Software Developers (15-1252.00) median pay **$135,980/year** (US, 2025); 1,717,800 employed;
projected growth 2025-2035 "much faster than average (7%+)" with **95,300 projected openings/year**.
US only; not generalizable. [src-bls-swe]

**c-015** (recommendation) — The platform makes no job guarantees in either direction. Evidence
supports: rising global developer population (c-011), sustained US demand projections (c-014), and a
real US entry-level hiring contraction in AI-exposed occupations (c-013). Learner implication:
demonstrate competence with concrete work early — exactly what the project milestones exist for.

## Quality & security of AI code

**c-016** (causal, experiment) — Pearce et al.: of 1,689 programs generated by the 2021 Copilot model
across 89 security-relevant scenarios, **~40% contained vulnerabilities**. Older model, synthetic
scenarios. [src-pearce2022]

**c-017** (experiment, vendor) — Veracode 2025 (100+ LLMs, Java/JS/Python/C#): **45% of generated
samples failed security tests**, introducing OWASP Top 10 flaws; Java worst (72%), JS 43%, Python
38%; XSS (CWE-80) failures 86%; "Security performance remained flat, regardless of model size or
training sophistication." [src-veracode2025]

**c-018** (recommendation, standards) — OWASP Top 10 for LLM Applications (2025 edition; a 2026
edition dated 2026-08-04 supersedes it): LLM01 = prompt injection; also LLM02 sensitive information
disclosure, LLM06 excessive agency, LLM10 unbounded consumption. Design rule: retrieved content is
data, never instructions; bound tool agency. [src-owasp-llm10]

**c-019** (recommendation, standards) — OWASP Top 10 (2025 edition current; 2021 superseded) defines
the baseline web-security risk vocabulary the security topic teaches. [src-owasp-top10]

## Learning science

**c-020** (causal, systematic review) — Dunlosky et al. 2013: of ten techniques, **practice testing**
and **distributed practice** are the only "high utility" techniques; summarization, highlighting,
rereading are low-utility. [src-dunlosky2013]

**c-021** (causal, meta-analysis) — Adesope et al. 2017: practice testing beats restudying (g≈0.51)
and filler/no-activity (g≈0.93); effects moderated by test format, feedback, spacing. [src-adesope2017]

**c-022** (causal, framework chapter) — Bjork & Bjork: desirable difficulties (spacing, interleaving,
generation) produce durable, flexible learning; boundary condition: only when the learner has the
background knowledge to engage them — otherwise undesirable. [src-bjork2011]

**c-023** (observed, multi-national) — Lister et al. 2004: among 941 novices in seven countries,
many could not reliably predict or explain short programs; bottom-quartile students ~30% correct vs
~90% for top quartile on explaining a function. Reading/tracing precedes reliable writing.
[src-lister2004]

**c-024** (recommendation) — "Completion" on this platform = demonstrated understanding (trace,
explain, rebuild, test — never watch/generate). Basis: c-020, c-021, c-022, c-023.

## Foundations & practice (standards)

**c-025** (recommendation, standard) — CS2023: 17 knowledge areas; minimal CS Core; competency =
knowledge + skills + dispositions; includes a Generative-AI-and-the-curriculum chapter. [src-cs2023]

**c-026** (recommendation, standard) — SE2014 SEEK: 10 knowledge areas; security is standalone AND
crosscutting; the document predates LLMs (no AI guidance) — platforms must add that layer themselves.
SE2024 volume not published as of 2026-11-14. [src-se2024]

**c-027** (recommendation, standard) — SWEBOK v4.0 (2024): 18 knowledge areas; adds Software
Architecture, Software Engineering Operations, Software Security; Agile/DevOps integrated; security
named as a revision driver. [src-swebok4]

**c-028** (recommendation) — Security/privacy/dependency hygiene are taught in the shared core, not
as an elective (basis: c-026, c-027, c-016, c-017, src-owasp-top10).

**c-029** (survey) — SO 2025: 52% of developers don't use AI agents or stick to simpler tools; among
agent users, ~70% report time savings on tasks but only 17% report collaboration improvements.
[src-so2025]

**c-030** (observed, qualitative) — Barke et al. (n=20): AI-assisted work splits into **acceleration**
(implementing a known plan) and **exploration** (letting the model lead); novices over-lean on
exploration with inflated expectations of the model — a documented over-reliance mechanism.
[src-barke2023]

**c-031** (recommendation) — Teach the skills developers refuse to delegate (specification,
decomposition, review, testing, debugging — c-007) and treat AI delegation of boilerplate as
explicit, reviewable practice.

**c-032** (recommendation) — Present AI productivity claims as task-level vs delivery-level;
both METR (slower in the field) and Peng (faster on a synthetic task) are true in their settings.

**c-035** (observed, standard) — WCAG 2.2 (W3C Recommendation, 2024-12-12): POUR principles; nine new
success criteria incl. focus-not-obscured and target-size-minimum; 4.1.1 Parsing removed; AA is the
conformance target used by this platform. [src-wcag22]

**c-036** (survey) — SO 2024: 70% of professional developers do not perceive AI as a job threat;
perception split by experience level. [src-so2024]

**c-037** (recommendation) — Operations literacy (config as environment variables, observability,
symptom-based alerting) is core developer knowledge: The Twelve-Factor App + Google SRE Book.
[src-12factor, src-srebook]

**c-038** (survey) — JetBrains 2025: emotions about AI are mixed (29% hopeful, 22% excited, 18%
uncertain, 17% anxious); top concerns: generated-code quality (23%), limited understanding of complex
logic (18%), skills atrophy (11%). [src-jetbrains2024]

## Editorial choices (labeled in-product as recommendations)

- **c-e1** — Beginner language path = JavaScript → TypeScript. Reasons: browser immediacy for
  novices; one language across frontend/backend/AI-app tracks; TypeScript is GitHub's most-used
  language (c-011). Python documented as a strong alternative (dominant for AI/data workloads per
  Octoverse). [src-octoverse2025]
- **c-e2** — First UI framework = React (official docs quality, TS-first, ecosystem); alternatives
  named, not taught. [src-react-docs]
- **c-e3** — Retrieval for the assistant = lexical (BM25-like) before embeddings; corpus ~400 chunks;
  revisit trigger documented. [src-owasp-llm10 for grounding discipline; cost/complexity reasoning in
  docs/DECISIONS.md D-008]

## Review policy

Time-sensitive claims (c-003, c-005, c-007, c-010, c-011, c-012, c-013, c-014) are reviewed at every
curriculum refresh; see docs/CONTENT-MAINTENANCE.md.
