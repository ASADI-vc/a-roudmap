import type { Topic } from "./types";

export const backendTopics: Topic[] = [
  {
    id: "t-node-server-basics",
    track: "backend",
    order: 1,
    title: { fa: "پایه‌های سرور با Node.js", en: "Server Basics with Node.js" },
    terms: [
      { fa: "سرور HTTP", en: "HTTP server (سرور HTTP)" },
      { fa: "مسیریابی (Routing)", en: "Routing (مسیریابی)" },
      { fa: "میان‌افزار (Middleware)", en: "Middleware (میان‌افزار)" },
      { fa: "پیکربندی (Configuration)", en: "Configuration (پیکربندی)" },
    ],
    summary: {
      fa: "از صفر یک سرور HTTP با Node می‌سازی: مسیرها، پاسخ‌ها، پیکربندی از متغیر محیطی و لاگ درخواست‌ها. بعداً فریم‌ورک‌ها را می‌گیری اما می‌فهمی زیرشان چیست. Node انتخاب ماست چون همان زبان مسیر فرانت‌اند است؛ پایتون/Go جایگزین‌های مشروع‌اند.",
      en: "You build an HTTP server from scratch with Node: routes, responses, config via env vars, request logging. Frameworks come later — but you'll know what's underneath. Node because it shares the frontend language; Python/Go are legitimate alternatives.",
    },
    outcomes: {
      fa: [
        "سرور HTTP خام را بدون فریم‌ورک راه بیندازی",
        "مسیرها را با متد/الگو پردازش کنی",
        "خطاها را به پاسخ‌های HTTP درست نگاشت کنی",
        "پیکربندی را از env بخوانی و اعتبارسنجی کنی",
      ],
      en: [
        "Bootstrap a raw HTTP server without frameworks",
        "Handle routes by method/pattern",
        "Map errors to correct HTTP responses",
        "Read and validate config from env",
      ],
    },
    why: {
      fa: "وقتی عامل‌های هوش مصنوعی سرور می‌سازند، بدون فهم لایه‌ی زیرین نمی‌فهمی چرا «گاهی» پاسخ اشتباه می‌آید (هدر، encoding، خطای نیمه‌شکست). لایه‌ی خام، مرجع فهم توست.",
      en: "When AI agents build servers, without the underlying layer you can't tell why responses are 'sometimes' wrong (headers, encoding, partial failures). The raw layer is your reference of truth.",
    },
    prereqs: ["t-programming-basics", "t-http-web"],
    related: ["t-typescript", "t-os-concepts"],
    essential: {
      fa: "سرور خام + دو مسیر + مدیریت خطا + لاگ.",
      en: "A raw server + two routes + error handling + logging.",
    },
    optional: {
      fa: "استریم‌ها، worker_threads در سطح مفهومی.",
      en: "Streams, worker_threads conceptually.",
    },
    exercise: {
      fa: "سرور خامی بساز که /notes را با GET/POST پاسخ دهد (داده در حافظه)، پیکربندی پورت از env، لاگ ساخت‌یافته‌ی هر درخواست و پاسخ ۴۰۴/۴۰۰ درست.",
      en: "Build a raw server serving /notes with GET/POST (in-memory data), port from env, structured per-request logs, and correct 404/400 responses.",
    },
    aiGuidance: {
      fa: "از مدل بخواه کد را با «سناریوی خرابی» بنویسد (ورودی بد، JSON نامعتبر)؛ خودت این سناریوها را با curl اجرا کنی. هر میان‌افزار تولیدی را خط‌به‌خط بخوان.",
      en: "Have the model write code with failure scenarios in mind (bad input, invalid JSON); you run those scenarios with curl yourself. Read every generated middleware line-by-line.",
    },
    check: {
      fa: "دو قطعه‌کد سرور را مقایسه کن: کدام خطا را به 500 عمومی می‌فرستد و کدام درست نگاشت می‌کند؟ چرا mapping درست برای عملیات مهم است؟",
      en: "Compare two server snippets: which sends everything to a generic 500 and which maps correctly? Why does correct mapping matter for operations?",
    },
    completion: {
      fa: ["سرور خام با ۲ مسیر و خطای درست", "لاگ ساخت‌یافته با request id", "پیکربندی env اعتبارسنجی‌شده"],
      en: ["A raw server with 2 routes and correct errors", "Structured logs with request id", "Validated env config"],
    },
    resources: [
      { title: "Node.js — Introduction to Node.js (official)", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-node-docs"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-api-design",
    track: "backend",
    order: 2,
    title: { fa: "طراحی API", en: "API Design" },
    terms: [
      { fa: "منبع (Resource)", en: "Resource (منبع)" },
      { fa: "اعتبارسنجی (Validation)", en: "Validation (اعتبارسنجی)" },
      { fa: "صفحه‌بندی (Pagination)", en: "Pagination (صفحه‌بندی)" },
      { fa: "خطای معنادار (Error contract)", en: "Error contract (خطای معنادار)" },
    ],
    summary: {
      fa: "API قرارداد تو با مصرف‌کننده‌هاست: منبع‌ها، متدها، کدهای وضعیت، قالب خطا و صفحه‌بندی. یاد می‌گیری قرارداد را قبل از کد بنویسی و اعتبارسنجی ورودی را در مرز اجرا کنی — همان جایی که امنیت شروع می‌شود.",
      en: "An API is your contract with consumers: resources, methods, status codes, error format, pagination. You learn to write the contract before code and to validate input at the boundary — exactly where security begins.",
    },
    outcomes: {
      fa: [
        "قرارداد API را به‌صورت سند بنویسی",
        "خطاهای معنادار با کد وضعیت درست برگردانی",
        "ورودی‌ها را در مرز اعتبارسنجی کنی",
        "صفحه‌بندی و فیلتر را طراحی کنی",
      ],
      en: [
        "Write the API contract as a document",
        "Return meaningful errors with correct status codes",
        "Validate input at the boundary",
        "Design pagination and filtering",
      ],
    },
    why: {
      fa: "معیار پذیرش API شماست؛ بدون قرارداد مکتوب، بازبینی کد تولیدی معیار ندارد و هر اشکال «قابل‌بحث» می‌شود. قرارداد خطای ثابت هم نصف دیباگِ اپ‌های هوش‌مصنوعی‌ساخته را ساده می‌کند.",
      en: "Your API contract is the acceptance criteria; without a written contract, generated-code review has no target and every defect becomes 'debatable'. A consistent error contract also halves debugging of AI-built apps.",
    },
    prereqs: ["t-node-server-basics", "t-http-web"],
    related: ["t-databases-sql", "t-auth-basics"],
    essential: {
      fa: "سند قرارداد + پیاده‌سازی با اعتبارسنجی مرزی.",
      en: "A written contract + implementation with boundary validation.",
    },
    optional: {
      fa: "نسخه‌بندی، OpenAPI، محدودسازی نرخ.",
      en: "Versioning, OpenAPI, rate limiting.",
    },
    exercise: {
      fa: "برای API یادداشت‌ها: قرارداد (۵ مسیر، قالب خطا، صفحه‌بندی) را مکتوب بنویس؛ پیاده‌سازی کن و سه تست قراردادی بنویس که شکستن قرارداد را زنده نشان دهد.",
      en: "For a notes API: write the contract (5 routes, error format, pagination); implement it; write three contract tests that catch live contract violations.",
    },
    aiGuidance: {
      fa: "قرارداد را تو بنویس و از مدل بخواه پیاده‌سازی کند و در حین کار از تو سؤال شفاف‌سازی بپرسد؛ سؤال‌هایش خطاهای قرارداد تو را آشکار می‌کنند.",
      en: "You write the contract; have the model implement it and ask clarifying questions — its questions reveal your contract's ambiguities.",
    },
    check: {
      fa: "سه پاسخ خطا را داوری کن: کدام کد وضعیت غلط است؟ کدام پیام، اطلاعات داخلی را لو می‌دهد؟ کدام مصرف‌کننده را گمراه می‌کند؟",
      en: "Judge three error responses: which status code is wrong? which leaks internals? which misleads the consumer?",
    },
    completion: {
      fa: ["سند قرارداد مکتوب", "اعتبارسنجی مرزی روی همه‌ی ورودی‌ها", "تست قرارداد سبز"],
      en: ["A written contract document", "Boundary validation on all inputs", "Green contract tests"],
    },
    resources: [
      { title: "MDN — HTTP methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-031"],
    sources: ["src-mdn-http", "src-se2024"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-data-modeling",
    track: "backend",
    order: 3,
    title: { fa: "مدل‌سازی داده و مهاجرت‌ها", en: "Data Modeling & Migrations" },
    terms: [
      { fa: "نرمال‌سازی (Normalization)", en: "Normalization (نرمال‌سازی)" },
      { fa: "ایندکس (Index)", en: "Index (ایندکس)" },
      { fa: "مهاجرت (Migration)", en: "Migration (مهاجرت)" },
      { fa: "یکپارچگی (Integrity)", en: "Integrity (یکپارچگی)" },
    ],
    summary: {
      fa: "از «جدول کار می‌کند» تا «طراحی داده‌ای که سال‌ها تحمل می‌کند»: نرمال‌سازی عملی، ایندکس‌ها با اندازه‌گیری، مهاجرت‌های ایمن و تراکنش‌های چندمرحله‌ای. اسکیما بلندمدت‌ترین دارایی پروژه است.",
      en: "From 'the table works' to 'a design that survives years': practical normalization, measured indexes, safe migrations, multi-step transactions. The schema is the project's longest-lived asset.",
    },
    outcomes: {
      fa: [
        "اسکیمای چندجدولی را با یکپارچگی طراحی کنی",
        "ایندکس را با EXPLAIN تأیید کنی",
        "مهاجرت بدون از دست دادن داده بنویسی",
        "تراکنش چندمرحله‌ای با rollback بنویسی",
      ],
      en: [
        "Design a multi-table schema with integrity",
        "Verify an index with EXPLAIN",
        "Write a migration without data loss",
        "Write a multi-step transaction with rollback",
      ],
    },
    why: {
      fa: "هوش مصنوعی اسکیما را «برای همین امروز» می‌سازد؛ هزینه‌ی اشتباهِ مدل‌سازی دو سال بعد معلوم می‌شود. تغییر اسکیما با داده‌ی واقعی، پرهزینه‌ترین بازنویسی است — اینجا این ریسک را مدیریت می‌کنی.",
      en: "AI designs schemas 'for today'; modeling mistakes surface two years later. Schema changes with real data are the most expensive rewrite — here you learn to manage that risk.",
    },
    prereqs: ["t-databases-sql"],
    related: ["t-api-design", "t-os-concepts"],
    essential: {
      fa: "یک طراحی کامل + دو مهاجرت واقعی + EXPLAIN.",
      en: "One complete design + two real migrations + EXPLAIN.",
    },
    optional: {
      fa: "دنه‌سازی داده، توارث جدول، partitioning مفهومی.",
      en: "Data denormalization, inheritance, partitioning concepts.",
    },
    exercise: {
      fa: "اسکیمای فروشگاه را طراحی کن؛ یک گزارش کند بساز، با EXPLAIN مقصر را پیدا کن و ایندکس درست را با عدد قبل/بعد مستند کن؛ سپس یک مهاجرت تغییر نوع ستون بنویس.",
      en: "Design a shop schema; build a slow report, find the culprit with EXPLAIN, document the right index with before/after numbers; then write a column-type-change migration.",
    },
    aiGuidance: {
      fa: "مهاجرت‌های تولیدی را هرگز مستقیم روی داده‌ی واقعی اجرا نکن: اول روی snapshot، بعد با برنامه‌ی برگشت. از مدل بخواه دو مهاجرت (پیش/پس) بنویسد و تو انتگرال‌شان را تأیید کنی.",
      en: "Never run generated migrations straight on real data: rehearse on a snapshot, with a rollback plan. Ask the model for up/down migrations and verify their round trip yourself.",
    },
    check: {
      fa: "یک مهاجرت خطرناک (حذف ستون بدون پشتیبان) را از یک مهاجرت امن تشخیص بده و سه گام امن‌سازی را نام ببر.",
      en: "Tell a dangerous migration (dropping a column without backup) from a safe one, and name three safety steps.",
    },
    completion: {
      fa: ["طراحی با یکپارچگی واقعی", "ایندکس اندازه‌گیری‌شده با عدد", "مهاجرت با برنامه‌ی برگشت"],
      en: ["A design with real integrity", "A measured index with numbers", "A migration with a rollback plan"],
    },
    resources: [
      { title: "PostgreSQL — Advanced features (official tutorial)", url: "https://www.postgresql.org/docs/current/tutorial-advanced.html", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-postgres-manual"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-auth-basics",
    track: "backend",
    order: 4,
    title: { fa: "احراز هویت و نشست‌ها", en: "Authentication & Sessions" },
    terms: [
      { fa: "هش رمز (Password hashing)", en: "Password hashing (هش رمز)" },
      { fa: "نشست (Session)", en: "Session (نشست)" },
      { fa: "توکن (Token/JWT)", en: "Token/JWT (توکن)" },
      { fa: "چرخه‌ی توکن (Token rotation)", en: "Token rotation (چرخه‌ی توکن)" },
    ],
    summary: {
      fa: "از هش امن رمز عبور تا نشست و توکن: تفاوت‌ها، مصالحه‌ها و دام‌های رایج (JWT در localStorage، نشست گم‌شده، فراموشی نرخ‌گذاری). یک جریان ثبت‌نام/ورود کامل را با تست می‌سازی.",
      en: "From secure password hashing to sessions vs tokens: differences, trade-offs, common traps (JWT in localStorage, lost sessions, missing rate limiting). You build a complete register/login flow with tests.",
    },
    outcomes: {
      fa: [
        "رمز را با الگوریتم مدرن هش و تأیید کنی",
        "نشست امن بسازی و مدیریت کنی",
        "مصالحه‌ی نشست/توکن را توضیح دهی",
        "نرخ‌گذاری ورود و پیام خطای امن بنویسی",
      ],
      en: [
        "Hash and verify passwords with a modern algorithm",
        "Build and manage secure sessions",
        "Explain the session/token trade-off",
        "Add login rate limiting and safe error messages",
      ],
    },
    why: {
      fa: "احراز هویت دقیقاً همان جایی است که کد تولیدی بدترین خطاها را دارد ( Pearce: ~۴۰٪ آسیب‌پذیر در سناریوهای امنیتی). قفل‌کردن حساب‌ها، ذخیره‌ی راز و چرخه‌ی توکن جزئیاتی‌اند که مدل‌ها راحت ازشان رد می‌شوند.",
      en: "Auth is where generated code makes its worst mistakes (Pearce et al.: ~40% of outputs vulnerable in security scenarios). Account lockouts, secret storage and token rotation are details models skip.",
    },
    prereqs: ["t-api-design", "t-security-privacy"],
    related: ["t-caching-async-patterns", "t-ai-safety-eval"],
    essential: {
      fa: "جریان ثبت‌نام/ورود واقعی با هش مدرن + نشست امن.",
      en: "A real register/login flow with modern hashing + secure sessions.",
    },
    optional: {
      fa: "OAuth در سطح مفهومی، MFA.",
      en: "OAuth conceptually, MFA.",
    },
    exercise: {
      fa: "جریان ورود بساز: هش رمز، نشست کوکی HttpOnly، قفل پس از ۵ شکست، پیام خطای عمومی. بعد سه حمله‌ی رایج (Bruteforce، رمز ضعیف، نشست ثابت) را در محیط محلی شبیه‌سازی و مستند کن.",
      en: "Build a login flow: password hashing, HttpOnly cookie session, lockout after 5 failures, generic error messages. Then simulate three common attacks locally (brute force, weak password, session fixation) and document.",
    },
    aiGuidance: {
      fa: "هیچ کد احراز هویت تولیدی را بدون بازبینی با چک‌لیست OWASP ادغام نکن: الگوریتم هش، مقایسه‌ی ثابت‌زمان، کوچک‌ترین سطح حمله. از مدل بخواه خودش را نقد کند، بعد با تست حمله تأیید کن.",
      en: "Never merge generated auth code without the OWASP checklist review: hashing algorithm, constant-time comparison, minimal attack surface. Have the model self-critique, then verify with attack tests.",
    },
    check: {
      fa: "سه قطعه‌کد ورود را امنیت‌سنجی کن: کدام هش ضعیف دارد؟ کدام پیام خطا نشت اطلاعات می‌دهد؟ کدام نشست را ثابت نگه می‌دارد؟",
      en: "Security-review three login snippets: which uses weak hashing? which leaks info via error messages? which fixes sessions?",
    },
    completion: {
      fa: ["جریان ورود با هش مدرن و نشست امن", "قفل حساب و نرخ‌گذاری", "سه حمله شبیه‌سازی‌شده و مهار‌شده"],
      en: ["Login flow with modern hashing and secure sessions", "Lockout and rate limiting", "Three simulated and contained attacks"],
    },
    resources: [
      { title: "OWASP — Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-016", "c-019"],
    sources: ["src-pearce2022", "src-owasp-top10"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-caching-async-patterns",
    track: "backend",
    order: 5,
    title: { fa: "کش و الگوهای ناهمگام سمت سرور", en: "Caching & Server-Side Async Patterns" },
    terms: [
      { fa: "کش TTL", en: "TTL cache (کش TTL)" },
      { fa: "صف کار (Job queue)", en: "Job queue (صف کار)" },
      { fa: "N+1", en: "N+1 (هزار و یک کوئری)" },
      { fa: "پشت‌به‌فشردگی (Backpressure)", en: "Backpressure (پشت‌به‌فشردگی)" },
    ],
    summary: {
      fa: "سرعت و مقاوم‌سازی سرویس: کش با TTL و بی‌اعتبارسازی، انتقال کارهای سنگین به صف، حل N+1 و فهم پشت‌به‌فشردگی. هر تصمیم را با عدد قبل/بعد تأیید می‌کنی.",
      en: "Service speed and resilience: TTL caching with invalidation, moving heavy work to queues, fixing N+1, and understanding backpressure — every decision verified with before/after numbers.",
    },
    outcomes: {
      fa: [
        "کش TTL با بی‌اعتبارسازی هدفمند بزنی",
        "N+1 را در کوئری واقعی پیدا و حل کنی",
        "کار سنگین را به صف بفرستی",
        "رفتار سرویس زیر بار را اندازه بگیری",
      ],
      en: [
        "Add a TTL cache with targeted invalidation",
        "Find and fix a real N+1",
        "Move heavy work to a queue",
        "Measure service behavior under load",
      ],
    },
    why: {
      fa: "مدل‌ها راه‌حل «ساده» را می‌دهند که اغلب ن+۱ است؛ فهم هزینه‌ی هر درخواست، تفاوت بین demo و تولید است. کاشی‌سازی هر بهبود با عدد، خودش عادتِ ضدفلوب سنجی است.",
      en: "Models hand you the 'simple' solution, which is often N+1; understanding per-request cost separates a demo from production. Measuring every improvement is itself the anti-fluency-illusion habit.",
    },
    prereqs: ["t-node-server-basics", "t-data-modeling"],
    related: ["t-algorithms-core", "t-observability-ops"],
    essential: {
      fa: "یک کش واقعی + یک N+1 حل‌شده با عدد.",
      en: "One real cache + one fixed N+1 with numbers.",
    },
    optional: {
      fa: "Redis در سطح مفهومی، idempotency keys.",
      en: "Redis conceptually, idempotency keys.",
    },
    exercise: {
      fa: "به API گزارش‌گیری: کش TTL برای گزارش سنگین + بی‌اعتبارسازی بعد از تغییر داده؛ N+1 را در فهرست سفارش‌ها پیدا و با JOIN حل کن؛ عدد قبل/بعد مستند کن.",
      en: "For a reporting API: TTL-cache the heavy report + invalidate after data changes; find the N+1 in the orders list and fix with a JOIN; document before/after numbers.",
    },
    aiGuidance: {
      fa: "پیشنهاد کشِ تولیدی را با «چه زمانی بی‌اعتبار می‌شود؟» بسنج؛ جواب «هرگز» یعنی باگ در انتظار. تست زیر بار را خودت با ابزار ساده اجرا کن.",
      en: "Judge generated caching with 'when does it invalidate?' — 'never' is a bug waiting. Run the load test yourself with a simple tool.",
    },
    check: {
      fa: "سه طراحی کش را داوری کن: کدام stale-namestale می‌شود؟ کدام هرگز منقضی نمی‌شود؟ کدام بی‌اعتبارسازی هدفمند دارد؟",
      en: "Judge three cache designs: which serves stale data? which never expires? which has targeted invalidation?",
    },
    completion: {
      fa: ["کش با بی‌اعتبارسازی هدفمند", "N+1 با عدد قبل/بعد", "صف کار با یک consumer واقعی"],
      en: ["Cache with targeted invalidation", "N+1 with before/after numbers", "A job queue with a real consumer"],
    },
    resources: [
      { title: "Google SRE — Handling Overload (concepts)", url: "https://sre.google/sre-book/handling-overload/", lang: "en", level: "reference", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-srebook", "src-postgres-manual"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-ops-containers",
    track: "backend",
    order: 6,
    title: { fa: "عملیات و کانتینرها", en: "Operations & Containers" },
    terms: [
      { fa: "کانتینر (Container)", en: "Container (کانتینر)" },
      { fa: "ایمیج تکرارپذیر (Reproducible image)", en: "Reproducible image (ایمیج تکرارپذیر)" },
      { fa: "سلامت سرویس (Healthcheck)", en: "Healthcheck (سلامت سرویس)" },
      { fa: "چرخش لاگ (Log rotation)", en: "Log rotation (چرخش لاگ)" },
    ],
    summary: {
      fa: "سرویس را «قابل‌حمل» می‌کنی: Dockerfile تکرارپذیر با لایه‌های تمیز، healthcheck، محدودسازی منابع و چرخش لاگ — همان چیزی که استقرار روی هر میزبانی را پیش‌بینی‌پذیر می‌کند.",
      en: "You make a service portable: a reproducible Dockerfile with clean layers, healthchecks, resource limits, log rotation — the things that make deployment on any host predictable.",
    },
    outcomes: {
      fa: [
        "Dockerfile چندلایه‌ی تمیز بنویسی",
        "سلامت سرویس و شروع تمیز پیاده کنی",
        "مصرف منابع را محدود و اندازه بگیری",
        "یک اشکال استقرار با لاگ ریشه‌یابی کنی",
      ],
      en: [
        "Write a clean multi-stage Dockerfile",
        "Implement health checks and clean startup",
        "Limit and measure resource usage",
        "Root-cause one deployment bug from logs",
      ],
    },
    why: {
      fa: "SWEBOK v4 «عملیات» را حوزه‌ی مستقل کرده است؛ و با عامل‌های کدنویس، استقرار ناپایدارِ تکرارشونده رایج‌تر می‌شود. کانتینر، «روی دستگاه من کار می‌کرد» را حذف می‌کند.",
      en: "SWEBOK v4 made 'SE Operations' a standalone area; with coding agents, unstable repeated deploys get more common. Containers remove 'it worked on my machine'.",
    },
    prereqs: ["t-deployment-cicd", "t-node-server-basics"],
    related: ["t-os-concepts", "t-observability-ops"],
    essential: {
      fa: "کانتینری‌سازی یک سرویس واقعی + healthcheck + یک ریشه‌یابی لاگ.",
      en: "Containerize one real service + healthcheck + one log-based root-cause.",
    },
    optional: {
      fa: "docker compose چندسرویسی، امنیت ایمیج.",
      en: "Multi-service compose, image security.",
    },
    exercise: {
      fa: "سرویس p-02 را کانتینر کن: multi-stage build، healthcheck، محدودیت حافظه؛ بعد یک اشکال استقرار عمدی (env گم‌شده) را با لاگ ریشه‌یابی و مستند کن.",
      en: "Containerize p-02: multi-stage build, healthcheck, memory limit; then root-cause a deliberate deploy bug (missing env) from logs and document.",
    },
    aiGuidance: {
      fa: "Dockerfile تولیدی را با «هر لایه چه می‌کند؟» بخوان؛ رازها را از image حذف کن (multi-stage) و size قبل/بعد را مقایسه کن.",
      en: "Read generated Dockerfiles with 'what does each layer do?'; strip secrets from images (multi-stage) and compare sizes before/after.",
    },
    check: {
      fa: "سه Dockerfile را مقایسه کن: کدام راز لو می‌دهد؟ کدام cache را خراب می‌کند؟ کدام تکرارپذیر است؟",
      en: "Compare three Dockerfiles: which leaks secrets? which breaks caching? which is reproducible?",
    },
    completion: {
      fa: ["ایمیج ساخته و اجرا‌شده با healthcheck", "محدودیت منابع آزمایش‌شده", "یک ریشه‌یابی مستند"],
      en: ["An image built and run with healthcheck", "Resource limits tested", "One documented root-cause"],
    },
    resources: [
      { title: "Docker — Get started (official docs)", url: "https://docs.docker.com/get-started/", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-027"],
    sources: ["src-swebok4", "src-12factor"],
    lastReview: "2026-11-14",
  },
];
