import type { Resource } from "./types";

/**
 * Free digital products.
 *
 * Every download is gated behind the lead-capture modal (name + email), which
 * POSTs to /api/subscribe before the file unlocks.
 *
 * The three task guides are real, finished Fainance material from
 * `Fainance Learning Materials/`. Their contents are Arabic; the English
 * titles and descriptions here describe them for English-speaking visitors.
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
    // TODO(abed): still a stub — the finished deck does not exist yet. The
    // cover artwork is final.
    file: "/assets/resources/20-actions-claude-excel.pdf",
    pillar: "accounting",
    status: "placeholder",
    note: {
      ar: "الملف النهائي قيد الإعداد — الغلاف نهائي.",
      en: "Final file pending — the cover is final.",
    },
  },
  {
    slug: "ap-ar-invoice-matching-claude",
    title: {
      ar: "دليل محاسب الذمم الدائنة والمدينة — مطابقة فواتير الموردين بـ Claude",
      en: "AP/AR Accountant's Guide — Matching Supplier Invoices with Claude",
    },
    description: {
      ar: "دليل تطبيقي خطوة بخطوة لمطابقة فاتورة المورد بأمر الشراء وإشعار الاستلام باستخدام Claude، مع الأوامر الجاهزة وطريقة مراجعة المخرجات.",
      en: "A step-by-step guide to matching a supplier invoice against the purchase order and goods receipt using Claude — with ready prompts and how to review the output. Guide content is in Arabic.",
    },
    cover: "/assets/resources/placeholder-cover.svg",
    file: "/assets/resources/ap-ar-invoice-matching-claude.pdf",
    pillar: "accounting",
    status: "ready",
    note: {
      ar: "الدليل بالعربية — صورة الغلاف قيد الإعداد.",
      en: "Guide is in Arabic — cover artwork pending.",
    },
  },
  {
    slug: "controller-unusual-journal-entries-claude",
    title: {
      ar: "دليل المراقب المالي — مراجعة القيود اليومية غير المعتادة بـ Claude",
      en: "Financial Controller's Guide — Reviewing Unusual Journal Entries with Claude",
    },
    description: {
      ar: "كيف تفحص القيود اليومية غير المعتادة قبل الإقفال: ما الذي تبحث عنه، وكيف تسأل Claude عنه، وكيف توثّق ما وجدته.",
      en: "How to review unusual journal entries before the close: what to look for, how to ask Claude for it, and how to document what you found. Guide content is in Arabic.",
    },
    cover: "/assets/resources/placeholder-cover.svg",
    // TODO(abed): Word file — export to PDF when convenient.
    file: "/assets/resources/controller-unusual-journal-entries-claude.docx",
    pillar: "internalAudit",
    status: "ready",
    note: {
      ar: "الدليل بالعربية بصيغة Word — صورة الغلاف قيد الإعداد.",
      en: "Arabic Word document — cover artwork pending.",
    },
  },
  {
    slug: "fpa-budget-variance-claude",
    title: {
      ar: "دليل مسؤول التخطيط والتحليل المالي — تحليل انحرافات الموازنة بـ Claude",
      en: "FP&A Guide — Budget Variance Analysis with Claude",
    },
    description: {
      ar: "من جدول الانحرافات إلى تعليق إداري يمكن تقديمه: كيف تُحلّل انحرافات الموازنة بـ Claude وتكتب التفسير الذي ستُسأل عنه.",
      en: "From a variance table to management commentary you can present: analysing budget variances with Claude and writing the explanation you'll be asked for. Guide content is in Arabic.",
    },
    cover: "/assets/resources/placeholder-cover.svg",
    // TODO(abed): Word file — export to PDF when convenient.
    file: "/assets/resources/fpa-budget-variance-claude.docx",
    pillar: "finance",
    status: "ready",
    note: {
      ar: "الدليل بالعربية بصيغة Word — صورة الغلاف قيد الإعداد.",
      en: "Arabic Word document — cover artwork pending.",
    },
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
