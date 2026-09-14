import type { SVGProps } from "react";

/**
 * Line icons drawn on a 24×24 grid with a 1.6 stroke, so they sit correctly
 * inside a tile badge without optical weight differences between pillars.
 *
 * Deliberately NOT a generic icon-in-a-circle set: each pillar gets its own
 * mark, and they render on colour-cycling rounded tiles.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Ledger — accounting. */
export const AccountingIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 3.5h11.5A2.5 2.5 0 0 1 19 6v14.5H7.5A2.5 2.5 0 0 1 5 18V3.5Z" />
    <path d="M5 18a2.5 2.5 0 0 1 2.5-2.5H19" />
    <path d="M9 7.5h6M9 11h6" />
  </svg>
);

/** Trend line over an axis — finance. */
export const FinanceIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4v14.5A1.5 1.5 0 0 0 5.5 20H20" />
    <path d="M7.5 15.5 11 11l3 2.5 4.5-6" />
    <path d="M18.5 7.5H15m3.5 0V11" />
  </svg>
);

/** Document under a lens — external audit. */
export const ExternalAuditIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-8" />
    <path d="M13.5 3 18 7.5h-4.5V3Z" />
    <circle cx="10.5" cy="13" r="2.75" />
    <path d="m12.6 15.1 2.15 2.15" />
  </svg>
);

/** Shield with an audit tick — internal audit. */
export const InternalAuditIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3.25 19 6v6c0 4.3-2.9 7.5-7 8.75C7.9 19.5 5 16.3 5 12V6l7-2.75Z" />
    <path d="m9 12 2.25 2.25L15.5 10" />
  </svg>
);

/** Balance / scales — governance, risk and compliance. */
export const GrcIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 4v16M8 20h8" />
    <path d="M4.5 7.5h15" />
    <path d="M12 4.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    <path d="M7 7.5 4.25 13.5h5.5L7 7.5Z" />
    <path d="M17 7.5 14.25 13.5h5.5L17 7.5Z" />
  </svg>
);

export const pillarIcons = {
  accounting: AccountingIcon,
  finance: FinanceIcon,
  externalAudit: ExternalAuditIcon,
  internalAudit: InternalAuditIcon,
  grc: GrcIcon,
};

/* --- UI icons ----------------------------------------------------------- */

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </svg>
);

export const DownloadIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4 4.5-4" />
    <path d="M4.5 17.5v1A2.5 2.5 0 0 0 7 21h10a2.5 2.5 0 0 0 2.5-2.5v-1" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
  </svg>
);

export const SoundOffIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </svg>
);

export const SoundOnIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
);

export const ReplayIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
    <path d="M4.5 4v3.5H8" />
  </svg>
);

export const SkipIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 6.5 6 5.5-6 5.5" />
    <path d="m12.5 6.5 6 5.5-6 5.5" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.75 7 7.1 5.3a2 2 0 0 0 2.3 0L20.25 7" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 11.6a8 8 0 0 1-11.9 7L4 20l1.45-4a8 8 0 1 1 14.55-4.4Z" />
    <path d="M9.2 9c.3 1.2.9 2.3 1.8 3.2.9.9 2 1.5 3.2 1.8l.9-1.2 1.7.8c-.3 1-1.3 1.6-2.3 1.4a8.2 8.2 0 0 1-6-6c-.2-1 .4-2 1.4-2.3l.8 1.7L9.2 9Z" />
  </svg>
);
