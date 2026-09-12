"use client";

import Link from "next/link";

import { CardBody, CardShell } from "@/components/cards/CardShell";
import { useCaptureModal } from "@/components/modal/CaptureModal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { ArrowIcon, DownloadIcon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import type { Resource } from "@/content/types";
import { localeHref } from "@/lib/utils";

/**
 * A free resource. The Download button never links straight to the file — it
 * opens the lead-capture modal, which unlocks the download after the email is
 * submitted.
 *
 * No star ratings and no download counts: there is no real review or usage
 * data to show, and inventing either would be fabricated social proof.
 */
export function ResourceCard({
  resource,
  priority = false,
}: {
  resource: Resource;
  priority?: boolean;
}) {
  const { dict, locale } = useLocale();
  const { open } = useCaptureModal();

  const title = resource.title[locale];
  const isPlaceholder = resource.status === "placeholder";

  return (
    <CardShell
      cover={resource.cover}
      coverAlt={title}
      priority={priority}
      coverClassName={
        resource.cover.endsWith(".svg") ? "object-contain p-6" : undefined
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="free">{dict.common.freeDownload}</Tag>
        {isPlaceholder ? (
          <Tag tone="placeholder">{dict.common.placeholderBadge}</Tag>
        ) : null}
      </div>

      <CardBody title={title} description={resource.description[locale]} />

      {resource.note ? (
        <p className="font-mono text-[0.7rem] text-neutral-400">
          {resource.note[locale]}
        </p>
      ) : null}

      <div className="mt-1 flex items-center justify-between gap-3">
        <Link
          href={localeHref(locale, "/resources")}
          className="interactive group/link inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-brand-blue-deep"
        >
          {dict.common.readMore}
          <ArrowIcon className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/link:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/link:-translate-x-0.5" />
        </Link>

        <Button
          size="sm"
          onClick={() =>
            open({
              intent: "lead",
              resourceSlug: resource.slug,
              resourceTitle: title,
              fileUrl: resource.file,
            })
          }
        >
          <DownloadIcon className="size-4" />
          {dict.common.download}
        </Button>
      </div>
    </CardShell>
  );
}
