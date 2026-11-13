import type { Topic } from "./types";

// Shared foundation — track "core". IDs are language-independent.
export const coreTopics: Topic[] = [
  {
    id: "t-computational-thinking",
    track: "core",
    order: 1,
    title: { fa: "تفکر محاسباتی و تجزیه مسئله", en: "Computational Thinking & Problem Decomposition" },
    terms: [
      { fa: "تجزیه (Decomposition)", en: "Decomposition (تجزیه)" },
      { fa: "انتزاع (Abstraction)", en: "Abstraction (انتزاع)" },
      { fa: "الگوریتم (Algorithm)", en: "Algorithm (الگوریتم)" },
      { fa: "حالت مرزی (Edge case)", en: "Edge case (حالت مرزی)" },
    ],
    summary: {
      fa: "برنامه‌نویسی قبل از هر چیز، راه فکر کردن است: مسئله‌ی بزرگ را به بخش‌های کوچکِ قابل‌حل بشکن، جزئیات بی‌اهمیت را کنار بگذار، و گام‌های دقیق حل را بنویس. در این موضوع یاد می‌گیری یک مسئله‌ی روزمره را به‌صورت ورودی/خروجی و گام‌های اجرایی تعریف کنی، حالت‌های مرزی را پیدا کنی و راه‌حل را قبل از کدنویسی روی کاغذ بسنجی.",
      en: "Programming is, before anything else, a way of thinking: break a big problem into small solvable pieces, drop irrelevant detail, and write the exact steps of a solution. Here you learn to restate a real problem as inputs/outputs and runnable steps, spot edge cases, and test a plan on paper before any code exists.",
    },
    outcomes: {
      fa: [
        "یک مسئله را به ورودی، خروجی و محدودیت‌ها تعریف کنی",
        "مسئله را به زیرمسئله‌های مرتب‌شده بشکنی",
        "گام‌های الگوریتم را بدون کد بنویسی و با مثال‌ها ردیابی کنی",
        "حداقل دو حالت مرزی (ورودی خالی، داده عجیب) را در طرح ببینی",
      ],
      en: [
        "State a problem as inputs, outputs and constraints",
        "Decompose it into ordered subproblems",
        "Write algorithm steps in plain language and trace them with examples",
        "Catch at least two edge cases (empty input, weird data) in the plan",
      ],
    },
    why: {
      fa: "وقتی هوش مصنوعی کد می‌نویسد، ارزش انسان در همین لایه است: تعریف درست مسئله، شکستن آن به تکه‌های قابل‌سنجش و قضاوت درباره خروجی. ابزارهای هوش مصنوعی با مشخصاتِ مبهم، پاسخ‌های «تقریباً درست» می‌دهند — همان چیزی که ۶۶٪ توسعه‌دهندگان در نظرسنجی ۲۰۲۵ استک‌اورفلو به آن اعتراف‌اند. تفکر محاسباتی مهارتی است که هیچ ابزاری به‌جای تو انجامش نمی‌دهد.",
      en: "When AI writes code, human value concentrates exactly here: defining the right problem, splitting it into testable pieces, and judging the output. Vague specifications produce 'almost right' answers from AI tools — the frustration 66% of developers report in the 2025 Stack Overflow survey. No tool can do this layer for you.",
    },
    prereqs: [],
    related: ["t-programming-basics", "t-requirements-design"],
    essential: {
      fa: "تعریف مسئله با ورودی/خروجی، تجزیه به ۳-۵ زیرمسئله، نوشتن گام‌ها و ردیابی با دو مثال.",
      en: "Define a problem with inputs/outputs, decompose into 3-5 subproblems, write steps, trace with two examples.",
    },
    optional: {
      fa: "الگوهای شناخته‌شده (جست‌وجو، شمارش، تجمیع) و ارتباط با pseudocode رسمی.",
      en: "Recognizable patterns (search, count, aggregate) and connection to formal pseudocode.",
    },
    exercise: {
      fa: "مسئله «میانگین نمرات دانشجویان یک کلاس» را حل کن: ورودی/خروجی را تعریف کن، به زیرمسئله‌ها بشکن، گام‌ها را بنویس و با سه لیست نمره (خالی، یک‌نفره، با نمره‌ی منفیِ اشتباه) ردیابی کن. بدون کامپیوتر.",
      en: "Solve 'average grade of a class' without a computer: define inputs/outputs, decompose, write steps, and trace with three lists (empty, one item, containing a wrong negative grade).",
    },
    aiGuidance: {
      fa: "از هوش مصنوعی به‌عنوان «هم‌فکری انتقادی» استفاده کن، نه تولیدکننده‌ی راه‌حل: اول خودت طرح بده، بعد از آن بخواه نقاط ضعف و حالت‌های مرزی را پیدا کند. راه‌حل کامل را از آن نخواه — این تنها لایه‌ای است که تمرین نکردنش کل مسیر را زمین‌گیر می‌کند.",
      en: "Use AI as a critical reviewer, not a solution generator: write your plan first, then ask it to attack your plan and find missed edge cases. Do not request the full solution — skipping practice at this layer undermines everything after it.",
    },
    check: {
      fa: "یک دوست (یا خودت، فردا) فقط شرح مسئله‌ات را می‌خواند و باید بدون سؤالِ اضافه، همان خروجی موردنظر تو را پیش‌بینی کند. اگر پیش‌بینی نکرد، تعریف مسئله‌ات هنوز مبهم است.",
      en: "A friend (or you tomorrow) reads only your problem statement and must predict your intended output with no follow-up questions. If they can't, your problem definition is still ambiguous.",
    },
    completion: {
      fa: ["تعریف ورودی/خروجی/محدودیت مکتوب است", "تجزیه به زیرمسئله‌ها روی کاغذ انجام شده", "ردیابی با سه مثال شامل دو حالت مرزی ثبت شده"],
      en: ["Written inputs/outputs/constraints", "Decomposition into subproblems on paper", "Traced with three examples including two edge cases"],
    },
    resources: [
      { title: "CS2023 — Software Development Fundamentals (ACM/IEEE/AAAI)", url: "https://cs2023.acm.org/", lang: "en", level: "reference", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-cs2023"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-programming-basics",
    track: "core",
    order: 2,
    title: { fa: "مبانی برنامه‌نویسی با جاوااسکریپت", en: "Programming Basics with JavaScript" },
    terms: [
      { fa: "متغیر (Variable)", en: "Variable (متغیر)" },
      { fa: "تابع (Function)", en: "Function (تابع)" },
      { fa: "حلقه (Loop)", en: "Loop (حلقه)" },
      { fa: "آرایه و شیء (Array & Object)", en: "Array & Object (آرایه و شیء)" },
    ],
    summary: {
      fa: "اولین زبان تو جاوااسکریپت است: بدون نصب هیچ‌چیز در مرورگر اجرا می‌شود و بعداً همان زبان در فرانت‌اند، بک‌اند (Node) و حتی اپ‌های هوش مصنوعی به کارت می‌آید. اینجا متغیر، شرط، حلقه، تابع و ساختارهای آرایه/شیء را با تمرین‌های کوچک روزانه یاد می‌گیری و مهم‌تر از همه: کد را خط‌به‌خط «می‌خوانی» و خروجی‌اش را پیش‌بینی می‌کنی.",
      en: "Your first language is JavaScript: it runs in the browser with zero installation and later serves you in frontend, backend (Node), and even AI apps. You learn variables, conditionals, loops, functions, and arrays/objects through small daily exercises — and above all, you learn to read code line by line and predict its output.",
    },
    outcomes: {
      fa: [
        "برنامه‌های کوچک را با متغیر/شرط/حلقه/تابع از صفر بنویسی",
        "آرایه و شیء را بخوانی، بسازی و تغییر دهی",
        "خروجی قطعه‌کد ۱۰-۲۰ خطی را بدون اجرا پیش‌بینی کنی",
        "پیام خطای مرورگر را بخوانی و خط مربوطه را پیدا کنی",
      ],
      en: [
        "Write small programs from scratch with variables/conditionals/loops/functions",
        "Read, build and mutate arrays and objects",
        "Predict the output of a 10-20 line snippet without running it",
        "Read a browser error message and locate the offending line",
      ],
    },
    why: {
      fa: "یک زبان را عمیق بلد بودن، بهتر از ده زبان سطحی است. پایتون جایگزین بسیار خوبی است (خواناتر، پادشاه حوزه داده/هوش مصنوعی) اما جاوااسکریپت با بازخورد فوری مرورگر برای شروع بی‌نصب‌ونصب‌ترین است — و تایپ‌اسکریپت (گام بعدی) همان زبان است. طبق Octoverse ۲۰۲۵ تایپ‌اسکریپت پرکاربردترین زبان گیت‌هاب شده است.",
      en: "One language deeply beats ten superficially. Python is an excellent alternative (more readable, king of data/AI) but JavaScript's instant browser feedback is the least-friction start — and TypeScript (your next step) is the same language. Per Octoverse 2025, TypeScript became GitHub's most-used language.",
    },
    prereqs: ["t-computational-thinking"],
    related: ["t-reading-tracing-code", "t-typescript"],
    essential: {
      fa: "نوشتن ۲۰-۳۰ برنامه‌ی کوچک از صفر؛ هیچ کتاب‌خواندنی جای این تمرین‌ها را نمی‌گیرد.",
      en: "Writing 20-30 tiny programs from scratch; no amount of reading replaces them.",
    },
    optional: {
      fa: "آشنایی با const/let در سطح موتور جاوااسکریپت، template literals پیشرفته.",
      en: "const/let at the engine level, advanced template literals.",
    },
    exercise: {
      fa: "تابعی بنویس که لیست خرید بگیرد و «سبد پرهزینه‌ترین اقلام تا سقف بودجه» را برگرداند. اول با کاغذ گام‌ها را بنویس، بعد کد، و برای هر خط قبل از اجرا خروجی را پیش‌بینی کن.",
      en: "Write a function that takes a shopping list and returns 'highest-value items within budget'. Write steps on paper first, then code, predicting each line's effect before running.",
    },
    aiGuidance: {
      fa: "تا وقتی مبانی را نش داده‌ای، از هوش مصنوعی فقط «توضیح کد» و «نمونه مشابه با مسئله‌ی متفاوت» بخواه، نه کدِ پاسخ. اگر کدی از آن گرفتی، قبل از اجرا خط‌به‌خط پیش‌بینی کن که هر خط چه می‌کند — این عادت، مرز بین «یادگیری» و «تقلب از خود» است.",
      en: "Until you have the basics, ask AI only for explanations of code and for similar-but-different examples — never the answer code. If you do receive code, predict line-by-line what it does before running. That habit is the boundary between learning and self-deception.",
    },
    check: {
      fa: "این تکه‌کد را بدون اجرا تحلیل کن و خروجی و دلیلش را بنویس: آرایه‌ی اعداد، حلقه‌ی معکوس که عنصر زوج را حذف می‌کند — بعد اجرا کن و اختلاف را توضیح بده.",
      en: "Trace this snippet without running: an array of numbers, a reverse loop deleting even elements — write the output and your reasoning, then run and explain any difference.",
    },
    completion: {
      fa: ["۲۰ تمرین کوچک در مخزن git ثبت شده", "پیش‌بینی خروجی ۵ قطعه‌کد بدون خطا", "یک تابع از صفر با حداقل ۲ تست دستی"],
      en: ["20 small exercises committed to a git repo", "5 output-predictions without error", "One from-scratch function with 2 manual tests"],
    },
    resources: [
      { title: "MDN JavaScript — Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", lang: "en", level: "beginner", free: true },
      { title: "javascript.info — The Modern JavaScript Tutorial", url: "https://javascript.info/", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-011", "c-023"],
    sources: ["src-octoverse2025", "src-lister2004"],
    skipAhead: {
      fa: "اگر JS بلدی: مستقیم برو سراغ تایپ‌اسکریپت و در این موضوع فقط بخش مدل ذهنی آرایه/شیء و مرزهای عدد/رشته را مرور کن.",
      en: "Know JS already? Go straight to TypeScript; here, only skim the array/object mental model and number/string boundaries.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "t-reading-tracing-code",
    track: "core",
    order: 3,
    title: { fa: "خواندن و ردیابی کد", en: "Reading & Tracing Code" },
    terms: [
      { fa: "ردیابی (Tracing)", en: "Tracing (ردیابی)" },
      { fa: "جدول مقادیر (Trace table)", en: "Trace table (جدول مقادیر)" },
      { fa: "ماشین ذهنی (Notional machine)", en: "Notional machine (ماشین ذهنی)" },
    ],
    summary: {
      fa: "پژوهش چندکشوری لیستر و همکاران روی ۹۴۱ دانشجو نشان داد بخش بزرگی از تازه‌کارها در پایان دوره نمی‌توانند کدِ کوتاه را قابل‌اعتماد ردیابی یا توضیح دهند — با این حال می‌توانند بنویسند. این موضوع آن شکاف را هدف می‌گیرد: خواندن کد دیگران، ساختن ماشین ذهنی از اجرای برنامه، و توضیح کد با زبان ساده.",
      en: "Lister et al.'s multi-national study of 941 novices found many end-of-course students cannot reliably trace or explain short code — even while able to write some. This topic targets that gap: reading other people's code, building a mental machine of program execution, and explaining code in plain words.",
    },
    outcomes: {
      fa: [
        "جدول مقادیر (trace table) برای حلقه‌ها بکشی",
        "کد ۵۰-۱۰۰ خطی غریبه را بخوانی و خلاصه‌اش را بنویسی",
        "تفاوت state و flow را در توضیح‌هایت نشان دهی",
        "باگ منطقیِ کد ظاهراً درست را با ردیابی پیدا کنی",
      ],
      en: [
        "Draw a trace table for loops",
        "Read an unfamiliar 50-100 line file and write its summary",
        "Distinguish state vs flow in your explanations",
        "Find a logic bug in seemingly-correct code by tracing",
      ],
    },
    why: {
      fa: "در عصر هوش مصنوعی، نوشتن کد ارزان شده اما قضاوت درباره کد گران‌مانده و حیاتی. پنگ و همکاران نشان دادند مدل‌ها «تقریباً درست» تولید می‌کنند و بارکی و همکاران نمایش دادند تازه‌کارها به اشتباه به کد تولیدی اعتماد می‌کنند. ردیابی، عضله‌ی قضاوت است.",
      en: "In the AI era, writing code became cheap; judging code is the expensive, critical act. Peng et al. showed models produce 'almost right' output; Barke et al. showed novices over-trust generated code. Tracing is the judgment muscle.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-debugging-testing", "t-ai-assisted-workflow"],
    essential: {
      fa: "روزانه ۱ قطعه‌کد غریبه را ردیابی و توضیح بدهی — سهمیه‌ی خواندنِ روزانه از نوشتن مهم‌تر است.",
      en: "Trace and explain one unfamiliar snippet daily — a daily reading quota matters more than writing more code.",
    },
    optional: {
      fa: "ابزارهای مصورسازی اجرا (pythontutor سبک JS) و تحلیل پیچیدگی حین خواندن.",
      en: "Execution visualizer tools and complexity-analysis while reading.",
    },
    exercise: {
      fa: "یک فایل واقعی از یک پروژه‌ی اپن‌سورس کوچک را بردار (۱۰۰ خط)، بدون اجرا خلاصه‌اش را بنویس، سه پیش‌بینی از رفتارش کن، بعد اجرا و مقایسه کن.",
      en: "Take a real ~100-line file from a small open-source project, summarize it without running, make three behavioral predictions, then run and compare.",
    },
    aiGuidance: {
      fa: "بگذار هوش مصنوعی کد تولید کند، اما «قبل از اجرا» تو ردیابی‌ات را بنویس؛ بعد با خروجی واقعی مقایسه کن. هرگاه پیش‌بینی‌ات غلط بود، دقیق بنویس مدل ذهنی‌ات کجا اشتباه بود — این متن‌ها گران‌بهاترین دارایی یادگیریت هستند.",
      en: "Let AI generate code, but write YOUR trace before running; compare with the real output. Whenever your prediction was wrong, write precisely where your mental model failed — those notes are your most valuable learning asset.",
    },
    check: {
      fa: "یک قطعه‌کد ۲۰خطی با یک باگ منطقی ظریف: باگ را پیدا کن، جدول مقادیر بکش و در سه جمله برای یک انسان توضیح بده که چرا باگ رخ می‌دهد.",
      en: "A 20-line snippet with a subtle logic bug: find it, draw the trace table, and explain in three sentences why the bug happens.",
    },
    completion: {
      fa: ["۱۰ قطعه‌کد ردیابی‌شده با جدول مقادیر", "خلاصه‌ی دو فایل واقعی اپن‌سورس", "یک باگ منطقی با ردیابی پیدا شده"],
      en: ["10 traced snippets with trace tables", "Summaries of two real open-source files", "One logic bug found by tracing"],
    },
    resources: [
      { title: "Lister et al. (2004) — Multi-national study (PDF)", url: "https://www.cs.auckland.ac.nz/~j-hamer/ITiCSE04-wg.pdf", lang: "en", level: "reference", free: true },
      { title: "JavaScript execution visualization (JS Tutor)", url: "https://pythontutor.com/javascript.html", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-023", "c-030"],
    sources: ["src-lister2004", "src-barke2023"],
    skipAhead: {
      fa: "باتجربه‌ای؟ این موضوع را با یک تمرین اعتمادبه‌سنجی جا کنید: یک diff تولیدشده‌ی هوش مصنوعی را قبل از اجرا ردیابی کن.",
      en: "Experienced? Replace this topic with one calibration drill: trace an AI-generated diff before running it.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "t-terminal-git",
    track: "core",
    order: 4,
    title: { fa: "ترمینال و گیت", en: "Terminal & Git" },
    terms: [
      { fa: "خط فرمان (Shell)", en: "Shell (خط فرمان)" },
      { fa: "کامیت (Commit)", en: "Commit (کامیت)" },
      { fa: "شاخه (Branch)", en: "Branch (شاخه)" },
      { fa: "ادغام (Merge)", en: "Merge (ادغام)" },
    ],
    summary: {
      fa: "ترمینال زبان واقعی توسعه‌دهنده‌ها است و گیت ماشین زمان پروژه‌ها. اینجا مسیریابی فایل‌ها، اجرای اسکریپت، متغیرهای محیطی را یاد می‌گیری و با گیت تاریخچه‌ی تمیز می‌سازی: کامیت‌های اتمیک، پیام‌های معنادار، شاخه‌زدن و حل تعارض ادغام.",
      en: "The terminal is developers' real lingua franca and git is a project's time machine. You learn file navigation, running scripts, environment variables — and clean git history: atomic commits, meaningful messages, branching, and resolving merge conflicts.",
    },
    outcomes: {
      fa: [
        "در مسیر پروژه بدون رابط گرافیکی زندگی کنی",
        "چرخه‌ی کامل گیت را روان اجرا کنی (status/add/commit/push/pull)",
        "با شاخه کار کنی و تعارض ادغام را عمداً ایجاد و حل کنی",
        "متغیر محیطی را از secrets تفکیک کنی",
      ],
      en: [
        "Live in a project directory without a GUI",
        "Run the full git cycle fluently (status/add/commit/push/pull)",
        "Branch, deliberately create and resolve a merge conflict",
        "Separate environment variables from secrets",
      ],
    },
    why: {
      fa: "دستیارهای کدنویسی (CLI agents) و هر ابزار CI از همین لایه کار می‌کنند؛ کسی که ترمینال و گیت را نمی‌فهمد، خروجی ابزارها را هم نمی‌فهمد. علاوه بر این، تاریخچه‌ی گیت شما «مدارک صلاحیت» شماست — کارفرماها diff و کامیت‌ها را می‌بینند.",
      en: "Coding agents and every CI tool operate through this layer; if you don't understand terminal and git, you can't understand what those tools do either. Your git history is also your competence evidence — reviewers read your diffs and commits.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-deployment-cicd", "t-communication-collab"],
    essential: {
      fa: "گیت به‌عنوان عادت روزانه؛ مرجع رسمی Pro Git فصل‌های ۱ تا ۳.",
      en: "Git as a daily habit; official Pro Git chapters 1-3.",
    },
    optional: {
      fa: "rebase تعاملی، bisect، hooks.",
      en: "Interactive rebase, bisect, hooks.",
    },
    exercise: {
      fa: "پروژه‌ی تمرین‌هایت را در یک مخزن git بگذار: هر تمرین یک شاخه، هر شاخه حداقل دو کامیت اتمیک، سپس merge به main و حل یک تعارض عمدی.",
      en: "Put your exercises repo under git: one branch per exercise, at least two atomic commits each, then merge to main and resolve one deliberate conflict.",
    },
    aiGuidance: {
      fa: "پیام‌های کامیت و شرح PR را می‌توانی با کمک هوش مصنوعی بنویسی، اما «قبل از کامیت» حتماً diff را خودت بخوان و مطمئن شو هر خط را توضیح می‌دهی. کامیتِ کدی که نفهمیدی، بدهی فنی است که با سود مرکب برمی‌گردد.",
      en: "AI can help draft commit messages and PR descriptions — but read the diff yourself before committing and be able to explain every line. Committing code you don't understand is technical debt with compound interest.",
    },
    check: {
      fa: "در یک مخزن آزمایشی: HEAD را به دو کامیت قبل برگردانی، تغییرات را با diff بخوان و بعد وضعیت را به‌صورت امن بازیابی کنی (reflog). سه دستور کدام‌اند و چرا؟",
      en: "In a scratch repo: move HEAD two commits back, read the changes with diff, then safely recover (reflog). Which three commands and why?",
    },
    completion: {
      fa: ["مخزن تمرین با ≥۱۰ کامیت اتمیک", "یک تعارض ادغام حل‌شده", "پیام‌های کامیت توصیفی نه «update»"],
      en: ["Exercises repo with ≥10 atomic commits", "One resolved merge conflict", "Descriptive commit messages, not 'update'"],
    },
    resources: [
      { title: "Pro Git (official book, CC BY-NC-SA)", url: "https://git-scm.com/book/en/v2", lang: "en", level: "beginner", free: true },
      { title: "Git official documentation", url: "https://git-scm.com/docs", lang: "en", level: "reference", free: true },
    ],
    claims: ["c-011"],
    sources: ["src-git-docs"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-debugging-testing",
    track: "core",
    order: 5,
    title: { fa: "دیباگ و تست‌نویسی", en: "Debugging & Testing" },
    terms: [
      { fa: "فرضیه‌ی باگ (Bug hypothesis)", en: "Bug hypothesis (فرضیه‌ی باگ)" },
      { fa: "نقطه‌ی وقفه (Breakpoint)", en: "Breakpoint (نقطه‌ی وقفه)" },
      { fa: "تست واحد (Unit test)", en: "Unit test (تست واحد)" },
      { fa: "تست رگرسیون (Regression test)", en: "Regression test (تست رگرسیون)" },
    ],
    summary: {
      fa: "دیباگ یک روش است، نه شانس: بازتولید، فرضیه، آزمون فرضیه، محدودسازی. تست‌نویسی هم نه برای «تأیید» بلکه برای «رد کردن» است — تست، مشخصاتِ اجرایی کد شماست. اینجا ابزار دیباگر، چاپ هدفمند، و نوشتن تست‌های کوچک سریع را تمرین می‌کنی.",
      en: "Debugging is a method, not luck: reproduce, hypothesize, test the hypothesis, narrow down. Testing is not about 'confirming' — a test is your code's executable specification. You practice the debugger, targeted logging, and writing small fast tests.",
    },
    outcomes: {
      fa: [
        "باگ را با چرخه‌ی فرضیه/آزمایش پیدا کنی نه با تغییر تصادفی کد",
        "تست واحد برای یک تابع خالص بنویسی (حالت مرزی هم)",
        "تست رگرسیون برای هر باگِ اصلاح‌شده اضافه کنی",
        "خروجی دیباگر مرورگر/Node را بخوانی",
      ],
      en: [
        "Find bugs via hypothesis/testing cycles, not random edits",
        "Write unit tests for a pure function (edge cases included)",
        "Add a regression test for every fixed bug",
        "Read browser/Node debugger output",
      ],
    },
    why: {
      fa: "کد تولیدی هوش مصنوعی «تقریباً درست» است: ۶۶٪ توسعه‌دهندگان از همین کلافه‌اند و ۴۵٪ می‌گویند دیباگِ کد هوش مصنوعی وقت‌گیرتر است (استک‌اورفلو ۲۰۲۵). آزمایش وراکود هم نشان داد ۴۵٪ نمونه‌های کد هوش مصنوعی تست امنیتی را رد می‌کنند. تست‌نویسیِ مستقل، سپر تو در برابر این هر دو است.",
      en: "AI code is 'almost right': 66% of developers are frustrated by it and 45% say debugging AI code costs extra time (Stack Overflow 2025). Veracode's experiment found 45% of AI-generated samples fail security tests. Independent testing is your shield against both.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-reading-tracing-code", "t-ai-assisted-workflow"],
    essential: {
      fa: "چرخه‌ی دیباگ علمی + تست واحد برای توابع خالص؛ باگ‌ها را با فرضیه پیدا کن.",
      en: "The scientific debugging loop + unit tests for pure functions; find bugs via hypotheses.",
    },
    optional: {
      fa: "تست ادغام، mock، پوشش تست و تفسیر درست آن.",
      en: "Integration tests, mocks, coverage and its correct interpretation.",
    },
    exercise: {
      fa: "در یک قطعه‌کد عمداً باگ‌دار (۳ باگ): اول تست بنویس که باگ‌ها را زنده نشان دهد، بعد هر باگ را با چرخه‌ی دیباگ اصلاح کن و تست رگرسیون نگه دار.",
      en: "In a deliberately buggy snippet (3 bugs): first write tests that expose them live, fix each bug through the debugging loop, and keep the regression tests.",
    },
    aiGuidance: {
      fa: "از هوش مصنوعی برای «لیست فرضیه‌های ممکن» بخواه، اما فرضیه را خودت با آزمایش تعیین تکلیف کن. کد تولیدی را بدون تست مستقل merge نکن — و هیچ‌وقت «چون هوش مصنوعی نوشته» را به‌عنوان استدلال درست‌بودن نپذیر.",
      en: "Ask AI for a list of plausible hypotheses, but adjudicate them yourself with experiments. Never merge generated code without independent tests — and never accept 'the AI wrote it' as an argument for correctness.",
    },
    check: {
      fa: "یک تابع با رفتار مشخص اما با یک باگ پنهان: بدون اجرای برنامه‌ی اصلی، با نوشتن تست، محل و علت باگ را مستند کن.",
      en: "A function with defined behavior but a hidden bug: without running the main program, locate and document the bug by writing tests.",
    },
    completion: {
      fa: ["۳ باگ با چرخه‌ی دیباگ اصلاح شده", "مجموعه تست با ≥۱۰ assertion برای یک ماژول", "۱ تست رگرسیون برای هر باگ"],
      en: ["3 bugs fixed via the debugging loop", "A test suite with ≥10 assertions for one module", "1 regression test per fixed bug"],
    },
    resources: [
      { title: "Node.js — Test runner (official)", url: "https://nodejs.org/en/learn/test-runner", lang: "en", level: "beginner", free: true },
      { title: "MDN — Cross browser testing / debugging", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-005", "c-017"],
    sources: ["src-so2025", "src-veracode2025", "src-node-docs"],
    skipAhead: {
      fa: "باتجربه‌ای؟ بخش دیباگ را با یک تمرین «دیباگ کد تولیدی هوش مصنوعی» جابه‌جا کن و مستقیم سراغ تست ادغام برو.",
      en: "Experienced? Swap the debugging section for a 'debug AI-generated code' drill and jump to integration testing.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "t-typescript",
    track: "core",
    order: 6,
    title: { fa: "تایپ‌اسکریپت؛ تایپ‌ها به‌عنوان ابزار فکر", en: "TypeScript: Types as a Thinking Tool" },
    terms: [
      { fa: "حاشیه‌نویسی تایپ (Type annotation)", en: "Type annotation (حاشیه‌نویسی تایپ)" },
      { fa: "نوع اتحادیه (Union type)", en: "Union type (نوع اتحادیه)" },
      { fa: "باریک‌سازی (Narrowing)", en: "Narrowing (باریک‌سازی)" },
      { fa: "جنریک (Generic)", en: "Generic (جنریک)" },
    ],
    summary: {
      fa: "تایپ‌اسکریپت همان جاوااسکریپت است به‌اضافه‌ی سیستم تایپ ایستا. تایپ‌ها فقط ابزار ویرایشگر نیستند؛ مستندسازیِ قابل‌اجرای تصمیم‌های تو هستند: با نوع اتحادیه حالت‌های ممکن را صریح می‌کنی و کامپایلر جاهایی که فراموش کرده‌ای را انگشت می‌گذارد.",
      en: "TypeScript is JavaScript plus a static type system. Types are not editor decoration; they are your decisions made executable and self-documenting: union types make possible states explicit, and the compiler flags every place you forgot one.",
    },
    outcomes: {
      fa: [
        "توابع و اشیاء را با تایپ صریح تعریف کنی",
        "با union و narrowing حالت‌های غیرممکن را حذف کنی",
        "پیام‌های خطای کامپایلر را بخوانی و رفع کنی",
        "بدانی کجا «any» یعنی عقبنشینی و چرا",
      ],
      en: [
        "Define functions and objects with explicit types",
        "Eliminate impossible states with unions and narrowing",
        "Read and fix compiler error messages",
        "Know where 'any' means retreat — and why",
      ],
    },
    why: {
      fa: "تایپ‌اسکریپت اردیبهشت ۱۴۰۴ (اوت ۲۰۲۵) پرکاربردترین زبان گیت‌هاب شد (Octoverse ۲۰۲۵) — و برای کار با هوش مصنوعی مزیت دومی دارد: تایپ‌ها قراردادِ قابل‌بررسی برای کد تولیدی‌اند؛ کامپایلر بخشی از بازبینی diff را خودکار می‌کند.",
      en: "TypeScript became GitHub's most-used language in August 2025 (Octoverse 2025) — and it has a second advantage in the AI era: types are checkable contracts for generated code; the compiler automates part of diff review.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-react-essentials", "t-node-server-basics"],
    essential: {
      fa: "handbook رسمی تا فصل Generics؛ تبدیل یک پروژه‌ی JS کوچک به TS.",
      en: "The official handbook through Generics; convert a small JS project to TS.",
    },
    optional: {
      fa: "utility types، discriminated unions، تایپ‌نویسی پیشرفته‌ی جنریک.",
      en: "Utility types, discriminated unions, advanced generics.",
    },
    exercise: {
      fa: "مدل داده‌ی «سفارش فروشگاه» را با discriminated union طراحی کن (در انتظار/پرداخت‌شده/ارسال‌شده/لغوشده) و تابعی بنویس که کامپایلر تضمین کند همه‌ی حالت‌ها را پوشش می‌دهد.",
      en: "Design a shop order's data model as a discriminated union (pending/paid/shipped/cancelled) and write a function the compiler proves handles every state.",
    },
    aiGuidance: {
      fa: "از هوش مصنوعی بخواه «تایپ» را از توضیح تو بسازد نه برعکس: تو دامنه و حالت‌ها را تعریف کن، مدل تایپ بنویسد، و بعد بررسی کنی آیا تایپ‌ها همه‌ی حالت‌های واقعی را صریح کرده‌اند یا چیزی را مخفی کرده‌اند.",
      en: "Have AI turn YOUR description into types, not the reverse: you define the domain and states, the model drafts types, then you audit whether the types expose every real state or hide some.",
    },
    check: {
      fa: "یک union با ۴ حالت را بدون اجرا تحلیل کن: کدام تابع switch یک حالت را جا می‌اندازد؟ کامپایلر چطور می‌توانست این را اجباری کند؟",
      en: "Analyze a 4-state union without running: which switch function misses a state? How could the compiler have made that impossible?",
    },
    completion: {
      fa: ["یک پروژه‌ی کوچک JS به TS تبدیل شده و strict است", "یک discriminated union با narrowing واقعی", "صفر any در کد نهایی"],
      en: ["A small JS project converted to strict TS", "One discriminated union with real narrowing", "Zero 'any' in the final code"],
    },
    resources: [
      { title: "TypeScript Handbook (official)", url: "https://www.typescriptlang.org/docs/handbook/intro.html", lang: "en", level: "beginner", free: true },
      { title: "TypeScript for JavaScript Programmers (official)", url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-011"],
    sources: ["src-ts-handbook", "src-octoverse2025"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-data-structures",
    track: "core",
    order: 7,
    title: { fa: "ساختارهای داده در عمل", en: "Data Structures in Practice" },
    terms: [
      { fa: "آرایه (Array)", en: "Array (آرایه)" },
      { fa: "نقشه/دیکشنری (Map)", en: "Map (نقشه)" },
      { fa: "صف و پشته (Queue & Stack)", en: "Queue & Stack (صف و پشته)" },
      { fa: "درخت (Tree)", en: "Tree (درخت)" },
    ],
    summary: {
      fa: "ساختار داده یعنی «شکل داده‌ات» — و انتخاب درست شکل، نصف راه‌حل است. آرایه، نقشه، مجموعه، صف/پشته و درخت را با مثال‌های واقعی (سبد خرید، شاخص جست‌وجو، صف پیام) یاد می‌گیری و هزینه‌ی هر انتخاب را با اندازه‌گیری واقعی حس می‌کنی.",
      en: "A data structure is the shape of your data — choosing the right shape is half the solution. Arrays, maps, sets, queues/stacks and trees, learned through real examples (shopping cart, search index, message queue) and by feeling each choice's cost with real measurements.",
    },
    outcomes: {
      fa: [
        "بین آرایه/نقشه/مجموعه برای یک مسئله آگاهانه انتخاب کنی",
        "هزینه‌ی خواندن/نوشتن هر ساختار را توضیح دهی",
        "درخت را برای داده‌ی سلسله‌مراتبی به‌کار ببری",
        "با benchmark کوچک، ادعای کارایی را بسنجی",
      ],
      en: [
        "Consciously choose array/map/set for a problem",
        "Explain read/write costs of each structure",
        "Use trees for hierarchical data",
        "Validate performance claims with a small benchmark",
      ],
    },
    why: {
      fa: "وقتی هوش مصنوعی کد می‌نویسد، انتخاب ساختار داده غالباً پیش‌فرض است؛ کسی که هزینه‌ها را نمی‌داند، نمی‌تواند انتخاب پیش‌فرض را به چالش بکشد. مشکلات مقیاس (تاخیر N+1، جست‌وجوی خطی روی یک میلیون رکورد) ریشه در همین انتخاب‌ها دارند.",
      en: "AI picks data structures by default; only someone who knows the costs can challenge that default. Scale problems (N+1 latency, linear scans over a million rows) are rooted in these choices.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-algorithms-core", "t-databases-sql"],
    essential: {
      fa: "آرایه/نقشه/مجموعه/صف با پیاده‌سازی دستیِ حداقلی از یک پشته و یک صف.",
      en: "Array/map/set/queue plus minimal hand-rolled stack and queue.",
    },
    optional: {
      fa: "هش‌جدول در سطح مفهومی، درخت جست‌وجوی دودویی، هیپ.",
      en: "Hash tables conceptually, binary search trees, heaps.",
    },
    exercise: {
      fa: "یک شاخص جست‌وجوی ساده بساز: آرایه‌ی کلمات بگیر و پرس‌وجوی «شامل همه‌ی کلمات» را با نقشه‌ی واژه→مستندها پیاده کن؛ با ۱۰ هزار و ۱۰۰ هزار کلمه زمان را اندازه بگیر.",
      en: "Build a simple search index: given word lists, implement 'contains all words' with a word→documents map; measure time with 10k and 100k words.",
    },
    aiGuidance: {
      fa: "بپرس «چرا این ساختار داده را انتخاب کردی؟» و بخواه گزینه‌ی دوم و هزینه‌های مقایسه‌ای را بنویسد؛ انتخاب نهایی و اندازه‌گیری با توست. benchmark کوچک را خودت اجرا کن.",
      en: "Ask 'why this structure?' and require the second option with comparative costs; the final choice and measurement are yours. Run the small benchmark yourself.",
    },
    check: {
      fa: "برنامه‌ای که «دو لیست از یک میلیون عدد، اشتراک‌شان» را با جست‌وجوی تو در تو انجام می‌دهد — بدون اجرا بگو چرا کند است و با کدام ساختار ۱۰۰۰ برابر سریع‌تر می‌شود و چرا.",
      en: "A program computing 'intersection of two million-item lists' with nested loops — explain without running why it is slow, and which structure makes it ~1000x faster and why.",
    },
    completion: {
      fa: ["پیاده‌سازی دستی پشته/صف با تست", "شاخص جست‌وجو با اندازه‌گیری دو مقیاس", "متن انتخاب ساختار برای یک مسئله واقعی"],
      en: ["Hand-rolled stack/queue with tests", "Search index measured at two scales", "A written structure-choice rationale for a real problem"],
    },
    resources: [
      { title: "MDN — JavaScript data structures & algorithms", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-cs2023"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-algorithms-core",
    track: "core",
    order: 8,
    title: { fa: "الگوریتم‌ها و پیچیدگی — در حد کار واقعی", en: "Algorithms & Complexity — Working Depth" },
    terms: [
      { fa: "پیچیدگی زمانی (Time complexity)", en: "Time complexity (پیچیدگی زمانی)" },
      { fa: "جست‌وجوی دودویی (Binary search)", en: "Binary search (جست‌وجوی دودویی)" },
      { fa: "بازگشت (Recursion)", en: "Recursion (بازگشت)" },
      { fa: "مصرف‌حافظه (Space)", en: "Space complexity (مصرف‌حافظه)" },
    ],
    summary: {
      fa: "هدف این نیست که مسابقه‌ی الگوریتم بدهی؛ هدف این است که وقتی برنامه کند است، بدانی چرا و چه چیزی را عوض کنی. مرتبه‌ی رشد، جست‌وجو/مرتب‌سازی، بازگشت و مصالحه‌ی زمان/حافظه را روی مسئله‌های واقعی مرور می‌کنیم.",
      en: "The goal is not algorithm competitions; it is that when a program is slow you know why and what to change. Growth orders, search/sort, recursion, and time/space trade-offs — reviewed on real problems.",
    },
    outcomes: {
      fa: [
        "پیچیدگی‌ی یک حلقه‌ی تودرتو را تحلیل و توضیح دهی",
        "جست‌وجوی دودویی و مرتب‌سازی داخلی زبان را درست به‌کار ببری",
        "مسئله را بازگشتی فرمول کنی و حالت پایه را نشانی بدهی",
        "قبل از بهینه‌سازی، اندازه بگیری (نظریه ≠ عدد واقعی)",
      ],
      en: [
        "Analyze and explain the complexity of nested loops",
        "Correctly use binary search and the language's built-in sorting",
        "Formulate a problem recursively and identify the base case",
        "Measure before optimizing (theory ≠ real numbers)",
      ],
    },
    why: {
      fa: "مدل‌های زبانی هم الگوریتم‌های معمول را می‌دانند؛ آنچه به تو تعلق دارد تشخیص این است که کجا الگوریتم غلط انتخاب شده. مشکل‌های عملکردی در عمل از حلقه‌ی تودرتوی بی‌مورد و N+1 می‌آیند نه از گره‌های NP.",
      en: "Language models know standard algorithms; what is yours is spotting where the wrong one got chosen. In practice, performance problems come from accidental nested loops and N+1, not from NP-hardness.",
    },
    prereqs: ["t-data-structures"],
    related: ["t-databases-sql", "t-frontend-quality-perf"],
    essential: {
      fa: "Big-O شهودی، جست‌وجوی دودویی، مرتب‌سازی کتابخانه‌ای، بازگشت با درخت فراخوانی.",
      en: "Intuitive Big-O, binary search, library sorting, recursion with a call tree.",
    },
    optional: {
      fa: "برنامه‌نویسی پویا در حد دو مثال کلاسیک؛ گراف‌ها با BFS/DFS.",
      en: "Dynamic programming via two classic examples; graphs with BFS/DFS.",
    },
    exercise: {
      fa: "کدی که «آیا دو مکمل جمعاً عدد هدف را می‌سازند» را با دو حلقه چک می‌کند به‌نسخه‌ی نقشه‌ای تبدیل کن؛ قبل/بعد را با n=۱۰هزار اندازه بگیر و توضیح بده چرا.",
      en: "Convert a two-loop 'do two numbers sum to target?' checker to a map version; measure before/after at n=10,000 and explain the difference.",
    },
    aiGuidance: {
      fa: "از هوش مصنوعی بخواه سه پیاده‌سازی با پیچیدگی‌های متفاوت بدهد؛ تو انتخاب کنی و توجیه کنی که کدام برای اندازه‌ی داده‌ی واقعی‌ات درست است. «بهینه‌ترین» همیشه بهترین نیست — سادگی هم هزینه دارد.",
      en: "Ask AI for three implementations with different complexities; you choose and justify which fits your real data size. 'Most optimal' is not always best — simplicity has a cost too.",
    },
    check: {
      fa: "سه تابع با پیچیدگی‌های O(1), O(n), O(n²): بدون اجرا رتبه‌بندی کن و برای هر کدام یک سناریوی داده‌ی واقعی بنویس که آنجا آن پیچیدگی مهم می‌شود.",
      en: "Three functions with O(1), O(n), O(n²): rank them without running and write one real-data scenario where each complexity actually matters.",
    },
    completion: {
      fa: ["تحلیل پیچیدگی ۵ تابع نوشته‌شده", "یک بهینه‌سازی اندازه‌گیری‌شده با عدد قبل/بعد", "پیاده‌سازی بازگشتی با حالت پایه‌ی درست"],
      en: ["Complexity analysis written for 5 functions", "One measured optimization with before/after numbers", "A recursive implementation with a correct base case"],
    },
    resources: [
      { title: "javascript.info — Recursion & rest", url: "https://javascript.info/recursion", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-cs2023"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-http-web",
    track: "core",
    order: 9,
    title: { fa: "وب و HTTP", en: "The Web & HTTP" },
    terms: [
      { fa: "درخواست/پاسخ (Request/Response)", en: "Request/Response (درخواست/پاسخ)" },
      { fa: "کد وضعیت (Status code)", en: "Status code (کد وضعیت)" },
      { fa: "هدر (Header)", en: "Header (هدر)" },
      { fa: "REST", en: "REST (ریست)" },
    ],
    summary: {
      fa: "همه‌چیز در وب با HTTP می‌چرخد: مرورگر یک درخواست می‌فرستد، سرور پاسخ می‌دهد. متد‌ها (GET/POST/…)، کدهای وضعیت، هدرها و کوکی‌ها را می‌فهمی و مهم‌تر: با Network tab مرورگر ترافیک واقعی را می‌خوانی تا دیگر «جادو» نباشد.",
      en: "Everything on the web rides on HTTP: the browser sends a request, a server answers. You learn methods (GET/POST/…), status codes, headers and cookies — and, crucially, you read real traffic in the browser's Network tab until it stops being magic.",
    },
    outcomes: {
      fa: [
        "چرخه‌ی کامل درخواست/پاسخ را توضیح دهی",
        "کدهای وضعیت رایج (200/301/401/404/500) را تفسیر کنی",
        "یک درخواست را با fetch یا curl از صفر بسازی",
        "در Network tab یک بارگذاری واقعی را تحلیل کنی",
      ],
      en: [
        "Explain the full request/response cycle",
        "Interpret common status codes (200/301/401/404/500)",
        "Build a request from scratch with fetch or curl",
        "Analyze a real page load in the Network tab",
      ],
    },
    why: {
      fa: "تمام اپلیکیشن‌های هوش مصنوعی که می‌سازی، در واقع HTTP client اند که با API مدل‌ها حرف می‌زنند. خطاهای عجیب «مدل» اغلب خطای ساده‌ی HTTP یا احراز هویت‌اند. خواندن ترافیک شبکه مهارت‌ترازبندی همه‌ی لایه‌های بالاتر است.",
      en: "Every AI app you build is really an HTTP client talking to model APIs. Mysterious 'model' errors are often plain HTTP or auth errors. Reading network traffic is the calibration skill for everything above it.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-api-design", "t-security-privacy"],
    essential: {
      fa: "چرخه درخواست/پاسخ، متدها، کدهای وضعیت، هدرهای رایج، خواندن Network tab.",
      en: "Request/response cycle, methods, status codes, common headers, Network-tab literacy.",
    },
    optional: {
      fa: "کش HTTP، CORS، HTTP/2 و معنای نسخه‌ها.",
      en: "HTTP caching, CORS, HTTP/2 and versioning semantics.",
    },
    exercise: {
      fa: "با curl یک درخواست GET و یک POST با JSON و هدر بساز؛ سپس در Network tab یک سایت واقعی را باز کن و پنج درخواست اولش را بخوان (متد، وضعیت، سایز).",
      en: "Use curl to make one GET and one POST with JSON and headers; then open a real site's Network tab and read its first five requests (method, status, size).",
    },
    aiGuidance: {
      fa: "وقتی دستیار API می‌سازد، خودت درخواست/پاسخ واقعی را با curl بگیر و بخوان. جعبه‌سیاه نپذیر — خروجی هوش مصنوعی که با ترافیک واقعی تأیید نشده، هنوز فرضیه است.",
      en: "When an assistant builds an API, capture and read the real request/response with curl yourself. Accept no black boxes — unverified generated code is still a hypothesis.",
    },
    check: {
      fa: "سه پاسخ با کد وضعیت‌های 301، 401، 503 نشان بده؛ برای هرکدام در دو جمله بگو مشکل کجاست و چه کسی باید آن را رفع کند (کلاینت/سرور).",
      en: "Show three responses with status 301, 401, 503; in two sentences each, say what is wrong and who fixes it (client/server).",
    },
    completion: {
      fa: ["دو درخواست curl موفق با توضیح هدرها", "تحلیل Network tab با ۵ درخواست", "توضیح چرخه‌ی کامل یک بارگذاری صفحه"],
      en: ["Two successful curl requests with header explanations", "Network-tab analysis of 5 requests", "An explanation of a full page-load cycle"],
    },
    resources: [
      { title: "MDN — Overview of HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-mdn-http"],
    skipAhead: {
      fa: "باتجربه‌ای؟ مستقیم سراغ موضوع API Design برو و فقط بخش امنیتی (کوکی/هدر) را مرور کن.",
      en: "Experienced? Jump to API Design; only skim the security section (cookies/headers).",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "t-databases-sql",
    track: "core",
    order: 10,
    title: { fa: "دیتابیس و SQL", en: "Databases & SQL" },
    terms: [
      { fa: "جدول و ردیف (Table & Row)", en: "Table & Row (جدول و ردیف)" },
      { fa: "کلید خارجی (Foreign key)", en: "Foreign key (کلید خارجی)" },
      { fa: "JOIN", en: "JOIN (پیوند)" },
      { fa: "تراکنش (Transaction)", en: "Transaction (تراکنش)" },
    ],
    summary: {
      fa: "بیشتر داده‌ها در جدول‌ها زندگی می‌کنند. SQL را به‌عنوان زبان گفت‌وگو با داده یاد می‌گیری: انتخاب، پیوند، تجمیع، و مهم‌تر از همه طراحی اسکیمای معقول با کلیدهای خارجی و تراکنش‌ها. PostgreSQL مرجع تمرین ماست.",
      en: "Most data lives in tables. You learn SQL as the language of talking to data: selects, joins, aggregates — and above all, sane schema design with foreign keys and transactions. PostgreSQL is our practice reference.",
    },
    outcomes: {
      fa: [
        "کوئری‌های SELECT/JOIN/GROUP BY را روان بنویسی",
        "اسکیمای ۳ جدولی با کلید خارجی طراحی کنی",
        "تراکنش را برای عملیات چندگانه درست استفاده کنی",
        "کوئری کند را با EXPLAIN بفهمی",
      ],
      en: [
        "Write SELECT/JOIN/GROUP BY queries fluently",
        "Design a 3-table schema with foreign keys",
        "Use transactions for multi-step operations",
        "Understand a slow query with EXPLAIN",
      ],
    },
    why: {
      fa: "دستیارهای هوش مصنوعی SQL خوب می‌نویسند اما مسئولیت درست‌بودن اسکیما و یکپارچگی داده با توست؛ یک اسکیمای بد، خودش را تا سال‌ها در مهاجرت‌ها و باگ‌ها نشان می‌دهد. خواندن EXPLAIN هم هنر ترازبندی انتزاع به واقعیت است.",
      en: "AI assistants write decent SQL, but schema correctness and data integrity are yours: a bad schema resurfaces for years in migrations and bugs. Reading EXPLAIN is the art of grounding abstraction in reality.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-data-modeling", "t-http-web"],
    essential: {
      fa: "Tutorial رسمی PostgreSQL فصل SQL؛ طراحی و کوئری یک دیتابیس کوچک واقعی.",
      en: "The official PostgreSQL tutorial's SQL chapter; design and query one real small database.",
    },
    optional: {
      fa: "Window functions، ایندکس‌ها در سطح مفهومی، NoSQL و زمانِ انتخابش.",
      en: "Window functions, indexes conceptually, NoSQL and when it fits.",
    },
    exercise: {
      fa: "دیتابیس «کتابخانه‌ی شخصی» بساز: کتاب‌ها، نویسنده‌ها، امانت‌ها. سه کوئری واقعی: پرامانت‌ترین کتاب، نویسنده‌های بی‌کتاب، تأخیرهای امانت. سپس یک تراکنش برای امانت امن بنویس.",
      en: "Build a 'personal library' DB: books, authors, loans. Three real queries: most-borrowed book, authors with no books, late loans. Then a safe transaction for lending.",
    },
    aiGuidance: {
      fa: "اسکیما را خودت روی کاغذ طراحی کن؛ از مدل بخواه نقدش کند (نرمال‌سازی، شاخص‌ها، حالت‌های مرزی). SQL تولیدی را روی داده‌ی آزمایشی با نتیجه‌ی انتظاری دستی مقایسه کن.",
      en: "Design the schema on paper yourself; have the model critique it (normalization, indexes, edge cases). Verify generated SQL against hand-computed expected results on test data.",
    },
    check: {
      fa: "یک کوئری JOIN با نتیجه‌ی اشتباه (تکرار ردیف‌ها): بگو چرا خطا می‌دهد و چه تغییری نتیجه را درست می‌کند — بدون اجرا.",
      en: "A JOIN query returning wrong (duplicated) rows: explain why it misbehaves and what change fixes it — without running it.",
    },
    completion: {
      fa: ["اسکیمای ۳ جدولی با FK واقعی", "۵ کوئری با نتیجه‌ی دستی تأییدشده", "یک تراکنش با توضیح rollback"],
      en: ["A 3-table schema with real FKs", "5 queries verified against hand-computed results", "One transaction explained with rollback"],
    },
    resources: [
      { title: "PostgreSQL Tutorial (official docs)", url: "https://www.postgresql.org/docs/current/tutorial.html", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-postgres-manual"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-os-concepts",
    track: "core",
    order: 11,
    title: { fa: "مفاهیم سیستم‌عامل برای توسعه‌دهنده", en: "OS Concepts for Developers" },
    terms: [
      { fa: "فرآیند و نخ (Process & Thread)", en: "Process & Thread (فرآیند و نخ)" },
      { fa: "حافظه و نشت (Memory & leak)", en: "Memory & leak (حافظه و نشت)" },
      { fa: "مجوز فایل (File permissions)", en: "File permissions (مجوز فایل)" },
      { fa: "متغیر محیطی (Env var)", en: "Environment variable (متغیر محیطی)" },
    ],
    summary: {
      fa: "برنامه‌ات در یک فرآیند زندگی می‌کند که حافظه، فایل‌ها و مجوزهای خودش را دارد. بخشی از سیستم‌عامل را که برای توسعه‌دهنده‌ها حیاتی است می‌فهمی: فرآیند/نخ، I/O، مجوزها، متغیرهای محیطی — همان‌هایی که در دیباگ واقعی و استقرار طلا می‌آروند.",
      en: "Your program lives inside a process with its own memory, files and permissions. You learn the developer-critical OS subset: processes/threads, I/O, permissions, environment variables — the things that surface as real bugs in debugging and deployment.",
    },
    outcomes: {
      fa: [
        "فرآیند در برابر نخ را توضیح دهی و در Node/مرورگر مثال بزنی",
        "چرا نشت حافظه رخ می‌دهد و چطور آن را ببینی",
        "مجوزهای فایل و مالکیت را بخوانی و اصلاح کنی",
        "پیکربندی را با متغیرهای محیطی از کد جدا کنی",
      ],
      en: [
        "Explain process vs thread with Node/browser examples",
        "Say why memory leaks happen and how to spot them",
        "Read and fix file permissions and ownership",
        "Separate configuration from code via env vars",
      ],
    },
    why: {
      fa: "خطاهای واقعی تولید اغلب خطاهای سیستم‌عامل‌اند: «Permission denied»، پورت اشغال، OOM. SWEBOK v4 هم «عملیات مهندسی نرم‌افزار» را به‌عنوان حوزه‌ی مستقل اضافه کرده است. بدون این لایه، دستیارهای هوش مصنوعی هم فقط پیشنهاد می‌دهند — اجرا و دیباگ با توست.",
      en: "Real production errors are often OS errors: 'Permission denied', occupied ports, OOM. SWEBOK v4.0 even added Software Engineering Operations as a standalone knowledge area. Without this layer you cannot diagnose what agents and assistants only suggest.",
    },
    prereqs: ["t-terminal-git"],
    related: ["t-deployment-cicd", "t-ops-containers"],
    essential: {
      fa: "فرآیند/نخ، I/O پایه، مجوزها، env vars — با تمرین روی لینوکس/WSL.",
      en: "Processes/threads, basic I/O, permissions, env vars — practiced on Linux/WSL.",
    },
    optional: {
      fa: "سیگنال‌ها، systemd، مفهوم کانتینر (در موضوع عملیات ادامه دارد).",
      en: "Signals, systemd, container concepts (continued in the ops topic).",
    },
    exercise: {
      fa: "یک اسکریپت بنویس که سه فرآیند را به‌موازات اجرا کند و خروجی‌شان را در سه فایل log بنویس؛ سپس مجوز خواندن یک فایل را عمداً ببند و رفتار خطا را مستند کن.",
      en: "Write a script that runs three processes in parallel writing logs to three files; then deliberately revoke read permission on one file and document the failure mode.",
    },
    aiGuidance: {
      fa: "دستیارهای خط فرمانی دستورات سیستم‌عامل اجرا می‌کنند؛ تو باید بدانی هر دستور چه می‌کند قبل از تأیید. هیچ دستور rm/sudo را بدون فهم دقیق اجرا نکن — این یکی از نقاط واقعیِ آسیب‌پذیری ابزارهای عامل‌محور است.",
      en: "CLI agents execute OS commands; you must know what each command does before approving it. Never run rm/sudo without exact understanding — this is a real failure point of agent tools.",
    },
    check: {
      fa: "سه پیام خطای واقعی (Permission denied / EADDRINUSE / ENOSPC) نشان بده؛ برای هرکدام در دو جمله علت و راه رفع را بنویس.",
      en: "Three real errors (Permission denied / EADDRINUSE / ENOSPC): in two sentences each, root cause and fix.",
    },
    completion: {
      fa: ["اسکریپت فرآیندهای موازی با log", "یک مشکل مجوز حل‌شده با مستندسازی", "پیکربندی پروژه از env جدا شده"],
      en: ["Parallel-process script with logs", "One permission problem fixed and documented", "Project config separated into env vars"],
    },
    resources: [
      { title: "Node.js — Introduction (process model)", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-027"],
    sources: ["src-swebok4", "src-node-docs"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-requirements-design",
    track: "core",
    order: 12,
    title: { fa: "نیازمندی، طراحی و مصالحه‌ها", en: "Requirements, Design & Trade-offs" },
    terms: [
      { fa: "معیار پذیرش (Acceptance criteria)", en: "Acceptance criteria (معیار پذیرش)" },
      { fa: "مصالحه (Trade-off)", en: "Trade-off (مصالحه)" },
      { fa: "کوپلینگ (Coupling)", en: "Coupling (کوپلینگ)" },
      { fa: "MVP", en: "MVP (محصول حداقلی)" },
    ],
    summary: {
      fa: "نرم‌افزار خوب یعنی نرم‌افزاری که مسئله‌ی درست را حل می‌کند و تصمیم‌هایش صریح‌اند. یاد می‌گیری نیازمندی را به معیار پذیرش قابل‌آزمون تبدیل کنی، دو طراحی را با مصالحه‌هایشان مقایسه کنی و دامنه را برای MVP واقعاً کوچک کنی.",
      en: "Good software solves the right problem and makes its decisions explicit. You learn to turn requirements into testable acceptance criteria, compare two designs with their trade-offs, and genuinely shrink scope to a real MVP.",
    },
    outcomes: {
      fa: [
        "نیازمندی مبهم را به ۳-۵ معیار پذیرش قابل‌آزمون تبدیل کنی",
        "دو طرح را با جدول مصالحه مقایسه و انتخاب توجیه‌شده بکنی",
        "دامنه را با «خطِ کشتن» به MVP برسانی",
        "تصمیم‌های طراحی را به‌صورت مکتوب ADR-mini ثبت کنی",
      ],
      en: [
        "Turn a vague requirement into 3-5 testable acceptance criteria",
        "Compare two designs in a trade-off table and justify the choice",
        "Cut scope to a true MVP with explicit 'won't do' lines",
        "Record design decisions as mini-ADRs",
      ],
    },
    why: {
      fa: "گردش‌کار هوش‌مصنوعی‌محور دقیقاً با همین موضوع شروع می‌شود: مشخصه‌نویسی. مدل‌ها با مشخصه‌ی خوب ۱۰ برابر بهتر کار می‌کنند و معیار پذیرش، مبنای بازبینی خروجی‌شان است. کیفیت مشخصه‌ی تو، سقف کیفیت خروجی ابزار است.",
      en: "AI-centric workflows literally start here: specification. Models perform an order of magnitude better with good specs, and acceptance criteria are the basis for reviewing their output. Your spec quality caps the tool's output quality.",
    },
    prereqs: ["t-computational-thinking", "t-programming-basics"],
    related: ["t-communication-collab", "t-ai-assisted-workflow"],
    essential: {
      fa: "معیار پذیرش، جدول مصالحه، MVP با خطوط «انجام نمی‌دهم».",
      en: "Acceptance criteria, trade-off table, MVP with explicit 'won't do' lines.",
    },
    optional: {
      fa: "الگوهای طراحی رایج، اصول SOLID با مثال‌های واقعی.",
      en: "Common design patterns, SOLID principles with real examples.",
    },
    exercise: {
      fa: "برای «ابزار یادداشت روزانه» یک صفحه‌ی مشخصات بنویس: ۵ معیار پذیرش، ۳ تصمیم طراحی با مصالحه، ۳ چیزِ که انجام نمی‌دهی. بعد پروژه‌ی p-01 را با همین سند بساز.",
      en: "Write a one-page spec for a 'daily notes tool': 5 acceptance criteria, 3 design decisions with trade-offs, 3 explicit non-goals. Then build project p-01 against that spec.",
    },
    aiGuidance: {
      fa: "نقش‌ها را برعکس کن: تو مشخصه بنویس و از مدل بخواه آن را «پیاده‌سازی» کند و در حین کار سؤالات شفاف‌سازی بپرسد؛ سؤال‌هایش به تو نشان می‌دهد مشخصه‌ات کجا مبهم است — بازخورد طلا.",
      en: "Reverse the roles: you write the spec, the model implements it and asks clarifying questions. Its questions show exactly where your spec is ambiguous — golden feedback.",
    },
    check: {
      fa: "دو معیار پذیرش مبهم («سریع باشد»، «کاربرپسند») را به معیار قابل‌آزمون تبدیل کن و بگو چرا نسخه‌ی قبلی قابل‌آزمون نبود.",
      en: "Convert two vague criteria ('fast', 'user-friendly') into testable ones and say why the originals were untestable.",
    },
    completion: {
      fa: ["یک سند مشخصات یک‌صفحه‌ای", "جدول مصالحه برای یک تصمیم واقعی", "پیاده‌سازی که معیارها را یکی‌یکی رد می‌کند"],
      en: ["A one-page spec document", "A trade-off table for one real decision", "An implementation checked against each criterion"],
    },
    resources: [
      { title: "SE2014 — Requirements Analysis & Specification (SEEK)", url: "https://sigsoft.org/EducationalInitiatives/Curricula/SoftwareEngineering2014.pdf", lang: "en", level: "reference", free: true },
    ],
    claims: ["c-026", "c-031"],
    sources: ["src-se2024"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-security-privacy",
    track: "core",
    order: 13,
    title: { fa: "امنیت، حریم خصوصی و وابستگی‌ها", en: "Security, Privacy & Dependencies" },
    terms: [
      { fa: "تزریق (Injection)", en: "Injection (تزریق)" },
      { fa: "XSS", en: "XSS (اسکریپت‌نویسی بین‌سایتی)" },
      { fa: "مدیریت راز (Secrets)", en: "Secrets management (مدیریت راز)" },
      { fa: "زنجیره‌ی تأمین (Supply chain)", en: "Supply chain (زنجیره‌ی تأمین)" },
    ],
    summary: {
      fa: "واژگان OWASP Top 10 را یاد می‌گیری و از روز اول به آن‌ها فکر می‌کنی: اعتبارسنجی ورودی، مدیریت رازها، کوچک‌کردن سطح حمله، حریم خصوصی کاربر و بهداشت وابستگی‌ها (npm audit، قفل نسخه‌ها، مجوزها).",
      en: "You learn the OWASP Top 10 vocabulary and think about it from day one: input validation, secrets handling, shrinking attack surface, user privacy, and dependency hygiene (npm audit, pinned versions, licenses).",
    },
    outcomes: {
      fa: [
        "پنج ریسک اصلی OWASP را در کد واقعی تشخیص دهی",
        "رازها را از کد و مخزن جدا کنی",
        "ورودی را قبل از استفاده اعتبارسنجی کنی",
        "وابستگی‌ها را بررسی و به‌روز نگه داری",
      ],
      en: [
        "Spot five core OWASP risks in real code",
        "Keep secrets out of code and repos",
        "Validate input before use",
        "Audit and maintain dependencies",
      ],
    },
    why: {
      fa: "آزمایش وراکود ۲۰۲۵: ۴۵٪ نمونه‌های کد هوش مصنوعی تست امنیتی را رد کردند؛ XSS در ۸۶٪ مواردِ مربوطه. و «متن بازیابی‌شده» در اپ‌های LLM خودش سطح حمله است (OWASP LLM01). امنیت دیگر مرحله‌ی آخر نیست — عادتِ هر diff است.",
      en: "Veracode 2025: 45% of AI-generated samples failed security tests; XSS failed in 86% of relevant cases. And retrieved text in LLM apps is itself an attack surface (OWASP LLM01). Security is no longer a final phase — it is a per-diff habit.",
    },
    prereqs: ["t-http-web", "t-programming-basics"],
    related: ["t-auth-basics", "t-ai-safety-eval"],
    essential: {
      fa: "OWASP Top 10 به‌عنوان چک‌لیست مرور کد؛ رازها، اعتبارسنجی، وابستگی‌ها.",
      en: "OWASP Top 10 as a code-review checklist; secrets, validation, dependencies.",
    },
    optional: {
      fa: "threat modeling سبک، CSP هدرها، امضای کامیت.",
      en: "Lightweight threat modeling, CSP headers, commit signing.",
    },
    exercise: {
      fa: "در یک فرم وب عمداً آسیب‌پذیر: سه آسیب‌پذیری (XSS، تزریق رشته‌ای، راز hardcode شده) را پیدا کن، بهره‌برداری را در محیط محلی نشان بده و اصلاح کن؛ سپس npm audit را اجرا و نتیجه را مستند کن.",
      en: "In a deliberately vulnerable web form: find three flaws (XSS, string-built query, hardcoded secret), demonstrate exploitation locally, fix them; then run npm audit and document results.",
    },
    aiGuidance: {
      fa: "کد هوش مصنوعی را همیشه با «چشم امنیتی» بازبینی کن: ورودی‌ها، رازها، کوئری‌ها. از مدل بخواه خودِ کدش را در برابر OWASP نقد کند — اما تأیید نهایی با تست و بازبینی توست، نه با ادعای مدل.",
      en: "Review AI code with a security eye: inputs, secrets, queries. Ask the model to critique its own code against OWASP — but the final word comes from your tests and review, not the model's claim.",
    },
    check: {
      fa: "یک قطعه‌کد با راز hardcode شده و یک کوئری رشته‌ساخته: دو مشکل و روش اصلاح هرکدام را در چهار جمله بنویس.",
      en: "A snippet with a hardcoded secret and a string-built query: name both problems and each fix in four sentences.",
    },
    completion: {
      fa: ["سه آسیب‌پذیری پیدا/اصلاح/مستند شده", "npm audit اجرا و نتیجه‌ی مستند", "صفر راز در مخزن (با git history تمیز)"],
      en: ["Three vulnerabilities found/fixed/documented", "npm audit run and documented", "Zero secrets in the repo (clean history)"],
    },
    resources: [
      { title: "OWASP Top 10 (current edition)", url: "https://owasp.org/Top10/", lang: "en", level: "beginner", free: true },
      { title: "OWASP Top 10 for LLM Applications", url: "https://genai.owasp.org/llm-top-10/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-016", "c-017", "c-019", "c-028"],
    sources: ["src-owasp-top10", "src-veracode2025", "src-pearce2022"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-deployment-cicd",
    track: "core",
    order: 14,
    title: { fa: "استقرار و CI/CD", en: "Deployment & CI/CD" },
    terms: [
      { fa: "محیط (Environment)", en: "Environment (محیط)" },
      { fa: "پایپ‌لاین (Pipeline)", en: "Pipeline (پایپ‌لاین)" },
      { fa: "بیلد (Build)", en: "Build (بیلد)" },
      { fa: "چرخش‌به‌عقب (Rollback)", en: "Rollback (چرخش‌به‌عقب)" },
    ],
    summary: {
      fa: "کدی که استقرار نیافته، وجود ندارد. محیط‌ها (dev/staging/prod)، بیلد تکرارپذیر، پیکربندی به‌عنوان متغیر محیطی (دوازده‌عاملی) و یک پایپ‌لاین CI ساده که تست‌ها را خودکار اجرا می‌کند را راه می‌اندازی.",
      en: "Code that isn't deployed doesn't exist. You set up environments (dev/staging/prod), reproducible builds, config-as-env-vars (twelve-factor), and a simple CI pipeline that runs your tests automatically.",
    },
    outcomes: {
      fa: [
        "یک اپ واقعی را روی یک میزبان رایگان مستقر کنی",
        "پیکربندی را از کد جدا کنی (env vars)",
        "یک CI حداقلی با اجرای تست بسازی",
        "برنامه‌ی rollback بنویسی و یک‌بار تمرین کنی",
      ],
      en: [
        "Deploy a real app to a free host",
        "Separate config from code (env vars)",
        "Build minimal CI that runs your tests",
        "Write and rehearse a rollback plan once",
      ],
    },
    why: {
      fa: "هوش مصنوعی کد می‌دهد؛ استقرار و مشاهده‌ی آن در دنیای واقعی به عهده‌ی توست. SWEBOK v4 «عملیات» را حوزه‌ی مستقل کرده و DORA نشان داده تحویلِ پایدار جدا از «تولید کد سریع» است. اینجا نقطه‌ی تماس ابزارها با واقعیت است.",
      en: "AI hands you code; deploying and observing it in reality is yours. SWEBOK v4 made 'SE Operations' a standalone area, and DORA shows stable delivery is distinct from fast code generation. This is where tools meet reality.",
    },
    prereqs: ["t-terminal-git", "t-http-web"],
    related: ["t-observability-ops", "t-ops-containers"],
    essential: {
      fa: "یک استقرار واقعی + CI با تست؛ دوازده‌عاملی در حد عامل‌های ۳ و ۱۰.",
      en: "One real deployment + CI with tests; twelve-factor factors 3 and 10 in depth.",
    },
    optional: {
      fa: "استراتژی‌های انتشار (blue-green, canary) در سطح مفهومی.",
      en: "Release strategies (blue-green, canary) conceptually.",
    },
    exercise: {
      fa: "پروژه‌ی p-02 را روی یک میزبان رایگان مستقر کن؛ یک workflow CI بساز که روی هر push تست‌ها را اجرا کند؛ یک استقرار معیوب عمدی بده و rollback تمرین کن.",
      en: "Deploy project p-02 on a free host; add a CI workflow running tests on every push; make a deliberately broken deploy and rehearse rollback.",
    },
    aiGuidance: {
      fa: "فایل‌های CI که هوش مصنوعی می‌سازد اغلب اضافه‌کارهای خطرناک دارند (secrets در لاگ، اسکریپت‌های curl|bash). هر مرحله‌ی پایپ‌لاین را خودت بخوان، حداقلی نگه دار و اجرایش را شاهد باش.",
      en: "AI-written CI files often carry dangerous extras (secrets in logs, curl|bash scripts). Read every pipeline step yourself, keep it minimal, and watch it run.",
    },
    check: {
      fa: "سه سناریوی خرابی استقرار (env var گم‌شده، بیلد متفاوت از تست، پورت اشتباه) را توضیح بده و برای هرکدام ابزار دیدنِ مشکل را نام ببر.",
      en: "Explain three deploy failures (missing env var, build/test drift, wrong port) and name the tool that reveals each.",
    },
    completion: {
      fa: ["URL عمومیِ یک استقرار واقعی", "CI سبز روی مخزن", "برنامه‌ی rollback مکتوب و تمرین‌شده"],
      en: ["A public URL of a real deployment", "Green CI on the repo", "A written, rehearsed rollback plan"],
    },
    resources: [
      { title: "The Twelve-Factor App", url: "https://12factor.net/", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-003", "c-027", "c-037"],
    sources: ["src-12factor", "src-dora2024", "src-swebok4"],
    skipAhead: {
      fa: "اگر DevOps را روزانه انجام می‌دهی، این موضوع را با چک‌لیست بازبینی کن و مستقیم برو سراغ observability.",
      en: "If you do DevOps daily, review this topic as a checklist and jump to observability.",
    },
    lastReview: "2026-11-14",
  },
  {
    id: "t-observability-ops",
    track: "core",
    order: 15,
    title: { fa: "مشاهده‌پذیری و نگهداشت", en: "Observability & Maintenance" },
    terms: [
      { fa: "لاگ ساخت‌یافته (Structured log)", en: "Structured logging (لاگ ساخت‌یافته)" },
      { fa: "شاخص (Metric)", en: "Metric (شاخص)" },
      { fa: "چهار سیگنال طلایی (Golden signals)", en: "Four golden signals (چهار سیگنال طلایی)" },
      { fa: "فن‌آموزی پس از حادثه (Postmortem)", en: "Postmortem (فن‌آموزی پس از حادثه)" },
    ],
    summary: {
      fa: "بعد از استقرار، برنامه در تاریکی زندگی می‌کند مگر آنکه آن را قابل‌مشاهده کنی: لاگ ساخت‌یافته، شاخص‌های کلیدی و هشدارِ علامت‌محور. کتاب SRE گوگل «چهار سیگنال طلایی» را درس می‌دهد و فن‌آموزی پس از حادثه را بدون مقصرِ انسانی تمرین می‌کنیم.",
      en: "After deployment your program lives in the dark unless you make it observable: structured logs, key metrics, symptom-based alerts. Google's SRE book teaches the four golden signals; we practice blameless postmortems too.",
    },
    outcomes: {
      fa: [
        "لاگ ساخت‌یافته با شناسه‌ی درخواست اضافه کنی",
        "چهار سیگنال طلایی را برای یک سرویس تعریف کنی",
        "یک حادثه‌ی مصنوعی را با لاگ/متریک ریشه‌یابی کنی",
        "پس‌آموزی کوتاه بدون مقصر بنویسی",
      ],
      en: [
        "Add structured logs with a request ID",
        "Define the four golden signals for a service",
        "Root-cause a synthetic incident via logs/metrics",
        "Write a short blameless postmortem",
      ],
    },
    why: {
      fa: "کدِ تولید‌شده توسط هوش مصنوعی وقتی در تولید می‌شکند، پاسخ سؤال «چرا» را باید از داده‌ی مشاهده‌پذیری بگیری نه از حدس مدل. نگهداشت، جایی است که کیفیت واقعی دیده می‌شود — و GitClear نشان داده بدون بازبینی انضباطی، بدهی انباشته می‌شود.",
      en: "When AI-generated code breaks in production, the 'why' comes from observability data, not from the model's guess. Maintenance is where real quality shows — and GitClear's data shows debt accumulates without review discipline.",
    },
    prereqs: ["t-deployment-cicd"],
    related: ["t-os-concepts", "t-communication-collab"],
    essential: {
      fa: "لاگ ساخت‌یافته، متریک پایه، چهار سیگنال طلایی، یک پس‌آموزی واقعی.",
      en: "Structured logging, basic metrics, the four golden signals, one real postmortem.",
    },
    optional: {
      fa: "tracing توزیع‌شده و SLO در سطح مفهومی.",
      en: "Distributed tracing and SLOs conceptually.",
    },
    exercise: {
      fa: "به p-02 لاگ ساخت‌یافته و دو متریک اضافه کن؛ یک باگ عمدی تزریق کن، با لاگ و متریک ریشه‌یابی کن و یک پس‌آموزی یک‌صفحه‌ای بنویس.",
      en: "Add structured logs and two metrics to p-02; inject a deliberate bug, root-cause it via logs/metrics, and write a one-page postmortem.",
    },
    aiGuidance: {
      fa: "از هوش مصنوعی بخواه «چه شاخص‌هایی» را پیشنهاد دهد، اما انتخاب نهایی با SLO سرویس توست. لاگ‌ها را هرگز با داده‌ی شخصی کاربر پر نکن — این هم یک تصمیم حریم خصوصی است.",
      en: "Let AI propose 'which metrics', but the final choice belongs to your service's SLOs. Never log users' personal data — that is a privacy decision, not a convenience.",
    },
    check: {
      fa: "سه خط لاگ بی‌دردسرِ بی‌فایده نشان بده؛ برای هرکدام بنویس چه چیزی جا افتاده که حادثه‌ی واقعی را حل می‌کرد.",
      en: "Show three useless log lines; for each, write what missing detail would have resolved a real incident.",
    },
    completion: {
      fa: ["لاگ ساخت‌یافته در پروژه‌ی واقعی", "تعریف چهار سیگنال برای سرویس", "یک پس‌آموزی مکتوب"],
      en: ["Structured logs in a real project", "Four golden signals defined for a service", "One written postmortem"],
    },
    resources: [
      { title: "Google SRE Book — Monitoring Distributed Systems", url: "https://sre.google/sre-book/monitoring-distributed-systems/", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-027", "c-037"],
    sources: ["src-srebook"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-communication-collab",
    track: "core",
    order: 16,
    title: { fa: "ارتباط فنی و همکاری", en: "Technical Communication & Collaboration" },
    terms: [
      { fa: "بازبینی PR (Code review)", en: "Code review (بازبینی PR)" },
      { fa: "پرسش خوب (Good question)", en: "Good question (پرسش خوب)" },
      { fa: "مستندسازی (Documentation)", en: "Documentation (مستندسازی)" },
      { fa: "گزارش باگ (Bug report)", en: "Bug report (گزارش باگ)" },
    ],
    summary: {
      fa: "مهندسی نرم‌افزار کار تیمی است: PR با شرح درست، بازبینی محترمانه و دقیق، پرسش‌هایی که یک‌بار پرسیده می‌شوند و مستندی که بعداً نجاتت می‌دهد. این موضوع کم‌رِسم‌ترین و درعین‌حال بیشترین اثرگذاری را بر استخدام تو دارد.",
      en: "Software engineering is team sport: PRs with proper descriptions, respectful precise reviews, questions that only need asking once, and documentation that saves you later. Softest topic, biggest hiring impact.",
    },
    outcomes: {
      fa: [
        "PR با شرح «چرا/چه/چطور» بنویسی",
        "بازبینی سازنده با پیشنهادِ قابل‌اجرا بدهی",
        "پرسش خوب بپرسی (تلاش‌شده، حدس، کمینه)",
        "README و گزارش باگ قابل‌استفاده بنویسی",
      ],
      en: [
        "Write PRs with why/what/how descriptions",
        "Give constructive, actionable review comments",
        "Ask good questions (tried, hypothesis, minimal case)",
        "Write usable READMEs and bug reports",
      ],
    },
    why: {
      fa: "با هوش مصنوعی، «توضیح» حتی مهم‌تر شد: مشخصه، شرح PR و مستندسازی، قراردادِ بین تو و مدل و بین تو و تیم‌اند. متقاضیانی که کارشان را توضیح نمی‌دهند، حتی با کد عالی، در مصاحبه و بازبینی می‌بازند.",
      en: "With AI, explanation matters even more: specs, PR descriptions and docs are the contract between you and the model, and you and the team. Candidates who cannot explain their work lose interviews and reviews even with great code.",
    },
    prereqs: [],
    related: ["t-requirements-design", "t-ai-assisted-workflow"],
    essential: {
      fa: "نوشتن PR/README برای همه‌ی پروژه‌هایت؛ یک بازبینی واقعی روی کار دیگری.",
      en: "Write PR/README for all your projects; one real review of someone else's work.",
    },
    optional: {
      fa: "گفت‌وگوی فنی غیرهمزمان، نوشتن برای مخاطب بین‌المللی.",
      en: "Async technical discussion, writing for international audiences.",
    },
    exercise: {
      fa: "کار یک هم‌یادگیرنده را بازبینی کن (یا یک PR اپن‌سورس را): سه نظر سازنده با پیشنهاد قابل‌اجرا بنویس؛ سپس PR خودت را با چک‌لیست همان چک کن.",
      en: "Review a peer's work (or an open-source PR): write three constructive, actionable comments; then apply the same checklist to your own PR.",
    },
    aiGuidance: {
      fa: "پیش‌نویس شرح PR را می‌توانی به مدل بسپاری اما «چرا» باید از تو بیاید. از مدل بخواه بازبینی اولیه کند — ولی یادت باشد بازبینی‌اش سطحی است؛ عمق با توست.",
      en: "Draft PR descriptions with AI, but the 'why' must come from you. Use AI for a first-pass review — but remember it is shallow; depth is yours.",
    },
    check: {
      fa: "یک PR بد (شرح خالی، کامیت‌های مخلوط) را بازنویسی کن: عنوان، شرح سه‌بندی‌شده و تقسیم کامیت‌ها — سپس تفاوت ارزش را در سه جمله توضیح بده.",
      en: "Rewrite a bad PR (empty description, mixed commits): title, three-part description, commit split — then explain the value difference in three sentences.",
    },
    completion: {
      fa: ["PR با شرح کامل روی پروژه‌ی واقعی", "سه نظر بازبینی سازنده", "README پروژه که یک غریبه را راه می‌اندازد"],
      en: ["A full-description PR on a real project", "Three constructive review comments", "A README that onboards a stranger"],
    },
    resources: [
      { title: "GitHub Docs — About pull requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-031"],
    sources: ["src-git-docs"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-ai-assisted-workflow",
    track: "core",
    order: 17,
    title: { fa: "گردش‌کار به‌یاری‌هوش‌مصنوعی", en: "AI-Assisted Workflow" },
    terms: [
      { fa: "مشخصه‌نویسی (Spec-first)", en: "Spec-first (مشخصه‌نویسی)" },
      { fa: "بازبینی diff (Diff review)", en: "Diff review (بازبینی diff)" },
      { fa: "سپردن محدود (Bounded delegation)", en: "Bounded delegation (سپردن محدود)" },
      { fa: "حالت اکتشاف (Exploration mode)", en: "Exploration mode (حالت اکتشاف)" },
    ],
    summary: {
      fa: "حلقه‌ی عملیاتی کار با هوش مصنوعی: مشخصه‌ی کوچک → زمینه‌ی مناسب → تولیدِ محدود → بازبینی diff → تست مستقل → کامیت. اینجا یاد می‌گیری چه چیزی را بسپاری (بویلرپلیت، جست‌وجو) و چه چیزی را هرگز (منطق، دیباگ، فهم)، و مرزهای هزینه/تأخیر را می‌فهمی.",
      en: "The operational loop for AI-assisted work: small spec → good context → bounded generation → diff review → independent test → commit. You learn what to delegate (boilerplate, search) and what never (logic, debugging, understanding), plus cost/latency boundaries.",
    },
    outcomes: {
      fa: [
        "مشخصه‌ی کوچک با معیار پذیرش بنویسی و به عامل بدهی",
        "diff تولیدی را خط‌به‌خط بازبینی و توجیه کنی",
        "تست مستقل برای کد تولیدی بنویسی",
        "بودجه‌ی هزینه/تأخیر برای کار با مدل تعیین کنی",
        "بفهمی کجا بدون هوش مصنوعی کار کنی",
      ],
      en: [
        "Write small specs with acceptance criteria for agents",
        "Review generated diffs line-by-line and justify them",
        "Write independent tests for generated code",
        "Set a cost/latency budget for model work",
        "Know when to work without AI",
      ],
    },
    why: {
      fa: "شواهد دوگانه است: سرعت ۵۵٫۸٪ در تکلیف سبز، کندی ۱۹٪ در مخزن بالغ (پنگ ۲۰۲۳؛ متر ۲۰۲۵) — و توسعه‌دهنده‌ها خودشان را مخصوصاً در دومی اشتباه می‌سنجند. مهارت این موضوع، تنظیم بافت است: کجا هوش مصنوعی شتاب‌دهنده است و کجا دروازه‌ی بی‌کیفیتی.",
      en: "Evidence is two-sided: +55.8% speed on a greenfield task, −19% for experienced maintainers in mature repos (Peng 2023; METR 2025) — and developers misjudge themselves especially in the second case. This topic's skill is context-setting: where AI accelerates and where it becomes a quality gate you must operate.",
    },
    prereqs: ["t-programming-basics", "t-debugging-testing"],
    related: ["t-requirements-design", "t-reading-tracing-code", "t-llm-fundamentals"],
    essential: {
      fa: "حلقه‌ی کامل یک‌بار روی پروژه‌ی واقعی؛ ثبتِ «چه سپردم و چه نگه‌داشتم».",
      en: "The full loop once on a real project; a written 'what I delegated vs kept' log.",
    },
    optional: {
      fa: "عامل‌های CLI، گردش‌کار چند-فایلی، نقشه‌های بلندمدت‌تر.",
      en: "CLI agents, multi-file workflows, longer-horizon plans.",
    },
    exercise: {
      fa: "یک ویژگی کوچک را با حلقه‌ی کامل بساز: مشخصه (۱۰ خط)، زمینه، تولید، بازبینی diff با ۳ یافته، تست مستقل، کامیت. لاگ «سپرده/نگه‌داشته» را بنویس.",
      en: "Build one small feature with the full loop: a 10-line spec, context, generation, diff review with 3 findings, an independent test, commit. Log what you delegated vs kept.",
    },
    aiGuidance: {
      fa: "این خودِ موضوعِ استفاده درست است: از مدل بخواه فقط یک گام را اجرا کند، هر گام را با معیار پذیرش ببند، و هر diff را با «پیش‌بینی من چه بود؟» مقایسه کن. اگر نتوانستی diff را توضیح دهی، ادغام ممنوع.",
      en: "This topic IS correct usage: make the model execute one step at a time, close each step against acceptance criteria, compare every diff against 'what did I expect?'. If you can't explain the diff, merge is forbidden.",
    },
    check: {
      fa: "سه سناریو را دسته‌بندی کن (سپردن امن / سپردن با نگهبان / ممنوع): راه‌اندازی پروژه‌ی جدید، بازنویسی تابع پرداخت‌موجودی، رفع باگ یک‌خطی ناشناخته — و دلیل هر دسته را با شواهد بنویس.",
      en: "Classify three scenarios (safe delegate / guarded delegate / forbidden): bootstrapping a new project, rewriting a balance-payment function, fixing an unknown one-line bug — justify each with evidence.",
    },
    completion: {
      fa: ["حلقه‌ی کامل روی یک ویژگی واقعی", "لاگ سپردن/نگه‌داشتن با بازتاب", "یک diff رد‌شده با دلیل مکتوب"],
      en: ["The full loop on a real feature", "A delegation log with reflection", "One rejected diff with a written reason"],
    },
    resources: [
      { title: "Barke et al. — Grounded Copilot (OOPSLA'23)", url: "https://arxiv.org/abs/2206.15000", lang: "en", level: "reference", free: true },
      { title: "Stack Overflow 2025 — AI section", url: "https://survey.stackoverflow.co/2025/ai", lang: "en", level: "reference", free: true },
    ],
    claims: ["c-001", "c-002", "c-005", "c-007", "c-030", "c-031", "c-032"],
    sources: ["src-peng2023", "src-metr2025", "src-so2025", "src-jetbrains2024", "src-barke2023"],
    skipAhead: {
      fa: "این موضوع برای توسعه‌دهندگان باتجربه «اصلی‌ترین» است — ازش رد نشو، حتی اگر بقیه‌ی پایه را رد می‌کنی.",
      en: "For experienced developers this is the single most relevant core topic — do not skip it even if you skip the rest of the core.",
    },
    lastReview: "2026-11-14",
  },
];
