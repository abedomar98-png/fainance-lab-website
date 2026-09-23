"use client";

import { Fragment, useMemo, useState } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { FilterBar, NoResults } from "@/components/ui/FilterBar";
import { Reveal } from "@/components/ui/Reveal";
import type { GlossaryGroup, GlossaryTerm } from "@/content/types";
import { matchesQuery } from "@/lib/search";

const GROUP_ORDER: GlossaryGroup[] = ["ai", "finance", "claude", "credential"];

/**
 * Bilingual glossary with live search.
 *
 * The search is partial and case-insensitive and matches either language —
 * the English term, the Arabic meaning, or either description. Arabic is
 * normalised first (see `lib/search.ts`) so spelling variants still match.
 * Groups with no matching rows drop out entirely.
 */
export function GlossaryTable({ terms }: { terms: GlossaryTerm[] }) {
  const { dict, locale } = useLocale();
  const copy = dict.glossary;
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      terms.filter((t) =>
        matchesQuery(query, [t.term, t.ar, t.description.en, t.description.ar]),
      ),
    [terms, query],
  );

  const groups = GROUP_ORDER.map((group) => ({
    group,
    rows: visible.filter((t) => t.group === group),
  })).filter((g) => g.rows.length > 0);

  return (
    <div className="flex flex-col gap-8">
      <Reveal variant="rise">
        <FilterBar
          query={query}
          onQuery={setQuery}
          placeholder={copy.searchPlaceholder}
          visible={visible.length}
          total={terms.length}
        />
      </Reveal>

      {groups.length === 0 ? (
        <NoResults message={dict.filter.noResults} />
      ) : (
        // No scroll reveal here: the table is far taller than the viewport, so
        // an "N% in view" trigger would never fire and leave it invisible.
        <div className="overflow-hidden rounded-card-lg border border-neutral-200 bg-white shadow-card">
          <table className="w-full border-collapse text-start" data-glossary>
            <thead className="bg-neutral-50">
              <tr className="border-b border-neutral-200">
                <th scope="col" className="w-1/2 px-5 py-3 text-start font-mono text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase sm:px-6">
                  {copy.colTerm}
                </th>
                <th scope="col" className="w-1/2 px-5 py-3 text-start font-mono text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase sm:px-6">
                  {copy.colMeaning}
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map(({ group, rows }) => (
                <Fragment key={group}>
                  <tr className="border-b border-neutral-100 bg-neutral-50/60">
                    <th
                      scope="colgroup"
                      colSpan={2}
                      className="px-5 pt-5 pb-2 text-start font-display text-sm font-bold text-brand-blue-deep sm:px-6"
                    >
                      {copy.groups[group]}
                    </th>
                  </tr>
                  {rows.map((t) => (
                    <tr
                      key={t.term}
                      data-glossary-row
                      className="border-b border-neutral-100 align-top last:border-b-0 hover:bg-neutral-50/70"
                    >
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex flex-col gap-1.5">
                          <bdi lang="en" className="font-display text-[0.95rem] font-semibold text-ink">
                            {t.term}
                          </bdi>
                          <p className="text-sm leading-relaxed text-neutral-500">
                            {t.description[locale]}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <bdi lang="ar" dir="rtl" className="block font-arabic text-base font-semibold text-ink">
                          {t.ar}
                        </bdi>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
