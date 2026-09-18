import type { Post } from "./types";

/**
 * Blog posts, seeded from the published @fainance.lab Instagram carousels.
 *
 * Every entry is real, published Fainance content. Titles come from the
 * on-slide headlines and the intro paragraphs are the official captions from
 * `Carousel/Fainance_Instagram_Captions_Hashtags.txt`, used verbatim — nothing
 * here is written or embellished.
 *
 * Dates are the export dates of each carousel's artwork, since the source
 * material records no publication dates.
 *
 * Covers are the hook slide of each carousel, in /public/assets/blog.
 *
 * Deliberately not seeded:
 * - Carousel 2 and Carousel 6 — the same messages as posts 1 and 12 with
 *   English artwork. Each post here already renders in both locales, so
 *   seeding the twins would duplicate the topic.
 * - Carousel 13 — part one of a two-part set; held until part two exists.
 */
export const posts: Post[] = [
  {
    slug: "arabic-ai-content-gap",
    title: {
      ar: "لا يوجد محتوى عربي متخصص في الذكاء الاصطناعي للمحاسبة والمالية",
      en: "There's Almost No Arabic Content on AI for Accounting & Finance",
    },
    excerpt: {
      ar: "محتوى عملي بالعربية يشرح استخدام أدوات مثل Claude وCopilot في العمل المحاسبي والمالي اليومي.",
      en: "Practical Arabic content on using tools like Claude and Copilot in daily accounting and finance work.",
    },
    cover: "/assets/blog/arabic-ai-content-gap.png",
    coverAlt: {
      ar: "شريحة تعريفية بحساب Fainance ورسالته في تقديم محتوى عربي عن الذكاء الاصطناعي للمحاسبة والمالية",
      en: "Fainance brand introduction slide on the gap in Arabic AI content for accounting and finance",
    },
    categories: ["aiTools", "accounting", "finance"],
    date: "2026-08-21",
    intro: [
      {
        ar: "هل تعاني من غياب محتوى عربي متخصص في الذكاء الاصطناعي للمحاسبة والمالية؟ هذا الحساب جاء ليغيّر ذلك.",
        en: "Is there almost no Arabic content on AI for accounting and finance? This account is here to change that.",
      },
      {
        ar: "نقدّم محتوى عمليًا بالعربية يشرح كيفية استخدام أدوات مثل Claude وCopilot في العمل المحاسبي والمالي اليومي، بخطوات واضحة وبلا تعقيد.",
        en: "We share practical Arabic content on using tools like Claude and Copilot in daily accounting and finance work, with clear, simple steps.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "choosing-an-ai-tool",
    title: {
      ar: "مشتت في اختيار أداة الذكاء الاصطناعي الأنسب لأعمالك المحاسبية والمالية؟",
      en: "Confused About Which AI Tool Fits Your Finance Work?",
    },
    excerpt: {
      ar: "مقارنة عملية بين Claude وChatGPT وCopilot وGemini، لتختار الأداة الأنسب لطبيعة عملك لا الأكثر شهرة.",
      en: "A practical comparison of Claude, ChatGPT, Copilot and Gemini — so you choose what fits your work, not what's most popular.",
    },
    cover: "/assets/blog/choosing-an-ai-tool.png",
    coverAlt: {
      ar: "شريحة تقارن بين أدوات الذكاء الاصطناعي الأنسب للأعمال المحاسبية والمالية",
      en: "Slide comparing the AI tools best suited to accounting and finance work",
    },
    categories: ["aiTools", "tips"],
    date: "2026-08-21",
    intro: [
      {
        ar: "هل أنت مشتّت في اختيار أداة الذكاء الاصطناعي الأنسب لأعمالك المحاسبية والمالية؟ لنكتشف الإجابة معًا.",
        en: "Confused about which AI tool best fits your accounting and finance work? Let's find the answer.",
      },
      {
        ar: "يقارن هذا المنشور بين Claude وChatGPT وCopilot وGemini بشكل عملي، لتختار الأداة الأنسب لطبيعة عملك، لا الأكثر شهرة.",
        en: "This post compares Claude, ChatGPT, Copilot, and Gemini practically, so you choose what fits your work, not just what's most popular.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "claude-features-part-1",
    title: {
      ar: "ست ميزات أساسية في Claude — الجزء الأول",
      en: "Six Core Claude Features — Part One",
    },
    excerpt: {
      ar: "المحادثة، وCowork، والأكواد، والمشاريع، والتصميم، والذاكرة التي تحفظ سياق عملك بين المحادثات.",
      en: "Chat, Cowork, Code, Projects, Design, and Memory — which keeps context across your conversations.",
    },
    cover: "/assets/blog/claude-features-part-1.png",
    coverAlt: {
      ar: "شريحة افتتاحية لميزات Claude الأساسية، الجزء الأول",
      en: "Opening slide for Claude's core features, part one",
    },
    categories: ["aiTools", "tips"],
    date: "2026-08-25",
    intro: [
      {
        ar: "كلود Claude أكثر من مجرد محادثة تجيب عن أسئلتك. تعرّف في هذا المنشور، الجزء الأول، على ست ميزات أساسية فيه: المحادثة (Chat)، وCowork لتنظيم المهام، والأكواد (Code)، والمشاريع (Projects)، والتصميم (Design)، والذاكرة (Memory) التي تحفظ سياق عملك بين المحادثات.",
        en: "Claude is more than a chat that answers your questions. In this first part, discover six core features: Chat, Cowork for organizing tasks, Code, Projects, Design, and Memory, which keeps context across your conversations.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "claude-features-part-2",
    title: {
      ar: "ميزات Claude — الجزء الثاني",
      en: "Claude's Features — Part Two",
    },
    excerpt: {
      ar: "التعليمات والسياق، والمخرجات، والمهام المجدولة، والإضافات، والمهارات، والموصلات.",
      en: "Instructions & Context, Artifacts, Scheduled Tasks, Plugins, Skills, and Connectors.",
    },
    cover: "/assets/blog/claude-features-part-2.png",
    coverAlt: {
      ar: "شريحة افتتاحية لميزات Claude، الجزء الثاني",
      en: "Opening slide for Claude's features, part two",
    },
    categories: ["aiTools", "tips"],
    date: "2026-08-25",
    intro: [
      {
        ar: "نُكمل من حيث توقفنا. في الجزء الثاني من ميزات Claude: التعليمات والسياق (Instructions & Context)، والمخرجات (Artifacts)، والمهام المجدولة (Scheduled Tasks)، والإضافات (Plugins)، والمهارات (Skills)، والموصلات (Connectors).",
        en: "Picking up where we left off. Part two of Claude's features: Instructions & Context, Artifacts, Scheduled Tasks, Plugins, Skills, and Connectors.",
      },
      {
        ar: "إن فاتك الجزء الأول فراجعه على صفحتنا.",
        en: "If you missed part one, check our page.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "manhaj-prompt-framework",
    title: {
      ar: "إطار «منهج»: خمس خطوات لصياغة طلبات دقيقة",
      en: "The \"Manhaj\" Framework: Five Steps to Precise Prompts",
    },
    excerpt: {
      ar: "الهوية، والموجز، والمهمة، والتعليمات، والصيغة — مطبّقة على مثال حقيقي من المطابقة الثلاثية.",
      en: "Identity, Brief, Task, Instructions and Format — applied to a real three-way matching example.",
    },
    cover: "/assets/blog/manhaj-prompt-framework.png",
    coverAlt: {
      ar: "شريحة افتتاحية لإطار «منهج» لصياغة أوامر الذكاء الاصطناعي",
      en: "Opening slide for the Manhaj prompt framework",
    },
    categories: ["aiTools", "accounting", "tips"],
    date: "2026-08-29",
    intro: [
      {
        ar: "غالبًا ما يتوقف من يجرّبون الذكاء الاصطناعي في عملهم المحاسبي بعد أول إجابة غير دقيقة، والسبب في الغالب طريقة صياغة الطلب (Prompt) لا الأداة نفسها.",
        en: "Most people who try AI for accounting work stop after one inaccurate answer, and the reason is usually how the prompt is written, not the tool itself.",
      },
      {
        ar: "نقدّم في هذا المنشور إطار «منهج»، وهو خمس خطوات لصياغة طلبات دقيقة: الهوية (Identity)، والموجز (Brief)، والمهمة (Task)، والتعليمات (Instructions)، والصيغة (Format)، مطبّقًا على مثال حقيقي من عملية المطابقة الثلاثية (Three-Way Matching).",
        en: "This post introduces the \"Manhaj\" framework: five steps for precise prompts, Identity, Brief, Task, Instructions, and Format, applied to a real three-way matching example.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "best-ai-tools-for-accounting-and-finance",
    title: {
      ar: "أفضل أدوات الذكاء الاصطناعي للمحاسبة والمالية",
      en: "The Best AI Tools for Accounting & Finance",
    },
    excerpt: {
      ar: "أدوات عالمية وعربية مرتّبة بحسب الاستخدام: التدقيق، وإدارة المصروفات، والحسابات الدائنة والمدينة، وأتمتة المحاسبة.",
      en: "Global and Arabic tools organised by use case: audit, expense management, accounts payable and receivable, and accounting automation.",
    },
    cover: "/assets/resources/ai-tools-cover.png",
    coverAlt: {
      ar: "إنفوجرافيك يقارن أدوات الذكاء الاصطناعي الأنسب لأعمال المحاسبة والمالية",
      en: "Infographic comparing the AI tools best suited to accounting and finance work",
    },
    categories: ["aiTools", "accounting", "finance"],
    date: "2026-08-31",
    intro: [
      {
        ar: "أفضل أدوات الذكاء الاصطناعي للمحاسبة والمالية: أدوات برمجية عالمية وعربية مرتّبة بحسب الاستخدام: التدقيق، وإدارة المصروفات، والحسابات الدائنة، والحسابات المدينة، وأتمتة المحاسبة.",
        en: "The best AI tools for accounting and finance: global and Arabic tools organized by use case, audit, expense management, accounts payable, accounts receivable, and accounting automation.",
      },
      {
        ar: "احفظ هذا المنشور كمرجع تعود إليه عند الحاجة إلى أداة جديدة.",
        en: "Save this post as a reference for the next time you need a new tool.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "arabic-text-direction-claude",
    title: {
      ar: "حل مشكلة الكتابة والعرض باللغة العربية في Claude",
      en: "Fixing Arabic Text Direction in Claude",
    },
    excerpt: {
      ar: "الحل خطوة بخطوة في Claude AI وتطبيق Claude Desktop، لعرض تقاريرك بالعربية بشكل صحيح من المرة الأولى.",
      en: "The fix, step by step, in Claude AI and the Claude Desktop app — so Arabic reports display correctly first time.",
    },
    cover: "/assets/blog/arabic-text-direction-claude.png",
    coverAlt: {
      ar: "شريحة افتتاحية لحل مشكلة اتجاه النص العربي في Claude",
      en: "Opening slide for fixing Arabic text direction in Claude",
    },
    categories: ["aiTools", "tips"],
    date: "2026-09-01",
    intro: [
      {
        ar: "هل واجهت مشكلة انعكاس اتجاه النص أو اضطرابه عند الكتابة بالعربية في Claude؟ هذه مشكلة شائعة بين المحاسبين والماليين في المنطقة.",
        en: "Have you faced reversed or broken Arabic text direction while writing in Claude? It's a common issue for finance and accounting professionals in the region.",
      },
      {
        ar: "يوضّح هذا المنشور الحل خطوة بخطوة، في Claude AI وفي تطبيق Claude Desktop، لعرض تقاريرك بالعربية بشكل صحيح من المرة الأولى.",
        en: "This post walks through the fix step by step, in Claude AI and the Claude Desktop app, so your Arabic reports display correctly the first time.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "claude-vs-copilot-excel",
    title: {
      ar: "أفضل المهنيين لا يختارون بين Claude وCopilot في Excel",
      en: "The Best Professionals Don't Choose Between Claude and Copilot in Excel",
    },
    excerpt: {
      ar: "مقارنة في أربعة محاور: بناء النماذج والمعادلات، وعمق التحليل، والتقارير المالية، والتكامل المؤسسي والحوكمة.",
      en: "Compared across four areas: modelling and formulas, analysis depth, financial reporting, and enterprise integration and governance.",
    },
    cover: "/assets/blog/claude-vs-copilot-excel.png",
    coverAlt: {
      ar: "إنفوجرافيك يقارن بين Claude وCopilot في Excel عبر أربعة محاور",
      en: "Infographic comparing Claude and Copilot in Excel across four areas",
    },
    categories: ["aiTools", "accounting", "tips"],
    date: "2026-09-02",
    intro: [
      {
        ar: "أفضل المهنيين لا يختارون بين Claude وCopilot في Excel، بل يستخدمون الأداتين معًا بذكاء.",
        en: "The best professionals don't choose between Claude and Copilot in Excel, they use both together, intelligently.",
      },
      {
        ar: "يقارن هذا المنشور بينهما في أربعة محاور: بناء النماذج والمعادلات، وعمق التحليل والسياق، والتقارير والتعليقات المالية، والتكامل المؤسسي والحوكمة.",
        en: "This post compares them across four areas: modeling and formulas, analysis depth and context, financial reporting and commentary, and enterprise integration and governance.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "how-to-use-microsoft-copilot",
    title: {
      ar: "كيفية استخدام Microsoft Copilot",
      en: "How to Use Microsoft Copilot",
    },
    excerpt: {
      ar: "ثماني طرق تطبّقها في عملك المحاسبي والمالي، مع نصيحة احترافية لكل استخدام.",
      en: "Eight ways to apply it in your accounting and finance work, each with a pro tip.",
    },
    cover: "/assets/blog/how-to-use-copilot.png",
    coverAlt: {
      ar: "إنفوجرافيك يعرض ثماني طرق لاستخدام Microsoft Copilot في العمل المالي",
      en: "Infographic showing eight ways to use Microsoft Copilot in finance work",
    },
    categories: ["aiTools", "tips"],
    date: "2026-09-02",
    intro: [
      {
        ar: "كيفية استخدام Microsoft Copilot: ثماني طرق تطبّقها في عملك المحاسبي والمالي: الدردشة، والمستندات، والعروض التقديمية، وتحليل البيانات، والبريد الإلكتروني، وTeams، وتكامل Microsoft 365، وإنشاء الصور، مع نصيحة احترافية لكل استخدام.",
        en: "How to use Microsoft Copilot: eight ways to apply it in your accounting and finance work, Chat, Documents, Presentations, Data Analysis, Email, Teams, Microsoft 365 integration, and Image creation, each with a pro tip.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "daily-tasks-in-claude",
    title: {
      ar: "المهام اليومية في Claude — بحسب دورك المالي",
      en: "Daily Tasks in Claude — by Finance Role",
    },
    excerpt: {
      ar: "المهام اليومية بحسب الدور: الحسابات الدائنة والمدينة والرواتب، والتدقيق والحوكمة، والتخطيط المالي، والرقابة المالية، والمدير المالي، ومجلس الإدارة.",
      en: "Daily tasks by role: AP, AR and payroll, audit and governance, FP&A, financial control, CFO, SME owners and board members.",
    },
    cover: "/assets/blog/daily-tasks-in-claude.png",
    coverAlt: {
      ar: "شريحة افتتاحية للمهام اليومية في Claude بحسب الدور الوظيفي",
      en: "Opening slide for daily tasks in Claude by finance role",
    },
    categories: ["aiTools", "accounting", "finance", "grc"],
    date: "2026-09-04",
    intro: [
      {
        ar: "المهام اليومية في Claude: الذكاء الاصطناعي لا يخدم جميع الأدوار بالطريقة نفسها، فلكل دور في القسم المالي مهامه اليومية التي يسهّلها Claude.",
        en: "Daily tasks in Claude: AI doesn't serve every role the same way, each role in the finance function has daily tasks Claude can simplify.",
      },
      {
        ar: "يستعرض هذا المنشور المهام اليومية بحسب الدور: الحسابات الدائنة والمدينة والرواتب، والتدقيق والحوكمة، والتخطيط والمتابعة المالية، والرقابة المالية، والمدير المالي، وصاحب المنشأة الصغيرة، وعضو مجلس الإدارة.",
        en: "This post covers daily tasks by role: accounts payable, receivable and payroll, audit and governance, FP&A, financial control, CFO, SME owners, and board members.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "which-ai-tool-to-trust-with-company-data",
    title: {
      ar: "أي أدوات الذكاء الاصطناعي يمكن الوثوق بها في مشاركة بيانات شركتك؟",
      en: "Which AI Tool Can You Trust With Your Company's Data?",
    },
    excerpt: {
      ar: "مقارنة عملية بين Copilot وGemini وClaude وChatGPT، لتعرف الأداة المناسبة لبياناتك وأيها تتجنّب.",
      en: "A practical comparison of Copilot, Gemini, Claude and ChatGPT — which suits your data, and which to avoid.",
    },
    cover: "/assets/blog/which-ai-tool-to-trust.png",
    coverAlt: {
      ar: "شريحة افتتاحية لمقارنة أدوات الذكاء الاصطناعي من حيث أمان بيانات الشركة",
      en: "Opening slide comparing AI tools on company data safety",
    },
    categories: ["aiTools", "grc", "tips"],
    date: "2026-09-07",
    intro: [
      {
        ar: "في الجزء الأول تناولنا مستويات حساسية البيانات، والسؤال الآن: أي أداة ذكاء اصطناعي يمكن الوثوق بها أكثر لمشاركة بيانات شركتك؟",
        en: "Part one covered your data's sensitivity levels. Now the question is: which AI tool can be trusted most with your company's data?",
      },
      {
        ar: "يقارن هذا المنشور بين Copilot وGemini وClaude وChatGPT عمليًا، لتعرف الأداة المناسبة لبياناتك العامة، والأداة التي ينبغي تجنّبها مع البيانات السرية أو شديدة الحساسية.",
        en: "This post compares Copilot, Gemini, Claude, and ChatGPT practically, so you know which tool suits your public data and which to avoid with confidential or highly sensitive data.",
      },
    ],
    introIsPlaceholder: false,
  },
  {
    slug: "20-things-claude-can-do-in-excel",
    title: {
      ar: "٢٠ عملية يمكن لـ Claude أن يفعلها في Excel",
      en: "20 Things Claude Can Do in Excel",
    },
    excerpt: {
      ar: "من كتابة المعادلات وتفسيرها، إلى تنظيف البيانات وبناء النماذج المالية واكتشاف الأخطاء قبل وصولها إلى مديرك.",
      en: "From writing and explaining formulas to cleaning data, building models and catching errors before they reach your manager.",
    },
    cover: "/assets/resources/excel-20-actions-cover.png",
    coverAlt: {
      ar: "إنفوجرافيك يعرض عشرين عملية يمكن لـ Claude تنفيذها في Excel موزعة على أربع مجموعات",
      en: "Infographic listing twenty actions Claude can perform in Excel, grouped into four categories",
    },
    categories: ["aiTools", "accounting", "templates"],
    date: "2026-09-08",
    intro: [
      {
        ar: "Excel لا يزال الأداة الأساسية في معظم العمل المحاسبي والمالي، وClaude يختصر كثيرًا من خطواته: من كتابة المعادلات المعقّدة وتفسيرها، إلى تنظيف البيانات الأولية، وبناء نماذج مالية كاملة، واكتشاف الأخطاء والانحرافات قبل وصولها إلى مديرك.",
        en: "Excel is still the core tool for most accounting and finance work, and Claude cuts down many of its steps: writing and explaining complex formulas, cleaning raw data, building full financial models, and catching errors and variances before they reach your manager.",
      },
      {
        ar: "نستعرض في هذا المنشور أبرز استخداماته العملية في العمل اليومي.",
        en: "This post covers its most practical uses in daily work.",
      },
    ],
    introIsPlaceholder: false,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);
