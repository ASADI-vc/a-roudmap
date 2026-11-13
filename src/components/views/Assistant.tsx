"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppCtx } from "../AppRoot";
import { GlassCard, Pill } from "../ui-bits";
import { loadPuter, signIn, isSignedIn, signOut, getUser, chatCall, PuterError, type ChatMessage, type AssistantError } from "@/lib/puter";
import { runAssistantTurn, type ToolInvocation } from "@/lib/assistant";
import { retrieve, type RetrievedChunk } from "@/lib/retrieval";
import { renderMarkdown } from "@/lib/markdown";
import { useProgress } from "@/lib/progress";

interface ChatEntry {
  role: "user" | "assistant";
  content: string;
  citations?: RetrievedChunk[];
  tools?: ToolInvocation[];
}

export default function Assistant({ ctx }: { ctx: AppCtx }) {
  const { locale, t, navigate } = ctx;
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState(false);
  const [signed, setSigned] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [authPending, setAuthPending] = useState(false);
  const [error, setError] = useState<AssistantError | null>(null);
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressState = useProgress((s) => s._state);
  const saveTranscript = useProgress((s) => s.saveTranscript);

  const ensureSdk = useCallback(async () => {
    try {
      await loadPuter();
      setSdkReady(true);
      setSdkError(false);
      setSigned(isSignedIn());
      if (isSignedIn()) {
        const u = await getUser();
        setUsername(u?.username ?? null);
      }
      return true;
    } catch {
      setSdkError(true);
      return false;
    }
  }, []);

  useEffect(() => {
    void ensureSdk();
  }, [ensureSdk]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chat, busy]);

  const errorMessage = (kind: AssistantError): string =>
    kind === "auth_cancelled"
      ? t.assistant.errors.authCancelled
      : kind === "popup_blocked"
        ? t.assistant.errors.popupBlocked
        : kind === "quota"
          ? t.assistant.errors.quota
          : kind === "network"
            ? t.assistant.errors.network
            : kind === "no_answer"
              ? t.assistant.errors.noAnswer
              : t.assistant.errors.unavailable;

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setError(null);
    setInput("");
    setChat((c) => [...c, { role: "user", content: q }]);

    // lazy SDK load on first user interaction; sign-in is user-initiated from this gesture
    const ok = await ensureSdk();
    if (!ok) {
      setError("unavailable");
      setChat((c) => c.slice(0, -1));
      return;
    }
    if (!signed) {
      setAuthPending(true);
      try {
        const u = await signIn();
        setSigned(true);
        setUsername(u?.username ?? null);
      } catch (e) {
        const kind = e instanceof PuterError ? e.kind : "unknown";
        setError(kind);
        setChat((c) => c.slice(0, -1));
        return;
      } finally {
        setAuthPending(false);
      }
    }

    setBusy(true);
    abortRef.current = new AbortController();
    // streaming placeholder
    setChat((c) => [...c, { role: "assistant", content: "" }]);

    try {
      const history: ChatMessage[] = chat.map((m) => ({ role: m.role, content: m.content }));
      const result = await runAssistantTurn(q, history, {
        locale,
        progressConsent: consent,
        testMode,
        signal: abortRef.current.signal,
        onText: (delta) => {
          setChat((c) => {
            const last = c[c.length - 1];
            if (last?.role === "assistant") {
              return [...c.slice(0, -1), { ...last, content: last.content + delta }];
            }
            return c;
          });
        },
        onTool: () => {
          /* tool chips update after the turn completes */
        },
      });
      const answer = result.answer.trim();
      setChat((c) => {
        const withoutPlaceholder = c[c.length - 1]?.role === "assistant" ? c.slice(0, -1) : c;
        return [...withoutPlaceholder, { role: "assistant", content: answer || t.assistant.errors.noAnswer, citations: result.citations, tools: result.tools }];
      });
      if (!answer.trim()) setError("no_answer");
    } catch (e) {
      if ((e as Error)?.name === "AbortError") {
        setChat((c) => (c[c.length - 1]?.role === "assistant" ? [...c.slice(0, -1), { role: "assistant", content: t.assistant.streamStopped }] : c));
      } else {
        const kind = e instanceof PuterError ? e.kind : "unknown";
        setError(kind);
        setChat((c) => (c[c.length - 1]?.role === "assistant" && c[c.length - 1].content === "" ? c.slice(0, -1) : c));
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const clear = () => {
    setChat([]);
    setError(null);
  };

  const save = () => {
    const text = chat.map((m) => `${m.role === "user" ? "Q" : "A"}: ${m.content}`).join("\n\n---\n\n");
    saveTranscript(text);
  };

  // pre-retrieval preview so the UI shows what WOULD be sent (transparency)
  const previewChunks = input.trim().length >= 4 ? retrieve(input, { locale, limit: 3 }) : [];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t.assistant.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.assistant.body}</p>
      </div>

      {/* account model — shown before first request, always visible */}
      <GlassCard className="p-5 glass-reading">
        <h2 className="font-bold text-sm mb-2">{t.assistant.accountModel}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{t.assistant.accountBody}</p>
        <p className="mt-2 text-xs text-muted-foreground">{t.assistant.budgetNote} · {t.assistant.memoryNote}</p>
      </GlassCard>

      {sdkError ? (
        <GlassCard className="p-4 border-amber-500/40 text-sm text-amber-700 dark:text-amber-300">
          {t.assistant.errors.unavailable} <span className="text-muted-foreground">({t.assistant.unavailableBadge})</span>
        </GlassCard>
      ) : null}

      {/* controls */}
      <GlassCard className="p-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {signed ? (
          <>
            <Pill className="bg-primary/10 text-primary">{t.assistant.signedInAs}: {username ?? "Puter"}</Pill>
            <button
              onClick={() => {
                signOut();
                setSigned(false);
                setUsername(null);
              }}
              className="text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              {t.assistant.signOut}
            </button>
          </>
        ) : (
          <button
            onClick={() => void ensureSdk().then(async () => {
              try {
                const u = await signIn();
                setSigned(true);
                setUsername(u?.username ?? null);
              } catch (e) {
                setError(e instanceof PuterError ? e.kind : "unknown");
              }
            })}
            className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            {t.assistant.signIn}
          </button>
        )}
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
          {t.assistant.consentProgress}
        </label>
        <label className="flex items-center gap-2 text-xs cursor-pointer ms-auto">
          <input type="checkbox" checked={testMode} onChange={(e) => setTestMode(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
          {t.assistant.testModeToggle}
        </label>
      </GlassCard>

      {/* chat */}
      <GlassCard strong className="p-0 overflow-hidden flex flex-col">
        <div ref={scrollRef} className="chat-scroll h-[420px] overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
          {chat.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-sm text-muted-foreground gap-4">
              <div>
                <p>{t.assistant.suggested}:</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {t.assistant.suggestions.map((s, i) => (
                    <button key={i} onClick={() => setInput(s)} className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {testMode && chat.length > 0 ? (
            <div className="text-xs text-amber-700 dark:text-amber-300">{t.assistant.errors.testMode}</div>
          ) : null}

          {chat.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              {m.role === "user" ? (
                <div className="max-w-[85%] rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed">{m.content}</div>
              ) : (
                <div className="max-w-full">
                  {m.content ? (
                    <div className="glass glass-reading rounded-2xl px-4 py-3 text-sm leading-relaxed prose-masir"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                    />
                  ) : (
                    <div className="text-xs text-muted-foreground animate-pulse">{t.assistant.thinking}</div>
                  )}
                  {m.tools && m.tools.length ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-muted-foreground self-center">{t.assistant.toolsTitle}:</span>
                      {m.tools.map((tool, j) => (
                        <Pill key={j} className="text-[10px]">
                          {t.assistant.toolNames[tool.name] ?? tool.name}
                          <span className="opacity-60">({String(tool.resultPreview).slice(0, 24)})</span>
                        </Pill>
                      ))}
                    </div>
                  ) : null}
                  {m.citations && m.citations.length ? (
                    <div className="mt-2">
                      <span className="text-[10px] text-muted-foreground">{t.assistant.citations}:</span>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {m.citations.map((c, j) => (
                          <button
                            key={c.id + j}
                            onClick={() => {
                              const parts = c.link?.replace(/^#\//, "").split("/") ?? [];
                              const loc = parts[0] === "fa" || parts[0] === "en" ? (parts[0] as "fa" | "en") : locale;
                              const view = parts[1] ?? "home";
                              const param = parts[2] ?? null;
                              if (view === "topic" && param) navigate("topic", param, loc);
                              else if (view === "source" && param) navigate("source", param, loc);
                              else if (view === "project" && param) navigate("project", param, loc);
                              else if (view === "evidence") navigate("evidence", null, loc);
                              else if (view === "assistant") navigate("assistant", null, loc);
                              else if (view === "methodology") navigate("methodology", null, loc);
                            }}
                            className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[10px] text-primary hover:bg-primary/10"
                            title={c.title}
                          >
                            [{j + 1}] {c.title.slice(0, 36)}…
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}

          {error ? <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-700 dark:text-rose-300">{errorMessage(error)}</div> : null}
      {authPending ? <div className="text-xs text-muted-foreground animate-pulse">{t.assistant.awaitingAuth}</div> : null}
        </div>

        <div className="border-t border-border/60 p-3">
          {previewChunks.length ? (
            <p className="text-[10px] text-muted-foreground mb-2 truncate">
              {t.assistant.toolsTitle}: {previewChunks.map((c) => c.title.slice(0, 24)).join(" · ")}
            </p>
          ) : null}
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder={t.assistant.placeholder}
              aria-label={t.assistant.placeholder}
              className="flex-1 rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm placeholder:text-muted-foreground"
              disabled={busy}
            />
            {busy ? (
              <button
                onClick={() => abortRef.current?.abort()}
                className="rounded-xl border border-border px-4 py-2.5 text-sm hover:bg-secondary"
              >
                {t.assistant.stop}
              </button>
            ) : (
              <button
                onClick={() => void send()}
                disabled={!input.trim()}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium disabled:opacity-40"
              >
                {t.assistant.send}
              </button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <button onClick={clear} className="text-muted-foreground hover:text-foreground underline underline-offset-2">
              {t.assistant.clearChat}
            </button>
            <button onClick={save} className="text-muted-foreground hover:text-foreground underline underline-offset-2">
              {t.assistant.saveChat}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
