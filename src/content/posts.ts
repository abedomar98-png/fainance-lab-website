import type { Post } from "./types";

/**
 * Blog posts.
 *
 * Both seed posts are infographic-led: the uploaded image IS the content, and
 * the intro paragraphs exist to give it context and something for search
 * engines to read.
 *
 * TODO(abed): every `intro` below is placeholder copy — `introIsPlaceholder`
 * is true, which renders a visible draft banner on the post. Supply or approve
 * the final paragraphs, then flip the flag to false.
 */
export const posts: Post[] = [
  {
    slug: "best-ai-tools-for-accounting-and-finance",
    title: {
      ar: "أفضل أدوات الذكاء الاصطناعي للمحاسبة والمالية",
      en: "Best AI Tools for Accounting & Finance",
    },
    excerpt: {
      ar: "مقارنة عملية بين الأدوات التي يستخدمها المحاسبون والماليون فعلاً، وأين تتفوق كل أداة على غيرها.",
      en: "A practical look at the tools accountants and finance teams actually use — and where each one genuinely pulls ahead.",
    },
    cover: "/assets/resources/ai-tools-cover.png",
    coverAlt: {
      ar: "إنفوجرافيك يقارن أدوات الذكاء الاصطناعي الأنسب لأعمال المحاسبة والمالية",
      en: "Infographic comparing the AI tools best suited to accounting and finance work",
    },
    categories: ["aiTools", "accounting", "finance"],
    date: "2026-08-18",
    intro: [
      {
        ar: "[مسودة — قيد مراجعة عبداللطيف] السؤال الذي يصلني أكثر من غيره ليس «هل أستخدم الذكاء الاصطناعي؟» بل «أيّ أداة أستخدم؟». والإجابة الصادقة أنها تعتمد على المهمة، لا على الأداة الأقوى في التسويق.",
        en: "[DRAFT — pending Abed's review] The question I get most often isn't whether to use AI, it's which tool to use. The honest answer is that it depends on the task, not on whichever tool is marketed hardest.",
      },
      {
        ar: "[مسودة — قيد مراجعة عبداللطيف] في هذا الإنفوجرافيك جمعت الأدوات التي أستخدمها فعلاً في العمل المالي، مع الحالة التي تتفوق فيها كل واحدة: الصياغة، أو التحليل الرقمي، أو قراءة المستندات الطويلة، أو التكامل مع أدوات المؤسسة.",
        en: "[DRAFT — pending Abed's review] The infographic below collects the tools I actually use in finance work, with the case each one wins: drafting, numerical analysis, reading long documents, or integrating with the stack your organisation already owns.",
      },
    ],
    introIsPlaceholder: true,
  },
  {
    slug: "20-things-claude-can-do-in-excel",
    title: {
      ar: "٢٠ عملية يمكن لـ Claude أن يفعلها في Excel",
      en: "20 Things Claude Can Do in Excel",
    },
    excerpt: {
      ar: "من كتابة الصيغ وتنظيف البيانات إلى بناء النماذج المالية ومطابقة الملفات — عشرون مهمة عملية في أربع مجموعات.",
      en: "From writing formulas and cleaning data to building financial models and matching files — twenty practical tasks in four groups.",
    },
    cover: "/assets/resources/excel-20-actions-cover.png",
    coverAlt: {
      ar: "إنفوجرافيك يعرض عشرين عملية يمكن لـ Claude تنفيذها في Excel موزعة على أربع مجموعات",
      en: "Infographic listing twenty actions Claude can perform in Excel, grouped into four categories",
    },
    categories: ["aiTools", "accounting", "templates"],
    date: "2026-09-02",
    intro: [
      {
        ar: "[مسودة — قيد مراجعة عبداللطيف] معظم من يجرب الذكاء الاصطناعي مع Excel يتوقف عند كتابة صيغة أو اثنتين، ثم يعود إلى طريقته القديمة. المشكلة ليست في الأداة، بل في أننا لا نعرف حدود ما تستطيع فعله.",
        en: "[DRAFT — pending Abed's review] Most people who try AI with Excel stop after a formula or two and go back to their old method. The problem isn't the tool — it's that we don't know the edge of what it can do.",
      },
      {
        ar: "[مسودة — قيد مراجعة عبداللطيف] رتبت هنا عشرين عملية في أربع مجموعات: العمل على البيانات والصيغ، والتحليل والرؤى، والكفاءة والتنظيم، والأتمتة والتحويل. كل واحدة منها مهمة حقيقية صادفتها في عمل مالي، لا مثالاً تعليمياً.",
        en: "[DRAFT — pending Abed's review] I've grouped twenty actions into four sets: working with data and formulas, analysis and insight, efficiency and organisation, and automation and conversion. Each one is a real task from real finance work, not a teaching example.",
      },
    ],
    introIsPlaceholder: true,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);
