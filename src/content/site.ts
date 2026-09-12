/** Single source of truth for site-wide constants. */
export const site = {
  name: "Fainance Lab",
  url: "https://www.fainance-lab.com",
  email: "abedlatif@fainance-lab.com",
  instagramHandle: "@fainance.lab",
  instagramUrl: "https://www.instagram.com/fainance.lab/",
  /**
   * TODO(abed): supply the real WhatsApp number. Left null deliberately — an
   * invented number would reach a stranger.
   */
  whatsapp: null as string | null,
  logos: {
    /** Default mark — footer, social share, square contexts. */
    primaryStacked: "/assets/logo/fainance-primary-stacked.png",
    /** Favicon / app icon / small avatar contexts. */
    appMark: "/assets/logo/fainance-appmark.png",
    /** Header horizontal lockup. */
    horizontal: "/assets/logo/fainance-horizontal.png",
    /** Horizontal lockup for coloured or dark headers. */
    horizontalTransparent: "/assets/logo/fainance-horizontal-transparent.png",
    /** Icon only, where the wordmark would be too small to read. */
    iconOnly: "/assets/logo/fainance-icon-only.png",
    /** Print/email backup on a white ground — not for web use. */
    stackedWhiteBg: "/assets/logo/fainance-stacked-white-bg.png",
  },
} as const;

/** The flagship free resource promoted in the top bar. */
export const featuredResourceSlug = "20-actions-claude-excel";
