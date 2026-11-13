// Content schema — single source of truth for all educational content.
// Validated by scripts/validate-content.ts.

export type Locale = "fa" | "en";
export type TrackId = "core" | "frontend" | "backend" | "aiapps";

export interface Bilingual<T = string> {
  fa: T;
  en: T;
}

export interface ResourceRef {
  title: string;
  url: string;
  /** Content language of the resource itself */
  lang: "fa" | "en" | "both";
  level: "beginner" | "intermediate" | "advanced" | "reference";
  free: boolean;
  note?: Bilingual;
}

export interface Topic {
  /** Stable, language-independent ID */
  id: string;
  track: TrackId;
  /** Editorial position inside its track (used for recommended sequence) */
  order: number;
  title: Bilingual;
  /** Key technical terminology shown on the topic page */
  terms: Bilingual[]; // fa: "اصطلاح (Term)", en: "Term (اصطلاح)"
  /** Concise explanation, ~70-110 words per locale */
  summary: Bilingual;
  /** Learning outcomes, 4-6 bullets */
  outcomes: Bilingual<string[]>;
  /** Why it matters, including AI relevance, ~60-90 words */
  why: Bilingual;
  prereqs: string[]; // topic IDs (essential prerequisites)
  related: string[]; // related-topic edges (non-prerequisite)
  /** depth distinction */
  essential: Bilingual;
  optional: Bilingual;
  exercise: Bilingual;
  aiGuidance: Bilingual;
  check: Bilingual; // independent understanding check
  completion: Bilingual<string[]>; // observable completion criteria
  resources: ResourceRef[];
  claims: string[]; // claim IDs from src/content/claims.ts
  sources: string[]; // source IDs from src/content/sources.ts
  /** For working developers: topics they can skim. */
  skipAhead?: Bilingual;
  lastReview: string; // ISO date of last content review
}

export interface Project {
  id: string;
  order: number;
  title: Bilingual;
  trackFocus: TrackId[];
  topicIds: string[];
  spec: Bilingual;
  constraints: Bilingual<string[]>;
  acceptance: Bilingual<string[]>;
  rubric: Array<{
    id: string;
    criterion: Bilingual;
    levels: Bilingual<string[]>; // [not-yet, developing, proficient]
  }>;
  aiPolicy: Bilingual; // what AI may/may not do on this project
  lastReview: string;
}

export type ClaimKind =
  | "observed"
  | "survey"
  | "causal"
  | "forecast"
  | "opinion"
  | "recommendation";

export interface Claim {
  id: string;
  kind: ClaimKind;
  statement: Bilingual;
  caveats: Bilingual;
  sourceIds: string[];
  /** true when the claim's numbers are time-sensitive (review each refresh) */
  volatile?: boolean;
}

export interface SourceRecord {
  id: string;
  title: string; // original title preserved
  org: string;
  url: string;
  year: string; // "2025" | "2024-12" | "unknown"
  type:
    | "curriculum"
    | "peer-reviewed"
    | "meta-analysis"
    | "survey"
    | "official-docs"
    | "industry-report"
    | "standards"
    | "vendor-docs"
    | "practitioner";
  desc: Bilingual; // 1-2 sentence public summary per locale
  accessStatus: "full" | "partial" | "inaccessible";
}

export interface Track {
  id: TrackId;
  title: Bilingual;
  tagline: Bilingual;
  color: string; // accent token name
}
