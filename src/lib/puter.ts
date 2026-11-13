// Puter integration — verified against docs.puter.com (2026-11-14; src-puter-chat, src-puter-auth,
// src-puter-userpays, src-puter-deployments). No invented methods or model IDs.
//
// Design (docs/DECISIONS.md D-007): application-controlled bounded agentic loop using the verified
// native tool-calling protocol (tools / message.tool_calls / role:"tool"). Bounds are enforced by
// THIS code, not by model compliance. If a model never emits tool calls, the loop exits after the
// first call with the pre-injected retrieved context — graceful degradation.

export const PUTER_SDK_URL = "https://js.puter.com/v2/";

export interface PuterSDK {
  ai: {
    chat: (
      promptOrMessages: unknown,
      testModeOrOptions?: unknown,
      options?: unknown,
    ) => Promise<unknown>;
    listModels?: () => Promise<unknown>;
  };
  auth: {
    signIn: (options?: unknown) => Promise<unknown>;
    isSignedIn: () => boolean;
    signOut: () => void;
    getUser: () => Promise<{ username?: string; email?: string }>;
  };
}

declare global {
  interface Window {
    puter?: PuterSDK;
  }
}

let loadPromise: Promise<PuterSDK> | null = null;

export function loadPuter(): Promise<PuterSDK> {
  if (typeof window === "undefined") return Promise.reject(new Error("no-window"));
  if (window.puter) return Promise.resolve(window.puter);
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<PuterSDK>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PUTER_SDK_URL}"]`);
    const script = existing ?? document.createElement("script");
    const onReady = () => {
      if (window.puter) resolve(window.puter);
      else reject(new Error("puter-sdk-missing"));
    };
    script.addEventListener("load", onReady);
    script.addEventListener("error", () => reject(new Error("puter-sdk-load-failed")));
    if (!existing) {
      script.src = PUTER_SDK_URL;
      script.async = true;
      document.head.appendChild(script);
    } else if (window.puter) {
      onReady();
    }
    // safety timeout
    setTimeout(() => {
      if (!window.puter) reject(new Error("puter-sdk-timeout"));
    }, 15000);
  });
  return loadPromise;
}

export type AssistantError =
  | "auth_cancelled"
  | "popup_blocked"
  | "quota"
  | "network"
  | "unavailable"
  | "no_answer"
  | "unknown";

export function mapPuterError(e: unknown): AssistantError {
  const msg = typeof e === "object" && e && "message" in e ? String((e as { message: unknown }).message) : String(e);
  const code = typeof e === "object" && e && "code" in e ? String((e as { code: unknown }).code) : "";
  const m = `${msg} ${code}`.toLowerCase();
  if (m.includes("auth_window_closed") || m.includes("closed the sign-in")) return "auth_cancelled";
  if (m.includes("popup_blocked")) return "popup_blocked";
  if (m.includes("unsupported_origin")) return "popup_blocked";
  if (
    m.includes("usage") ||
    m.includes("quota") ||
    m.includes("billing") ||
    m.includes("allowance") ||
    m.includes("exhausted") ||
    m.includes("permission_denied")
  )
    return "quota";
  if (m.includes("network") || m.includes("fetch") || m.includes("timeout")) return "network";
  if (m.includes("model") || m.includes("upstream") || m.includes("provider")) return "unavailable";
  return "unknown";
}

// ---------- tool definitions (verified protocol: { type:"function", function:{...} }) ----------

export interface ToolSpec {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
    strict?: boolean;
  };
}

