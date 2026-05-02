"use client";

import Link from "next/link";
import { useState } from "react";

// Container dimensions — sized to fit the outer orbit + node radius + margin
const W = 760;
const H = 290;
const CX = W / 2; // 380
const CY = H / 2; // 145

// Planet node half-size (radius in px)
const NODE = 22;

interface Subject {
  id: string;
  label: string;
  // Ellipse semi-axes — wider than tall gives the Saturn-ring perspective
  rx: number;
  ry: number;
  // Orbit period — very slow, inner planets slightly faster
  duration: string;
  // Negative delay = start partway through orbit so Biology isn't stuck at 3 o'clock
  delay: string;
  // Planet colour — each gets its own hue
  color: string;
  available: boolean;
  links: { label: string; href: string }[];
}

const SUBJECTS: Subject[] = [
  {
    id: "biology",
    label: "Biology",
    rx: 148, ry: 46,
    duration: "90s",
    delay: "-22s",
    color: "#4e9e87",      // teal — earth-like
    available: true,
    links: [
      { label: "Papers", href: "/biology" },
      { label: "Spec",   href: "/biology/spec" },
      { label: "Notes",  href: "/biology/notes" },
    ],
  },
  {
    id: "chemistry",
    label: "Chemistry",
    rx: 228, ry: 70,
    duration: "150s",
    delay: "-55s",
    color: "#c4784a",      // terracotta — mars-like
    available: false,
    links: [],
  },
  {
    id: "physics",
    label: "Physics",
    rx: 318, ry: 98,
    duration: "220s",
    delay: "-95s",
    color: "#5e80b0",      // slate blue — saturn-like
    available: false,
    links: [],
  },
];

// Produces an SVG path for a full ellipse, used by both the decorative ring
// and the CSS offset-path so the planet traces the exact same curve.
function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  // Clockwise: start at leftmost point, arc right, arc back
  return (
    `M ${cx - rx},${cy} ` +
    `A ${rx},${ry},0,0,1,${cx + rx},${cy} ` +
    `A ${rx},${ry},0,0,1,${cx - rx},${cy}`
  );
}

export function OrbitalHub() {
  const [active, setActive] = useState<string | null>(null);
  const activeSubject = SUBJECTS.find((s) => s.id === active);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ── Orbital display ── */}
      <div className="relative select-none" style={{ width: W, height: H }}>

        {/* Decorative dotted orbit rings rendered in SVG */}
        <svg
          width={W}
          height={H}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          {SUBJECTS.map((s) => (
            <path
              key={s.id}
              d={ellipsePath(CX, CY, s.rx, s.ry)}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 10"
              opacity={s.available ? 0.65 : 0.25}
            />
          ))}
        </svg>

        {/* Hub — the sun */}
        <div
          className="absolute z-10 flex items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            top: CY - 36,
            left: CX - 36,
            background: "var(--surface)",
            border: "1.5px solid var(--accent)",
            // warm corona glow
            boxShadow:
              "0 0 18px 5px color-mix(in srgb, var(--accent) 28%, transparent), " +
              "0 0 40px 10px color-mix(in srgb, var(--accent) 10%, transparent)",
          }}
        >
          <span className="text-[10px] font-semibold tracking-tight text-center leading-tight px-2">
            pastpaperbd
          </span>
        </div>

        {/* Planets — follow their individual ellipses via CSS offset-path */}
        {SUBJECTS.map((subject) => {
          const paused = active === subject.id;
          const path = ellipsePath(CX, CY, subject.rx, subject.ry);

          // offset-path + offset-rotate are newer CSS props; cast to avoid strict-type gaps
          const offsetStyle = {
            offsetPath: `path("${path}")`,
            offsetRotate: "0deg",
            offsetAnchor: "center",
          } as React.CSSProperties;

          return (
            <button
              key={subject.id}
              disabled={!subject.available}
              onMouseEnter={() => subject.available && setActive(subject.id)}
              onMouseLeave={() => setActive(null)}
              className="absolute flex items-center justify-center rounded-full text-[10px] font-medium leading-none"
              style={{
                width: NODE * 2,
                height: NODE * 2,
                // base position; offset-path overrides rendered location
                top: 0,
                left: 0,
                ...offsetStyle,
                animation: `ppb-orbit ${subject.duration} linear infinite`,
                animationDelay: subject.delay,
                animationPlayState: paused ? "paused" : "running",
                background: subject.available
                  ? subject.color
                  : "var(--surface)",
                border: `1.5px solid ${subject.available ? subject.color : "var(--border)"}`,
                color: subject.available ? "#fff" : "var(--muted)",
                opacity: subject.available ? 1 : 0.28,
                zIndex: 5,
                cursor: subject.available ? "default" : "default",
                transition: "box-shadow 0.2s",
                boxShadow: paused && subject.available
                  ? `0 0 12px 3px ${subject.color}66`
                  : "none",
              }}
            >
              {subject.label}
            </button>
          );
        })}
      </div>

      {/* ── Nav links — appear when a subject is hovered ── */}
      <div className="h-7 flex items-center justify-center gap-2">
        {activeSubject?.available ? (
          activeSubject.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded border border-border bg-surface px-3 py-1 text-[11px] font-medium hover:border-accent hover:bg-accent-soft transition-colors"
            >
              {link.label}
            </Link>
          ))
        ) : (
          <span className="text-[11px] text-muted">Hover a subject to navigate</span>
        )}
      </div>
    </div>
  );
}
