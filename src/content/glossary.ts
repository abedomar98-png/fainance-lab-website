import type { GlossaryTerm } from "./types";

/**
 * Glossary — English term, Arabic meaning, and a one-line description.
 *
 * Where a term has no standard, widely used Arabic translation (most AI and
 * Claude terms), the Arabic column carries the best translation and the
 * description explains what it is for, rather than leaving a bare word.
 * Claude feature descriptions follow the wording of the @fainance.lab
 * carousels. Credential expansions come from Abed's CV.
 */
export const glossary: GlossaryTerm[] = [
  /* --- AI & general ----------------------------------------------------- */
  {
    term: "Prompt Engineering",
    ar: "هندسة الأوامر",
    group: "ai",
    description: {
      ar: "صياغة التعليمات المقدَّمة لأداة الذكاء الاصطناعي بطريقة منظمة للحصول على مخرجات دقيقة ومفيدة.",
      en: "Structuring the instructions you give an AI tool so it returns accurate, useful output.",
    },
  },
  {
    term: "Large Language Model (LLM)",
    ar: "النموذج اللغوي الكبير",
    group: "ai",
    description: {
      ar: "نموذج ذكاء اصطناعي مُدرَّب على كميات ضخمة من النصوص لفهم اللغة وتوليدها، مثل Claude وGPT.",
      en: "An AI model trained on vast amounts of text to understand and generate language — Claude and GPT, for example.",
    },
  },
  {
    term: "Generative AI",
    ar: "الذكاء الاصطناعي التوليدي",
    group: "ai",
    description: {
      ar: "ذكاء اصطناعي يُنشئ محتوى جديداً — نصوصاً أو صوراً أو جداول — بدلاً من الاكتفاء بتصنيف البيانات الموجودة.",
      en: "AI that creates new content — text, images, tables — rather than only classifying existing data.",
    },
  },
  {
    term: "Machine Learning",
    ar: "تعلّم الآلة",
    group: "ai",
    description: {
      ar: "فرع من الذكاء الاصطناعي تتعلّم فيه الأنظمة الأنماط من البيانات بدلاً من برمجتها بقواعد صريحة.",
      en: "A branch of AI where systems learn patterns from data instead of being programmed with explicit rules.",
    },
  },
  {
    term: "Token",
    ar: "الرمز (التوكن)",
    group: "ai",
    description: {
      ar: "أصغر وحدة نصية يعالجها النموذج — كلمة أو جزء من كلمة — وبها تُقاس حدود الاستخدام وتكلفته.",
      en: "The smallest unit of text a model processes — a word or part of one. Usage limits and costs are measured in tokens.",
    },
  },
  {
    term: "Fine-tuning",
    ar: "الضبط الدقيق",
    group: "ai",
    description: {
      ar: "تدريب إضافي لنموذج جاهز على بيانات متخصصة ليؤدي مهمة أو أسلوباً محدداً بشكل أفضل.",
      en: "Further training of an existing model on specialised data so it performs a specific task or style better.",
    },
  },
  {
    term: "Agentic AI",
    ar: "الذكاء الاصطناعي الوكيل",
    group: "ai",
    description: {
      ar: "ذكاء اصطناعي ينفّذ مهاماً متعددة الخطوات بنفسه — يخطط ويستخدم الأدوات ويتخذ إجراءات — بدلاً من الاكتفاء بالإجابة.",
      en: "AI that carries out multi-step tasks on its own — planning, using tools and taking actions — rather than just answering.",
    },
  },
  {
    term: "Multimodal AI",
    ar: "الذكاء الاصطناعي متعدد الوسائط",
    group: "ai",
    description: {
      ar: "نموذج يفهم أكثر من نوع من المدخلات أو يُنتجها — نصاً وصوراً وصوتاً وملفات.",
      en: "A model that understands or produces more than one kind of input — text, images, audio, files.",
    },
  },
  {
    term: "API",
    ar: "واجهة برمجة التطبيقات",
    group: "ai",
    description: {
      ar: "طريقة تتيح لبرنامجين التواصل وتبادل البيانات، ومنها ربط أدوات الذكاء الاصطناعي بأنظمة الشركة.",
      en: "A way for two pieces of software to talk and exchange data — including connecting AI tools to company systems.",
    },
  },
  {
    term: "Model Context Protocol (MCP)",
    ar: "بروتوكول سياق النموذج",
    group: "ai",
    description: {
      ar: "معيار مفتوح يربط أدوات الذكاء الاصطناعي بمصادر البيانات والتطبيقات الخارجية بطريقة موحّدة.",
      en: "An open standard for connecting AI tools to external data sources and applications in a consistent way.",
    },
  },
  {
    term: "Plugins",
    ar: "الإضافات",
    group: "ai",
    description: {
      ar: "حزم تضيف إلى أداة الذكاء الاصطناعي قدرات أو اتصالات جديدة.",
      en: "Packages that add new capabilities or connections to an AI tool.",
    },
  },
  {
    term: "Vibe-coding",
    ar: "البرمجة بالوصف",
    group: "ai",
    description: {
      ar: "بناء البرمجيات بوصف ما تريده بلغة طبيعية وترك الذكاء الاصطناعي يكتب الشيفرة.",
      en: "Building software by describing what you want in plain language and letting AI write the code.",
    },
  },

  /* --- Finance, audit & GRC ---------------------------------------------- */
  {
    term: "Internal Audit",
    ar: "التدقيق الداخلي",
    group: "finance",
    description: {
      ar: "وظيفة مستقلة داخل المؤسسة تقيّم الضوابط وإدارة المخاطر والحوكمة وتقدّم توصيات للتحسين.",
      en: "An independent function inside an organisation that evaluates controls, risk management and governance.",
    },
  },
  {
    term: "External Audit",
    ar: "التدقيق الخارجي",
    group: "finance",
    description: {
      ar: "فحص مستقل للقوائم المالية تجريه جهة خارجية لإبداء رأي حول عدالة عرضها.",
      en: "An independent examination of financial statements by an outside firm, resulting in an opinion on their fair presentation.",
    },
  },
  {
    term: "GRC",
    ar: "الحوكمة والمخاطر والامتثال",
    group: "finance",
    description: {
      ar: "إطار متكامل لإدارة الحوكمة المؤسسية والمخاطر والالتزام بالأنظمة والسياسات.",
      en: "Governance, Risk and Compliance — an integrated approach to corporate governance, risk and regulatory compliance.",
    },
  },
  {
    term: "Risk Register",
    ar: "سجل المخاطر",
    group: "finance",
    description: {
      ar: "سجل يوثّق المخاطر المحددة واحتماليتها وأثرها ومالكها والضوابط المرتبطة بها.",
      en: "A record of identified risks with their likelihood, impact, owner and linked controls.",
    },
  },
  {
    term: "Variance Analysis",
    ar: "تحليل الانحرافات",
    group: "finance",
    description: {
      ar: "مقارنة النتائج الفعلية بالموازنة أو التوقعات وتفسير أسباب الفروقات.",
      en: "Comparing actual results with budget or forecast and explaining why they differ.",
    },
  },
  {
    term: "Journal Entry",
    ar: "القيد اليومي",
    group: "finance",
    description: {
      ar: "تسجيل محاسبي لعملية مالية في الدفاتر، بطرف مدين وطرف دائن.",
      en: "An accounting record of a transaction in the books, with a debit and a credit side.",
    },
  },
  {
    term: "Reconciliation",
    ar: "التسوية",
    group: "finance",
    description: {
      ar: "مطابقة رصيدين أو سجلّين — مثل كشف البنك ودفتر النقدية — وتفسير أي فروقات بينهما.",
      en: "Matching two balances or records — a bank statement and the cash book, say — and explaining any differences.",
    },
  },
  {
    term: "Materiality",
    ar: "الأهمية النسبية",
    group: "finance",
    description: {
      ar: "الحد الذي يصبح عنده الخطأ أو الإغفال مؤثراً في قرارات مستخدمي القوائم المالية.",
      en: "The threshold at which an error or omission would influence the decisions of financial statement users.",
    },
  },
  {
    term: "Data Governance",
    ar: "حوكمة البيانات",
    group: "finance",
    description: {
      ar: "السياسات والأدوار التي تحدد كيف تُجمع البيانات وتُحمى وتُستخدم داخل المؤسسة.",
      en: "The policies and roles that determine how data is collected, protected and used across an organisation.",
    },
  },

  /* --- Claude -------------------------------------------------------------- */
  {
    term: "Chat",
    ar: "المحادثة",
    group: "claude",
    description: {
      ar: "واجهة المحادثة الأساسية في Claude لطرح الأسئلة وتنفيذ المهام بالحوار.",
      en: "Claude's core conversational interface for asking questions and getting work done.",
    },
  },
  {
    term: "Projects",
    ar: "المشاريع",
    group: "claude",
    description: {
      ar: "مساحات عمل في Claude تجمع المحادثات والملفات والتعليمات الخاصة بموضوع واحد.",
      en: "Workspaces in Claude that group conversations, files and instructions for one topic.",
    },
  },
  {
    term: "Artifacts",
    ar: "المخرجات",
    group: "claude",
    description: {
      ar: "مخرجات مستقلة ينشئها Claude — مستندات أو جداول أو صفحات — تُعرض وتُعدَّل بجانب المحادثة.",
      en: "Standalone outputs Claude creates — documents, tables, pages — shown and edited beside the chat.",
    },
  },
  {
    term: "Memory",
    ar: "الذاكرة",
    group: "claude",
    description: {
      ar: "ميزة تحفظ سياق عملك بين المحادثات فلا تحتاج إلى إعادة شرحه في كل مرة.",
      en: "Keeps the context of your work across conversations, so you don't re-explain it every time.",
    },
  },
  {
    term: "Connectors",
    ar: "الموصلات",
    group: "claude",
    description: {
      ar: "روابط تتيح لـ Claude الوصول إلى تطبيقاتك وبياناتك، مثل البريد والتقويم ومساحات التخزين.",
      en: "Links that let Claude reach your apps and data — email, calendar, storage.",
    },
  },
  {
    term: "Skills",
    ar: "المهارات",
    group: "claude",
    description: {
      ar: "حزم تعليمات وملفات تعلّم Claude طريقة محددة لأداء مهمة متكررة.",
      en: "Packaged instructions and files that teach Claude a specific way to perform a recurring task.",
    },
  },
  {
    term: "Claude Code",
    ar: "Claude Code",
    group: "claude",
    description: {
      ar: "أداة Claude للبرمجة: تقرأ الشيفرة وتكتبها وتنفّذ المهام البرمجية من الطرفية أو المحرر.",
      en: "Claude's coding tool: reads and writes code and runs programming tasks from the terminal or editor.",
    },
  },
  {
    term: "Claude Cowork",
    ar: "Claude Cowork",
    group: "claude",
    description: {
      ar: "وضع في Claude لتنظيم المهام وتنفيذ الأعمال متعددة الخطوات على ملفاتك نيابةً عنك.",
      en: "A mode in Claude for organising tasks and carrying out multi-step work on your files for you.",
    },
  },
  {
    term: "Extended Thinking",
    ar: "التفكير الممتد",
    group: "claude",
    description: {
      ar: "وضع يمنح Claude وقتاً أطول للتفكير خطوة بخطوة قبل الإجابة عن المسائل المعقدة.",
      en: "A mode that gives Claude more time to reason step by step before answering complex problems.",
    },
  },
  {
    term: "Web Search",
    ar: "البحث في الويب",
    group: "claude",
    description: {
      ar: "ميزة تتيح لـ Claude البحث في الإنترنت للحصول على معلومات حديثة وذكر مصادرها.",
      en: "Lets Claude search the internet for current information and cite its sources.",
    },
  },

  /* --- Credentials (expansions from Abed's CV) ----------------------------- */
  {
    term: "CPA",
    ar: "محاسب قانوني معتمد",
    group: "credential",
    description: {
      ar: "Certified Public Accountant — شهادة المحاسب القانوني المعتمد الأمريكية.",
      en: "Certified Public Accountant — the US licensed accountant credential.",
    },
  },
  {
    term: "MBA",
    ar: "ماجستير إدارة الأعمال",
    group: "credential",
    description: {
      ar: "Master of Business Administration — درجة الماجستير في إدارة الأعمال.",
      en: "Master of Business Administration — a graduate degree in business management.",
    },
  },
  {
    term: "CCGO",
    ar: "مسؤول حوكمة شركات معتمد",
    group: "credential",
    description: {
      ar: "Certified Corporate Governance Officer — شهادة مسؤول حوكمة الشركات المعتمد.",
      en: "Certified Corporate Governance Officer — a professional corporate governance credential.",
    },
  },
];
