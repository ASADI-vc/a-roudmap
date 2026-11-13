// Onboarding profile + deterministic recommendation rules (no AI).
import { create } from "zustand";
import { PROFILE_KEY } from "./locale";

export type Background = "beginner" | "student" | "developer";
export type Goal = "frontend" | "backend" | "aiapps" | "unsure";
export type Pace = "light" | "steady" | "intense";

export interface Profile {
  background: Background;
  goal: Goal;
  pace: Pace;
  savedAt?: string;
}

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Profile;
    if (!["beginner", "student", "developer"].includes(p.background)) return null;
    if (!["frontend", "backend", "aiapps", "unsure"].includes(p.goal)) return null;
    if (!["light", "steady", "intense"].includes(p.pace)) return null;
    return p;
  } catch {
    return null;
  }
}

export function persistProfile(p: Profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...p, savedAt: new Date().toISOString() }));
  } catch {
    /* ignore */
  }
}

interface ProfileActions {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
  clearProfile: () => void;
}

export const useProfile = create<ProfileActions>((set) => ({
  profile: typeof window === "undefined" ? null : loadProfile(),
  setProfile: (p) => {
    persistProfile(p);
    set({ profile: p });
  },
  clearProfile: () => {
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {
      /* ignore */
    }
    set({ profile: null });
  },
}));

export interface Recommendation {
  track: "core" | "frontend" | "backend" | "aiapps";
  startTopicIds: string[];
  firstProject: string;
  paceNoteKey: Pace;
  /** topics a working developer can skim */
  skimIds: string[];
}

const CORE_ORDER = [
  "t-computational-thinking",
  "t-programming-basics",
  "t-reading-tracing-code",
  "t-terminal-git",
  "t-debugging-testing",
  "t-typescript",
  "t-data-structures",
  "t-algorithms-core",
  "t-http-web",
  "t-databases-sql",
  "t-os-concepts",
  "t-requirements-design",
  "t-security-privacy",
  "t-deployment-cicd",
  "t-observability-ops",
  "t-communication-collab",
  "t-ai-assisted-workflow",
];

const TRACK_ENTRY: Record<Exclude<Goal, "unsure">, string> = {
  frontend: "t-html-css-foundations",
  backend: "t-node-server-basics",
  aiapps: "t-llm-fundamentals",
};

/**
 * Deterministic rules:
 * - beginner: core from the very top; goal recorded for later.
 * - student: core but starts at reading/tracing (CS1 coverage assumed for basics),
 *   unless goal given — still core-first, track entry shown.
 * - developer: goal track entry + ai-assisted-workflow; skim list of core basics.
 * First project per background: beginner/unsure -> p-01, student -> p-01/p-02 by goal,
 * developer -> goal-aligned project.
 */
export function recommend(profile: Profile, doneTopics: Record<string, string>): Recommendation {
  const isDone = (id: string) => doneTopics[id] === "done";
  const nextIn = (list: string[], n: number) => {
    const out: string[] = [];
    for (const id of list) {
      if (!isDone(id)) out.push(id);
      if (out.length >= n) break;
    }
    return out;
  };

  if (profile.background === "developer") {
    const track = profile.goal === "unsure" ? "core" : profile.goal;
    const entry = profile.goal === "unsure" ? "t-ai-assisted-workflow" : TRACK_ENTRY[profile.goal];
    const start = [entry, "t-ai-assisted-workflow"].filter((x, i, a) => a.indexOf(x) === i);
    const skim = CORE_ORDER.slice(0, 9).filter((id) => !isDone(id));
    const project =
      profile.goal === "frontend"
        ? "p-03"
        : profile.goal === "backend"
          ? "p-04"
          : profile.goal === "aiapps"
            ? "p-05"
            : "p-06";
    return { track, startTopicIds: nextIn(start, 2), firstProject: project, paceNoteKey: profile.pace, skimIds: skim };
  }

  if (profile.background === "student") {
    const track = profile.goal === "unsure" ? "core" : profile.goal;
    const start = nextIn(
      ["t-reading-tracing-code", "t-terminal-git", "t-debugging-testing", "t-typescript"],
      3,
    );
    const project = profile.goal === "backend" ? "p-02" : profile.goal === "aiapps" ? "p-05" : "p-01";
    return { track, startTopicIds: start, firstProject: project, paceNoteKey: profile.pace, skimIds: [] };
  }

  // beginner — always core from the top
  const start = nextIn(CORE_ORDER.slice(0, 5), 2);
  return {
    track: "core",
    startTopicIds: start,
    firstProject: "p-01",
    paceNoteKey: profile.pace,
    skimIds: [],
  };
}
