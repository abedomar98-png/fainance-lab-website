"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

import { useLocale } from "@/components/providers/LocaleProvider";

/** Playbook easing — calm, never frantic. */
const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Entrance variants.
 *
 * There is deliberately more than one. Applying a single fade-in-up to every
 * element on a page is the clearest tell of a templated build, so each kind of
 * element gets an entrance suited to it — while all of them share the
 * playbook's direction (up-and-right), easing and duration band.
 *
 * `flip` is -1 in RTL so "rightward" becomes "leftward" and the Arabic layout
 * mirrors properly.
 */
export type RevealVariant =
  | "rise" // default — up and in from the inline-start side
  | "settle" // cards: shorter travel, a touch of scale
  | "swing" // pull-quotes: enters with a slight rotation that resolves
  | "grow" // rules and underlines: scales from the inline-start edge
  | "fade"; // images: no travel, just opacity

function buildVariants(variant: RevealVariant, flip: 1 | -1): Variants {
  switch (variant) {
    case "settle":
      return {
        hidden: { opacity: 0, y: 18, scale: 0.985 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: EASE },
        },
      };
    case "swing":
      return {
        hidden: { opacity: 0, y: 22, rotate: -1.2 * flip },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      };
    case "grow":
      return {
        hidden: { opacity: 0, scaleX: 0 },
        show: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 0.5, ease: EASE },
        },
      };
    case "fade":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
      };
    case "rise":
    default:
      return {
        hidden: { opacity: 0, y: 26, x: -14 * flip },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      };
  }
}

/** Set while inside a RevealGroup, so children let the parent orchestrate. */
const GroupContext = createContext(false);

type GroupProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delay?: number;
  /** Fraction of the element that must be visible before it triggers. */
  amount?: number;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

/**
 * Orchestrates a staggered entrance for its `Reveal` children. Children enter
 * one after another rather than all at once.
 */
export function RevealGroup<T extends ElementType = "div">({
  as,
  children,
  stagger = 0.09,
  delay = 0,
  amount = 0.2,
  ...rest
}: GroupProps<T>) {
  const reduced = useReducedMotion();
  const Tag = motion[(as ?? "div") as "div"];

  if (reduced) {
    const Plain = (as ?? "div") as ElementType;
    return <Plain {...rest}>{children}</Plain>;
  }

  return (
    <GroupContext.Provider value={true}>
      <Tag
        data-reveal
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        {...rest}
      >
        {children}
      </Tag>
    </GroupContext.Provider>
  );
}

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  amount?: number;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

/**
 * A single scroll-triggered entrance. Inside a `RevealGroup` it waits its turn;
 * standalone, it triggers on its own when scrolled into view.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  variant = "rise",
  delay = 0,
  amount = 0.25,
  ...rest
}: RevealProps<T>) {
  const reduced = useReducedMotion();
  const { flip } = useLocale();
  const inGroup = useContext(GroupContext);
  const Tag = motion[(as ?? "div") as "div"];

  if (reduced) {
    const Plain = (as ?? "div") as ElementType;
    return <Plain {...rest}>{children}</Plain>;
  }

  const variants = buildVariants(variant, flip);

  // Inside a group the parent supplies initial/animate state; standalone we
  // drive it from the viewport ourselves.
  const orchestration = inGroup
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount },
      };

  return (
    <Tag
      data-reveal
      variants={variants}
      transition={delay ? { delay } : undefined}
      style={variant === "grow" ? { transformOrigin: "var(--reveal-origin, left)" } : undefined}
      {...orchestration}
      {...rest}
    >
      {children}
    </Tag>
  );
}
