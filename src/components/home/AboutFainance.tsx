"use client";

import Image from "next/image";

import { useLocale } from "@/components/providers/LocaleProvider";
import { PlayIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";

export type AboutFainanceAssets = {
  /** `/assets/video/about-fainance.<ext>`, or null until Abed supplies it. */
  video: string | null;
  poster: string | null;
  /** Locale-specific logo anatomy graphic, or null until supplied. */
  logoAnatomy: Record<Locale, string | null>;
};

/**
 * About Fainance — the brand's own story, directly under the hero.
 *
 * The video and the logo anatomy graphic are supplied by hand into
 * `source-assets/` and copied into /public by `scripts/sync-source-assets.mjs`.
 * The server page checks which exist and passes the paths in; anything not
 * supplied yet renders a same-size placeholder so the layout never jumps.
 *
 * Neither is ever mirrored in RTL — both contain the logo.
 */
export function AboutFainance({ assets }: { assets: AboutFainanceAssets }) {
  const { dict, locale } = useLocale();
  const copy = dict.home.aboutFainance;
  const logoAnatomy = assets.logoAnatomy[locale];

  return (
    <Section className="bg-white">
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Media column: video, then the logo anatomy beside the text. */}
        <div className="flex flex-col gap-6">
          <Reveal variant="fade">
            {assets.video ? (
              <video
                className="aspect-video w-full rounded-panel bg-ink shadow-lift"
                src={assets.video}
                poster={assets.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
                aria-label={copy.videoLabel}
              />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-panel bg-ink text-neutral-300 shadow-lift">
                <span className="flex size-14 items-center justify-center rounded-full border border-white/20 text-white">
                  <PlayIcon className="size-6 translate-x-0.5" />
                </span>
                <span className="font-mono text-xs tracking-[0.12em] uppercase">
                  {copy.videoPending}
                </span>
              </div>
            )}
          </Reveal>

          <Reveal variant="fade">
            {logoAnatomy ? (
              <Image
                src={logoAnatomy}
                alt={copy.logoAnatomyAlt}
                width={1054}
                height={1492}
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="h-auto w-full rounded-panel border border-neutral-100 shadow-card"
              />
            ) : (
              <div className="flex aspect-[1054/1492] w-full items-center justify-center rounded-panel border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center text-sm text-neutral-500">
                {copy.logoAnatomyPending}
              </div>
            )}
          </Reveal>
        </div>

        {/* Text column stays in view while the taller media column scrolls past.
            Stacked on mobile it comes first, so the heading introduces the video. */}
        <div className="order-first flex flex-col gap-10 lg:sticky lg:top-28 lg:order-none">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />

          <RevealGroup as="dl" stagger={0.12} className="flex flex-col gap-8">
            {[
              { label: copy.visionLabel, text: copy.vision },
              { label: copy.missionLabel, text: copy.mission },
            ].map((block) => (
              <Reveal
                key={block.label}
                variant="rise"
                className="flex flex-col gap-3 border-s-2 border-brand-blue ps-5"
              >
                <dt className="font-display text-lg font-bold">{block.label}</dt>
                <dd className="text-[1.05rem] leading-relaxed text-neutral-600">
                  {block.text}
                </dd>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
