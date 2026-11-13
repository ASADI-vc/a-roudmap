import { create } from "zustand";
import { PROGRESS_KEY } from "./locale";

export type TopicStatus = "not-started" | "in-progress" | "done";

export interface ProjectAssessment {
  // rubricId -> level index (0..2)
  levels: Record<string, number>;
  savedAt: string;
}

export interface ProgressState {
  version: 1;
  /** locale-independent topic IDs -> status */
  topics: Record<string, TopicStatus>;
  /** exercise done per topic */
  exercises: Record<string, boolean>;
  /** understanding check passed per topic */
  checks: Record<string, boolean>;
  projects: Record<string, ProjectAssessment>;
  /** transcript saved by user action */
  savedTranscript?: string;
  updatedAt: string;
}

const empty = (): ProgressState => ({
  version: 1,
  topics: {},
  exercises: {},
  checks: {},
  projects: {},
  updatedAt: new Date().toISOString(),
});

function read(): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as ProgressState;
    if (p.version !== 1 || typeof p.topics !== "object") return empty();
    return {
      version: 1,
      topics: p.topics ?? {},
      exercises: p.exercises ?? {},
      checks: p.checks ?? {},
      projects: p.projects ?? {},
      savedTranscript: p.savedTranscript,
      updatedAt: p.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return empty();
  }
}

function persist(s: ProgressState) {
  try {
    s.updatedAt = new Date().toISOString();
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable (private mode) — progress stays in memory */
  }
}

interface ProgressActions {
  setTopicStatus: (id: string, status: TopicStatus) => void;
  setExerciseDone: (id: string, done: boolean) => void;
  setCheckDone: (id: string, done: boolean) => void;
  setProjectAssessment: (id: string, a: ProjectAssessment) => void;
  saveTranscript: (text: string) => void;
  resetAll: () => void;
  importState: (raw: string) => boolean;
  exportState: () => string;
  _state: ProgressState;
}

export type ProgressStore = ProgressActions;

export const useProgress = create<ProgressActions>((set, get) => ({
  _state: typeof window === "undefined" ? empty() : read(),
  setTopicStatus: (id, status) =>
    set((s) => {
      const topics = { ...s._state.topics };
      if (status === "not-started") delete topics[id];
      else topics[id] = status;
      const next = { ...s._state, topics };
      persist(next);
      return { _state: next };
    }),
  setExerciseDone: (id, done) =>
    set((s) => {
      const exercises = { ...s._state.exercises };
      if (done) exercises[id] = true;
      else delete exercises[id];
      const next = { ...s._state, exercises };
      persist(next);
      return { _state: next };
    }),
  setCheckDone: (id, done) =>
    set((s) => {
      const checks = { ...s._state.checks };
      if (done) checks[id] = true;
      else delete checks[id];
      const next = { ...s._state, checks };
      persist(next);
      return { _state: next };
    }),
  setProjectAssessment: (id, a) =>
    set((s) => {
      const projects = { ...s._state.projects, [id]: a };
      const next = { ...s._state, projects };
      persist(next);
      return { _state: next };
    }),
  saveTranscript: (text) =>
    set((s) => {
      const next = { ...s._state, savedTranscript: text };
      persist(next);
      return { _state: next };
    }),
  resetAll: () =>
    set(() => {
      const next = empty();
      persist(next);
      return { _state: next };
    }),
  importState: (raw) => {
    try {
      const p = JSON.parse(raw) as ProgressState;
      if (p.version !== 1 || typeof p.topics !== "object") return false;
      const next: ProgressState = {
        version: 1,
        topics: p.topics ?? {},
        exercises: p.exercises ?? {},
        checks: p.checks ?? {},
        projects: p.projects ?? {},
        savedTranscript: p.savedTranscript,
        updatedAt: new Date().toISOString(),
      };
      persist(next);
      set({ _state: next });
      return true;
    } catch {
      return false;
    }
  },
  exportState: () => JSON.stringify(get()._state, null, 2),
}));

export function statusOf(s: ProgressState, id: string): TopicStatus {
  return s.topics[id] ?? "not-started";
}

export function counts(s: ProgressState): { done: number; inProgress: number; projects: number } {
  let done = 0;
  let inProgress = 0;
  for (const v of Object.values(s.topics)) {
    if (v === "done") done++;
    else if (v === "in-progress") inProgress++;
  }
  return { done, inProgress, projects: Object.keys(s.projects).length };
}
