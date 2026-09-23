import type { FaqItem } from "./types";

/**
 * FAQ — questions and answers exactly as supplied by Abed.
 *
 * The contact answer deliberately names email and Instagram only.
 * TODO(abed): add WhatsApp back to `contact` once the number is finalised.
 */
export const faq: FaqItem[] = [
  {
    id: "students",
    question: {
      en: "Is Fainance for me if I'm a student or early in my career?",
      ar: "هل Fainance مناسبة لي إن كنت طالباً أو في بداية مسيرتي المهنية؟",
    },
    answer: {
      en: "Yes — you don't need prior AI experience, and the content pillars follow the same accounting, finance, audit, and GRC topics you're already studying.",
      ar: "نعم — لا تحتاج إلى خبرة سابقة في الذكاء الاصطناعي، ومجالات المحتوى تتبع موضوعات المحاسبة والمالية والتدقيق والحوكمة نفسها التي تدرسها أصلاً.",
    },
  },
  {
    id: "prior-knowledge",
    question: {
      en: "Do I need to already know how to use AI tools?",
      ar: "هل أحتاج إلى معرفة مسبقة باستخدام أدوات الذكاء الاصطناعي؟",
    },
    answer: {
      en: "No. Every pillar starts from the fundamentals — how to think about AI as a finance tool, not just how to use it.",
      ar: "لا. كل مجال يبدأ من الأساسيات — كيف تفكر في الذكاء الاصطناعي كأداة مالية، لا كيف تستخدمه فحسب.",
    },
  },
  {
    id: "language",
    question: {
      en: "Is this only for Arabic speakers?",
      ar: "هل المحتوى للناطقين بالعربية فقط؟",
    },
    answer: {
      en: "Fainance is Arabic-first, but the platform and content are bilingual — English is fully supported, not an afterthought.",
      ar: "Fainance عربية أولاً، لكن المنصة والمحتوى ثنائيا اللغة — الإنجليزية مدعومة بالكامل، وليست أمراً ثانوياً.",
    },
  },
  {
    id: "different",
    question: {
      en: "What makes Fainance different from generic AI content?",
      ar: "ما الذي يميّز Fainance عن محتوى الذكاء الاصطناعي العام؟",
    },
    answer: {
      en: "It's built by a practicing finance, audit, and governance executive — not a general AI creator branching into finance. Every pillar reflects real professional workflows, not surface-level AI tips.",
      ar: "يقدّمها تنفيذي ممارس في المالية والتدقيق والحوكمة — لا صانع محتوى عام في الذكاء الاصطناعي يتوسّع نحو المالية. كل مجال يعكس مسارات عمل مهنية حقيقية، لا نصائح سطحية.",
    },
  },
  {
    id: "teams",
    question: {
      en: "Can my team or company use this?",
      ar: "هل يمكن لفريقي أو شركتي الاستفادة من المحتوى؟",
    },
    answer: {
      en: "There's no separate team plan yet — for now, everyone, including your whole team, can freely subscribe and use the website and materials individually for free.",
      ar: "لا توجد باقة خاصة بالفرق حتى الآن — ويمكن للجميع حالياً، بمن فيهم فريقك بالكامل، الاشتراك واستخدام الموقع والمواد بشكل فردي ومجاني.",
    },
  },
  {
    id: "data-risk",
    question: {
      en: "Will using AI on my company's financial data put it at risk?",
      ar: "هل استخدام الذكاء الاصطناعي على البيانات المالية لشركتي يعرّضها للخطر؟",
    },
    answer: {
      en: "Before applying any Fainance materials to your company's data, check your own company's data security and AI usage policy first. Fainance is not responsible for any breach resulting from how you apply its materials — see our Terms of Use for full details.",
      ar: "قبل تطبيق أي من مواد Fainance على بيانات شركتك، راجع أولاً سياسة شركتك الخاصة بأمن البيانات واستخدام الذكاء الاصطناعي. ولا تتحمل Fainance مسؤولية أي اختراق ينتج عن طريقة تطبيقك لموادها — راجع شروط الاستخدام للتفاصيل الكاملة.",
    },
    link: { href: "/terms", label: { en: "Terms of Use", ar: "شروط الاستخدام" } },
  },
  {
    id: "templates",
    question: {
      en: "Do the AI-generated templates replace a real professional opinion?",
      ar: "هل تحلّ القوالب المُنتَجة بالذكاء الاصطناعي محلّ الرأي المهني الحقيقي؟",
    },
    answer: {
      en: "No. They produce internal working drafts only — risk registers, work programs, checklists. They never produce anything positioned as a signed audit opinion or assurance report; that always requires a licensed professional.",
      ar: "لا. فهي تُنتج مسودات عمل داخلية فقط — سجلات مخاطر، وبرامج عمل، وقوائم تحقق. ولا تُنتج أبداً ما يُقدَّم كرأي تدقيق موقّع أو تقرير تأكيد؛ فذلك يتطلب دائماً مهنياً مرخّصاً.",
    },
  },
  {
    id: "free",
    question: {
      en: "Is the content really free, or is there a catch?",
      ar: "هل المحتوى مجاني فعلاً، أم هناك شرط خفي؟",
    },
    answer: {
      en: "Yes, it's all free.",
      ar: "نعم، كله مجاني.",
    },
  },
  {
    id: "contact",
    question: {
      en: "How do I get in touch?",
      ar: "كيف أتواصل معكم؟",
    },
    answer: {
      en: "Through the Contact page — email or Instagram, whichever you prefer.",
      ar: "عبر صفحة التواصل — بالبريد الإلكتروني أو إنستغرام، أيهما تفضّل.",
    },
    link: { href: "/contact", label: { en: "Contact", ar: "صفحة التواصل" } },
  },
];
