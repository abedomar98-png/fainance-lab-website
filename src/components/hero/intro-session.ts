import { useSyncExternalStore } from "react";

/**
 * Whether the hero intro has already played in this browsing session.
 *
 * The intro plays once when the site is opened. Switching language, moving
 * between pages or returning to Home within the same tab must not replay it —
 * the home page remounts in each of those cases, so without this it would.
 *
 * Session-scoped (sessionStorage), so it plays again when the site is next
 * opened in a new tab or browser session. A reload in the same tab does NOT
 * replay it.
 */
const KEY = "fainance:intro-played";

export function hasIntroPlayed(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    // Storage blocked (some private modes) — treat as a first visit.
    return false;
  }
}

export function markIntroPlayed(): void {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // Non-fatal: the intro would simply play again.
  }
}

// Nothing to subscribe to: the value only changes in this tab, at moments when
// the hero re-renders anyway. The server has no session, so it reports "not
// played", which keeps the SSR HTML identical for every visitor.
const subscribe = () => () => {};

export function useIntroPlayed(): boolean {
  return useSyncExternalStore(subscribe, hasIntroPlayed, () => false);
}
