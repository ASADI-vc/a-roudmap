import type { Topic } from "./types";

export const aiappsTopics: Topic[] = [
  {
    id: "t-llm-fundamentals",
    track: "aiapps",
    order: 1,
    title: { fa: "مبانی مدل‌های زبانی برای توسعه‌دهنده", en: "LLM Fundamentals for Developers" },
    terms: [
      { fa: "توکن (Token)", en: "Token (توکن)" },
      { fa: "پنجره‌ی زمینه (Context window)", en: "Context window (پنجره‌ی زمینه)" },
      { fa: "هذیان‌گویی (Hallucination)", en: "Hallucination (هذیان‌گویی)" },
      { fa: "دما (Temperature)", en: "Temperature (دما)" },
    ],
    summary: {
      fa: "مدل زبانی چیست و چه نیست: توکن و پنجره‌ی زمینه، قطعیت‌ناپذیری، هذیان‌گویی، هزینه/تأخیر و حد‌های دانش. بدون این مدل ذهنی، هر اپ هوش مصنوعی جعبه‌ی سیاهِ گران می‌شود.",
      en: "What an LLM is and is not: tokens and context windows, non-determinism, hallucination, cost/latency, and knowledge limits. Without this mental model, every AI app becomes an expensive black box.",
    },
    outcomes: {
      fa: [
        "چرخه‌ی درخواست/پاسخ مدل را با هزینه و تأخیر توضیح دهی",
        "پنجره‌ی زمینه و پیامدهایش را مدیریت کنی",
        "هذیان را در پاسخ واقعی تشخیص و مستند کنی",
        "بین مدل‌های سبک/سنگین برای کار مناسب انتخاب کنی",
      ],
      en: [
        "Explain the request/response cycle with cost and latency",
        "Manage the context window and its consequences",
        "Detect and document hallucination in a real answer",
        "Choose light/heavy models per task",
      ],
    },
    why: {
      fa: "در سمت سازنده، تو دیگر «کاربر» مدل نیستی؛ پیمان‌کارِ رفتارش هستی. مطالعه‌ی METR نشان داد حتی توسعه‌دهندگان حرفه‌ای اثر مدل‌ها را اشتباه پیش‌بینی می‌کنند — مدل ذهنی درست، خطای پایه را کم می‌کند.",
      en: "As a builder you are no longer the model's 'user'; you contract its behavior. METR showed even professionals mispredict model effects — a correct mental model lowers the base error rate.",
    },
    prereqs: ["t-http-web", "t-ai-assisted-workflow"],
    related: ["t-prompting-patterns", "t-security-privacy"],
    essential: {
      fa: "یک تماس مستقیم با API مدل (سطح پایین) + ثبت هزینه/تأخیر واقعی.",
      en: "One direct API call to a model (low-level) + logging real cost/latency.",
    },
    optional: {
      fa: "احتمالات سرکوب‌شده، fine-tuning در سطح مفهومی.",
      en: "Sampling parameters, fine-tuning conceptually.",
    },
    exercise: {
      fa: "با SDK سطح پایین، ۱۰ پرسش ثابت را به یک مدل بده؛ پاسخ‌ها را برای خطای واقعی بررسی و دسته‌بندی کن؛ هزینه و تأخیر هر پاسخ را ثبت کن.",
      en: "With a low-level SDK, send 10 fixed questions to a model; review answers for real errors, categorize them, and log cost/latency per answer.",
    },
    aiGuidance: {
      fa: "این موضوع درباره‌ی خودِ ابزار است: از مدل بخواه مرزهای دانشش را نشان دهد (پرسش‌های به‌روزرسانی‌محور) و پاسخ‌هایش را همیشه با منبع بیرونی راستی‌آزمایی کن.",
      en: "This topic is about the tool itself: probe the model's knowledge boundaries (recency questions) and always verify answers against an external source.",
    },
    check: {
      fa: "سه پاسخ مدل را داوری کن: کدام هذیان است؟ کدام حد دانش است؟ کدام درست اما بی‌منبع؟ — و برای هرکدام اقدام بعدی را بنویس.",
      en: "Judge three model answers: which is hallucination? which is a knowledge limit? which is correct-but-unsourced? — with the next action for each.",
    },
    completion: {
      fa: ["۱۰ تماس با ثبت هزینه/تأخیر", "دسته‌بندی خطاها با مثال واقعی", "انتخاب مستند مدل برای یک کار"],
      en: ["10 calls with cost/latency logged", "Categorized errors with real examples", "A documented model choice for a task"],
    },
    resources: [
      { title: "Puter AI docs — chat() (model surface)", url: "https://docs.puter.com/AI/chat/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-002"],
    sources: ["src-metr2025", "src-puter-chat"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-prompting-patterns",
    track: "aiapps",
    order: 2,
    title: { fa: "الگوهای پرامپت و خروجی ساخت‌یافته", en: "Prompt Patterns & Structured Output" },
    terms: [
      { fa: "پرامپت سیستمی (System prompt)", en: "System prompt (پرامپت سیستمی)" },
      { fa: "خروجی JSON", en: "JSON output (خروجی JSON)" },
      { fa: "نمونه‌های چندگانه (Few-shot)", en: "Few-shot (نمونه‌های چندگانه)" },
      { fa: "ارزیابی پرامپت (Prompt eval)", en: "Prompt evaluation (ارزیابی پرامپت)" },
    ],
    summary: {
      fa: "پرامپت، کدِ تو در لایه‌ی زبان است: نقش و قواعد در پرامپت سیستمی، خروجی ساخت‌یافته با schema، چند-نمونه برای قالب ثابت، و ارزیابی سیستماتیک تغییرات پرامپت به‌جای «به‌نظرم بهتر شد».",
      en: "A prompt is your code at the language layer: role and rules in the system prompt, structured output via schema, few-shot for stable formats, and systematic evaluation of prompt changes instead of 'seems better'.",
    },
    outcomes: {
      fa: [
        "پرامپت سیستمی با قواعد قابل‌سنجش بنویسی",
        "خروجی JSON معتبر با schema تضمین کنی",
        "ارزیابی کوچک با ۲۰ نمونه بسازی",
        "دو نسخه‌ی پرامپت را با معیار مقایسه کنی",
      ],
      en: [
        "Write system prompts with measurable rules",
        "Guarantee valid JSON output via schema",
        "Build a small eval with 20 samples",
        "Compare two prompt versions against criteria",
      ],
    },
    why: {
      fa: "تغییر پرامپت بدون ارزیابی، همان تغییر کد بدون تست است؛ پرامپتِ بدون schema، API بدون قرارداد است. الگوی درست، رفتار مدل را از «حس» به «مهندسی» می‌آورد.",
      en: "Changing prompts without evaluation is changing code without tests; a prompt without a schema is an API without a contract. Proper patterns move model behavior from vibes to engineering.",
    },
    prereqs: ["t-llm-fundamentals"],
    related: ["t-requirements-design", "t-ai-safety-eval"],
    essential: {
      fa: "پرامپت سیستمی + schema + ارزیابی ۲۰ نمونه‌ای.",
      en: "System prompt + schema + a 20-sample eval.",
    },
    optional: {
      fa: "زنجیره‌ی فکر در سطح مفهومی، انتخاب‌گر ابزار.",
      en: "Chain-of-thought conceptually, tool selectors.",
    },
    exercise: {
      fa: "برای «دسته‌بندی پیام‌های کاربر» یک پرامپت سیستمی + schema بنویس؛ ۲۰ پیام واقعی (شامل مرزی و دوزبانه) گرد کن و دقت هر نسخه را مقایسه کن.",
      en: "For 'categorizing user messages', write a system prompt + schema; collect 20 real messages (incl. edge and bilingual ones) and compare accuracy across prompt versions.",
    },
    aiGuidance: {
      fa: "پرامپت را با مدل بازبینی کن اما معیار داوری را خودت تعریف کن؛ خروجی JSON را با parser واقعی بسنج، نه با «به‌نظر درست است».",
      en: "Have the model review the prompt but you define the judging criteria; test JSON output with a real parser, not 'looks right'.",
    },
    check: {
      fa: "دو پرامپت با هدف یکسان را مقایسه کن: کدام خطاهای مرزی کمتری دارد؟ چه چیزی در پرامپت بهتر این را تضمین کرده است؟",
      en: "Compare two prompts with the same goal: which has fewer edge failures? What in the better prompt guarantees that?",
    },
    completion: {
      fa: ["پرامپت سیستمی مستند", "schema + parser سبز روی ۲۰ نمونه", "مقایسه‌ی مستند دو نسخه"],
      en: ["A documented system prompt", "Schema + parser green over 20 samples", "A documented two-version comparison"],
    },
    resources: [
      { title: "Puter AI — chat options (outputFormat)", url: "https://docs.puter.com/AI/chat/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-puter-chat"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-rag-embeddings",
    track: "aiapps",
    order: 3,
    title: { fa: "بازیابی و RAG", en: "Retrieval & RAG" },
    terms: [
      { fa: "قطعه‌بندی (Chunking)", en: "Chunking (قطعه‌بندی)" },
      { fa: "تعیّب (Embedding)", en: "Embedding (تعیّب)" },
      { fa: "جست‌وجوی معنایی", en: "Semantic search (جست‌وجوی معنایی)" },
      { fa: "ارجاع‌دهی (Citation)", en: "Citation (ارجاع‌دهی)" },
    ],
    summary: {
      fa: "به‌جای کل دانش در زمینه، «بخش مرتبط» را بازیابی کن: قطعه‌بندی مستندات، جست‌وجوی واژگانی/معنایی، ارسال زمینه‌ی محدود و اجبار مدل به ارجاع‌دهی به رکوردهای واقعی. همین پلتفرم هم همین کار را می‌کند.",
      en: "Instead of stuffing all knowledge into context, retrieve the relevant parts: document chunking, lexical/semantic search, bounded context, and forcing the model to cite real records. This platform does exactly this.",
    },
    outcomes: {
      fa: [
        "مستند را به قطعه‌های قابل‌ارجاع بشکنی",
        "بازیابی واژگانی را پیاده و ارزیابی کنی",
        "زمان معنایی/تعیّب را برای بهبود بازیابی بسنجی",
        "ارجاع‌های مدل را با رکورد واقعی تطبیق دهی",
      ],
      en: [
        "Chunk a document into citable pieces",
        "Implement and evaluate lexical retrieval",
        "Decide whether semantic/embedding retrieval is needed",
        "Match the model's citations to real records",
      ],
    },
    why: {
      fa: "بدون بازیابی، اپ تو هذیان می‌گوید؛ بدون ارجاع، کاربر نمی‌تواند تأیید کند. تمرین «ارجاع فقط به رکورد واقعی» همان دیسیپلین امنیتی «متن بازیابی‌شده=داده» است (OWASP LLM01).",
      en: "Without retrieval your app hallucinates; without citations users cannot verify. Citing only real records is the same discipline as treating retrieved text as data (OWASP LLM01).",
    },
    prereqs: ["t-llm-fundamentals", "t-databases-sql"],
    related: ["t-agents-tools", "t-data-structures"],
    essential: {
      fa: "بازیابی واژگانی + ارجاع‌دهی اجباری روی پیکره‌ی کوچک.",
      en: "Lexical retrieval + forced citation over a small corpus.",
    },
    optional: {
      fa: "تعیّب و مقایسه‌ی معنایی/واژگانی روی همان مجموعه ارزیابی.",
      en: "Embeddings and semantic-vs-lexical comparison on the same eval set.",
    },
    exercise: {
      fa: "یادداشت‌های درسی‌ات را قطعه‌بندی کن؛ بازیابی واژگانی بساز؛ ۱۰ پرسش واقعی بپرس و دو سنجه را بسنج: مربوط‌بودن قطعه‌ها و تطابق ارجاع‌ها با رکورد.",
      en: "Chunk your study notes; build lexical retrieval; ask 10 real questions and score two metrics: chunk relevance and citation-to-record match.",
    },
    aiGuidance: {
      fa: "مدل فقط باید از رکوردهای بازیابی‌شده نقل کند؛ هر ارجاع بیرون از رکورد را رد کن. زمینه‌ی ارسالی را سقف بزن (هزینه/تأخیر) و حذف‌هایت را مستند کن.",
      en: "The model may only quote retrieved records; reject any citation outside them. Cap the sent context (cost/latency) and document your cuts.",
    },
    check: {
      fa: "سه ارجاع تولیدی را داوری کن: کدام به رکورد واقعی می‌رسد؟ کدام ساخته‌شده است؟ چه تغییری در پرامپت جعل را سخت‌تر می‌کند؟",
      en: "Judge three generated citations: which resolves to a real record? which is fabricated? What prompt change makes fabrication harder?",
    },
    completion: {
      fa: ["پیکره‌ی قطعه‌بندی‌شده با شناسه", "بازیابی با دو سنجه", "ردِ ارجاع‌های جعلی با مثال"],
      en: ["An ID-carrying chunked corpus", "Retrieval with two metrics", "One fabricated citation rejected with an example"],
    },
    resources: [
      { title: "OWASP LLM Top 10 (grounding & injection)", url: "https://genai.owasp.org/llm-top-10/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-018"],
    sources: ["src-owasp-llm10", "src-puter-chat"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-agents-tools",
    track: "aiapps",
    order: 4,
    title: { fa: "عامل‌ها و فراخوانی ابزار", en: "Agents & Tool Calling" },
    terms: [
      { fa: "فراخوانی ابزار (Tool calling)", en: "Tool calling (فراخوانی ابزار)" },
      { fa: "حلقه‌ی عامل (Agent loop)", en: "Agent loop (حلقه‌ی عامل)" },
      { fa: "مجوز عمل (Agency)", en: "Agency (مجوز عمل)" },
      { fa: "سقف گام (Step budget)", en: "Step budget (سقف گام)" },
    ],
    summary: {
      fa: "عامل یعنی مدل + ابزار + حلقه‌ی تصمیم. پروتکل فراخوانی ابزار را می‌سازی، استدلال‌ها را اعتبارسنجی می‌کنی، مجوزها را فهرست‌سفید می‌کنی و سقف گام/هزینه می‌گذاری — عاملِ بدون لگام، خطر واقعی است (OWASP LLM06).",
      en: "An agent = model + tools + a decision loop. You implement the tool-calling protocol, validate arguments, allowlist operations and set step/cost budgets — an unbridled agent is a real hazard (OWASP LLM06).",
    },
    outcomes: {
      fa: [
        "پروتکل tool calling را دو-طرفه پیاده کنی",
        "استدلال‌های ابزار را اعتبارسنجی و سفید‌فهرست کنی",
        "سقف گام و هزینه بگذاری و از سرریز جلوگیری کنی",
        "حلقه‌ی عامل را با تست شبیه‌سازی‌شده پوشش دهی",
      ],
      en: [
        "Implement tool calling on both sides",
        "Validate and allowlist tool arguments",
        "Set step/cost budgets and prevent runaway loops",
        "Cover the loop with simulated tests",
      ],
    },
    why: {
      fa: "ترکیب «عامل + ترمینال + اینترنت» قدرتمند و خطرناک است: تزریق از طریق داده‌ی بازیابی‌شده (LLM01) و مجوزِ بیش‌ازحد (LLM06) دو رایج‌ترین اشتباهند. همین پلتفرم حلقه‌ی محدود با سقف ۵ گام دارد.",
      en: "'Agent + terminal + internet' is powerful and dangerous: injection via retrieved data (LLM01) and excessive agency (LLM06) are the two most common mistakes. This platform ships a bounded loop with a 5-step budget.",
    },
    prereqs: ["t-prompting-patterns", "t-llm-fundamentals"],
    related: ["t-security-privacy", "t-ai-safety-eval"],
    essential: {
      fa: "یک عامل با دو ابزار + اعتبارسنجی + سقف گام.",
      en: "One agent with two tools + validation + step budget.",
    },
    optional: {
      fa: "عامل چندگانه، حافظه‌ی بلندمدت — فقط مفهومی.",
      en: "Multi-agent, long-term memory — concepts only.",
    },
    exercise: {
      fa: "عاملی بساز با ابزارهای «خواندن زمان» و «جست‌وجوی واژه‌نامه‌ی محلی»؛ استدلال‌ها را اعتبارسنجی کن، سقف ۳ گام بگذار و سناریوی «ابزار همیشه خطا می‌دهد» را با تست شبیه‌سازی پوشش بده.",
      en: "Build an agent with 'get time' and 'search local glossary' tools; validate arguments, cap at 3 steps, and cover the 'tool always fails' scenario with a simulated test.",
    },
    aiGuidance: {
      fa: "متنِ ابزارها و رکوردها را همیشه «داده» قلم بزن؛ اجازه‌ی هیچ عملیات بیرونی بدون فهرست سفید. هیچ اکشنی از داخلِ داده‌ی بازیابی‌شده اجرا نشود.",
      en: "Treat tool text and records strictly as data; allowlist every operation; never execute actions originating inside retrieved data.",
    },
    check: {
      fa: "یک لاگ حلقه‌ی عامل را بازخوانی کن: کجا مدل ابزار اشتباه خواست؟ اعتبارسنجی کجا آن را گرفت؟ اگر سقف نبود چه می‌شد؟",
      en: "Replay an agent-loop log: where did the model request the wrong tool? where did validation catch it? What if the budget didn't exist?",
    },
    completion: {
      fa: ["عامل با دو ابزار اعتبارسنجی‌شده", "سقف گام + تست سرریز", "تست شبیه‌سازی سبز"],
      en: ["An agent with two validated tools", "Step budget + overflow test", "Green simulated tests"],
    },
    resources: [
      { title: "Puter AI — Function calling (verified protocol)", url: "https://docs.puter.com/AI/chat/", lang: "en", level: "advanced", free: true },
      { title: "OWASP LLM Top 10 — Excessive Agency", url: "https://genai.owasp.org/llm-top-10/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-018"],
    sources: ["src-owasp-llm10", "src-puter-chat"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-ai-safety-eval",
    track: "aiapps",
    order: 5,
    title: { fa: "ایمنی، حریم خصوصی و ارزیابی اپ‌های هوش مصنوعی", en: "AI App Safety, Privacy & Evaluation" },
    terms: [
      { fa: "تزریق پرامپت (Prompt injection)", en: "Prompt injection (تزریق پرامپت)" },
      { fa: "نشت اطلاعات (Info disclosure)", en: "Information disclosure (نشت اطلاعات)" },
      { fa: "مجموعه‌ی ارزیابی (Eval set)", en: "Eval set (مجموعه‌ی ارزیابی)" },
      { fa: "رفتار جایگزین (Fallback)", en: "Fallback behavior (رفتار جایگزین)" },
    ],
    summary: {
      fa: "اپ هوش‌مصنوعی‌ات را مثل یک سرویس امن می‌کنی: سناریوهای تزریق، دسته‌بندی داده‌ی حساس، سقف مصرف، رفتار جایگزین در قطعی سرویس و یک مجموعه‌ی ارزیابی که قبل از هر تغییر پرامپت اجرا می‌شود.",
      en: "You secure your AI app like any service: injection scenarios, sensitive-data handling, usage caps, fallback behavior during outages, and an eval set run before every prompt change.",
    },
    outcomes: {
      fa: [
        "پنج سناریوی تزریق را طراحی و مهار کنی",
        "داده‌ی حساس را از مسیر مدل دور کنی",
        "سقف مصرف و خاموش‌کننده‌ی ایمن بگذاری",
        "ارزیابی کوچک را به CI وصل کنی",
      ],
      en: [
        "Design and contain five injection scenarios",
        "Keep sensitive data away from the model path",
        "Set usage caps and a safe kill-switch",
        "Wire a small eval into CI",
      ],
    },
    why: {
      fa: "وراکود نشان داد امنیت با بزرگ‌ترشدن مدل بهتر نمی‌شود؛ و قطعی سرویس واقعی است — کاربر باید بتواند بدون دستیار هم کار کند. ایمنی، ویژگی محصول است نه پیکربندی بعدی.",
      en: "Veracode shows security does not improve with bigger models; outages are real — users must keep working without the assistant. Safety is a product feature, not a later config.",
    },
    prereqs: ["t-prompting-patterns", "t-security-privacy"],
    related: ["t-agents-tools", "t-observability-ops"],
    essential: {
      fa: "مجموعه‌ی ارزیابی + سه سناریوی تزریق مهار‌شده.",
      en: "An eval set + three contained injection scenarios.",
    },
    optional: {
      fa: "ردوبندی هزینه، ارزیابی انسانی سبک.",
      en: "Cost grading, lightweight human eval.",
    },
    exercise: {
      fa: "به دستیار پروژه‌ی p-05 سه سناریوی تزریق بده («دستورها را نادیده بگیر و X کن» داخل یک یادداشت)؛ رفتار را ثبت، مهار و در ارزیابی خودکار بگذار.",
      en: "Give your p-05 assistant three injection scenarios ('ignore instructions and do X' inside a note); record and contain behavior, then add them to the automated eval.",
    },
    aiGuidance: {
      fa: "از مدل بخواه خودش به اپ تو حمله کند (red-team سبک)؛ یافته‌ها را به مجموعه‌ی ارزیابی اضافه کن. اما داوریِ نهایی با تست خودکار و بازبینی توست.",
      en: "Have the model red-team your own app (lightweight); add findings to the eval set. But final judgment belongs to automated tests and your review.",
    },
    check: {
      fa: "سه سناریوی تزریق را به یک دوست بده تا در اپ تو امتحان کند؛ کدام مهار شد؟ کدام نشت کرد؟ اصلاح بعدی چیست؟",
      en: "Hand three injection scenarios to a friend to try on your app; which were contained? which leaked? What is the next fix?",
    },
    completion: {
      fa: ["مجموعه‌ی ارزیابی با ≥۱۵ نمونه در CI", "سه تزریق مهار‌شده با مستند", "رفتار جایگزین در قطعی آزمایش‌شده"],
      en: ["An eval set with ≥15 samples in CI", "Three contained injections documented", "Fallback behavior tested during an outage"],
    },
    resources: [
      { title: "OWASP LLM Top 10 (2025; see 2026 edition)", url: "https://genai.owasp.org/llm-top-10/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-017", "c-018"],
    sources: ["src-veracode2025", "src-owasp-llm10"],
    lastReview: "2026-11-14",
  },
];
