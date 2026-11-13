# Synthesis — Evidence → Curriculum

This file connects the 39 source notes to curriculum decisions. Claims with stable IDs live in
research/CLAIMS.md; geographic and evidence limitations live in research/GAPS.md.

## 1. Where the evidence agrees

- **Retrieval and spacing beat passive review.** Practice testing and distributed practice are the
  only two techniques Dunlosky et al. rate "high utility" (src-dunlosky2013); Adesope et al.'s
  meta-analysis finds practice testing beats restudying (g≈0.51) and filler/no activity (g≈0.93)
  (src-adesope2017); the Bjorks explain the mechanism (desirable difficulties, storage vs retrieval
  strength) and the boundary condition: difficulty is only productive when the learner has enough
  background knowledge (src-bjork2011). → Curriculum decision: every topic carries an independent
  understanding check; projects interleave earlier topics; learning is marked "complete" only on
  demonstrated understanding (claim c-024), never on content consumption.
- **Novices struggle to read before they can write — and that is exactly what survives AI.** Lister
  et al.: many end-of-CS1 students cannot reliably trace or explain short code (941 students, seven
  countries) (src-lister2004). Barke et al. show AI pushes learners into an "exploration" mode where
  code arrives faster than understanding (src-barke2023). → Decision: reading and tracing are taught
  explicitly and early; AI guidance in every topic stresses reviewing and predicting code before
  accepting it.
- **Professional practice is curriculum, not garnish.** CS2023 keeps a minimal CS Core but embeds
  security, data management, foundations of programming languages, and a Society/Ethics/Profession
  area across KAs (src-cs2023); SE2014 makes security both a standalone KA and a crosscutting
  lifecycle concern (src-se2024); SWEBOK v4.0 adds Software Architecture, SE Operations, and Software
  Security as new knowledge areas and integrates Agile/DevOps (src-swebok4). → Decision: the shared
  foundation includes security/privacy, deployment/operations, and communication as first-class
  topics, not optional extras.
- **Practitioners use AI heavily but trust it little — and keep the hard parts for themselves.**
  SO 2025: 84% use or plan to use AI tools; 46% distrust accuracy vs 33% trust; 66% are frustrated by
  "almost right" solutions; 45% say debugging AI code costs extra time (src-so2025). JetBrains 2025:
  85% regular use, but developers delegate boilerplate/search/docs while keeping application logic,
  debugging, and code understanding (src-jetbrains2024). → Decision: the curriculum trains precisely
  the kept-control skills (specification, decomposition, review, testing, debugging) and treats AI
  delegation of boilerplate as legitimate but explicit.

## 2. Where the evidence disagrees — and what we tell learners

- **Does AI make developers faster?** Task-level RCTs say yes: 55.8% faster on a standardized
  greenfield HTTP-server task (src-peng2023). Field RCT on experienced maintainers in mature repos
  says no: 19% slower with early-2025 tools, while the developers themselves believed they were ~20%
  faster (src-metr2025). DORA 2024 (survey, correlational): more AI adoption tracks with better
  perceived productivity and documentation but slightly worse delivery throughput (−1.5%) and worse
  delivery stability (−7.2%) per 25% adoption increase (src-dora2024). → Presentation: task speed ≠
  delivery speed ≠ quality; both results are labeled with their settings. This disagreement is itself
  a lesson: context (greenfield vs mature code, task size, verification burden) decides the outcome.
- **Perception vs measurement.** Self-reported gains are consistently larger than measured ones
  (Peng participants under-estimated a real 55.8% gain; METR participants over-estimated a real 19%
  loss; >90% of Ziegler survey respondents "felt" faster — vendor-run). SO favorability *fell* in
  2024-2025 while usage rose (src-so2024, src-so2025). → The evidence page teaches this gap directly:
  survey perception is labeled as perception.
- **Is AI-generated code safe?** Experiments: ~40% of Copilot outputs vulnerable in security-relevant
  scenarios (src-pearce2022); 45% of generated code samples introduced OWASP Top 10 flaws in Veracode's
  2025 tests, with security "flat" across model generations (src-veracode2025). Code-quality telemetry:
  refactoring share fell 24.1%→9.5% while duplicated lines rose 8.3%→12.3% (2020→2024) (src-gitclear2025,
  correlational). → Decision: security review and independent testing of AI output are mandatory steps
  in every project rubric; "AI wrote it" is never an acceptance argument.
- **Is junior employment collapsing?** US-only payroll evidence: young workers (22–25) in AI-exposed
  occupations ~19% below the kept-pace counterfactual (Aug 2026 revision; earlier vintages 13–16%),
  driven by reduced hiring rather than layoffs; software development is a named case study
  (src-stanford-canaries2025). Yet GitHub added 36M developers in one year and software developers are
  still among WEF's fastest-growing roles to 2030 (src-octoverse2025, src-wef2025). Both can be true:
  fewer entry openings per skill level in exposed US occupations, while global developer population and
  AI-adjacent demand grow. → The careers section presents both, labeled by geography and measurement;
  no job guarantees in either direction.

