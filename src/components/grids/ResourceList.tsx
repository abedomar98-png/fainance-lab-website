"use client";

import { ResourceCard } from "@/components/cards/ResourceCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { resources } from "@/content/resources";

export function ResourceList() {
  return (
    <RevealGroup
      as="ul"
      stagger={0.1}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {resources.map((resource, index) => (
        <Reveal as="li" key={resource.slug} variant="settle">
          <ResourceCard resource={resource} priority={index === 0} />
        </Reveal>
      ))}
    </RevealGroup>
  );
}
