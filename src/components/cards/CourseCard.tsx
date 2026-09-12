"use client";

import { CardBody, CardShell } from "@/components/cards/CardShell";
import { useCaptureModal } from "@/components/modal/CaptureModal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { pillarIcons } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { TileBadge } from "@/components/ui/TileBadge";
import { pillarTone } from "@/content/pillars";
import type { Course } from "@/content/types";

/**
 * A planned course. Phase 1 has no prices, no ratings and no buy button —
 * the only action is "Notify Me", which opens the capture modal.
 *
 * Courses have no cover artwork yet, so the cover slot carries the pillar's
 * tile badge on a tinted ground rather than a stock image.
 */
export function CourseCard({ course }: { course: Course }) {
  const { dict, locale } = useLocale();
  const { open } = useCaptureModal();

  const Icon = pillarIcons[course.pillar];
  const tone = pillarTone[course.pillar];

  return (
    <CardShell
      coverFallback={
        <div className="flex size-full items-center justify-center bg-neutral-50">
          <TileBadge
            icon={Icon}
            tone={tone}
            size="lg"
            className="scale-125 shadow-card transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.35]"
          />
        </div>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="soon">{dict.common.comingSoon}</Tag>
      </div>

      <CardBody
        title={course.title[locale]}
        description={course.description[locale]}
      />

      <Button
        size="sm"
        variant="outline"
        className="mt-1 self-start"
        onClick={() =>
          open({ intent: "notify", courseSlug: course.slug })
        }
      >
        {dict.common.notifyMe}
      </Button>
    </CardShell>
  );
}
