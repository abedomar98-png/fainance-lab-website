import type { PillarId } from "./types";

/** Tile-badge colour cycle from the playbook: blue → green → gold, repeating. */
export type BadgeTone = "blue" | "green" | "gold";

export type Pillar = {
  id: PillarId;
  icon: PillarId;
  tone: BadgeTone;
};

export const pillars: Pillar[] = [
  { id: "accounting", icon: "accounting", tone: "blue" },
  { id: "finance", icon: "finance", tone: "green" },
  { id: "externalAudit", icon: "externalAudit", tone: "gold" },
  { id: "internalAudit", icon: "internalAudit", tone: "blue" },
  { id: "grc", icon: "grc", tone: "green" },
];

/** Tone used for a pillar's accent wherever it appears outside the strip. */
export const pillarTone: Record<PillarId, BadgeTone> = {
  accounting: "blue",
  finance: "green",
  externalAudit: "gold",
  internalAudit: "blue",
  grc: "green",
};
