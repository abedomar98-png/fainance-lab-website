import type { Course } from "./types";

/**
 * Planned courses. Phase 1 has nothing for sale — every card is
 * `coming-soon` and its CTA opens the "Notify Me" modal. No prices, no
 * ratings, no payment logic anywhere on this page.
 *
 * TODO(abed): these titles are drawn from the content pillars and are
 * provisional. Confirm or replace before launch.
 */
export const courses: Course[] = [
  {
    slug: "ai-for-month-end-close",
    title: {
      ar: "الذكاء الاصطناعي في الإقفال الشهري",
      en: "AI for Month-End Close",
    },
    description: {
      ar: "أعد بناء دورة الإقفال بحيث تتولى الأداة التسويات والمطابقات والمسودات الأولى، ويتولى فريقك الحكم المهني.",
      en: "Rebuild the close so the tool handles reconciliations, matching and first drafts — and your team handles the judgement.",
    },
    pillar: "accounting",
    status: "coming-soon",
  },
  {
    slug: "internal-audit-with-ai",
    title: {
      ar: "التدقيق الداخلي بالذكاء الاصطناعي",
      en: "Internal Audit with AI",
    },
    description: {
      ar: "من التخطيط القائم على المخاطر إلى العمل الميداني والتقرير النهائي، مع إسناد القراءة الثقيلة وتحليل الاستثناءات للأداة.",
      en: "From risk-based planning through fieldwork to the final report, with the heavy reading and exception analysis handed off.",
    },
    pillar: "internalAudit",
    status: "coming-soon",
  },
  {
    slug: "grc-fundamentals",
    title: {
      ar: "أساسيات الحوكمة والمخاطر والامتثال",
      en: "GRC Fundamentals",
    },
    description: {
      ar: "بناء إطار حوكمة ومخاطر وامتثال يُستخدم فعلاً: أدوار واضحة، وضوابط قابلة للاختبار، وسجل مخاطر حي.",
      en: "Build a GRC framework that gets used: clear roles, testable controls, and a risk register that stays alive.",
    },
    pillar: "grc",
    status: "coming-soon",
  },
  {
    slug: "financial-analysis-with-ai",
    title: {
      ar: "التحليل المالي بالذكاء الاصطناعي",
      en: "Financial Analysis with AI",
    },
    description: {
      ar: "تنبؤ وتحليل تباينات وتقارير إدارية تجيب على السؤال المطروح فعلاً، بصيغ تستطيع تتبعها والدفاع عنها.",
      en: "Forecasting, variance analysis and management reporting that answers the real question — in formulas you can trace and defend.",
    },
    pillar: "finance",
    status: "coming-soon",
  },
];
