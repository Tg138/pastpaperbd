import katex from "katex";

type ListKind = "ordered" | "unordered";

interface PendingList {
  kind: ListKind;
  items: string[];
}

function cleanText(text: string): string {
  return text
    .replace(/[—–]/g, " - ")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s{2,}/g, " ");
}

function renderMathBlock(latex: string, key: React.Key): React.ReactNode {
  const html = katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false });
  return (
    <div
      key={key}
      className="my-6 overflow-x-auto rounded-lg border border-border bg-surface px-8 py-6 text-center text-[1.08rem]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function renderInlineMath(latex: string): string {
  return katex.renderToString(latex, { displayMode: false, throwOnError: false });
}

function renderPlainText(text: string, keyPrefix: string): React.ReactNode[] {
  const formulaPattern =
    /(\[[A-Z]\]\s*=\s*\[[A-Z]\]|[AUGCT]-[AUGCT]|[AUGCT]≡[AUGCT]|[35]'\s*→\s*[35]'|[A-Z][a-z]?(?:[₀-₉ₙₘₓᵧ0-9()]+[A-Za-z₀-₉ₙₘₓᵧ()]*){1,}|[αβ]-\d+(?:,\d+)?(?:\/\d+)?|~?\d+(?:\.\d+)?\s?(?:nm|µm|°C))/g;
  const parts = text.split(formulaPattern);

  return parts.filter(Boolean).map((part, index) => {
    if (formulaPattern.test(part)) {
      formulaPattern.lastIndex = 0;
      return (
        <span
          key={`${keyPrefix}-${index}`}
          className="font-mono text-[0.92em] font-medium text-accent"
        >
          {part}
        </span>
      );
    }
    formulaPattern.lastIndex = 0;
    return part;
  });
}

function isEquationLine(text: string): boolean {
  const plain = plainInline(text);
  if (plain.length > 130) return false;
  if (!/[=≡→]/.test(plain)) return false;
  return (
    /^[A-Za-z0-9₀-₉ₙₘₓᵧ()[\]'+,\-/\s=≡→]+$/.test(plain) ||
    /^[A-Za-z ]+:\s*[A-Za-z0-9₀-₉ₙₘₓᵧ()[\]'+,\-/\s=≡→]+$/.test(plain)
  );
}

function renderEquation(text: string): React.ReactNode {
  const parts = plainInline(text).split(/(\s*[=≡→+]\s*)/g).filter(Boolean);
  return (
    <div className="my-3 inline-flex flex-wrap items-center gap-1 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm">
      {parts.map((part, index) => {
        if (/^[\s=≡→+]+$/.test(part)) {
          return (
            <span key={index} className="px-1 font-bold text-accent">
              {part.trim()}
            </span>
          );
        }
        return <span key={index} className="text-foreground">{part.trim()}</span>;
      })}
    </div>
  );
}

function plainInline(text: string): string {
  return cleanText(text)
    .replace(/!\[\[([^\]]+)\]\]/g, "Image: $1")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

function renderInline(text: string): React.ReactNode[] {
  const cleaned = cleanText(text);
  const parts = cleaned.split(/(!\[\[[^\]]+\]\]|\[\[[^\]]+\]\]|\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*|\$[^$\n]+\$)/g);

  return parts.filter(Boolean).map((part, index) => {
    const image = part.match(/^!\[\[([^\]]+)\]\]$/);
    if (image) {
      return (
        <span
          key={index}
          className="inline-flex rounded border border-border bg-surface px-1.5 py-0.5 text-xs text-muted"
        >
          Image: {cleanText(image[1])}
        </span>
      );
    }

    const wiki = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/) ?? part.match(/^\[\[([^\]]+)\]\]$/);
    if (wiki) {
      return (
        <span key={index} className="font-medium text-accent underline decoration-accent/40 underline-offset-2">
          {cleanText(wiki[2] ?? wiki[1])}
        </span>
      );
    }

    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {cleanText(bold[1])}
        </strong>
      );
    }

    const italic = part.match(/^_([^_]+)_$/) ?? part.match(/^\*([^*]+)\*$/);
    if (italic) {
      return (
        <em key={index} className="italic text-muted">
          {cleanText(italic[1])}
        </em>
      );
    }

    const inlineMath = part.match(/^\$([^$\n]+)\$$/);
    if (inlineMath) {
      const html = renderInlineMath(inlineMath[1]);
      return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return renderPlainText(cleanText(part), `text-${index}`);
  });
}

