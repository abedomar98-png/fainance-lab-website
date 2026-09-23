"use client";

import Link from "next/link";

import { CardShell } from "@/components/cards/CardShell";
import { useLocale } from "@/components/providers/LocaleProvider";
import { ArrowIcon, CalendarIcon, PinIcon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { isUpcoming } from "@/content/events";
import type { EventEntry } from "@/content/types";
import { formatDateRange, localeHref } from "@/lib/utils";

/**
 * An event on the Events index: hero photo, status, name, teaser, then the
 * facts — date, place, organiser. The whole card links to the detail page.
 */
export function EventCard({
  event,
  priority = false,
}: {
  event: EventEntry;
  priority?: boolean;
}) {
  const { dict, locale } = useLocale();
  const copy = dict.events;
  const upcoming = isUpcoming(event);

  return (
    <CardShell cover={event.hero.src} coverAlt={event.hero.alt[locale]} priority={priority}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone={upcoming ? "free" : "soon"}>{upcoming ? copy.upcoming : copy.past}</Tag>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg leading-snug font-bold text-balance">
          <Link
            href={localeHref(locale, `/events/${event.slug}`)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {event.name[locale]}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">
          {event.teaser[locale]}
        </p>
      </div>

      <EventFacts event={event} />

      <span className="interactive mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:text-brand-blue-deep">
        {copy.view}
        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </span>
    </CardShell>
  );
}

/** Date · location · organiser, shared by the card and the detail page. */
export function EventFacts({ event, className }: { event: EventEntry; className?: string }) {
  const { dict, locale } = useLocale();
  return (
    <ul className={className ?? "flex flex-col gap-1.5 border-t border-neutral-100 pt-3 text-sm text-neutral-600"}>
      <li className="flex items-center gap-2">
        <CalendarIcon className="size-4 shrink-0 text-brand-blue" />
        {formatDateRange(event.startDate, event.endDate, locale)}
      </li>
      <li className="flex items-center gap-2">
        <PinIcon className="size-4 shrink-0 text-brand-green" />
        {event.location[locale]}
      </li>
      <li className="flex items-center gap-2">
        <span className="text-neutral-400">{dict.events.organizer}:</span>
        <bdi className="font-semibold text-ink">{event.organizer}</bdi>
      </li>
    </ul>
  );
}
