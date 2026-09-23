import type { EventEntry } from "./types";

/**
 * Events — an extensible list. Each event is one entry; add future events
 * the same way, with their images under /public/assets/events/<slug>/.
 *
 * Upcoming vs past is derived from the dates at render time — there is no
 * status field to keep up to date.
 *
 * Content rule: an event's text comes only from that event's own materials.
 * For the 2026 forum that means the presentation (50 image-only slides, read
 * visually), the photos, and the session questionnaire:
 *   - event name, 2026 and the speaker's credentials: slide 1
 *   - theme, organiser and 27–30 July dates: the event backdrop (photo WA0138)
 *   - session title: slide 1; the six parts: slide 2
 *   - "Amman, Jordan": confirmed directly by Abed (the photos show the
 *     Jordanian flag, but the city isn't legible in the files)
 *
 * Teaser slides are public; slide 50 (a QR code to abedlatif-alomar.com) is
 * intentionally NOT a teaser. It remains in the full deck, which is gated.
 */
export const events: EventEntry[] = [
  {
    slug: "forum-accountants-financiers-2026",
    name: {
      ar: "الملتقى السنوي التاسع للمحاسبين والماليين ٢٠٢٦",
      en: "9th Annual Forum for Accountants and Financiers 2026",
    },
    sessionTitle: {
      ar: "حين يجتمع الخبير المالي والمحاسبي بالذكاء الاصطناعي: شراكة أم صراع؟",
      en: "When the finance and accounting expert meets AI: partnership or conflict?",
    },
    theme: {
      ar: "قيادة الأداء المالي في عصر التحوّل الرقمي والحوكمة والاستدامة",
      en: "Leading financial performance in the era of digital transformation, governance and sustainability",
    },
    startDate: "2026-07-27",
    endDate: "2026-07-30",
    location: { ar: "عمّان، الأردن", en: "Amman, Jordan" },
    organizer: "Optimal",
    teaser: {
      ar: "شراكة أم صراع؟ محاضرة من ستة محاور عن موقع المهني المالي من الذكاء الاصطناعي اليوم — وخارطة طريق شخصية للأمام.",
      en: "Partnership or conflict? A six-part talk on where finance professionals stand with AI today — and a personal roadmap forward.",
    },
    intro: [
      {
        ar: "نظّمت Optimal الملتقى السنوي التاسع للمحاسبين والماليين في عمّان، الأردن، بين ٢٧ و٣٠ يوليو ٢٠٢٦، تحت عنوان «قيادة الأداء المالي في عصر التحوّل الرقمي والحوكمة والاستدامة».",
        en: "Optimal held the 9th Annual Forum for Accountants and Financiers in Amman, Jordan, from 27 to 30 July 2026, under the theme «Leading financial performance in the era of digital transformation, governance and sustainability».",
      },
      {
        ar: "قدّم عبداللطيف العمر (MBA، CPA، CCGO) محاضرة بعنوان «حين يجتمع الخبير المالي والمحاسبي بالذكاء الاصطناعي: شراكة أم صراع؟»، في ستة محاور تبدأ من السؤال: أين نحن الآن فعلاً؟ وتنتهي بخارطة طريق شخصية لكل حاضر.",
        en: "Abed-Latif Al-Omar (MBA, CPA, CCGO) presented «When the finance and accounting expert meets AI: partnership or conflict?» — six parts that start from the question «where are we really now?» and end with a personal roadmap for each attendee.",
      },
    ],
    outline: [
      { ar: "أين نحن الآن فعلاً؟", en: "Where are we really now?" },
      { ar: "طبيعة العلاقة: أين يتفوق الذكاء الاصطناعي، وأين تتفوق أنت؟", en: "The nature of the relationship: where AI excels, and where you excel" },
      { ar: "تحدي الأجيال: من يستخدم ومن لا يستخدم الذكاء الاصطناعي", en: "The generational challenge: who uses AI, and who doesn't" },
      { ar: "متى تتحول الشراكة إلى صراع؟", en: "When does partnership turn into conflict?" },
      { ar: "نماذج حقيقية للشراكة الناجحة", en: "Real models of successful partnership" },
      { ar: "خارطة طريقك الشخصية", en: "Your personal roadmap" },
    ],
    hero: {
      src: "/assets/events/forum-2026/hero.jpg",
      alt: {
        ar: "عبداللطيف العمر على المنصة أمام شريحة عنوان المحاضرة",
        en: "Abed-Latif Al-Omar on stage in front of the talk's title slide",
      },
    },
    slides: [
      {
        src: "/assets/events/forum-2026/slide-01.jpg",
        alt: { ar: "شريحة العنوان: شراكة أم صراع؟", en: "Title slide: partnership or conflict?" },
      },
      {
        src: "/assets/events/forum-2026/slide-02.jpg",
        alt: { ar: "فهرس المحاور الستة للمحاضرة", en: "The talk's six-part outline" },
      },
      {
        src: "/assets/events/forum-2026/slide-47.jpg",
        alt: { ar: "خطوات عملية بحسب المستوى الوظيفي", en: "Practical steps by job level" },
      },
    ],
    downloads: [
      {
        label: {
          ar: "العرض التقديمي كاملاً كما قُدِّم (٥٠ شريحة)",
          en: "The full presentation, as delivered (50 slides)",
        },
        file: "/assets/events/forum-2026/partnership-or-conflict-presentation.pdf",
        format: "PDF",
        size: "13.8 MB",
      },
      {
        label: {
          ar: "التقييم الذاتي للجلسة — ١٨ سؤالاً عبر المحاور الستة",
          en: "Session self-assessment — 18 questions across the six parts (Arabic)",
        },
        file: "/assets/events/forum-2026/session-self-assessment.pdf",
        format: "PDF",
        size: "111 KB",
      },
    ],
  },
];

export function getEvent(slug: string): EventEntry | undefined {
  return events.find((e) => e.slug === slug);
}

/** Past vs upcoming, from the dates. An event is past once its last day ends. */
export function isUpcoming(event: EventEntry, now = new Date()): boolean {
  const last = new Date(`${event.endDate ?? event.startDate}T23:59:59`);
  return last.getTime() >= now.getTime();
}

/** Upcoming first (soonest first), then past (most recent first). */
export function sortEvents(list: EventEntry[], now = new Date()): EventEntry[] {
  const upcoming = list
    .filter((e) => isUpcoming(e, now))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = list
    .filter((e) => !isUpcoming(e, now))
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  return [...upcoming, ...past];
}
