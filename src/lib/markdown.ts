// Safe minimal markdown renderer.
// - Escapes all HTML first (no raw HTML injection).
// - Supports: paragraphs, **bold**, *italic*, `code`, [text](url) links (allowlisted), - lists.
// - Retrieved/assistant content is DATA: any instruction-looking text is rendered inert.

const ALLOWED_LINK_RE = /^(https?:\/\/|mailto:|#)/i;

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(md: string): string {
  let s = escapeHtml(md);
  // links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, url) => {
    if (!ALLOWED_LINK_RE.test(url)) return text;
    const external = url.startsWith("http");
    return `<a href="${url}"${external ? ' target="_blank" rel="noopener noreferrer nofollow"' : ""}>${text}</a>`;
  });
  // bold then italic then code
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  return s;
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let listOpen = false;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (listOpen) {
      out.push("</ul>");
      listOpen = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      closeList();
      continue;
    }
    const li = /^[-•]\s+(.*)$/.exec(line.trim());
    if (li) {
      flushPara();
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      out.push(`<li>${inline(li[1])}</li>`);
      continue;
    }
    closeList();
    para.push(line.trim());
  }
  flushPara();
  closeList();
  return out.join("\n");
}

/** Strip instruction-like framing from retrieved data before it enters a prompt (defense in depth). */
export function sanitizeForPrompt(text: string): string {
  return text
    .replace(/```/g, "'''")
    .replace(/<\|/g, "&lt;|")
    .replace(/\|>/g, "|&gt;")
    .slice(0, 1600);
}
