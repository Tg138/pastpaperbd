type ListKind = "ordered" | "unordered";

interface PendingList {
  kind: ListKind;
  items: string[];
}

type MathToken =
  | { type: "text"; value: string }
  | { type: "sub"; value: string }
  | { type: "operator"; value: string };

function cleanText(text: string): string {
  return text
    .replace(/[—–]/g, " - ")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s{2,}/g, " ");
}

function latexToTokens(source: string): MathToken[] {
  const normalised = source
    .replace(/^\$\$|\$\$$/g, "")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\to/g, "→")
    .replace(/\\rightleftharpoons/g, "⇌")
    .replace(/\\leftrightarrow/g, "↔")
    .trim();
  const tokens: MathToken[] = [];
  const parts = normalised.split(/(\s*[+→⇌↔=]\s*|_\{[A-Za-z0-9]+\}|_[A-Za-z0-9])/g).filter(Boolean);

  for (const part of parts) {
    const subscript = part.match(/^_\{([A-Za-z0-9]+)\}$/) ?? part.match(/^_([A-Za-z0-9])$/);
    if (subscript) {
      tokens.push({ type: "sub", value: subscript[1] });
      continue;
    }

    if (/^[\s+→⇌↔=]+$/.test(part)) {
      tokens.push({ type: "operator", value: part.trim() });
      continue;
    }

    tokens.push({ type: "text", value: part.trim() });
  }

  return tokens.filter((token) => token.value);
}

function renderMathBlock(source: string, key: React.Key): React.ReactNode {
  return (
    <div
      key={key}
      className="my-6 overflow-x-auto rounded-md border border-border bg-background/55 px-4 py-4"
    >
      <div className="flex min-w-max items-baseline justify-center gap-1.5 font-mono text-lg text-foreground">
        {latexToTokens(source).map((token, index) => {
          if (token.type === "sub") {
            return (
              <sub key={index} className="-ml-1 text-xs text-accent">
                {token.value}
              </sub>
            );
          }

          if (token.type === "operator") {
            return (
              <span key={index} className="px-1 text-xl font-semibold text-accent">
                {token.value}
              </span>
            );
          }

          return <span key={index}>{token.value}</span>;
        })}
      </div>
    </div>
  );
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
          className="font-mono text-[0.95em] font-medium text-accent"
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
    <span className="my-2 flex flex-wrap items-center gap-1.5 rounded-md border border-border bg-background/45 px-3 py-2 font-mono text-sm text-foreground">
      {parts.map((part, index) => {
        if (/^[\s=≡→+]+$/.test(part)) {
          return (
            <span key={index} className="px-0.5 text-base font-semibold text-accent">
              {part.trim()}
            </span>
          );
        }

        return <span key={index}>{part.trim()}</span>;
      })}
    </span>
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
  const parts = cleaned.split(/(!\[\[[^\]]+\]\]|\[\[[^\]]+\]\]|\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*)/g);

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
        <span key={index} className="font-medium text-accent">
          {cleanText(wiki[2] ?? wiki[1])}
        </span>
      );
    }

    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-accent">
          {cleanText(bold[1])}
        </strong>
      );
    }

    const italic = part.match(/^_([^_]+)_$/) ?? part.match(/^\*([^*]+)\*$/);
    if (italic) {
      return (
        <em key={index} className="text-muted">
          {cleanText(italic[1])}
        </em>
      );
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

export function MarkdownNote({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let pendingList: PendingList | undefined;
  let tableRows: string[] = [];

  const flushList = () => {
    if (!pendingList) return;
    const Tag = pendingList.kind === "ordered" ? "ol" : "ul";
    blocks.push(
      <Tag
        key={`list-${blocks.length}`}
        className={`my-5 space-y-2 rounded-md border border-border/70 bg-surface/55 px-6 py-4 ${
          pendingList.kind === "ordered" ? "list-decimal" : "list-disc"
        }`}
      >
        {pendingList.items.map((item, index) => (
          <li key={index} className="pl-1 leading-7 marker:text-accent">
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
        className="my-5 overflow-x-auto rounded-md border border-border bg-surface/70"
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
                      <Cell key={cellIndex} className="px-3 py-2 text-left align-top">
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

    if (/^\$\$.*\$\$$/.test(trimmed)) {
      blocks.push(renderMathBlock(trimmed, index));
      return;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = renderInline(heading[2]);
      const id = headingAnchor(heading[2]);

      if (level === 1) {
        blocks.push(
          <h1
            key={index}
            id={id}
            className="mb-6 scroll-mt-24 text-4xl font-semibold tracking-tight text-foreground"
          >
            {text}
          </h1>
        );
      } else if (level === 2) {
        blocks.push(
          <h2
            key={index}
            id={id}
            className="mb-4 mt-12 scroll-mt-24 rounded-md border-l-4 border-accent bg-accent-soft px-4 py-3 text-2xl font-semibold tracking-tight text-accent"
          >
            {text}
          </h2>
        );
      } else if (level === 3) {
        blocks.push(
          <h3
            key={index}
            id={id}
            className="mb-3 mt-8 scroll-mt-24 border-b border-border pb-2 text-lg font-semibold tracking-tight text-accent-hover"
          >
            {text}
          </h3>
        );
      } else {
        blocks.push(
          <h4
            key={index}
            id={id}
            className="mb-2 mt-6 scroll-mt-24 text-sm font-semibold uppercase tracking-wider text-muted"
          >
            {text}
          </h4>
        );
      }
      return;
    }

    if (isEquationLine(trimmed)) {
      blocks.push(<div key={index}>{renderEquation(trimmed)}</div>);
    } else {
      blocks.push(
        <p key={index} className="my-4 max-w-2xl text-[1.02rem] leading-8 text-foreground/90">
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  flushList();
  flushTable();

  return <article className="text-base">{blocks}</article>;
}
