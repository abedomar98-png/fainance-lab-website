"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useId, useState } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { ArrowIcon, PlusIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import type { FaqItem } from "@/content/types";
import { cn, localeHref } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * FAQ accordion. Any number of answers can be open at once — a visitor
 * comparing two answers shouldn't have one snap shut under them.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <RevealGroup as="ul" stagger={0.05} className="flex flex-col gap-3">
      {items.map((item) => (
        <Reveal as="li" key={item.id} variant="settle">
          <FaqRow item={item} open={open.has(item.id)} onToggle={() => toggle(item.id)} />
        </Reveal>
      ))}
    </RevealGroup>
  );
}

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const { locale } = useLocale();
  const panelId = useId();

  return (
    <div
      data-faq-item={item.id}
      className={cn(
        "interactive rounded-card border bg-white",
        open ? "border-neutral-200 shadow-card" : "border-neutral-100 hover:border-neutral-200",
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start sm:px-6 sm:py-5"
        >
          <span className="font-display text-base leading-snug font-semibold text-ink sm:text-lg">
            {item.question[locale]}
          </span>
          <span
            className={cn(
              "interactive flex size-8 shrink-0 items-center justify-center rounded-full",
              open ? "rotate-45 bg-brand-blue text-white" : "bg-neutral-100 text-ink",
            )}
          >
            <PlusIcon className="size-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-start gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
              <p className="max-w-3xl leading-relaxed text-neutral-600">
                {item.answer[locale]}
              </p>
              {item.link ? (
                <Link
                  href={localeHref(locale, item.link.href)}
                  className="interactive group/link inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-deep"
                >
                  {item.link.label[locale]}
                  <ArrowIcon className="size-4 rtl:-scale-x-100" />
                </Link>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
