import type { Testimonial } from "./types";

/**
 * Testimonials.
 *
 * ⚠️  EVERY entry below is a PLACEHOLDER. No name, quote, title or company
 * here belongs to a real person. Nothing invented is presented as genuine —
 * each card renders with a visible "placeholder" marker until replaced.
 *
 * TODO(abed): replace with real testimonials gathered for Fainance Lab
 * specifically, each with the person's explicit permission. Testimonials from
 * abedlatif-alomar.com were given in a different brand context and must not be
 * reused here without confirming that with the person who gave them.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote: {
      ar: "[نص مؤقت — بانتظار شهادة حقيقية بموافقة صاحبها] يوضع هنا اقتباس من شخص حضر التدريب فعلاً.",
      en: "[PLACEHOLDER — needs Abed's real, permission-confirmed testimonial] A quote from someone who actually attended the training goes here.",
    },
    name: {
      ar: "[الاسم]",
      en: "[Name]",
    },
    title: {
      ar: "[المسمى الوظيفي، الجهة]",
      en: "[Job title, Company]",
    },
    avatar: null,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    quote: {
      ar: "[نص مؤقت — بانتظار شهادة حقيقية بموافقة صاحبها] يوضع هنا اقتباس ثانٍ يغطي زاوية مختلفة عن الأول.",
      en: "[PLACEHOLDER — needs Abed's real, permission-confirmed testimonial] A second quote covering a different angle from the first.",
    },
    name: {
      ar: "[الاسم]",
      en: "[Name]",
    },
    title: {
      ar: "[المسمى الوظيفي، الجهة]",
      en: "[Job title, Company]",
    },
    avatar: null,
    isPlaceholder: true,
  },
];
