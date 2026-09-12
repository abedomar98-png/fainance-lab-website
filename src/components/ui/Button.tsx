import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary" // brand blue — the default call to action
  | "signature" // blue→green gradient — one per page, reserved for the hero
  | "outline" // bordered, for secondary actions on light ground
  | "ghost" // text-only
  | "onDark"; // solid white on ink/gradient backgrounds

export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue text-white shadow-card hover:bg-brand-blue-deep hover:-translate-y-[3px] hover:shadow-lift active:translate-y-px active:shadow-card",
  signature:
    "bg-signature text-white shadow-card hover:-translate-y-[3px] hover:shadow-lift hover:brightness-95 active:translate-y-px active:shadow-card",
  outline:
    "border border-neutral-300 bg-white text-ink hover:border-brand-blue hover:text-brand-blue-deep hover:-translate-y-[2px] hover:shadow-card active:translate-y-px active:shadow-none",
  ghost:
    "text-ink hover:text-brand-blue-deep hover:-translate-y-[2px] active:translate-y-px",
  onDark:
    "bg-white text-ink shadow-card hover:bg-neutral-100 hover:-translate-y-[3px] hover:shadow-lift active:translate-y-px active:shadow-card",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-[0.95rem] gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

const baseStyles =
  "interactive inline-flex items-center justify-center rounded-pill font-display font-semibold leading-none whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-card";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (typeof props.href === "string") {
    const { href, ...linkRest } = rest as ComponentPropsWithoutRef<typeof Link>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
