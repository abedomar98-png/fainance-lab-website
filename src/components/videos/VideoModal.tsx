"use client";

import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { useDialog } from "@/components/modal/use-dialog";
import { useLocale } from "@/components/providers/LocaleProvider";
import { CloseIcon } from "@/components/ui/Icon";
import type { Video } from "@/content/types";
import { cueIndexAt, parseVtt, type Cue } from "@/lib/vtt";
import { loadYouTubeApi, PlayerState, type YTPlayer } from "@/lib/youtube";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * How far the caption clock may run ahead of the last time YouTube reported.
 * `getCurrentTime()` only refreshes a few times a second, so between reports
 * the playhead is estimated from the wall clock; the cap stops a stalled
 * report from letting captions race ahead of the picture.
 */
const MAX_ESTIMATE_AHEAD = 0.35;

/**
 * YouTube player + Arabic caption box.
 *
 * The caption box shows the video's original Arabic summary. When the video
 * has a synced `.vtt` file, it shows the cue for the current playhead
 * instead, and the captions are driven by the PLAYER'S STATE, not a timer:
 *
 * - PLAYING   → a requestAnimationFrame loop follows the playhead.
 * - anything else (PAUSED, BUFFERING, ENDED, CUED) → the loop stops and the
 *   box is set once from the player's exact current time. On pause the text
 *   therefore freezes on the frame's own cue and does not move; on resume the
 *   loop restarts from the real playhead, so it continues in sync.
 * - While not playing, a slow check (4×/s) follows the paused playhead, so a
 *   seek while paused — which YouTube doesn't always report as a state
 *   change — still lands on the right cue. With the playhead still, it never
 *   changes the text.
 *
 * Cues swap instantly — no fade — so nothing is mid-transition when paused.
 */
export function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const { dict, locale } = useLocale();
  const copy = dict.videos;
  const panelRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialog(panelRef, onClose);

  const [cues, setCues] = useState<Cue[] | null>(null);
  const [cueIndex, setCueIndex] = useState(-1);
  const [playerState, setPlayerState] = useState<number>(PlayerState.UNSTARTED);
  const cuesRef = useRef<Cue[] | null>(null);
  const syncRef = useRef<(() => void) | null>(null);

  /* Optional synced captions. Any failure falls back to the summary. */
  useEffect(() => {
    if (!video.captionsAr) return;
    let cancelled = false;
    fetch(video.captionsAr)
      .then((response) => (response.ok ? response.text() : Promise.reject()))
      .then((text) => {
        const parsed = parseVtt(text);
        if (cancelled || parsed.length === 0) return;
        cuesRef.current = parsed;
        setCues(parsed);
        // Captions can arrive after playback started — catch up at once.
        syncRef.current?.();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [video.captionsAr]);

  /* The player, and the state-driven caption clock. */
  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    let player: YTPlayer | null = null;
    let destroyed = false;
    let frame = 0;
    let idleCheck = 0;
    // Last time YouTube reported, and when we first saw it.
    let reported = -1;
    let reportedAt = 0;

    const show = (time: number) => {
      const list = cuesRef.current;
      if (list) setCueIndex(cueIndexAt(list, time));
    };

    const estimatedTime = () => {
      const time = player!.getCurrentTime();
      const now = performance.now();
      if (time !== reported) {
        reported = time;
        reportedAt = now;
        return time;
      }
      const ahead = ((now - reportedAt) / 1000) * player!.getPlaybackRate();
      return time + Math.min(ahead, MAX_ESTIMATE_AHEAD);
    };

    const tick = () => {
      show(estimatedTime());
      frame = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      window.clearInterval(idleCheck);
      idleCheck = 0;
    };

    const onState = (state: number) => {
      setPlayerState(state);
      stopLoop();
      if (state === PlayerState.PLAYING) {
        reported = -1;
        frame = requestAnimationFrame(tick);
      } else if (player) {
        // Freeze exactly where the player is, and follow only a seek.
        const paused = player;
        show(paused.getCurrentTime());
        idleCheck = window.setInterval(() => show(paused.getCurrentTime()), 250);
      }
    };

    syncRef.current = () => {
      if (player && !frame) show(player.getCurrentTime());
    };

    // The API replaces the element it is given with an iframe, so hand it a
    // node React doesn't manage.
    const target = document.createElement("div");
    target.className = "size-full";
    host.appendChild(target);

    loadYouTubeApi()
      .then((YT) => {
        if (destroyed) return;
        player = new YT.Player(target, {
          videoId: video.youtubeId,
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            rel: 0,
            hl: locale,
            // Our own caption box replaces YouTube's captions.
            cc_load_policy: 0,
          },
          events: {
            onStateChange: (event) => onState(event.data),
          },
        });
      })
      .catch(() => {});

    return () => {
      destroyed = true;
      stopLoop();
      syncRef.current = null;
      player?.destroy();
      host.replaceChildren();
    };
  }, [video.youtubeId, locale]);

  const mode = cues ? "captions" : "summary";
  const cueText = cues && cueIndex >= 0 ? cues[cueIndex].text : "";

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-[3px]" onClick={onClose} aria-hidden />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-video-modal
        className="relative flex max-h-full w-full max-w-4xl flex-col gap-4 overflow-y-auto rounded-panel bg-white p-4 shadow-lift sm:p-5"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="flex items-start justify-between gap-4 px-1">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-lg leading-snug font-bold sm:text-xl">
              {video.title[locale]}
            </h2>
            <p className="text-sm text-neutral-500">
              {copy.by} <bdi>{video.creator}</bdi>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            data-autofocus
            className="interactive shrink-0 rounded-chip p-2 text-neutral-400 hover:bg-neutral-100 hover:text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {/* Video frames are never mirrored — forced LTR box in either locale. */}
        <div
          ref={mountRef}
          dir="ltr"
          className="aspect-video w-full overflow-hidden rounded-card bg-ink [&_iframe]:size-full"
        />

        <section
          data-caption-box
          data-caption-mode={mode}
          data-player-state={playerState}
          aria-live={mode === "captions" ? "polite" : undefined}
          className="flex flex-col gap-2 rounded-card border border-neutral-200 bg-neutral-50 px-5 py-4"
        >
          <span className="font-mono text-[0.7rem] tracking-[0.12em] text-brand-blue uppercase">
            {mode === "captions" ? copy.captionsLabel : copy.summaryLabel}
          </span>
          <p
            lang="ar"
            dir="rtl"
            data-caption-text
            className={
              mode === "captions"
                ? "min-h-[3.6em] font-arabic text-lg leading-[1.8] font-semibold text-ink"
                : "font-arabic text-base leading-[1.9] text-neutral-700"
            }
          >
            {mode === "captions" ? cueText : video.summaryAr}
          </p>
        </section>
      </motion.div>
    </motion.div>
  );
}
