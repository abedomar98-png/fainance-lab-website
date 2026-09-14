"use client";

import { animate } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import {
  ReplayIcon,
  SkipIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const SRC = "/assets/video/fainance-intro.mp4";
/** The video's own final frame — the static logo hold. */
const POSTER = "/assets/video/fainance-intro-poster.jpg";

/**
 * When the full-width intro starts shrinking into the hero panel. The logo has
 * fully resolved by ~5.0s and holds until the video ends at ~7.0s, so the move
 * happens over that static hold rather than over the ribbon animation.
 */
const DOCK_AT_SECONDS = 5.3;
const DOCK_DURATION_SECONDS = 1.3;
/** Never keep the headline hidden behind a video that won't start. */
const START_TIMEOUT_MS = 3000;
const SAFETY_TIMEOUT_MS = 12000;
const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * boot    — server render / before measuring: panel position, invisible
 * intro   — full-width window across the hero
 * docking — shrinking into the panel while the copy reveals
 * docked  — resting in the panel; plain CSS, fully responsive
 */
type Stage = "boot" | "intro" | "docking" | "docked";
type Playback = "idle" | "playing" | "ended";

const GEOMETRY = ["left", "top", "width", "height", "right", "bottom"] as const;

/**
 * A vertical mask that fades the top and bottom of a 16:9 video band sitting
 * letterboxed (object-fit: contain) inside a taller box.
 */
function letterboxFeather(width: number, height: number): string {
  const band = (width * 9) / 16;
  const top = Math.max(0, (height - band) / 2);
  const fade = Math.min(90, band * 0.35);
  return `linear-gradient(to bottom, transparent ${top}px, black ${top + fade}px, black ${top + band - fade}px, transparent ${top + band}px)`;
}

/**
 * The brand intro video.
 *
 * On load it plays as a window spanning the full width of the hero, then — as
 * the logo settles — shrinks into its panel beside the headline while the copy
 * reveals (via `onReveal`). The element is never remounted: during the intro
 * it is the same node, absolutely positioned out past the panel's edges, and
 * docking animates those offsets back to zero. Once docked every inline style
 * is cleared, so the resting layout is ordinary CSS.
 *
 * Sound: playback is attempted with sound on. Browsers block unmuted autoplay
 * for sites the visitor hasn't interacted with, so if that is refused it plays
 * muted and turns sound on at the visitor's first click or key press anywhere
 * on the page — the earliest moment a browser permits it.
 */
export function HeroVideo({ onReveal }: { onReveal: () => void }) {
  const { dict } = useLocale();
  const copy = dict.home.hero.video;

  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>("boot");
  const startedRef = useRef(false);
  const revealedRef = useRef(false);

  const [stage, setStage] = useState<Stage>("boot");
  const [playback, setPlayback] = useState<Playback>("idle");
  const [muted, setMuted] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);

  const goTo = useCallback((next: Stage) => {
    stageRef.current = next;
    setStage(next);
  }, []);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    onReveal();
  }, [onReveal]);

  /** Stretch the frame from the panel out to the hero's full width. */
  const applyIntroGeometry = useCallback(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    const slot = frame?.parentElement;
    const section = frame?.closest("section");
    if (!frame || !video || !slot || !section) return;

    const s = section.getBoundingClientRect();
    const p = slot.getBoundingClientRect();
    // As tall as the hero, but no taller than the viewport below the hero's
    // resting position, so the whole window — controls included — is on screen
    // on load. Page offset rather than viewport offset, so scrolling during the
    // intro doesn't resize it.
    const pageTop = s.top + window.scrollY;
    const height = Math.max(0, Math.min(s.height, window.innerHeight - pageTop));

    frame.style.left = `${s.left - p.left}px`;
    frame.style.top = `${s.top - p.top}px`;
    frame.style.width = `${s.width}px`;
    frame.style.height = `${height}px`;
    frame.style.right = "auto";
    frame.style.bottom = "auto";

    // Wide windows crop a little top and bottom; tall ones (phones) letterbox
    // onto the video's own background colour instead of cropping the logo.
    const letterbox = height > 0 && s.width / height < 1.5;
    video.style.objectFit = letterbox ? "contain" : "cover";

    // Letterboxed, the ribbons would be sliced off in a hard line at the
    // video's top and bottom edges. Feather those edges into the ground colour.
    const mask = letterbox ? letterboxFeather(s.width, height) : "";
    video.style.maskImage = mask;
    video.style.setProperty("-webkit-mask-image", mask);
  }, []);

  const clearIntroStyles = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.objectFit = "";
    video.style.maskImage = "";
    video.style.removeProperty("-webkit-mask-image");
  }, []);

  const finishDocking = useCallback(() => {
    const frame = frameRef.current;
    if (frame) for (const prop of GEOMETRY) frame.style[prop] = "";
    clearIntroStyles();
    goTo("docked");
  }, [clearIntroStyles, goTo]);

  /** Shrink the window into the panel and reveal the copy alongside it. */
  const dock = useCallback(() => {
    const from = stageRef.current;
    if (from !== "intro" && from !== "boot") return;
    reveal();

    const frame = frameRef.current;
    const slot = frame?.parentElement;
    if (from === "boot" || !frame || !slot) {
      finishDocking();
      return;
    }

    goTo("docking");
    // The feather is sized for the full-height window and would slide out of
    // place as the frame shrinks. By now the video is on its plain logo hold,
    // so there are no ribbons at the edges to hide.
    const video = videoRef.current;
    if (video) {
      video.style.maskImage = "";
      video.style.removeProperty("-webkit-mask-image");
    }
    animate(
      frame,
      {
        left: [parseFloat(frame.style.left) || 0, 0],
        top: [parseFloat(frame.style.top) || 0, 0],
        width: [parseFloat(frame.style.width) || slot.clientWidth, slot.clientWidth],
        height: [parseFloat(frame.style.height) || slot.clientHeight, slot.clientHeight],
      },
      { duration: DOCK_DURATION_SECONDS, ease: EASE },
    ).then(finishDocking);
  }, [finishDocking, goTo, reveal]);

  const skip = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        // Jump to the logo hold rather than freezing mid-animation.
        video.currentTime = video.duration;
        if (video.paused) setPlayback("ended");
      } else {
        video.pause();
      }
    }
    dock();
  }, [dock]);

  /* Boot: measure, go full width, and start playback. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    async function startWithSound(el: HTMLVideoElement) {
      el.muted = false;
      try {
        await el.play();
      } catch (error) {
        if ((error as DOMException)?.name !== "NotAllowedError") return;
        // Unmuted autoplay refused — play muted and wait for a gesture.
        el.muted = true;
        setSoundBlocked(true);
        try {
          await el.play();
        } catch {
          // Even muted playback refused (e.g. power saving). The start
          // timeout below docks, so the copy is never held back.
        }
      }
    }

    // Things above the hero can still move after the first measurement — the
    // promo bar slides in once hydrated, pushing the hero down ~40px — and a
    // stale measurement leaves the window's bottom edge (and its controls)
    // below the fold. Re-measure whenever the hero's page position, width or
    // the viewport height changes, for as long as the intro is showing.
    let watcher = 0;
    let lastKey = "";
    const watch = () => {
      if (stageRef.current !== "intro") return;
      const section = frameRef.current?.closest("section");
      if (section) {
        const r = section.getBoundingClientRect();
        const key = `${r.top + window.scrollY}|${r.width}|${window.innerHeight}`;
        if (key !== lastKey) {
          lastKey = key;
          applyIntroGeometry();
        }
      }
      watcher = requestAnimationFrame(watch);
    };

    const frame = requestAnimationFrame(() => {
      if (reducedMotion) {
        // No intro: rest in the panel on the poster, which is the final logo.
        reveal();
        goTo("docked");
        return;
      }
      goTo("intro");
      watch();
      void startWithSound(video);
    });

    const startTimer = window.setTimeout(() => {
      if (!startedRef.current) dock();
    }, START_TIMEOUT_MS);
    const safetyTimer = window.setTimeout(dock, SAFETY_TIMEOUT_MS);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(watcher);
      window.clearTimeout(startTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [applyIntroGeometry, dock, goTo, reveal]);

  /* Sound was refused: turn it on at the first gesture the browser honours. */
  useEffect(() => {
    if (!soundBlocked) return;

    const onGesture = (event: Event) => {
      // Let the on-video controls handle their own clicks.
      if (controlsRef.current?.contains(event.target as Node)) return;
      const video = videoRef.current;
      setSoundBlocked(false);
      if (!video || video.ended) return;
      video.muted = false;
    };

    window.addEventListener("pointerdown", onGesture, true);
    window.addEventListener("keydown", onGesture, true);
    return () => {
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
    };
  }, [soundBlocked]);

  /* Keyboard users tabbing into the hero shouldn't land on hidden links. */
  useEffect(() => {
    const section = frameRef.current?.closest("section");
    if (!section) return;
    const onFocusIn = (event: FocusEvent) => {
      if (stageRef.current !== "intro") return;
      if (controlsRef.current?.contains(event.target as Node)) return;
      skip();
    };
    section.addEventListener("focusin", onFocusIn);
    return () => section.removeEventListener("focusin", onFocusIn);
  }, [skip]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setSoundBlocked(false);
    if (video.paused && !video.ended) video.play().catch(() => {});
  }

  async function handleDockedControl() {
    const video = videoRef.current;
    if (!video) return;

    if (playback === "playing" && !muted) {
      video.muted = true;
      return;
    }

    if (playback !== "playing") video.currentTime = 0;
    video.muted = false;
    try {
      await video.play();
    } catch {
      video.muted = true;
    }
  }

  const docked =
    playback === "ended"
      ? { label: copy.replay, Icon: ReplayIcon }
      : playback === "idle"
        ? { label: copy.play, Icon: SoundOnIcon }
        : muted
          ? { label: copy.soundOn, Icon: SoundOffIcon }
          : { label: copy.mute, Icon: SoundOnIcon };

  const pill =
    "interactive inline-flex items-center gap-2 rounded-pill border border-neutral-200 bg-white/85 px-3 py-1.5 font-mono text-[0.7rem] font-medium text-ink shadow-card backdrop-blur-sm hover:-translate-y-[2px] hover:bg-white hover:shadow-lift active:translate-y-px active:shadow-card";

  const inIntro = stage === "intro" || stage === "docking";

  return (
    <div
      ref={frameRef}
      // data-reveal: without JavaScript the noscript rule makes this visible
      // in its resting panel position, showing the poster.
      data-reveal
      data-hero-stage={stage}
      className={cn(
        "absolute inset-0 overflow-hidden rounded-panel border border-neutral-100 bg-video-ground shadow-card",
        "transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        stage === "boot" ? "opacity-0" : "opacity-100",
        inIntro && "z-20",
      )}
    >
      <video
        ref={videoRef}
        data-hero-video
        className="size-full object-cover"
        src={SRC}
        poster={POSTER}
        playsInline
        preload="auto"
        aria-label={copy.label}
        onPlaying={() => {
          startedRef.current = true;
          setPlayback("playing");
        }}
        onPlay={() => setPlayback("playing")}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onTimeUpdate={(event) => {
          if (
            stageRef.current === "intro" &&
            event.currentTarget.currentTime >= DOCK_AT_SECONDS
          ) {
            dock();
          }
        }}
        onEnded={() => {
          setPlayback("ended");
          dock();
        }}
      />

      <div
        ref={controlsRef}
        className={cn(
          "absolute end-3 bottom-3 flex items-center gap-2 transition-opacity duration-300",
          stage === "intro" || stage === "docked"
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        {stage === "docked" ? (
          <button
            type="button"
            onClick={handleDockedControl}
            aria-label={docked.label}
            aria-pressed={playback === "playing" ? !muted : undefined}
            className={pill}
          >
            <docked.Icon className="size-4 shrink-0" />
            <span>{docked.label}</span>
          </button>
        ) : (
          <>
            <button
              type="button"
              data-hero-sound
              onClick={toggleSound}
              aria-label={muted ? copy.soundOn : copy.mute}
              aria-pressed={!muted}
              className={cn(pill, soundBlocked && "border-brand-blue")}
            >
              {muted ? (
                <SoundOffIcon className="size-4 shrink-0" />
              ) : (
                <SoundOnIcon className="size-4 shrink-0" />
              )}
              <span>{muted ? copy.soundOn : copy.mute}</span>
            </button>
            <button
              type="button"
              data-hero-skip
              onClick={skip}
              aria-label={copy.skip}
              className={pill}
            >
              <span>{copy.skip}</span>
              <SkipIcon className="size-4 shrink-0 rtl:-scale-x-100" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
