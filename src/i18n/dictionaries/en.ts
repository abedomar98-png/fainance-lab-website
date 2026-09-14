/**
 * English dictionary (secondary locale).
 *
 * This object defines the shape of every translation — `ar.ts` must satisfy
 * `Dictionary`, so a missing Arabic key is a TypeScript error rather than a
 * silent English fallback at runtime.
 *
 * NOTE: Copy marked [PLACEHOLDER] or [TBD] is awaiting Abed's review. Do not
 * treat it as approved brand copy.
 */
const en = {
  meta: {
    siteName: "Fainance Lab",
    home: {
      title: "Fainance Lab — AI for Accounting, Finance, Audit & GRC",
      description:
        "Practical, Arabic-first AI for everyday accounting, finance, external audit, internal audit and GRC work. Free templates, guides and courses.",
    },
    about: {
      title: "About Abed-Latif Al-Omar — Fainance Lab",
      description:
        "25+ years in finance, audit and governance across the GCC and Levant — now focused on applying AI responsibly to real finance workflows.",
    },
    courses: {
      title: "Courses — Fainance Lab",
      description:
        "Practical AI courses for accounting, finance, audit and GRC professionals. Launching soon.",
    },
    resources: {
      title: "Free Resources — Fainance Lab",
      description:
        "Free templates, checklists and guides that make AI genuinely useful in your finance and audit work.",
    },
    blog: {
      title: "Blog — Fainance Lab",
      description:
        "Notes, tools and walkthroughs on using AI in accounting, finance, audit and GRC.",
    },
    contact: {
      title: "Contact — Fainance Lab",
      description: "Get in touch with Fainance Lab.",
    },
    privacy: {
      title: "Privacy Policy — Fainance Lab",
      description: "How Fainance Lab handles your data.",
    },
    terms: {
      title: "Terms of Use — Fainance Lab",
      description: "Terms governing the use of the Fainance Lab website.",
    },
  },

  nav: {
    home: "Home",
    about: "About Me",
    courses: "Courses",
    resources: "Resources",
    blog: "Blog",
    contact: "Contact",
    primaryCta: "Free Resources",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    instagram: "Fainance Lab on Instagram",
    switchLanguage: "Switch to Arabic",
  },

  common: {
    /** Required as the LAST line of every CTA surface. One per surface. */
    slogan: "Let's Fainance!",
    readMore: "Read More",
    download: "Download",
    notifyMe: "Notify Me",
    comingSoon: "Coming Soon",
    freeDownload: "Free Download",
    subscribe: "Subscribe",
    send: "Send",
    sending: "Sending…",
    backToBlog: "Back to all posts",
    placeholderBadge: "Placeholder",
    skipToContent: "Skip to content",
  },

  promo: {
    text: "Free: 20 Actions Claude Can Do in Excel",
    cta: "Get it",
    dismiss: "Dismiss announcement",
  },

  home: {
    hero: {
      eyebrow: "AI for Accounting, Finance & GRC",
      /* Mission headline — the promise, not a slogan. */
      title: "Make AI genuinely useful in the work you already do.",
      titleAccent: "genuinely useful",
      story:
        "I spent 25 years closing books, running audits and building governance frameworks — long before anyone called it AI. Now I translate these tools into something a finance team can actually use on a Tuesday afternoon: in Arabic first, on real workflows, with the controls your auditors will ask about.",
      cta: "Explore Free Resources",
      secondaryCta: "About Me",
      video: {
        label: "Fainance Lab brand intro",
        soundOn: "Turn sound on",
        mute: "Mute",
        play: "Play with sound",
        replay: "Replay with sound",
        skip: "Skip intro",
      },
      stats: [
        { value: "[TBD]", label: "Years in finance & audit" },
        { value: "[TBD]", label: "Practice areas covered" },
        { value: "[TBD]", label: "Countries of exposure" },
      ],
    },
    trustedBy: {
      // Section stays hidden until Abed confirms which logos may be used.
      eyebrow: "Experience across",
      title: "Trusted by finance teams across the region",
    },
    pillars: {
      eyebrow: "What we cover",
      title: "Five practice areas, one practical lens",
      subtitle:
        "Every resource, course and post on this site sits in one of these five pillars — and starts from a task you already have on your desk.",
      items: {
        accounting: {
          title: "Accounting",
          description:
            "Close faster, reconcile cleanly, and turn spreadsheets into something you can defend.",
        },
        finance: {
          title: "Finance",
          description:
            "Forecasting, analysis and reporting that answers the question management actually asked.",
        },
        externalAudit: {
          title: "External Audit",
          description:
            "Sampling, testing and documentation workflows that stand up to review.",
        },
        internalAudit: {
          title: "Internal Audit",
          description:
            "Risk-based planning, fieldwork and reporting — with AI doing the heavy reading.",
        },
        grc: {
          title: "GRC",
          description:
            "Governance, risk and compliance frameworks built to be used, not filed.",
        },
      },
    },
    resources: {
      eyebrow: "Free to download",
      title: "Start with something you can use today",
      subtitle:
        "No sign-up wall beyond your email — download it, try it on your own numbers, and tell me what broke.",
      cta: "See all resources",
    },
    newsletter: {
      eyebrow: "The newsletter",
      title: "One practical AI idea for finance, every issue.",
      description:
        "No hype, no tool-of-the-week churn. Just what worked on a real close, a real audit, or a real risk register — and how to repeat it.",
      cta: "Join the newsletter",
    },
    testimonials: {
      eyebrow: "What people say",
      title: "From the people who've sat through the training",
    },
    blog: {
      eyebrow: "From the blog",
      title: "Notes from the practice",
      cta: "Read the blog",
    },
  },

  about: {
    eyebrow: "About me",
    title: "I've done the work I'm teaching you to automate.",
    credentials: "MBA · CPA · CCGO",
    intro:
      "I'm Abed-Latif Al-Omar. For more than 25 years I've worked as a finance, audit and governance executive across the GCC and the Levant — through Big 4 engagements and into CFO-level seats, where the month-end close, the audit file and the risk register were my responsibility, not a case study.",
    body: [
      "Along the way I've trained professionals and built corporate programmes for organisations that needed their finance teams to be sharper, not just busier. That's where I learned the difference between a tool that demos well and a tool that survives contact with a real trial balance.",
      "Over the last few years my focus has moved to applying AI responsibly inside finance, audit and GRC workflows. Responsibly is the operative word: these tools are extraordinary at drafting, reading and reconciling, and genuinely dangerous when nobody owns the review step. Knowing which is which takes domain judgement, not prompt tricks.",
      "Fainance Lab exists to close that gap — deep domain credibility on one side, practical AI fluency on the other, delivered in Arabic first. Everything here starts from a task you already own and ends with something you can hand to your auditor.",
    ],
    highlightsTitle: "In brief",
    highlights: [
      "25+ years across finance, external audit, internal audit and governance",
      "Big 4 background, CFO-level experience",
      "Corporate training and programme delivery across multiple organisations",
      "GCC and Levant market exposure",
      "Focused on responsible, workflow-level AI adoption",
    ],
    cta: "See the free resources",
  },

  courses: {
    eyebrow: "Courses",
    title: "Practical AI training, built for finance teams.",
    subtitle:
      "Courses are in development. Each one starts from a workflow you already run — the close, the audit file, the risk register — and rebuilds it with AI doing the parts it's genuinely good at. Add your email and I'll tell you when the first one opens.",
    notifyNote: "No course is on sale yet. Nothing to buy on this page.",
  },

  resources: {
    eyebrow: "Free resources",
    title: "Templates, checklists and guides — free.",
    subtitle:
      "Each download is something I built for my own work first. Enter your email, confirm it, and the file is yours.",
  },

  blog: {
    eyebrow: "Blog",
    title: "Notes from the practice",
    subtitle:
      "Tools, walkthroughs and opinions on using AI in accounting, finance, audit and GRC.",
    categoriesTitle: "Browse by topic",
    categories: {
      accounting: "Accounting",
      finance: "Finance",
      externalAudit: "External Audit",
      internalAudit: "Internal Audit",
      grc: "GRC",
      aiTools: "AI Tools",
      templates: "Templates",
      career: "Career",
      tips: "Tips",
    },
    allPosts: "All posts",
    noPosts: "No posts in this topic yet.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Tell me what you're trying to fix.",
    subtitle:
      "A workflow that won't behave, a training need, or a question about one of the resources — all of it lands in the same inbox.",
    form: {
      name: "Your name",
      namePlaceholder: "Full name",
      email: "Email address",
      emailPlaceholder: "you@company.com",
      message: "Message",
      messagePlaceholder: "What are you working on?",
      submit: "Send message",
      success: "Thanks — your message is on its way. I'll reply personally.",
      error: "Something went wrong. Please email me directly instead.",
    },
    direct: {
      title: "Or reach me directly",
      email: "Email",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "[TBD — number pending]",
    },
  },

  modal: {
    close: "Close",
    lead: {
      title: "Where should I send it?",
      description:
        "Enter your name and email and the download unlocks straight away. You'll also get the newsletter — unsubscribe whenever you like.",
      name: "Your name",
      email: "Email address",
      submit: "Send me the file",
    },
    newsletter: {
      title: "Join the newsletter",
      description:
        "One practical AI idea for finance per issue. No hype, no spam.",
      email: "Email address",
      submit: "Subscribe",
    },
    notify: {
      title: "Tell me when it opens",
      description:
        "This course isn't live yet. Leave your email and you'll be first to know when enrolment opens.",
      email: "Email address",
      submit: "Notify me",
    },
    success: {
      title: "Check your inbox",
      description:
        "Confirm your email address and your download will be waiting. If it isn't there in a minute, check your spam folder.",
      downloadNow: "Download now",
      done: "Done",
    },
    validation: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "That doesn't look like a valid email address.",
    },
  },

  footer: {
    tagline:
      "Making AI genuinely useful for accounting, finance, audit and GRC — in Arabic first.",
    navTitle: "Navigate",
    connectTitle: "Connect",
    legalTitle: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    rights: "All rights reserved.",
    builtIn: "Built in the GCC.",
  },

  legal: {
    draftNotice:
      "[PLACEHOLDER] This page is a stub. Final legal copy is pending review.",
    privacyBody:
      "Fainance Lab collects your name and email address only when you choose to download a resource or subscribe to the newsletter. We use them to send you the file you asked for and the newsletter you opted into, and nothing else. You can unsubscribe at any time.",
    termsBody:
      "The resources on this site are provided for general professional education. They do not constitute accounting, audit, tax, legal or investment advice, and they do not create a client relationship. Apply professional judgement and your own firm's review standards before relying on any output.",
  },
};

/** Structural contract every locale must satisfy. */
export type Dictionary = typeof en;

export default en;
