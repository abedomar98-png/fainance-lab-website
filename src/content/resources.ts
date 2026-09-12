import type { Resource } from "./types";

/**
 * Free digital products.
 *
 * Every download is gated behind the lead-capture modal (name + email), which
 * POSTs to /api/subscribe before the file unlocks.
 *
 * TODO(abed): resources 2 and 3 are placeholders — titles are provisional and
 * the files are stub PDFs. Swap `file`, `cover` and `status` once the real
 * assets exist, and drop the `note`.
 */
export const resources: Resource[] = [
  {
    slug: "20-actions-claude-excel",
    title: {
      ar: "٢٠ عملية يمكن لـ Claude أن يفعلها في Excel",
      en: "20 Actions Claude Can Do in Excel",
    },
    description: {
      ar: "من كتابة الصيغ وشرحها، إلى تنظيف البيانات وبناء النماذج المالية وجداول الحساسية — عشرون مهمة حقيقية مع طريقة تنفيذ كل واحدة.",
      en: "From writing and explaining formulas to cleaning data, building financial models and running sensitivity tables — twenty real tasks, and how to run each one.",
    },
    cover: "/assets/resources/excel-20-actions-cover.png",
    // TODO(abed): replace with the real deck. The 39 MB conference PPTX in
    // the `المؤتمر` folder appears to be a different presentation, so this
    // ships as a stub rather than shipping the wrong file.
    file: "/assets/resources/20-actions-claude-excel.pdf",
    pillar: "accounting",
    status: "placeholder",
    note: {
      ar: "الملف النهائي قيد الإعداد — الغلاف نهائي.",
      en: "Final file pending — the cover is final.",
    },
  },
  {
    slug: "audit-readiness-checklist",
    title: {
      ar: "قائمة الجاهزية للتدقيق",
      en: "Audit Readiness Checklist",
    },
    description: {
      ar: "ما الذي يجب أن يكون جاهزاً قبل أن يطأ المدقق الخارجي مكتبك — مرتباً حسب دورة العمل، لا حسب رقم المعيار.",
      en: "What needs to be in place before the external auditor walks in — organised by business cycle, not by standard number.",
    },
    cover: "/assets/resources/placeholder-cover.svg",
    file: "/assets/resources/audit-readiness-checklist.pdf",
    pillar: "externalAudit",
    status: "placeholder",
    note: {
      ar: "[عنصر مؤقت] العنوان والملف قيد التأكيد.",
      en: "[PLACEHOLDER] Title and file pending confirmation.",
    },
  },
  {
    slug: "risk-register-starter",
    title: {
      ar: "قالب سجل المخاطر",
      en: "Risk Register Starter Template",
    },
    description: {
      ar: "سجل مخاطر صالح للاستخدام الفعلي: تصنيف، واحتمالية وأثر، ومالك مخاطر، وضوابط مرتبطة — بلا أعمدة لن يملأها أحد.",
      en: "A risk register people actually maintain: taxonomy, likelihood and impact, a named owner, and linked controls — with none of the columns nobody fills in.",
    },
    cover: "/assets/resources/placeholder-cover.svg",
    // TODO(abed): the real deliverable should be .xlsx — this stub is a PDF
    // so we ship a genuinely valid file rather than a fake spreadsheet.
    file: "/assets/resources/risk-register-starter.pdf",
    pillar: "grc",
    status: "placeholder",
    note: {
      ar: "[عنصر مؤقت] العنوان والملف قيد التأكيد.",
      en: "[PLACEHOLDER] Title and file pending confirmation.",
    },
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