export const assistantTools: ToolSpec[] = [
  {
    type: "function",
    function: {
      name: "searchKnowledge",
      description:
        "Search the platform's curated bilingual knowledge base (topics, evidence claims, sources, projects). Use for any factual question about the curriculum.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search phrase; Persian, English, or mixed" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getTopic",
      description: "Get the full record of one topic by its stable ID (e.g. t-programming-basics).",
      parameters: {
        type: "object",
        properties: { topicId: { type: "string" } },
        required: ["topicId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPrerequisites",
      description: "Get essential prerequisite topic IDs (transitive) for a topic ID.",
      parameters: {
        type: "object",
        properties: { topicId: { type: "string" } },
        required: ["topicId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getProgress",
      description:
        "Read the user's local learning progress (topic statuses). Only callable when the user has granted consent.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "proposeLearningPlan",
      description:
        "Generate a deterministic learning plan (topics in order, weekly pacing) for a track and weekly hours.",
      parameters: {
        type: "object",
        properties: {
          track: { type: "string", enum: ["core", "frontend", "backend", "aiapps"] },
          weeks: { type: "number" },
        },
        required: ["track"],
      },
    },
  },
];

// ---------- chat plumbing ----------

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: unknown;
  tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }>;
  tool_call_id?: string;
}

export interface StreamChunk {
  type: "text" | "tool_use" | "error" | "usage" | "reasoning" | "unknown";
  text?: string;
  toolCall?: { id: string; name: string; arguments: string };
  message?: string;
}

/** Normalize a streaming chunk of unknown exact shape into our StreamChunk. */
export function normalizeChunk(part: unknown): StreamChunk {
  if (part == null) return { type: "unknown" };
  if (typeof part === "string") return { type: "text", text: part };
  const p = part as Record<string, unknown>;
  if (p.type === "error") return { type: "error", message: String(p.message ?? "stream error") };
  if (p.type === "text") return { type: "text", text: String(p.text ?? "") };
  if (p.type === "tool_use" || p.type === "tool_calls") {
    const fn = (p.function ?? {}) as Record<string, unknown>;
    return {
      type: "tool_use",
      toolCall: {
        id: String(p.id ?? p.tool_call_id ?? fn.id ?? "call"),
        name: String(p.name ?? fn.name ?? ""),
        arguments: String(p.arguments ?? fn.arguments ?? "{}"),
      },
    };
  }
  if (p.type === "reasoning") return { type: "reasoning" };
  if (p.type === "usage") return { type: "usage" };
  // OpenAI-style delta objects
  const delta = p.delta as Record<string, unknown> | undefined;
  if (delta && typeof delta.content === "string") return { type: "text", text: delta.content };
  if (delta && Array.isArray(delta.tool_calls)) return { type: "unknown" };
  if (typeof p.content === "string") return { type: "text", text: p.content };
  return { type: "unknown" };
}

export interface ChatOptions {
  testMode: boolean;
  signal?: AbortSignal;
  tools?: ToolSpec[];
  toolChoice?: "auto" | "none" | "required";
}

/** One puter.ai.chat() call, streaming; returns full text + collected tool calls. */
export async function chatCall(
  messages: ChatMessage[],
  opts: ChatOptions,
  onText?: (delta: string) => void,
): Promise<{ text: string; toolCalls: Array<{ id: string; name: string; arguments: string }> }> {
  const puter = await loadPuter();
  const options: Record<string, unknown> = {
    stream: true,
    signal: opts.signal,
    ...(opts.tools ? { tools: opts.tools, toolChoice: opts.toolChoice ?? "auto" } : {}),
  };
  let resp: unknown;
  try {
    resp = await puter.ai.chat(messages, opts.testMode, options);
  } catch (e) {
    throw new PuterError(mapPuterError(e), e);
  }
  let text = "";
  const toolCalls: Array<{ id: string; name: string; arguments: string }> = [];
  const iterable = resp as AsyncIterable<unknown> | null;
  if (iterable && typeof (iterable as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === "function") {
    try {
      for await (const part of iterable) {
        const c = normalizeChunk(part);
        if (c.type === "text" && c.text) {
          text += c.text;
          onText?.(c.text);
        } else if (c.type === "tool_use" && c.toolCall) {
          toolCalls.push(c.toolCall);
        } else if (c.type === "error") {
          throw new PuterError(mapPuterError(new Error(c.message)), c.message);
        }
      }
    } catch (e) {
      if (e instanceof PuterError) throw e;
      throw new PuterError(mapPuterError(e), e);
    }
  } else {
    // non-streaming fallback shape
    const r = resp as { message?: { content?: unknown; tool_calls?: unknown[] } };
    const content = r?.message?.content;
    if (typeof content === "string") {
      text = content;
      onText?.(content);
    } else if (Array.isArray(content)) {
      for (const block of content as Array<{ type?: string; text?: string }>) {
        if (block?.type === "text" && block.text) {
          text += block.text;
          onText?.(block.text);
        }
      }
    }
    for (const tc of (r?.message?.tool_calls ?? []) as Array<{ id?: string; function?: { name?: string; arguments?: string } }>) {
      toolCalls.push({
        id: String(tc.id ?? "call"),
        name: String(tc.function?.name ?? ""),
        arguments: String(tc.function?.arguments ?? "{}"),
      });
    }
  }
  return { text, toolCalls };
}

export class PuterError extends Error {
  kind: AssistantError;
  constructor(kind: AssistantError, original: unknown) {
    super(typeof original === "string" ? original : JSON.stringify(original));
    this.kind = kind;
    this.name = "PuterError";
  }
}

// ---------- auth ----------

export async function signIn(timeoutMs = 60_000): Promise<{ username?: string } | null> {
  const puter = await loadPuter();
  try {
    await Promise.race([
      puter.auth.signIn(),
      new Promise<never>((_, rej) =>
        setTimeout(() => rej(new Error("auth_window_closed: sign-in popup was not completed (timeout)")), timeoutMs),
      ),
    ]);
    return await puter.auth.getUser();
  } catch (e) {
    throw new PuterError(mapPuterError(e), e);
  }
}

export function isSignedIn(): boolean {
  try {
    return !!window.puter?.auth.isSignedIn();
  } catch {
    return false;
  }
}

export async function getUser(): Promise<{ username?: string } | null> {
  try {
    return await window.puter!.auth.getUser();
  } catch {
    return null;
  }
}

export function signOut(): void {
  try {
    window.puter?.auth.signOut();
  } catch {
    /* ignore */
  }
}
