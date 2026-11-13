// Lexical search with Persian normalization. Used by site search and assistant retrieval.

export function normalizeFa(s: string): string {
  return s
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "") // diacritics + tatweel
    .replace(/[\u06CC]/g, "ی")
    .replace(/[\u0643]/g, "ک")
    .replace(/[\u0621-\u0626]/g, "ا") // hamza forms -> alef
    .replace(/[\u200B-\u200D\u2060]/g, "") // zero-width chars
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0)) // Persian digits -> latin
    .toLowerCase();
}

const STOP = new Set([
  "the", "a", "an", "of", "to", "in", "is", "are", "on", "for", "and", "or", "what", "how",
  "را", "و", "در", "به", "از", "که", "این", "آن", "با", "است", "می", "برای", "ها", "چگونه", "چه",
]);

/** Light Persian suffix stripper (های/ها/تر/ترین) + English plural — enough for lexical recall. */
function stem(w: string): string {
  for (const suf of ["ترین", "های", "ها", "تر"]) {
    if (w.length > suf.length + 2 && w.endsWith(suf)) return w.slice(0, -suf.length);
  }
  if (w.length > 4 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

export function tokenize(text: string): string[] {
  const norm = normalizeFa(text);
  return norm
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

export interface Doc {
  id: string;
  /** Dedupe key across locales — translated pairs share parentKey */
  parentKey: string;
  locale: "fa" | "en";
  text: string;
  boost?: number;
}

export interface ScoredDoc {
  doc: Doc;
  score: number;
}

interface IndexDoc {
  doc: Doc;
  tf: Map<string, number>;
  len: number;
}

export class LexicalIndex {
  private docs: IndexDoc[] = [];
  private df = new Map<string, number>();

  constructor(docs: Doc[]) {
    for (const doc of docs) {
      const tokens = tokenize(doc.text);
      const tf = new Map<string, number>();
      for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
      for (const t of tf.keys()) this.df.set(t, (this.df.get(t) ?? 0) + 1);
      this.docs.push({ doc, tf, len: tokens.length || 1 });
    }
  }

  /** BM25-lite search. */
  search(query: string, limit = 8, localeFilter?: "fa" | "en"): ScoredDoc[] {
    const q = tokenize(query);
    if (q.length === 0) return [];
    const N = this.docs.length || 1;
    const k1 = 1.4;
    const b = 0.6;
    const avgLen = this.docs.reduce((s, d) => s + d.len, 0) / N;
    const results: ScoredDoc[] = [];
    for (const { doc, tf, len } of this.docs) {
      if (localeFilter && doc.locale !== localeFilter) continue;
      let score = 0;
      for (const term of q) {
        const f = tf.get(term);
        if (!f) continue;
        const df = this.df.get(term) ?? 0;
        const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + b * (len / avgLen))));
      }
      if (score > 0) results.push({ doc, score: score * (doc.boost ?? 1) });
    }
    results.sort((a, b2) => b2.score - a.score);
    return results.slice(0, limit);
  }
}

export interface SearchRecord {
  kind: "topic" | "project" | "claim" | "source";
  id: string;
  title: string;
  excerpt: string;
  href: string;
}

export function scoreRecords(
  index: LexicalIndex,
  query: string,
  records: Array<{ id: string; parentKey: string; locale: "fa" | "en"; text: string; rec: SearchRecord; boost?: number }>,
  limit = 12,
): SearchRecord[] {
  const hits = index.search(query, Math.max(limit * 4, 24));
  const seen = new Set<string>();
  const out: SearchRecord[] = [];
  for (const h of hits) {
    const rec = records.find((r) => r.id === h.doc.id);
    if (!rec) continue;
    if (seen.has(rec.rec.id + rec.rec.kind)) continue;
    seen.add(rec.rec.id + rec.rec.kind);
    out.push(rec.rec);
    if (out.length >= limit) break;
  }
  return out;
}
