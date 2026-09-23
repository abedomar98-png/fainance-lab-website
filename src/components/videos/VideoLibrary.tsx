"use client";

import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";

import { CardBody, CardShell } from "@/components/cards/CardShell";
import { useLocale } from "@/components/providers/LocaleProvider";
import { FilterBar, NoResults } from "@/components/ui/FilterBar";
import { PlayIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { VideoModal } from "@/components/videos/VideoModal";
import type { Video } from "@/content/types";
import { matchesQuery } from "@/lib/search";

/**
 * Videos grid with search + topic chips. Clicking a card opens the player
 * modal with its Arabic caption box.
 *
 * With no videos yet it says so plainly — there are no stand-in entries.
 */
export function VideoLibrary({ videos }: { videos: Video[] }) {
  const { dict } = useLocale();
  const copy = dict.videos;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState<Video | null>(null);

  // Chips only for topics that actually have a video.
  const chips = useMemo(
    () =>
      [...new Set(videos.map((v) => v.tag))].map((id) => ({
        id,
        label: dict.blog.categories[id],
      })),
    [videos, dict],
  );

  const visible = videos.filter(
    (v) =>
      (active == null || v.tag === active) &&
      matchesQuery(query, [
        v.title.en,
        v.title.ar,
        v.description.en,
        v.description.ar,
        v.creator,
        v.summaryAr,
        dict.blog.categories[v.tag],
      ]),
  );

  if (videos.length === 0) {
    return <NoResults message={copy.empty} />;
  }

  return (
    <div className="flex flex-col gap-10">
      <Reveal variant="rise">
        <FilterBar
          query={query}
          onQuery={setQuery}
          placeholder={copy.searchPlaceholder}
          chips={chips.length > 1 ? chips : undefined}
          active={active}
          onActive={setActive}
          visible={visible.length}
          total={videos.length}
        />
      </Reveal>

      {visible.length === 0 ? (
        <NoResults message={dict.filter.noResults} />
      ) : (
        <RevealGroup
          as="ul"
          stagger={0.08}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((video) => (
            <Reveal as="li" key={video.slug} variant="settle">
              <VideoCard
                video={video}
                label={dict.blog.categories[video.tag]}
                onPlay={() => setPlaying(video)}
              />
            </Reveal>
          ))}
        </RevealGroup>
      )}

      <AnimatePresence>
        {playing ? (
          <VideoModal key={playing.slug} video={playing} onClose={() => setPlaying(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function VideoCard({
  video,
  label,
  onPlay,
}: {
  video: Video;
  label: string;
  onPlay: () => void;
}) {
  const { dict, locale } = useLocale();
  const copy = dict.videos;
  const title = video.title[locale];
  return (
    <CardShell
      cover={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
      coverAlt={title}
      // hqdefault is 4:3 with baked-in letterbox bars; scale crops them.
      coverClassName="scale-[1.34] group-hover:scale-[1.39]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{label}</Tag>
      </div>
      <CardBody title={title} description={video.description[locale]} />
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-sm text-neutral-500">
          {copy.by} <bdi>{video.creator}</bdi>
        </span>
        {/* Stretched over the whole card, so the card itself is the target. */}
        <button
          type="button"
          onClick={onPlay}
          data-video-open={video.slug}
          className="interactive inline-flex items-center gap-1.5 rounded-pill bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-card after:absolute after:inset-0 after:content-[''] hover:bg-brand-blue-deep"
        >
          <PlayIcon className="size-4" />
          {copy.watch}
        </button>
      </div>
    </CardShell>
  );
}
