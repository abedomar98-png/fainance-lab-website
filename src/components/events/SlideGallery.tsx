"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { useDialog } from "@/components/modal/use-dialog";
import { useLocale } from "@/components/providers/LocaleProvider";
import { CloseIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import type { EventEntry } from "@/content/types";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type Slide = EventEntry["slides"][number];

/** The public teaser slides, each opening full-size in a lightbox. */
export function SlideGallery({ slides }: { slides: Slide[] }) {
  const { dict, locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <RevealGroup as="ul" stagger={0.08} className="grid gap-4 sm:grid-cols-3">
        {slides.map((slide, index) => (
          <Reveal as="li" key={slide.src} variant="fade">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`${dict.events.enlarge}: ${slide.alt[locale]}`}
              className="interactive group block w-full overflow-hidden rounded-card border border-neutral-200 bg-white shadow-card hover:-translate-y-1 hover:shadow-lift"
            >
              {/* Slides are artwork — never mirrored in RTL. */}
              <Image
                src={slide.src}
                alt={slide.alt[locale]}
                width={1280}
                height={720}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </Reveal>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {openIndex != null ? (
          <Lightbox slide={slides[openIndex]} onClose={() => setOpenIndex(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Lightbox({ slide, onClose }: { slide: Slide; onClose: () => void }) {
  const { dict, locale } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-[3px]" onClick={onClose} aria-hidden />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={slide.alt[locale]}
        className="relative w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.modal.close}
          data-autofocus
          className="interactive absolute -top-12 end-0 rounded-chip p-2 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="size-6" />
        </button>
        <Image
          src={slide.src}
          alt={slide.alt[locale]}
          width={1280}
          height={720}
          sizes="(min-width: 1024px) 64rem, 100vw"
          className="h-auto w-full rounded-card shadow-lift"
        />
      </motion.div>
    </motion.div>
  );
}
