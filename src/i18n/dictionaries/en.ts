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
        "25+ years in finance, audit and governance across the GCC, the Levant and the US — now focused on applying AI responsibly to real finance workflows.",
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
    faq: {
      title: "FAQ — Fainance Lab",
      description: "Answers to common questions about Fainance Lab: who it's for, what it costs, and how to use AI safely at work."
    },
    glossary: {
      title: "Glossary — Fainance Lab",
      description: "AI, finance, audit, GRC and Claude terms in English with their Arabic meaning — searchable in either language."
    },
    videos: {
      title: "Videos — Fainance Lab",
      description: "Curated videos on AI for accounting, finance, audit and GRC, each with an original Arabic summary."
    },
    events: {
      title: "Events — Fainance Lab",
      description: "Talks, forums and webinars where Fainance Lab has presented on AI for finance professionals."
    },
  },

  nav: {
    home: "Home",
    about: "About Me",
    courses: "Courses",
    resources: "Resources",
    blog: "Blog",
    contact: "Contact",
    videos: "Videos",
    events: "Events",
    faq: "FAQ",
    glossary: "Glossary",
    more: "More",
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
      title: "AI-powered finance, made practical",
      titleAccent: "made practical",
      story:
        "You've heard AI will change accounting and finance forever — but no one told you how, in your language, for your actual job. Fainance closes that gap: practical AI skills for accounting, finance, audit, and GRC — free content, real templates, and guidance from someone who's actually run the numbers. Start with one pillar. See what changes this week.",
      cta: "Explore Free Resources",
      secondaryCta: "About Me",
      stats: [
        // From the CV: "over 25 years" (its own wording), the eight territories
        // it lists, and the site's five content pillars.
        { value: "25+", label: "Years in finance & audit" },
        { value: "5", label: "Practice areas covered" },
        { value: "8", label: "Countries of exposure" },
      ],
    },
    trustedBy: {
      // Section stays hidden until Abed confirms which logos may be used.
      eyebrow: "Experience across",
      title: "Trusted by finance teams across the region",
    },
    aboutFainance: {
      eyebrow: "About Fainance",
      title: "AI + Finance = Growth",
      visionLabel: "Our vision",
      vision: "Our vision is a finance and accounting profession where every professional — from first-year associates to board members — has the AI fluency to work faster, sharper, and with more confidence. We want to enable the mass community of finance and accounting professionals across the Arab world to achieve real acceleration and excellence in their daily work, not isolated pockets of adoption.",
      missionLabel: "Our mission",
      mission: "Fainance's name and mark say it plainly: AI + Finance = Growth. Our mission is to make that equation real — turning AI from an abstract trend into a concrete daily advantage for accounting, finance, audit, and governance professionals, starting in Arabic.",
      videoLabel: "About Fainance",
      videoPending: "Video coming soon",
      logoAnatomyAlt: "The anatomy of the Fainance logo: AI + Finance = Growth",
      logoAnatomyPending: "Logo anatomy graphic — coming soon"
    },
    why: {
      eyebrow: "Why Fainance",
      title: "Fluent in both languages: accounting and AI",
      items: [
        {
          label: "Mission",
          text: "Make AI genuinely useful for everyday finance work — in Arabic and English."
        },
        {
          label: "Vision",
          text: "A finance profession that grows — faster, smarter, upward."
        },
        {
          label: "Promise",
          text: "Clarity over hype. Every insight is practical."
        },
        {
          label: "Positioning",
          text: "For finance professionals and business owners who feel AI is either hype or a threat, Fainance is the trusted guide that makes it a practical, everyday advantage — because it speaks both languages fluently: accounting and AI."
        }
      ],
      stats: [
        {
          figures: [
            {
              value: "88%",
              label: "believe AI will be the most transformative trend in accounting and finance over the next 12–24 months"
            },
            {
              value: "8%",
              label: "feel their organisation is \"very well prepared\" for it"
            }
          ],
          source: "AICPA & CIMA — survey of 1,446 finance leaders, Aug–Sep 2025"
        },
        {
          figures: [
            {
              value: "52% → 29%",
              label: "GCC organisations not using GenAI in tax, finance and legal functions, 2024 → 2025"
            }
          ],
          source: "Deloitte — GenAI Adoption in the GCC 2026 (Saudi Arabia, UAE, Qatar, Kuwait)"
        }
      ]
    },
    audience: {
      eyebrow: "Who it's for",
      title: "The full finance function",
      subtitle: "Each role wants the same thing said differently.",
      items: [
        {
          id: "apar",
          title: "AP / AR & Payroll Accountants",
          role: "Process invoices, run payroll, reconcile ledgers daily.",
          quote: "Show me exactly which task AI takes off my plate — and prove it won't break the numbers."
        },
        {
          id: "cfo",
          title: "CFOs & Finance Leaders",
          role: "Own the numbers, the forecast, and the board's trust.",
          quote: "Faster closes and cleaner forecasts — without adding headcount or risk."
        },
        {
          id: "audit",
          title: "Auditors & GRC Professionals",
          role: "Test controls, assess risk, sign off with evidence.",
          quote: "If AI touches the audit trail, I need to see how it's governed and logged."
        },
        {
          id: "fpa",
          title: "FP&A Officers",
          role: "Model scenarios, track variance, brief leadership.",
          quote: "Give me hours back on data prep so I can spend them on analysis."
        },
        {
          id: "controller",
          title: "Controllers",
          role: "Guard accuracy, close the books, keep policy tight.",
          quote: "Automation is welcome — as long as it is auditable and consistent."
        },
        {
          id: "board",
          title: "Board Members",
          role: "Read the signals, ask the hard questions, steer strategy.",
          quote: "I want clarity and confidence, not a demo of the latest hype."
        },
        {
          id: "entrepreneur",
          title: "Entrepreneurs",
          role: "Wear every hat; finance is one of many.",
          quote: "I'm wearing every hat — show me the one practical AI shortcut that actually saves me time this week."
        }
      ],
      stat: {
        figures: [
          {
            value: "61%",
            label: "of finance managers name AI skills as the #1 skillset they're developing for their next career step"
          },
          {
            value: "30%",
            label: "rate AI for finance as a skill new professionals should bring on day one"
          }
        ],
        framing: "New graduates bring fresher AI fluency; working professionals bring domain judgment. Combining both is the real advantage.",
        source: "CFA Institute — survey of 500 UK finance managers, July 2026"
      }
    },
    pillars: {
      eyebrow: "What you'll learn",
      title: "Five practice areas, one practical lens",
      subtitle:
        "Every resource, course and post on this site sits in one of these five pillars — and starts from a task you already have on your desk.",
      items: {
        accounting: {
          title: "Accounting",
          description:
            "Write, explain and debug Excel formulas with Claude and Copilot, and know which tool fits which job. Run everyday tasks like three-way matching and invoice matching with prompts built on the five-step Manhaj framework — and check the output before it touches the ledger.",
        },
        finance: {
          title: "Finance",
          description:
            "Turn a budget-vs-actual table into management commentary you can defend, and build models with scenario and sensitivity analysis in a fraction of the time. Learn the daily AI tasks that fit FP&A, controllers and CFOs specifically — not generic tips.",
        },
        externalAudit: {
          title: "External Audit",
          description:
            "Use AI to read long documents and pull out the evidence you need, and meet the AI tools already built for audit work. Learn where AI speeds up testing and documentation — and where judgment has to stay with you.",
        },
        internalAudit: {
          title: "Internal Audit",
          description:
            "Review unusual journal entries before the close: what to look for, how to ask Claude to surface them, and how to document what you found. Plan risk-based work with AI doing the heavy reading, while the conclusions stay yours.",
        },
        grc: {
          title: "GRC",
          description:
            "Classify company data into four sensitivity levels before any of it reaches an AI tool, and learn the five questions to ask IT first. Compare how Copilot, Gemini, Claude and ChatGPT handle company data, so your AI use is governed, not improvised.",
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
      "I'm Abed-Latif Al-Omar. For more than 25 years I've worked as a finance, audit and governance executive across Kuwait, Saudi Arabia, Jordan, Lebanon, the UAE, Oman, Bahrain and the United States — today as a CFO in Kuwait and as a GRC consultant with Deloitte in Saudi Arabia. The month-end close, the audit file and the risk register have been my responsibility, not a case study.",
    body: [
      "I started in public accounting in Texas, qualified as a CPA there in 2001, and audited a NYSE-listed oil and gas company at KPMG. Since then I have built an internal audit department from scratch, served as Chief Audit Executive, led finance turnarounds as a general manager, and sat as CFO — in real estate, contracting, F&B, retail, mining and the public sector.",
      "I also teach: I have instructed candidates preparing for the CPA, CFA, CIA and CCGO certifications. And I use these tools on my own desk — AI-driven financial modelling for scenario analysis, sensitivity testing, driver-based forecasting and capex planning sits inside my current CFO role, not in a slide deck.",
      "Responsibly is the operative word. These tools are extraordinary at drafting, reading and reconciling, and genuinely dangerous when nobody owns the review step. Knowing which is which takes domain judgement, not prompt tricks.",
      "Fainance Lab exists to close that gap — deep domain credibility on one side, practical AI fluency on the other, delivered in Arabic first. Everything here starts from a task you already own and ends with something you can hand to your auditor.",
    ],
    highlightsTitle: "In brief",
    highlights: [
      "25+ years across accounting, finance, external audit, internal audit and governance",
      "CPA (Texas Board of Public Accountancy), MBA, CCGO",
      "Big 4: assurance at KPMG Houston; GRC consulting with Deloitte",
      "CFO, Chief Audit Executive and turnaround general manager roles",
      "Instructor for CPA, CFA, CIA and CCGO candidates",
      "Worked across Kuwait, Saudi Arabia, Jordan, Lebanon, the UAE, Oman, Bahrain and the US",
      "Uses AI-driven financial modelling for forecasting, scenarios and capex planning",
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

  filter: {
    search: "Search…",
    all: "All",
    noResults: "Nothing matches your search.",
    clear: "Clear search",
    results: "results"
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    subtitle: "Everything people usually ask before they start."
  },

  glossary: {
    eyebrow: "Glossary",
    title: "The terms, in both languages.",
    subtitle: "AI, finance, audit, GRC and Claude vocabulary — with its Arabic meaning. Search in either language.",
    searchPlaceholder: "Search a term in English or Arabic…",
    colTerm: "Term",
    colMeaning: "Arabic meaning",
    groups: {
      ai: "AI & general",
      finance: "Finance, audit & GRC",
      claude: "Claude",
      credential: "Credentials"
    }
  },

  videos: {
    eyebrow: "Videos",
    title: "Watch, with an Arabic guide alongside.",
    subtitle: "Hand-picked videos on AI for finance work. Every one comes with an original Arabic summary — and synced Arabic captions where available.",
    searchPlaceholder: "Search videos…",
    empty: "The first videos are being selected. Check back soon.",
    watch: "Watch",
    by: "By",
    summaryLabel: "Arabic summary",
    captionsLabel: "Arabic captions",
    close: "Close video"
  },

  events: {
    eyebrow: "Events",
    title: "Talks, forums and webinars.",
    subtitle: "Where Fainance has taken the conversation about AI in finance — in person and online.",
    searchPlaceholder: "Search events…",
    empty: "No events yet.",
    past: "Past event",
    upcoming: "Upcoming",
    view: "View event",
    back: "Back to all events",
    organizer: "Organiser",
    session: "The session",
    outlineTitle: "What the talk covers",
    slidesTitle: "From the slides",
    downloadsTitle: "Take it with you",
    downloadsIntro: "Register once to unlock both files — the full presentation as delivered, and the session self-assessment.",
    register: "Register to download",
    download: "Download",
    enlarge: "Enlarge slide"
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
      filesTitle: "Your downloads",
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
    termsDataSecurity: "Before applying any Fainance materials to your company's data, check your own company's data security and AI usage policy first. Fainance is not responsible for any breach resulting from how you apply its materials.",
    termsBody:
      "The resources on this site are provided for general professional education. They do not constitute accounting, audit, tax, legal or investment advice, and they do not create a client relationship. Apply professional judgement and your own firm's review standards before relying on any output.",
  },
};

/** Structural contract every locale must satisfy. */
export type Dictionary = typeof en;

export default en;