## 3. Durable engineering skills (the curriculum's spine)

Synthesizing curricula (src-cs2023, src-se2024, src-swebok4), the productivity evidence, and what
developers themselves refuse to delegate (src-jetbrains2024):

1. Problem decomposition and computational thinking.
2. Reading, tracing, and explaining code — before writing it.
3. One language family mastered deeply (JavaScript→TypeScript on this platform) plus transferable
   mental models: data structures, complexity, state.
4. Verification: testing, debugging, reviewing diffs — the skills 45-66% of developers say AI makes
   *more* important (src-so2025, src-veracode2025).
5. Systems literacy: HTTP, databases/SQL, OS concepts, deployment/operations (SWEBOK v4's new SE
   Operations KA; src-swebok4, src-mdn-http, src-postgres-manual).
6. Security, privacy, dependency hygiene (SE2014 crosscutting; OWASP Top 10; src-veracode2025).
7. Specification and communication: writing acceptance criteria, explaining tradeoffs, reviewing
   PRs — the skills that make AI outputs reviewable and teams function (src-se2024).
8. Judged AI usage: when to delegate, when to withhold, cost/latency limits, prompt-injection
   awareness (src-owasp-llm10, src-jetbrains2024).

## 4. Practices changed by AI (taught explicitly as change)

- Specifications and acceptance criteria gain value (AI needs a checkable target) — SE2014 REQ/VAV
  elevated.
- Diff review becomes a core daily skill (AI produces diffs at a rate human habit wasn't tuned for) —
  GitClear churn/duplication evidence motivates review discipline (src-gitclear2025).
- Testing shifts from "confirm it works" to "disprove it" — generated code is plausible-but-wrong more
  often than human code in security tests (src-veracode2025).
- Security review must assume the code was written faster than it was understood (src-pearce2022).
- Cost/latency awareness: model calls are resources to budget (Puter user-pays model, src-puter-userpays).

## 5. Risks of outsourcing understanding (stated to learners)

- Fluency illusion: easy AI-assisted progress feels like learning; the Bjorks' retrieval-strength trap
  (src-bjork2011) + METR's perception gap (src-metr2025) both show people misjudge their own competence.
- Fragile tracing skills: Lister's novices could often write before they could read (src-lister2004);
  AI widens that gap by writing for you.
- Security debt: plausible-but-vulnerable code passes visual review (src-pearce2022, src-veracode2025).
- The curriculum's countermeasure: independent understanding checks that AI cannot complete for you
  (predict-then-run exercises, tracing tasks, explain-in-your-own-words prompts, from-scratch rebuilds).

## 6. Implications per audience

- **Beginners:** start with reading/tracing + small from-scratch wins; use AI as explainer, not
  ghostwriter, until fundamentals are demonstrated (Lister + Bjork boundary condition).
- **Students (CE curriculum):** map academic courses onto the practical graph; SWEBOK/CS2023 KAs are
  used as a crosswalk (what to deepen, what industry adds: ops, testing discipline, review culture).
- **Working developers:** skip-forward tags per topic; the AI-era practices section is designed to be
  read without repeating fundamentals (SO 2025: experienced developers are the most cautious AI users —
  that caution is codified here, not dismissed).

## 7. Unresolved questions (tracked in GAPS.md)

- End-to-end (not task-level) causal productivity evidence remains thin; DORA 2025+ editions and METR
  follow-ups should be re-read at each curriculum review.
- Whether the US junior-hiring dip persists or mean-reverts (Canaries revision history already moved
  13%→16%→19% across vintages — treat all numbers as vintaged).
- Iran-specific evidence: none found meeting standards (G-1).

## 8. How evidence shaped the curriculum (traceability)

- Understanding checks everywhere ← c-020..c-024.
- Reading/tracing as explicit early topics ← c-023, c-030.
- "Review the diff" steps in every project rubric ← c-004, c-016, c-017.
- Evidence page separates observed/survey/causal/forecast/opinion ← methodological requirement from
  src-dora2024, src-metr2025, src-so2025 (perception vs measurement disagreement).
- Language path JS→TS ← Octoverse 2025: TypeScript is GitHub's most-used language (Aug 2025), JS/TS
  ecosystem has the most activity; browser immediacy for beginners; single language across the three
  tracks (src-octoverse2025; editorial, labeled).
- Security/privacy topic in the shared core ← src-se2024, src-swebok4, src-owasp-top10, c-016, c-017.
- Assistant grounded in curated corpus with citation resolution ← OWASP LLM01 (treat retrieved content
  as data), and the platform's own claim registry.
