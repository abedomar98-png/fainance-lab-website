"use client";

import { useState } from "react";

import { ResourceCard } from "@/components/cards/ResourceCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { FilterBar, NoResults } from "@/components/ui/FilterBar";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { pillars } from "@/content/pillars";
import { resources } from "@/content/resources";
import { matchesQuery } from "@/lib/search";

/** Resources grid with search + pillar chips — the same layout as Videos. */
export function ResourceList() {
  const { dict } = useLocale();
  const pillarCopy = dict.home.pillars.items;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  // Chips only for pillars that actually have a resource, in pillar order.
  const chips = pillars
    .filter((p) => resources.some((r) => r.pillar === p.id))
    .map((p) => ({ id: p.id, label: pillarCopy[p.id].title }));

  const visible = resources.filter(
    (r) =>
      (active == null || r.pillar === active) &&
      matchesQuery(query, [
        r.title.en,
        r.title.ar,
        r.description.en,
        r.description.ar,
        pillarCopy[r.pillar].title,
      ]),
  );

  return (
    <div className="flex flex-col gap-10">
      <Reveal variant="rise">
        <FilterBar
          query={query}
          onQuery={setQuery}
          placeholder={dict.filter.search}
          chips={chips.length > 1 ? chips : undefined}
          active={active}
          onActive={setActive}
          visible={visible.length}
          total={resources.length}
        />
      </Reveal>

      {visible.length === 0 ? (
        <NoResults message={dict.filter.noResults} />
      ) : (
        <RevealGroup
          as="ul"
          stagger={0.1}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((resource, index) => (
            <Reveal as="li" key={resource.slug} variant="settle">
              <ResourceCard resource={resource} priority={index === 0} />
            </Reveal>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
