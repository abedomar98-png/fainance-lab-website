"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, type RefObject } from "react";

/**
 * The behaviour every overlay on the site needs (the video player and the
 * slide lightbox; CaptureModal does the same inline):
 *
 * - stops Lenis and locks body scroll — Lenis owns the scroll position, so
 *   `overflow: hidden` alone leaves it running underneath
 * - Escape closes, Tab cycles within the panel
 * - focus moves into the panel, and back to the opener on close
 */
export function useDialog(
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  const lenis = useLenis();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [lenis]);

  useEffect(() => {
    panelRef.current
      ?.querySelector<HTMLElement>("[data-autofocus], button, a[href]")
      ?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panelRef]);
}
