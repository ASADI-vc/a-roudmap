import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "p-01",
    order: 1,
    title: { fa: "ابزار خط فرمان یادداشت", en: "CLI Notes Tool" },
    trackFocus: ["core"],
    topicIds: ["t-computational-thinking", "t-programming-basics", "t-typescript", "t-terminal-git", "t-debugging-testing", "t-communication-collab"],
    spec: {
      fa: "ابزار خط‌فرمانی «masir-notes» با TypeScript بساز: افزودن/فهرست/جست‌وجو/حذف یادداشت، ذخیره در فایل JSON محلی، خروجی تمیز جدولی. باید یک README واقعی داشته باشد که یک غریبه بتواند در ۵ دقیقه آن را اجرا کند.",
      en: "Build 'masir-notes', a TypeScript CLI: add/list/search/delete notes with local JSON storage and clean tabular output. It needs a real README that lets a stranger run it in 5 minutes.",
    },
    constraints: {
      fa: ["بدون فریم‌ورک CLI — فقط کتابخانه‌ی استاندارد و حداکثر یک پارسر آرگومان", "تایپ‌اسکریپت strict با صفر any", "تاریخچه‌ی گیت با کامیت‌های اتمیک و پیام‌های معنادار", "بدون سرویس شبکه — همه‌چیز محلی"],
      en: ["No CLI framework — standard library plus at most one arg parser", "Strict TypeScript, zero 'any'", "Git history with atomic commits and meaningful messages", "No network services — everything local"],
    },
    acceptance: {
      fa: ["همه‌ی چهار عملیات درست کار می‌کنند شامل حالت‌های مرزی (یادداشت خالی، جست‌وجوی بی‌نتیجه)", "دستکم ۸ تست واحد سبز برای منطق هسته", "README با نصب/استفاده/مثال‌ها", "بدون راز در تاریخچه؛ .gitignore درست"],
      en: ["All four operations work including edge cases (empty note, empty search result)", "At least 8 green unit tests for core logic", "README with install/usage/examples", "No secrets in history; correct .gitignore"],
    },
    rubric: [
      { id: "r1", criterion: { fa: "کارکرد درست شامل حالت‌های مرزی", en: "Correct function incl. edge cases" }, levels: { fa: ["عملیات اصلی کار می‌کند", "حالت‌های مرزی نیمه‌پوشش", "همه‌ی حالت‌ها با تست پوشش داده شده"], en: ["Core ops work", "Edge cases half-covered", "All cases covered with tests"] } },
      { id: "r2", criterion: { fa: "کیفیت تست‌ها", en: "Test quality" }, levels: { fa: ["چند تست پراکنده", "پوشش منطقی اصلی", "تست‌ها به‌عنوان مشخصات اجرایی"], en: ["A few tests", "Core logic covered", "Tests act as executable spec"] } },
      { id: "r3", criterion: { fa: "انضباط گیت و مستندات", en: "Git discipline & docs" }, levels: { fa: ["کامیت‌های مخلوط", "کامیت‌های اتمیک", "تاریخچه روایت‌گر + README کامل"], en: ["Mixed commits", "Atomic commits", "Narrative history + full README"] } },
      { id: "r4", criterion: { fa: "قابلیت توضیح", en: "Explainability" }, levels: { fa: ["توضیح کلی", "توضیح هر ماژول", "می‌توانی هر تصمیم را با مصالحه‌اش توضیح دهی"], en: ["General explanation", "Per-module explanation", "Can justify every decision with its trade-off"] } },
    ],
    aiPolicy: {
      fa: "مجاز: توضیح مفاهیم، تولید ایده‌ی نام/ساختار، بازبینی اولیه‌ی کد. ممنوع: تولید بدنه‌ی توابع هسته‌ای که تست می‌شوند — این‌ها باید از صفر نوشته و فهمیده شوند. هر خط کد باید قابل‌توضیح باشد.",
      en: "Allowed: concept explanations, naming/structure ideas, first-pass code review. Forbidden: generating the bodies of core tested functions — write and understand those from scratch. Every line must be explainable.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "p-02",
    order: 2,
    title: { fa: "API یادداشت ابری", en: "Cloud Notes API" },
    trackFocus: ["backend", "core"],
    topicIds: ["t-node-server-basics", "t-api-design", "t-databases-sql", "t-security-privacy", "t-deployment-cicd"],
    spec: {
      fa: "API REST برای یادداشت‌های چندکاربره: ثبت‌نام/ورود امن، CRUD با SQLite/PostgreSQL، قرارداد خطای ثابت، صفحه‌بندی و مستند قرارداد. استقرار روی میزبان رایگان با CI که تست‌ها را اجرا می‌کند.",
      en: "A REST API for multi-user notes: secure register/login, CRUD over SQLite/PostgreSQL, a consistent error contract, pagination, and a written contract doc. Deploy to a free host with CI running tests.",
    },
    constraints: {
      fa: ["هش رمز با الگوریتم مدرن؛ نشست کوکی HttpOnly", "اعتبارسنجی همه‌ی ورودی‌ها در مرز", "قرارداد خطای ثابت با کدهای وضعیت درست", "رازها فقط env؛ npm audit تمیز یا مستند"],
      en: ["Modern password hashing; HttpOnly cookie sessions", "Boundary validation on all inputs", "Consistent error contract with correct status codes", "Secrets only via env; clean or documented npm audit"],
    },
    acceptance: {
      fa: ["سند قرارداد API مکتوب و رعایت‌شده", "۱۰+ تست قراردادی سبز", "استقرار عمومی با URL کارا", "CI سبز روی push", "سه حمله‌ی شبیه‌سازی‌شده (bruteforce/تزریق/نشست) مهار‌شده"],
      en: ["Written API contract followed", "10+ green contract tests", "A working public deployment URL", "Green CI on push", "Three simulated attacks (brute force/injection/session) contained"],
    },
    rubric: [
      { id: "r1", criterion: { fa: "پایبندی به قرارداد", en: "Contract adherence" }, levels: { fa: ["قرارداد ضمنی", "قرارداد مکتوب", "قرارداد با تست‌های قراردادی"], en: ["Implicit contract", "Written contract", "Contract with contract tests"] } },
      { id: "r2", criterion: { fa: "امنیت پایه", en: "Baseline security" }, levels: { fa: ["رمز خام", "هش امن", "هش + قفل + نرخ‌گذاری + پیام امن"], en: ["Plaintext", "Secure hashing", "Hash + lockout + rate limit + safe messages"] } },
      { id: "r3", criterion: { fa: "استقرار و CI", en: "Deployment & CI" }, levels: { fa: ["فقط محلی", "استقرار دستی", "CI سبز + rollback تمرین‌شده"], en: ["Local only", "Manual deploy", "Green CI + rehearsed rollback"] } },
      { id: "r4", criterion: { fa: "مدیریت داده", en: "Data management" }, levels: { fa: ["اسکیمای تک‌جدولی", "اسکیمای رابطه‌ای", "FK + تراکنش + مهاجرت امن"], en: ["Single table", "Relational schema", "FKs + transactions + safe migration"] } },
    ],
    aiPolicy: {
      fa: "مجاز: تولید کد بوایلرپلیت مسیرها، تولید پرامپت تست، پیشنهاد اسکیما برای نقد. ممنوع: کد احراز هویت بدون بازبینی OWASP، مهاجرت‌ها بدون برنامه‌ی برگشت. هر diff باید در git history با پیام توضیح‌دار ثبت شود.",
      en: "Allowed: route boilerplate, test scaffolding, schema proposals for critique. Forbidden: auth code without OWASP review, migrations without rollback plans. Every diff must land in history with an explanatory message.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "p-03",
    order: 3,
    title: { fa: "داشبورد دسترس‌پذیر", en: "Accessible Dashboard" },
    trackFocus: ["frontend"],
    topicIds: ["t-html-css-foundations", "t-js-deep", "t-react-essentials", "t-web-accessibility", "t-frontend-state-data", "t-frontend-quality-perf"],
    spec: {
      fa: "داشبورد React+TS که از یک API عمومی واقعی داده می‌گیرد (مثلاً نرخ ارز یا هوا)، سه حالت بارگذاری/خالی/خطا را طراحی‌شده نشان می‌دهد، دسترس‌پذیری AA دارد و بودجه‌ی کارایی مستند می‌سازد.",
      en: "A React+TS dashboard fetching from a real public API (e.g. exchange rates or weather), with designed loading/empty/error states, AA accessibility, and a documented performance budget.",
    },
    constraints: {
      fa: ["بدون کتابخانه‌ی UI سنگین — CSS دستی یا ابزار کمکی سبک", "ناوبری کامل کیبورد با focus مرئی", "کش ساده برای درخواست‌ها با بی‌اعتبارسازی دستی", "حجم JS اولیه ≤ ۲۰۰KB gzip"],
      en: ["No heavy UI library — hand CSS or a light utility", "Full keyboard navigation with visible focus", "A simple request cache with manual invalidation", "Initial JS ≤ 200KB gzip"],
    },
    acceptance: {
      fa: ["سه حالت طراحی‌شده در همه‌ی ویجت‌ها", "آزمون کیبورد کامل + کنتراست AA تأییدشده", "دو گزارش Lighthouse با بهبود مستند", "یک تست رابط سبز روی مسیر حیاتی"],
      en: ["Designed three states in all widgets", "Full keyboard test + verified AA contrast", "Two Lighthouse reports with documented improvement", "One green UI test on a critical path"],
    },
    rubric: [
      { id: "r1", criterion: { fa: "دسترس‌پذیری", en: "Accessibility" }, levels: { fa: ["کیبورد ناقص", "کیبورد کامل", "AA مستند با صفحه‌خوان"], en: ["Partial keyboard", "Full keyboard", "AA documented with screen reader"] } },
      { id: "r2", criterion: { fa: "مدیریت وضعیت", en: "State management" }, levels: { fa: ["happy path", "حالت‌های خطا", "کش + به‌روزرسانی بهینه‌گرا"], en: ["Happy path", "Error states", "Cache + optimistic update"] } },
      { id: "r3", criterion: { fa: "کارایی", en: "Performance" }, levels: { fa: ["بدون اندازه‌گیری", "اندازه‌گیری اولیه", "بودجه + بهبود مستند"], en: ["Unmeasured", "Measured once", "Budget + documented improvement"] } },
      { id: "r4", criterion: { fa: "کیفیت رابط", en: "UI quality" }, levels: { fa: ["کارا ولی ناخوانا", "تمیز و واکنش‌گرا", "ظریف با حالت‌های طراحی‌شده"], en: ["Works but rough", "Clean & responsive", "Polished with designed states"] } },
    ],
    aiPolicy: {
      fa: "مجاز: تولید کامپوننت‌های نمایشی، پیشنهاد چیدمان. ممنوع: افزودن کتابخانه‌ها بدون توجیه بودجه، تولید منطق واکشی بدون بازبینی حالت‌ها. آزمون کیبورد/صفحه‌خوان باید شخصاً انجام شود.",
      en: "Allowed: presentational components, layout proposals. Forbidden: adding libraries without budget justification, fetching logic without state review. Keyboard/screen-reader testing must be done personally.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "p-04",
    order: 4,
    title: { fa: "ردیاب عادت تمام‌پشته", en: "Full-Stack Habit Tracker" },
    trackFocus: ["backend", "frontend"],
    topicIds: ["t-api-design", "t-auth-basics", "t-data-modeling", "t-react-essentials", "t-frontend-state-data", "t-caching-async-patterns"],
    spec: {
      fa: "اپ تمام‌پشته‌ی «عادت‌یار»: ثبت عادت روزانه، نمودار پیشرفت، حساب کاربری امن، و گزارش هفتگی. اسکیمای رابطه‌ای با مهاجرت امن، کش گزارش، و لاگ ساخت‌یافته.",
      en: "A full-stack 'habit tracker': daily habit logging, a progress chart, secure accounts, and a weekly report. Relational schema with safe migration, cached report, structured logs.",
    },
    constraints: {
      fa: ["همه‌ی endpointها نیازمند نشست معتبر", "مهاجرت‌ها با برنامه‌ی برگشت", "گزارش هفتگی از کش با TTL و بی‌اعتبارسازی هدفمند", "Lighthouse عملکرد ≥ ۸۰ روی موبایل"],
      en: ["Every endpoint requires a valid session", "Migrations with rollback plans", "Weekly report cached with TTL + targeted invalidation", "Lighthouse performance ≥ 80 on mobile"],
    },
    acceptance: {
      fa: ["جریان ثبت‌نام/ورود امن کامل", "اسکیما با FK و تراکنش واقعی", "دو مهاجرت اجرا‌شده با مستند برگشت", "N+1 پیدا و با عدد حل‌شده", "استقرار عمومی کارا"],
      en: ["Complete secure register/login flow", "Schema with real FKs and transactions", "Two executed migrations with documented rollback", "One N+1 found and fixed with numbers", "A working public deployment"],
    },
    rubric: [
      { id: "r1", criterion: { fa: "امنیت حساب", en: "Account security" }, levels: { fa: ["ورود ساده", "هش + نشست امن", "قفل + نرخ‌گذاری + پیام امن"], en: ["Simple login", "Hash + secure session", "Lockout + rate limit + safe messages"] } },
      { id: "r2", criterion: { fa: "مدل داده", en: "Data model" }, levels: { fa: ["JSON در ستون", "رابطه‌ای با FK", "مهاجرت امن + تراکنش"], en: ["JSON in a column", "Relational with FKs", "Safe migration + transactions"] } },
      { id: "r3", criterion: { fa: "کارایی", en: "Performance" }, levels: { fa: ["بدون اندازه‌گیری", "کش ساده", "کش + N+1 حل‌شده با عدد"], en: ["Unmeasured", "Simple cache", "Cache + fixed N+1 with numbers"] } },
      { id: "r4", criterion: { fa: "تجربه‌ی محصول", en: "Product feel" }, levels: { fa: ["کارا", "تمیز", "ظریف با نمودار و حالت‌ها"], en: ["Functional", "Clean", "Polished with chart and states"] } },
    ],
    aiPolicy: {
      fa: "مجاز: کامپوننت‌های نمایشی، تولید تست، پیشنهاد کوئری برای نقد. ممنوع: احراز هویت تولیدی بدون بازبینی + تست حمله، مهاجرت روی داده‌ی واقعی بدون snapshot. لاگ «سپرده/نگه‌داشته» لازم است.",
      en: "Allowed: presentational components, test scaffolding, query proposals for critique. Forbidden: generated auth without review + attack tests, migrations on real data without a snapshot. A delegation log is required.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "p-05",
    order: 5,
    title: { fa: "دستیار مطالعه با RAG", en: "RAG Study Assistant" },
    trackFocus: ["aiapps"],
    topicIds: ["t-llm-fundamentals", "t-prompting-patterns", "t-rag-embeddings", "t-agents-tools", "t-ai-safety-eval"],
    spec: {
      fa: "دستیار مطالعه‌ای که فقط از «یادداشت‌های خود کاربر» پاسخ می‌دهد: قطعه‌بندی یادداشت‌ها، بازیابی واژگانی دوزبانه، پرامپت سیستمی با ارجاع اجباری به رکورد، ارزیابی ۲۰ نمونه‌ای و سناریوهای تزریق مهار‌شده. اجرا با Puter (مدل user-pays).",
      en: "A study assistant that answers ONLY from the user's own notes: note chunking, bilingual lexical retrieval, a system prompt requiring record citations, a 20-sample eval, and contained injection scenarios. Runs via Puter (user-pays model).",
    },
    constraints: {
      fa: ["پاسخ بدون رکورد بازیابی‌شده ممنوع — باید «نمی‌دانم» بگوید", "زمینه‌ی ارسالی سقف‌دار (≤ ۴ رکورد)", "سقف گام ابزار ≤ ۵ و بدون حلقه‌ی بی‌نهایت", "ارزیابی خودکار با ۲۰ پرسش در CI"],
      en: ["No answers without retrieved records — must say 'I don't know'", "Bounded context (≤ 4 records sent)", "Tool step budget ≤ 5, no infinite loops", "Automated eval with 20 questions in CI"],
    },
    acceptance: {
      fa: ["ارجاع‌های قابل‌کلیک به رکورد واقعی", "سه سناریوی تزریق مهار‌شده با مستند", "دقت ارجاع ≥ ۸۰٪ روی مجموعه‌ی ارزیابی", "رفتار جایگزین در قطعی Puter آزمایش‌شده"],
      en: ["Clickable citations resolving to real records", "Three contained injection scenarios documented", "Citation accuracy ≥ 80% on the eval set", "Fallback behavior tested during a Puter outage"],
    },
    rubric: [
      { id: "r1", criterion: { fa: "زمینه‌سازی و ارجاع", en: "Grounding & citation" }, levels: { fa: ["پاسخ آزاد", "ارجاع گاه‌به‌گاه", "هر ادعا با رکورد قابل‌کلیک"], en: ["Free answers", "Occasional citations", "Every claim with a clickable record"] } },
      { id: "r2", criterion: { fa: "ایمنی", en: "Safety" }, levels: { fa: ["بدون مهار", "فیلتر پایه", "تزریق‌ها مهار‌شده + سقف مصرف"], en: ["No containment", "Basic filter", "Injections contained + usage caps"] } },
      { id: "r3", criterion: { fa: "کیفیت بازیابی", en: "Retrieval quality" }, levels: { fa: ["جست‌وجوی ساده", "قطعه‌بندی درست", "دوزبانه با سنجه"], en: ["Naive search", "Proper chunking", "Bilingual with metrics"] } },
      { id: "r4", criterion: { fa: "ارزیابی", en: "Evaluation" }, levels: { fa: ["بدون ارزیابی", "چند پرسش دستی", "ارزیابی خودکار در CI"], en: ["None", "A few manual checks", "Automated eval in CI"] } },
    ],
    aiPolicy: {
      fa: "مجاز: استفاده از مدل برای «محصول» (این هدف پروژه است)، کمک در طراحی ارزیابی. ممنوع: پنهان‌کردن رفتار ارجاع‌دهی، ارسال داده‌ی حساس به مدل، آزمون فقط با سؤال‌های خوش‌بینانه.",
      en: "Allowed: using the model for 'the product' (that's the project's point), help designing evals. Forbidden: hiding citation behavior, sending sensitive data to the model, testing only with happy-path questions.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "p-06",
    order: 6,
    title: { fa: "پایان‌نامه‌ی کوچک: استقرار و روایت", en: "Capstone: Deploy & Narrative" },
    trackFocus: ["core", "frontend", "backend"],
    topicIds: ["t-deployment-cicd", "t-observability-ops", "t-communication-collab", "t-ai-assisted-workflow"],
    spec: {
      fa: "یکی از پروژه‌های قبلی را به سطح «مدارک صلاحیت» برسان: استقرار پایدار با CI، مشاهده‌پذیری حداقلی، پس‌آموزی یک حادثه، و یک متن ۸۰۰-کلمه‌ای که «چرا این تصمیم‌ها» را روایت می‌کند — این متن همان چیزی است که در مصاحبه تفاوت می‌سازد.",
      en: "Take one prior project to 'competence evidence' level: stable deployment with CI, minimal observability, a postmortem of one incident, and an 800-word narrative of 'why these decisions' — the text that differentiates you in interviews.",
    },
    constraints: {
      fa: ["CI سبز با تست‌های واقعی", "لاگ ساخت‌یافته + دو متریک", "مستندات با معماری و مصالحه‌ها", "بدون شعارات‌فروشی — اعداد و محدودیت‌ها صادقانه"],
      en: ["Green CI with real tests", "Structured logs + two metrics", "Docs covering architecture and trade-offs", "No buzzword inflation — honest numbers and limits"],
    },
    acceptance: {
      fa: ["استقرار پایدار با URL عمومی", "یک حادثه‌ی مستند با پس‌آموزی", "متن روایت با تصمیم/مصالحه/عدد", "چک‌لیست نگهداشت برای «شش ماه بعد»"],
      en: ["A stable deployment with a public URL", "One documented incident with postmortem", "A narrative with decisions/trade-offs/numbers", "A maintenance checklist for 'six months later'"],
    },
    rubric: [
      { id: "r1", criterion: { fa: "بلوغ عملیاتی", en: "Operational maturity" }, levels: { fa: ["استقرار دستی", "CI سبز", "CI + مشاهده‌پذیری + پس‌آموزی"], en: ["Manual deploy", "Green CI", "CI + observability + postmortem"] } },
      { id: "r2", criterion: { fa: "روایت فنی", en: "Technical narrative" }, levels: { fa: ["فهرست امکانات", "توضیح معماری", "روایت تصمیم‌ها با مصالحه و عدد"], en: ["Feature list", "Architecture explanation", "Decision narrative with trade-offs and numbers"] } },
      { id: "r3", criterion: { fa: "صداقت شواهد", en: "Evidence honesty" }, levels: { fa: ["ادعای بدون عدد", "عددهای کلی", "عدد قبل/بعد + محدودیت‌ها صادقانه"], en: ["Claims without numbers", "Rough numbers", "Before/after + honest limitations"] } },
      { id: "r4", criterion: { fa: "نگهداشت‌پذیری", en: "Maintainability" }, levels: { fa: ["بدون راهنما", "README کارا", "راهنمای نگهداشت + چک‌لیست بازبینی"], en: ["No guide", "Usable README", "Maintenance guide + review checklist"] } },
    ],
    aiPolicy: {
      fa: "مجاز: کمک در ویرایش متن، پیشنهاد متریک. ممنوع: تولید متن روایت به‌عنوان کل — تجربه‌ی واقعی تو باید در آن بنشیند؛ مصاحبه‌گر تفاوت را می‌فهمد.",
      en: "Allowed: editing help, metric proposals. Forbidden: generating the narrative wholesale — your real experience must be in it; interviewers can tell.",
    },
    lastReview: "2026-11-14",
  },
];