function headingAnchor(text: string): string {
  return plainInline(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Detect special section types by heading text
function sectionVariant(text: string): "exam" | "summary" | "default" {
  const lower = plainInline(text).toLowerCase();
  if (lower.includes("exam tip") || lower.includes("exam hint")) return "exam";
  if (lower.includes("summary")) return "summary";
  return "default";
}

export function MarkdownNote({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let pendingList: PendingList | undefined;
  let tableRows: string[] = [];
  let mathLines: string[] | null = null;
  let currentSection: "exam" | "summary" | "default" = "default";

  const flushList = () => {
    if (!pendingList) return;
    const Tag = pendingList.kind === "ordered" ? "ol" : "ul";
    const listClass =
      currentSection === "exam"
        ? "space-y-2.5 pl-5 my-3"
        : currentSection === "summary"
        ? "space-y-1.5 pl-5 my-3"
        : "space-y-2 pl-5 my-4";
    const markerClass =
      currentSection === "exam"
        ? "marker:text-amber-500 dark:marker:text-amber-400"
        : currentSection === "summary"
        ? "marker:text-emerald-600 dark:marker:text-emerald-400"
        : "marker:text-accent";

    blocks.push(
      <Tag
        key={`list-${blocks.length}`}
        className={`${listClass} ${pendingList.kind === "ordered" ? "list-decimal" : "list-disc"} ${markerClass}`}
      >
        {pendingList.items.map((item, index) => (
          <li key={index} className="pl-1 leading-7 text-foreground/90">
            {isEquationLine(item) ? renderEquation(item) : renderInline(item)}
          </li>
        ))}
      </Tag>
    );
    pendingList = undefined;
  };

  const flushTable = () => {
    if (tableRows.length === 0) return;
    blocks.push(
      <div
        key={`table-${blocks.length}`}
        className="my-5 overflow-x-auto rounded-lg border border-border bg-surface/70"
      >
        <table className="w-full border-collapse text-sm">
          <tbody>
            {tableRows
              .filter((row) => !/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(row))
              .map((row, rowIndex) => {
                const cells = row
                  .replace(/^\|/, "")
                  .replace(/\|$/, "")
                  .split("|")
                  .map((cell) => cell.trim());
                const Cell = rowIndex === 0 ? "th" : "td";

                return (
                  <tr key={rowIndex} className={rowIndex === 0 ? "bg-accent-soft" : "border-t border-border"}>
                    {cells.map((cell, cellIndex) => (
                      <Cell key={cellIndex} className="px-4 py-2.5 text-left align-top">
                        {renderInline(cell)}
                      </Cell>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Multi-line display math block
    if (trimmed === "$$") {
      if (mathLines === null) {
        flushList();
        flushTable();
        mathLines = [];
      } else {
        blocks.push(renderMathBlock(mathLines.join("\n"), `math-${index}`));
        mathLines = null;
      }
      return;
    }

    if (mathLines !== null) {
      mathLines.push(line);
      return;
    }

    if (!trimmed) {
      flushList();
      flushTable();
      return;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushTable();
      const kind: ListKind = ordered ? "ordered" : "unordered";
      if (!pendingList || pendingList.kind !== kind) {
        flushList();
        pendingList = { kind, items: [] };
      }
      pendingList.items.push((ordered ?? unordered)?.[1] ?? "");
      return;
    }

    if (trimmed.startsWith("|")) {
      flushList();
      tableRows.push(trimmed);
      return;
    }

    flushList();
    flushTable();

    if (trimmed === "---") {
      blocks.push(<hr key={index} className="my-10 border-border" />);
      return;
    }

    // Single-line display math: $$...$$ on one line
    if (/^\$\$.*\$\$$/.test(trimmed)) {
      blocks.push(renderMathBlock(trimmed.slice(2, -2), index));
      return;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = renderInline(heading[2]);
      const id = headingAnchor(heading[2]);

      if (level === 2) {
        const variant = sectionVariant(heading[2]);
        currentSection = variant;

        if (variant === "exam") {
          blocks.push(
            <h2
              key={index}
              id={id}
              className="mb-3 mt-12 scroll-mt-24 flex items-center gap-3 rounded-lg border border-amber-500/30 px-4 py-3 text-lg font-semibold text-amber-700 dark:border-amber-400/25 dark:text-amber-300"
              style={{ backgroundColor: "rgb(245 158 11 / 0.07)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              {text}
            </h2>
          );
        } else if (variant === "summary") {
          blocks.push(
            <h2
              key={index}
              id={id}
              className="mb-3 mt-12 scroll-mt-24 flex items-center gap-3 rounded-lg border border-emerald-500/30 px-4 py-3 text-lg font-semibold text-emerald-700 dark:border-emerald-400/25 dark:text-emerald-300"
              style={{ backgroundColor: "rgb(16 185 129 / 0.07)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              {text}
            </h2>
          );
        } else {
          blocks.push(
            <h2
              key={index}
              id={id}
              className="mb-4 mt-12 scroll-mt-24 border-b-2 border-accent pb-2 text-2xl font-semibold tracking-tight text-foreground"
            >
              {text}
            </h2>
          );
        }
      } else if (level === 1) {
        currentSection = "default";
        blocks.push(
          <h1
            key={index}
            id={id}
            className="mb-2 scroll-mt-24 text-4xl font-bold tracking-tight text-foreground"
          >
            {text}
          </h1>
        );
      } else if (level === 3) {
        blocks.push(
          <h3
            key={index}
            id={id}
            className="mb-2 mt-7 scroll-mt-24 text-base font-semibold uppercase tracking-wider text-accent"
          >
            {text}
          </h3>
        );
      } else {
        blocks.push(
          <h4
            key={index}
            id={id}
            className="mb-1.5 mt-5 scroll-mt-24 text-sm font-semibold text-muted uppercase tracking-widest"
          >
            {text}
          </h4>
        );
      }
      return;
    }

    // Spec ref line (italic-only lines like *AQA spec ref: ...*) — styled as a small label
    if (/^\*[^*].*[^*]\*$/.test(trimmed) && !trimmed.includes("**")) {
      const inner = trimmed.slice(1, -1);
      blocks.push(
        <p key={index} className="mb-6 mt-1 text-xs font-medium uppercase tracking-wider text-muted">
          {inner}
        </p>
      );
      return;
    }

    if (isEquationLine(trimmed)) {
      blocks.push(<div key={index} className="my-2">{renderEquation(trimmed)}</div>);
    } else {
      const paraClass =
        currentSection === "exam"
          ? "my-2.5 border-l-2 border-amber-500/50 pl-3 leading-7 text-[0.97rem] text-foreground/85"
          : currentSection === "summary"
          ? "my-2.5 border-l-2 border-emerald-500/50 pl-3 leading-7 text-[0.97rem] text-foreground/85"
          : "my-4 max-w-2xl leading-8 text-[1.02rem] text-foreground/90";

      blocks.push(
        <p key={index} className={paraClass}>
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  flushList();
  flushTable();

  return <article className="text-base">{blocks}</article>;
}
