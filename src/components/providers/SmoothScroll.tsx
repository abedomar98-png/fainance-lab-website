"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Lenis smooth scroll, applied site-wide.
 *
 * `lerp` is deliberately high (0.12) — the playbook's motion language is calm,
 * not floaty. A lower value produces the drifting, over-smoothed feel that
 * reads as a template.
 *
 * Lenis respects `prefers-reduced-motion` internally and falls back to native
 * scrolling when it is set.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        wheelMultiplier: 1,
        smoothWheel: true,
        // Touch devices keep their native momentum — overriding it feels wrong.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
