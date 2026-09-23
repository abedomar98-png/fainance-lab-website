"use client";

import { useId } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { CloseIcon, SearchIcon } from "@/components/ui/Icon";
import { cn, formatNumber } from "@/lib/utils";

export type FilterChip = { id: string; label: string };

/**
 * Search box plus optional topic chips, shared by the Resources, Videos and
 * Events grids (and the Glossary, search only).
 *
 * Purely presentational: the page owns the query/active state and does the
 * filtering, so each grid can match on whichever fields make sense for it.
 */
export function FilterBar({
  query,
  onQuery,
  placeholder,
  chips,
  active,
  onActive,
  visible,
  total,
  className,
}: {
  query: string;
  onQuery: (value: string) => void;
  placeholder: string;
  chips?: FilterChip[];
  /** Active chip id, or null for "All". */
  active?: string | null;
  onActive?: (id: string | null) => void;
  visible?: number;
  total?: number;
  className?: string;
}) {
  const { dict, locale } = useLocale();
  const copy = dict.filter;
  const inputId = useId();

  return (
    <div className={cn("flex flex-col gap-4", className)} role="search">
      <div className="relative">
        <label htmlFor={inputId} className="sr-only">
          {placeholder}
        </label>
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
        />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="interactive w-full rounded-pill border border-neutral-200 bg-white py-3 ps-12 pe-12 text-[0.95rem] shadow-card placeholder:text-neutral-400 hover:border-neutral-300 focus:border-brand-blue focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQuery("")}
            aria-label={copy.clear}
            className="interactive absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-ink"
          >
            <CloseIcon className="size-4" />
          </button>
        ) : null}
      </div>

      {chips && chips.length > 0 && onActive ? (
        <div className="flex flex-wrap items-center gap-2">
          <Chip selected={active == null} onClick={() => onActive(null)}>
            {copy.all}
          </Chip>
          {chips.map((chip) => (
            <Chip
              key={chip.id}
              selected={active === chip.id}
              onClick={() => onActive(active === chip.id ? null : chip.id)}
            >
              {chip.label}
            </Chip>
          ))}
        </div>
      ) : null}

      {query && visible != null && total != null ? (
        <p aria-live="polite" className="font-mono text-xs text-neutral-500">
          {formatNumber(visible, locale)} / {formatNumber(total, locale)}{" "}
          {copy.results}
        </p>
      ) : null}
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "interactive rounded-pill border px-3.5 py-1.5 text-sm font-semibold",
        selected
          ? "border-brand-blue bg-brand-blue text-white shadow-card"
          : "border-neutral-200 bg-white text-neutral-600 hover:-translate-y-[2px] hover:border-brand-blue hover:text-brand-blue-deep hover:shadow-card",
      )}
    >
      {children}
    </button>
  );
}

/** Shown in place of a grid when a search matches nothing. */
export function NoResults({ message }: { message: string }) {
  return (
    <p className="rounded-panel border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-500">
      {message}
    </p>
  );
}
