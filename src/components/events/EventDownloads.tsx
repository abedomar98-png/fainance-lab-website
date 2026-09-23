"use client";

import { useSyncExternalStore } from "react";

import { useCaptureModal } from "@/components/modal/CaptureModal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/Icon";
import type { EventEntry } from "@/content/types";
import { formatNumber } from "@/lib/utils";

/*
 * Remembered per event in localStorage, so a visitor who registered once gets
 * direct downloads when they come back rather than a second form. Storage can
 * be unavailable (private mode, blocked site data) — then the gate simply
 * shows again, which is the safe failure.
 */
const storageKey = (slug: string) => `fainance-event-unlocked:${slug}`;
const CHANGE_EVENT = "fainance-event-unlock";

function readUnlocked(slug: string): boolean {
  try {
    return window.localStorage.getItem(storageKey(slug)) === "1";
  } catch {
    return false;
  }
}

function writeUnlocked(slug: string) {
  try {
    window.localStorage.setItem(storageKey(slug), "1");
  } catch {
    /* storage blocked — the unlock still holds for this page view below */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Unlocked for this page view even when storage is blocked. */
const unlockedThisView = new Set<string>();

/**
 * The event's gated files. One registration unlocks every file: the capture
 * modal's success state offers all of them, and afterwards this block shows
 * direct download buttons instead of the gate.
 */
export function EventDownloads({ event }: { event: EventEntry }) {
  const { dict, locale } = useLocale();
  const copy = dict.events;
  const { open } = useCaptureModal();

  const unlocked = useSyncExternalStore(
    subscribe,
    () => unlockedThisView.has(event.slug) || readUnlocked(event.slug),
    () => false,
  );

  const files = event.downloads.map((d) => ({ label: d.label[locale], url: d.file }));

  function register() {
    open({
      intent: "lead",
      resourceSlug: `event:${event.slug}`,
      resourceTitle: event.name[locale],
      files,
      onUnlocked: () => {
        unlockedThisView.add(event.slug);
        writeUnlocked(event.slug);
      },
    });
  }

  return (
    <div className="flex flex-col gap-5" data-event-downloads={unlocked ? "unlocked" : "locked"}>
      <ul className="flex flex-col gap-3">
        {event.downloads.map((download) => (
          <li
            key={download.file}
            className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-neutral-200 bg-white px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-chip bg-brand-blue/10 font-mono text-[0.65rem] font-semibold text-brand-blue-deep">
                {download.format}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="font-display text-[0.95rem] leading-snug font-semibold text-ink">
                  {download.label[locale]}
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {download.format} · <bdi>{formatNumber(download.size, locale)}</bdi>
                </span>
              </div>
            </div>

            {unlocked ? (
              <Button href={download.file} size="sm" download prefetch={false}>
                <DownloadIcon className="size-4" />
                {copy.download}
              </Button>
            ) : null}
          </li>
        ))}
      </ul>

      {unlocked ? null : (
        <Button onClick={register} size="lg" className="self-start" data-event-register>
          <DownloadIcon className="size-5" />
          {copy.register}
        </Button>
      )}
    </div>
  );
}
