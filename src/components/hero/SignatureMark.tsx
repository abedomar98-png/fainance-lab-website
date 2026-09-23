"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * The brand's signature motion moment, per the playbook:
 * "the gold arrow draws on; the two tiles link in an ∞ loop".
 *
 * ⚠️  This SVG is an ANIMATION-ONLY motif that echoes the logo's geometry —
 * two linked tiles and the rising gold arrow. It is NOT the logo and must
 * never be used as one: every actual logo placement on this site uses the
 * official PNG artwork from /public/assets/logo.
 *
 * TODO(abed): the official logo only exists as PNG, which has no vector paths
 * to stroke. Supply the logo as SVG and this component can animate the real
 * mark instead of an echo of it.
 */

/** cubic-bezier(0.25, 0.1, 0.25, 1) — the playbook easing, as a GSAP ease. */
function brandEase(t: number): number {
  // Newton-solve x(u) = t for the curve's u, then evaluate y(u).
  const cx = 3 * 0.25;
  const bx = 3 * (0.25 - 0.25) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * 0.1;
  const by = 3 * (1 - 0.1) - cy;
  const ay = 1 - cy - by;

  let u = t;
  for (let i = 0; i < 6; i += 1) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const dx = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(dx) < 1e-6) break;
    u -= x / dx;
  }
  return ((ay * u + by) * u + cy) * u;
}

export function SignatureMark({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tiles = root.querySelectorAll<SVGElement>("[data-tile]");
    const loop = root.querySelector<SVGPathElement>("[data-loop]");
    const arrow = root.querySelector<SVGPathElement>("[data-arrow]");
    const head = root.querySelector<SVGElement>("[data-arrowhead]");
    const glyphs = root.querySelectorAll<SVGElement>("[data-glyph]");

    if (!loop || !arrow) return;

    const loopLength = loop.getTotalLength();
    const arrowLength = arrow.getTotalLength();

    if (prefersReduced) {
      // Final state, no motion.
      gsap.set([loop, arrow], { strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set([...tiles, ...glyphs, head], { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(loop, {
        strokeDasharray: loopLength,
        strokeDashoffset: loopLength,
      });
      gsap.set(arrow, {
        strokeDasharray: arrowLength,
        strokeDashoffset: arrowLength,
      });
      gsap.set(tiles, { opacity: 0, scale: 0.92, transformOrigin: "center" });
      gsap.set(glyphs, { opacity: 0, y: 6 });
      gsap.set(head, { opacity: 0, scale: 0.5, transformOrigin: "center" });

      const tl = gsap.timeline({
        defaults: { ease: brandEase },
        // Let the hero copy land first; the mark is the punctuation.
        delay: 0.25,
      });

      tl.to(tiles, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12 })
        .to(glyphs, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.25")
        // The two tiles link in an ∞ loop.
        .to(loop, { strokeDashoffset: 0, duration: 0.7 }, "-=0.3")
        // Then the gold arrow draws on — the signature beat.
        .to(arrow, { strokeDashoffset: 0, duration: 0.85 }, "-=0.45")
        .to(head, { opacity: 1, scale: 1, duration: 0.35 }, "-=0.15");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 340 270"
      className={className}
      role="img"
      aria-label="Fainance Lab"
      fill="none"
    >
      {/* The ∞ loop that links the two tiles. Drawn first and sitting behind
          them, so it reads as one continuous ribbon threading both. Its
          crossing point at (170,150) is where the gold arrow passes through. */}
      <path
        data-loop
        d="M170 150C150 102 118 78 90 78 50 78 20 110 20 150s30 72 70 72c28 0 60-24 80-72 20-48 52-72 80-72 40 0 70 32 70 72s-30 72-70 72c-28 0-60-24-80-72Z"
        stroke="#0C1A2B"
        strokeOpacity="0.14"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Two tiles — AI on the left, the ledger on the right. */}
      <rect
        data-tile
        x="40"
        y="92"
        width="116"
        height="116"
        rx="30"
        fill="#0A6FEE"
      />
      <rect
        data-tile
        x="184"
        y="92"
        width="116"
        height="116"
        rx="30"
        fill="#04A544"
      />

      {/* Inner wells */}
      <rect x="62" y="114" width="72" height="72" rx="18" fill="#FFFFFF" />
      <rect x="206" y="114" width="72" height="72" rx="18" fill="#FFFFFF" />

      <text
        data-glyph
        x="98"
        y="151"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#0A6FEE"
        fontSize="38"
        fontWeight="700"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
      >
        AI
      </text>

      {/* Ledger grid — the calculator face, abstracted to keys. */}
      <g data-glyph fill="#04A544">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={222 + col * 20}
              y={124 + row * 20}
              width="12"
              height="12"
              rx="3"
            />
          )),
        )}
      </g>

      {/* The gold arrow — enters low on the inline-start side, passes through
          the ∞ crossing, and exits up and to the right. Drawn last so it sits
          in front of both tiles at the crossing, as it does in the logo. */}
      <path
        data-arrow
        d="M30 226C86 226 118 178 170 150c52-28 82-62 126-88"
        stroke="#FBB215"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        data-arrowhead
        d="M322 48 300 78 286 51Z"
        fill="#FBB215"
        stroke="#FBB215"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
