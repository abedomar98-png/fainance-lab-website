"use client";

import { useState } from "react";

import { EventCard } from "@/components/events/EventCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { FilterBar, NoResults } from "@/components/ui/FilterBar";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { sortEvents } from "@/content/events";
import type { EventEntry } from "@/content/types";
import { matchesQuery } from "@/lib/search";

/** Below this many events a search box is just clutter. */
const SEARCH_FROM = 4;

/**
 * The Events listing — upcoming first, then past, most recent first. Uses
 * the same card grid as Resources and Videos; the search bar appears only
 * once there are enough events to need it.
 */
export function EventsIndex({ events }: { events: EventEntry[] }) {
  const { dict } = useLocale();
  const copy = dict.events;
  const [query, setQuery] = useState("");

  if (events.length === 0) return <NoResults message={copy.empty} />;

  const searchable = events.length >= SEARCH_FROM;
  const visible = sortEvents(events).filter((e) =>
    matchesQuery(query, [
      e.name.en,
      e.name.ar,
      e.teaser.en,
      e.teaser.ar,
      e.location.en,
      e.location.ar,
      e.organizer,
      e.sessionTitle?.en ?? "",
      e.sessionTitle?.ar ?? "",
    ]),
  );

  return (
    <div className="flex flex-col gap-10">
      {searchable ? (
        <Reveal variant="rise">
          <FilterBar
            query={query}
            onQuery={setQuery}
            placeholder={copy.searchPlaceholder}
            visible={visible.length}
            total={events.length}
          />
        </Reveal>
      ) : null}

      {visible.length === 0 ? (
        <NoResults message={dict.filter.noResults} />
      ) : (
        <RevealGroup as="ul" stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event, index) => (
            <Reveal as="li" key={event.slug} variant="settle">
              <EventCard event={event} priority={index === 0} />
            </Reveal>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
