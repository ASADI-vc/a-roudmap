import type { Topic } from "./types";

export const frontendTopics: Topic[] = [
  {
    id: "t-html-css-foundations",
    track: "frontend",
    order: 1,
    title: { fa: "پایه‌های HTML و CSS", en: "HTML & CSS Foundations" },
    terms: [
      { fa: "معنای سند (Semantic HTML)", en: "Semantic HTML (معنای سند)" },
      { fa: "جعبه (Box model)", en: "Box model (جعبه)" },
      { fa: "Flexbox و Grid", en: "Flexbox & Grid" },
      { fa: "واکنش‌گرا (Responsive)", en: "Responsive (واکنش‌گرا)" },
    ],
    summary: {
      fa: "HTML یعنی معنا (این عنوان است، این فرم است) و CSS یعنی نمایش. ساختار معنایی، مدل جعبه، چیدمان با Flex/Grid و طراحی واکنش‌گرا را یاد می‌گیری — بدون فریم‌ورک، تا وقتی فریم‌ورک را می‌گیری بدانی چه چیزی را از تو مخفی می‌کند.",
      en: "HTML is meaning (this is a heading, this is a form); CSS is presentation. You learn semantic structure, the box model, layout with Flex/Grid and responsive design — without a framework, so that when you take one you know what it hides from you.",
    },
    outcomes: {
      fa: [
        "سندی با عناصر معنایی درست بنویسی",
        "چیدمان دوستونه با Flex و Grid بدون چت‌جی‌پی‌تی بسازی",
        "صفحه را روی سه اندازه‌ی صفحه واکنش‌گرا کنی",
        "با DevTools یک چیدمان شکسته را اصلاح کنی",
      ],
      en: [
        "Write a document with correct semantic elements",
        "Build a two-column layout with Flex and Grid unaided",
        "Make a page responsive at three viewport sizes",
        "Fix a broken layout using DevTools",
      ],
    },
    why: {
      fa: "دستیارها HTML/CSS «می‌سازند» اما بدون معنای درست، دسترس‌پذیری و سئو می‌شکند و بازبینی diff بدون فهم چیدمان بی‌معناست. معنای سند پایه‌ی مستقیم موضوع دسترس‌پذیری است.",
      en: "Assistants 'make' HTML/CSS, but without correct semantics accessibility and SEO break, and diff review is meaningless if you cannot read layout. Semantic structure directly feeds the accessibility topic.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-web-accessibility", "t-react-essentials"],
    essential: {
      fa: "چیدمان Flex/Grid + واکنش‌گرا + فرم کارا؛ پروژه‌ی سبک‌وزن بدون فریم‌ورک.",
      en: "Flex/Grid layout + responsiveness + a working form; one lightweight project, no framework.",
    },
    optional: {
      fa: "متغیرهای CSS، انیمیشن، container queries.",
      en: "CSS variables, animation, container queries.",
    },
    exercise: {
      fa: "صفحه‌ی پروفایل با هدر/مقاله/فرم تماس بساز؛ سه نقطه‌ی توقف واکنش‌گرا؛ بدون هیچ فریم‌ورک؛ بعد یک نسخه‌ی دسترسی‌پذیری هم اضافه کن (به موضوع بعدی وصله).",
      en: "Build a profile page (header/article/contact form) with three breakpoints, no framework; then add an accessibility pass (feeds the next topic).",
    },
    aiGuidance: {
      fa: "خروجی CSS تولیدی را با «کدام قانون باعث این چیدمان شد؟» به چالش بکش؛ بخواه دو راه‌حل (Flex در برابر Grid) بدهد و تو انتخاب و توجیه کنی. مالت‌گذاری با id نامرئی را رد کن.",
      en: "Challenge generated CSS with 'which rule causes this layout?'; request two solutions (Flex vs Grid) and choose/justify yourself. Reject invisible-magic classes.",
    },
    check: {
      fa: "یک چیدمان شکسته (عناصر روی‌هم) را در DevTools باز کن: علت را پیدا، اصلاح و توضیح بده که کدام جعبه و کدام قاعده مقصر بود.",
      en: "Open a broken layout in DevTools: find the cause, fix it, and explain which box/rule was guilty.",
    },
    completion: {
      fa: ["صفحه‌ی واکنش‌گرا بدون فریم‌ورک", "توضیح مکتوب یک چیدمان Grid", "اصلاح یک چیدمان شکسته"],
      en: ["A responsive page without frameworks", "A written Grid-layout explanation", "One broken layout fixed"],
    },
    resources: [
      { title: "MDN Learn — HTML & CSS", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core", lang: "en", level: "beginner", free: true },
      { title: "web.dev Learn CSS (Google)", url: "https://web.dev/learn/css", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-mdn-http", "src-wcag22"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-js-deep",
    track: "frontend",
    order: 2,
    title: { fa: "جاوااسکریپت عمیق: رویدادها و ناهمگامی", en: "Deep JavaScript: Events & Async" },
    terms: [
      { fa: "صف رویداد (Event loop)", en: "Event loop (صف رویداد)" },
      { fa: "پرامیس (Promise)", en: "Promise (پرامیس)" },
      { fa: "async/await", en: "async/await" },
      { fa: "کلوژر (Closure)", en: "Closure (کلوژر)" },
    ],
    summary: {
      fa: "قلب جاوااسکریپت ناهمگامی است: صف رویداد، پرامیس، async/await و کلوژرها را تا عمقی می‌فهمی که ترتیب اجرای یک اسکریپت واقعی را بدون اجرا پیش‌بینی کنی — این دقیقاً همان مهارت دیباگِ کد تولیدی هم هست.",
      en: "JavaScript's heart is asynchrony: the event loop, promises, async/await, closures — understood deeply enough to predict the execution order of a real script without running it, which is exactly the skill for debugging generated code too.",
    },
    outcomes: {
      fa: [
        "ترتیب اجرای کد ناهمگام را پیش‌بینی کنی",
        "با Promise.all و خطاها درست کار کنی",
        "کلوژر و this را در باگ‌های واقعی تشخیص دهی",
        "درخواست شبکه با retry ساده بنویسی",
      ],
      en: [
        "Predict execution order of async code",
        "Use Promise.all and handle errors correctly",
        "Spot closure/this bugs in real code",
        "Write a network request with simple retry",
      ],
    },
    why: {
      fa: "کد تولیدی هوش مصنوعی در ناهمگامی بیشترین خطای ظریف را دارد (فراموشی await، رقابت منابع). بدون مدل ذهنی رویداد، بازبینی diff در همین بخش کور می‌شود.",
      en: "Generated code has its subtlest bugs in asynchrony (missing awaits, race conditions). Without an event-loop mental model, diff review is blind exactly here.",
    },
    prereqs: ["t-programming-basics"],
    related: ["t-frontend-state-data", "t-node-server-basics"],
    essential: {
      fa: "پیش‌بینی ترتیب اجرا + یک مصرف‌کننده‌ی API با مدیریت خطا.",
      en: "Execution-order prediction + one API consumer with error handling.",
    },
    optional: {
      fa: "Generator/AsyncIterator، AbortController در عمق.",
      en: "Generators/AsyncIterators, AbortController in depth.",
    },
    exercise: {
      fa: "دو درخواست موازی با Promise.all و مدیریت خطای نیمه‌شکست بنویس؛ سپس اسکریپتی ۲۰خطی با ترکیب setTimeout/Promise بده که ترتیبش را قبل از اجرا پیش‌بینی و مستند کنی.",
      en: "Write two parallel requests with Promise.all handling partial failure; then a 20-line setTimeout/Promise mix whose order you predict and document before running.",
    },
    aiGuidance: {
      fa: "از مدل بخواه «چرا این await حیاتی است؟» توضیح دهد؛ پیش‌بینی‌ات را اول بنویس، بعد اجرا کن. باگ‌های رقابت را با تاخیرهای عمدی شبیه‌سازی کن.",
      en: "Ask the model 'why is this await critical?'; write your prediction first, then run. Simulate race bugs with deliberate delays.",
    },
    check: {
      fa: "کدی که fetch را بدون await داخل حلقه می‌زند: بگو چه چیزی در کجا خراب می‌شود و دو راه اصلاح را مقایسه کن.",
      en: "Code calling fetch without await inside a loop: say what breaks where, and compare two fixes.",
    },
    completion: {
      fa: ["پیش‌بینی مستند ۵ اسکریپت ناهمگام", "یک مصرف‌کننده‌ی API با خطای درست", "یک باگ کلوژر/this حل‌شده"],
      en: ["Documented predictions for 5 async scripts", "One API consumer with correct errors", "One closure/this bug solved"],
    },
    resources: [
      { title: "MDN — Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", lang: "en", level: "intermediate", free: true },
      { title: "javascript.info — Promises, async/await", url: "https://javascript.info/async", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-023"],
    sources: ["src-mdn-http"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-react-essentials",
    track: "frontend",
    order: 3,
    title: { fa: "اساس‌های ری‌اکت", en: "React Essentials" },
    terms: [
      { fa: "کامپوننت (Component)", en: "Component (کامپوننت)" },
      { fa: "State", en: "State (وضعیت)" },
      { fa: "Props", en: "Props (خواص)" },
      { fa: "Effect", en: "Effect (اثر)" },
    ],
    summary: {
      fa: "ری‌اکت را با مسیر رسمی react.dev یاد می‌گیری: کامپوننت به‌عنوان تابع، state به‌عنوان وضعیتِ قابل‌نمایش، و effects به‌عنوان آخرین گزینه. انتخاب ری‌اکت پیشنهاد تحریریه است (اکوسیستم و مستندات رسمی عالی)؛ Vue/Svelte جایگزین‌های مشروع‌اند.",
      en: "React via the official react.dev path: components as functions, state as renderable status, effects as last resort. React is an editorial pick (ecosystem, excellent official docs); Vue/Svelte are legitimate alternatives.",
    },
    outcomes: {
      fa: [
        "کامپوننت‌های کوچک با props/state بنویسی",
        "لیست‌ها و فرم‌های کنترل‌شده را پیاده کنی",
        "بدانی effect چه‌وقت لازم است و چه‌وقت ضدالگو",
        "یک اپ کوچک را با react + typescript بسازی",
      ],
      en: [
        "Write small components with props/state",
        "Implement lists and controlled forms",
        "Know when effects are needed vs anti-pattern",
        "Build a small app with React + TypeScript",
      ],
    },
    why: {
      fa: "بیشتر کد تولیدی هوش مصنوعی برای وب، ری‌اکت است؛ اگر مدل ذهنی رندر را نداشته باشی، نمی‌فهمی چرا خروجی مدل «تقریباً درست» است و چرا بی‌نهایت رندر می‌شود.",
      en: "Most AI-generated web code is React; without a render mental model you can't tell why generated output is 'almost right' or why it re-renders infinitely.",
    },
    prereqs: ["t-js-deep", "t-html-css-foundations"],
    related: ["t-typescript", "t-frontend-state-data"],
    essential: {
      fa: "Quick Start + «Adding Interactivity» از react.dev؛ یک اپ کوچک واقعی.",
      en: "react.dev Quick Start + 'Adding Interactivity'; one small real app.",
    },
    optional: {
      fa: "useReducer، context، الگوهای ترکیب.",
      en: "useReducer, context, composition patterns.",
    },
    exercise: {
      fa: "اپ «لیست کارها» با فیلتر و ذخیره‌ی محلی بساز؛ عمداً یک effect بی‌مورد اضافه کن که حلقه‌ی رندر می‌سازد، پیدا و اصلاحش کن.",
      en: "Build a 'tasks list' app with filters and local persistence; deliberately add a useless effect causing a render loop, then find and fix it.",
    },
    aiGuidance: {
      fa: "بگذار مدل کامپوننت بسازد اما «مالکیت state» را خودت تصمیم بگیر؛ هر useEffect تولیدی را با این پرسش بازبینی کن: «آیا این از واقعه‌ی کاربر یا از رندر نتیجه می‌شود؟»",
      en: "Let the model build components but YOU decide state ownership; audit every generated useEffect with 'does this follow a user event, or a render?'",
    },
    check: {
      fa: "کامپوننتی با useEffect بی‌مورد (fetch در هر رندر): بگو چرا بد است و دو اصلاح (کلید/کش یا رویداد) را مقایسه کن.",
      en: "A component with a needless useEffect (fetch on every render): say why it is bad and compare two fixes (key/cache vs event-driven).",
    },
    completion: {
      fa: ["اپ کوچک با فرم/فیلتر/ذخیره", "یک حلقه‌ی رندر پیدا و اصلاح‌شده", "توجیه مکتوب مالکیت state"],
      en: ["A small app with form/filter/persistence", "One render loop found and fixed", "A written state-ownership rationale"],
    },
    resources: [
      { title: "react.dev — Learn React (official)", url: "https://react.dev/learn", lang: "en", level: "beginner", free: true },
      { title: "react.dev — Creating a React App", url: "https://react.dev/learn/creating-a-react-app", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-e2"],
    sources: ["src-react-docs"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-web-accessibility",
    track: "frontend",
    order: 4,
    title: { fa: "دسترس‌پذیری وب (WCAG 2.2)", en: "Web Accessibility (WCAG 2.2)" },
    terms: [
      { fa: "POUR", en: "POUR (اصول چهارگانه)" },
      { fa: "کنتراست (Contrast)", en: "Contrast (کنتراست)" },
      { fa: "ناوبری کیبورد (Keyboard nav)", en: "Keyboard navigation (ناوبری کیبورد)" },
      { fa: "برچسب ARIA", en: "ARIA labels (برچسب ARIA)" },
    ],
    summary: {
      fa: "دسترس‌پذیری یعنی محصول برای همه کار می‌کند: اصول POUR، معیارهای سطح AA از WCAG 2.2 (نسخه‌ی توصیه‌شده‌ی W3C از ۲۰۲۴)، ناوبری کیبورد، کنتراست و برچسب‌ها. اینجا عملاً یک صفحه را با صفحه‌خوان و کیبورد می‌آزمایی.",
      en: "Accessibility means the product works for everyone: the POUR principles, WCAG 2.2 level AA (W3C's recommended target since 2024), keyboard navigation, contrast, and labels. You practically audit a page with a screen reader and keyboard only.",
    },
    outcomes: {
      fa: [
        "چک‌لیست AA را روی یک صفحه واقعی اجرا کنی",
        "ناوبری کامل کیبورد با focus مرئی تضمین کنی",
        "کنتراست را با ابزار بسنجی و اصلاح کنی",
        "برچسب/نقش درست برای کنترل‌ها بگذاری",
      ],
      en: [
        "Run the AA checklist on a real page",
        "Guarantee full keyboard navigation with visible focus",
        "Measure and fix contrast with tooling",
        "Attach correct labels/roles to controls",
      ],
    },
    why: {
      fa: "خروجی هوش مصنوعی به‌طور نظام‌مند دسترس‌پذیری را می‌شکند (div به‌جای button، برچسب گم‌شده) چون در داده‌ی آموزشی‌اش کم‌نمود است. WCAG 2.2 چارچوب رسمی است و بازبینی دسترس‌پذیری بخشی از بازبینی diff باید باشد.",
      en: "AI output systematically breaks accessibility (divs instead of buttons, missing labels) because it is underrepresented in training data. WCAG 2.2 is the official framework, and an accessibility pass belongs in every diff review.",
    },
    prereqs: ["t-html-css-foundations"],
    related: ["t-react-essentials", "t-frontend-quality-perf"],
    essential: {
      fa: "چهار معیار: کیبورد کامل، کنتراست AA، برچسب‌ها، focus مرئی.",
      en: "Four criteria: full keyboard, AA contrast, labels, visible focus.",
    },
    optional: {
      fa: "ARIA پیشرفته، الگوهای dialog/menu دسترس‌پذیر.",
      en: "Advanced ARIA, accessible dialog/menu patterns.",
    },
    exercise: {
      fa: "صفحه‌ی p-03 را فقط با کیبورد و صفحه‌خوان مرورگر آزمایش کن؛ سه شکاف دسترس‌پذیری پیدا، اصلاح و با چک‌لیست WCAG 2.2 مستند کن.",
      en: "Audit your p-03 page with keyboard+screen reader only; find, fix and document three accessibility gaps against the WCAG 2.2 checklist.",
    },
    aiGuidance: {
      fa: "از مدل بخواه خروجی‌اش را در برابر WCAG 2.2 نقد کند؛ اما آزمایش کیبورد/صفحه‌خوان واقعی جایگزین‌ناپذیر است — ادعای «دسترس‌پذیر» بدون آزمون، پوشالی است.",
      en: "Have the model critique its own output against WCAG 2.2; but a real keyboard/screen-reader test is irreplaceable — an 'accessible' claim without testing is marketing.",
    },
    check: {
      fa: "سه عنصر تولیدی ناقص (div کلیک‌پذیر، input بی‌برچسب، focus نامرئی) را پیدا، اصلاح و برای هرکدام معیار WCAG مربوطه را نام ببر.",
      en: "Find and fix three broken generated elements (clickable div, unlabeled input, invisible focus), naming the WCAG criterion for each.",
    },
    completion: {
      fa: ["آزمون کیبورد کامل یک صفحه", "کنتراست AA تأییدشده", "سه شکاف اصلاح‌شده با ارجاع WCAG"],
      en: ["Full keyboard test of one page", "Verified AA contrast", "Three fixed gaps with WCAG references"],
    },
    resources: [
      { title: "W3C — WCAG 2.2 (Recommendation)", url: "https://www.w3.org/TR/WCAG22/", lang: "en", level: "reference", free: true },
      { title: "MDN — Accessibility overview", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility", lang: "en", level: "beginner", free: true },
    ],
    claims: ["c-035"],
    sources: ["src-wcag22"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-frontend-state-data",
    track: "frontend",
    order: 5,
    title: { fa: "وضعیت و داده در فرانت‌اند", en: "Frontend State & Data" },
    terms: [
      { fa: "وضعیت سرور در برابر وضعیت رابط", en: "Server state vs UI state" },
      { fa: "کش (Cache)", en: "Cache (کش)" },
      { fa: "بارگذاری/خطا (Loading/error)", en: "Loading/error states (بارگذاری/خطا)" },
      { fa: "بهینه‌گرایی (Optimistic UI)", en: "Optimistic UI (بهینه‌گرایی)" },
    ],
    summary: {
      fa: "دو نوع وضعیت مختلف را تفکیک می‌کنی: وضعیت رابط (فرم باز است؟) و وضعیت سرور (سبد خرید چیست؟). الگوهای واکشی، کش ساده، حالت‌های بارگذاری/خالی/خطا و به‌روزرسانی بهینه‌گرا را روی یک اپ واقعی پیاده می‌کنی.",
      en: "You separate two different kinds of state: UI state (is the form open?) and server state (what's in the cart?). Fetching patterns, simple caching, loading/empty/error states and optimistic updates — on a real app.",
    },
    outcomes: {
      fa: [
        "دو نوع وضعیت را تفکیک و در جای درست قرار دهی",
        "سه حالت بارگذاری/خالی/خطا را با طراحی خوب بسازی",
        "کش ساده با بی‌اعتبارسازی پیاده کنی",
        "یک به‌روزرسانی بهینه‌گرا با بازگشت خطا بزنی",
      ],
      en: [
        "Separate the two state types and place each correctly",
        "Build well-designed loading/empty/error states",
        "Implement a simple cache with invalidation",
        "Do one optimistic update with rollback on error",
      ],
    },
    why: {
      fa: "کد تولیدی معمولاً «مسیر خوش‌بینانه» را می‌نویسد: داده می‌آید و نمایش می‌دهد. حالت‌های خطا/خالی همان‌جایی است که کیفیت واقعی رابط تو دیده می‌شود و بازبینی تو باید رویش تمرکز کند.",
      en: "Generated code writes the happy path: data arrives, gets displayed. Error/empty states are where your product's real quality shows and where your review should concentrate.",
    },
    prereqs: ["t-react-essentials", "t-http-web"],
    related: ["t-js-deep", "t-api-design"],
    essential: {
      fa: "یک اپ با واکشی واقعی + سه حالت + یک کش ساده.",
      en: "One app with real fetching + three states + a simple cache.",
    },
    optional: {
      fa: "TanStack Query/SWR و مقایسه‌شان با کش دستی.",
      en: "TanStack Query/SWR compared against the hand-rolled cache.",
    },
    exercise: {
      fa: "اپ p-03 را به API واقعی وصل کن؛ سه حالت را طراحی و پیاده کن؛ یک به‌روزرسانی بهینه‌گرا با rollback بنویس و سناریوی خطای شبکه را با throttling مرورگر آزمایش کن.",
      en: "Connect p-03 to a real API; design and implement the three states; write one optimistic update with rollback; test the offline scenario with browser throttling.",
    },
    aiGuidance: {
      fa: "در بازبینی تولیدی، اول «حالت‌های بد» را چک کن: اگر مدل فقط happy path نوشته، ازش بخواه حالت‌ها را کامل کند — و خودت با قطع شبکه آزمایشش کن.",
      en: "In generated code, check the 'bad states' first: if the model wrote only the happy path, make it complete them — then test yourself with the network cut.",
    },
    check: {
      fa: "سه قطعه‌کد واکشی را دسته‌بندی کن: کدام کش می‌کند؟ کدام رقابت درخواست‌ها دارد؟ کدام حالت خطا را می‌بلعد؟",
      en: "Classify three fetch snippets: which caches? which has request races? which swallows errors?",
    },
    completion: {
      fa: ["سه حالت طراحی‌شده در اپ واقعی", "کش با بی‌اعتبارسازی", "به‌روزرسانی بهینه‌گرا با بازگشت"],
      en: ["Three designed states in a real app", "Cache with invalidation", "Optimistic update with rollback"],
    },
    resources: [
      { title: "react.dev — Managing State (official)", url: "https://react.dev/learn/managing-state", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-024"],
    sources: ["src-react-docs"],
    lastReview: "2026-11-14",
  },
  {
    id: "t-frontend-quality-perf",
    track: "frontend",
    order: 6,
    title: { fa: "کیفیت و کارایی فرانت‌اند", en: "Frontend Quality & Performance" },
    terms: [
      { fa: "LCP", en: "LCP (بزرگ‌ترین رندر محتوا)" },
      { fa: "بودجه‌ی کارایی (Perf budget)", en: "Performance budget (بودجه‌ی کارایی)" },
      { fa: "تست رابط (UI test)", en: "UI testing (تست رابط)" },
      { fa: "حجم بسته (Bundle size)", en: "Bundle size (حجم بسته)" },
    ],
    summary: {
      fa: "سرعت و استحکام رابط را با اندازه‌گیری مدیریت می‌کنی: متریک‌های وب حیاتی، بودجه‌ی کارایی، تقسیم کد و یک تست رابط برای مسیرهای حیاتی. هر بهبود را با عدد قبل/بعد مستند می‌کنی.",
      en: "You manage UI speed and robustness by measurement: Core Web Vitals, a performance budget, code splitting, and one UI test for critical paths — documenting every improvement with before/after numbers.",
    },
    outcomes: {
      fa: [
        "سه متریک حیاتی را اندازه و تفسیر کنی",
        "بودجه‌ی کارایی تعریف و رعایت کنی",
        "یک بهینه‌سازی واقعی با عدد قبل/بعد انجام دهی",
        "تست رابط برای یک مسیر حیاتی بنویسی",
      ],
      en: [
        "Measure and interpret three core metrics",
        "Define and respect a performance budget",
        "Do one real optimization with before/after numbers",
        "Write a UI test for one critical path",
      ],
    },
    why: {
      fa: "هوش مصنوعی حجم بسته را راحت بزرگ می‌کند (کتابخانه‌ی اضافه، چون «ساده‌تر» است). بدون اندازه‌گیری، این هزینه‌ها نامرئی می‌مانند تا روزی که روی موبایل کاربر دیده می‌شوند.",
      en: "AI grows bundles comfortably (extra libraries 'because simpler'). Without measurement these costs stay invisible until users hit them on mobile.",
    },
    prereqs: ["t-react-essentials", "t-debugging-testing"],
    related: ["t-algorithms-core", "t-web-accessibility"],
    essential: {
      fa: "اندازه‌گیری Lighthouse + یک بهینه‌سازی مستند + یک تست رابط.",
      en: "Lighthouse measurement + one documented optimization + one UI test.",
    },
    optional: {
      fa: "SSR در سطح مفهومی، تحلیل بسته.",
      en: "SSR conceptually, bundle analysis.",
    },
    exercise: {
      fa: "برای p-03 Lighthouse بگیر، بودجه بگذار، یک بهینه‌سازی (تصویر/بسته) بزن و قبل/بعد را مستند کن؛ سپس یک تست رابط برای «افزودن به سبد» بنویس.",
      en: "Run Lighthouse on p-03, set a budget, make one optimization (image/bundle), document before/after; then write a UI test for 'add to cart'.",
    },
    aiGuidance: {
      fa: "هر کتابخانه‌ای که مدل پیشنهاد می‌دهد را با «چه مساله‌ای حل می‌کند و هزینه‌ی بسته‌اش چقدر است؟» بسنج؛ اندازه‌گیری قبل/بعد فقط با توست.",
      en: "Judge every suggested library with 'what problem does it solve and what does it cost the bundle?'; before/after measurement is yours alone.",
    },
    check: {
      fa: "سه تغییر (تصویر lazy، حذف کتابخانه، تقسیم کد) را با اثرشان روی LCP/TBT رتبه‌بندی کن و بگو کدام را اول انجام می‌دهی و چرا.",
      en: "Rank three changes (lazy image, library removal, code splitting) by their LCP/TBT impact and say which you'd do first and why.",
    },
    completion: {
      fa: ["دو گزارش Lighthouse با مقایسه", "بودجه‌ی کارایی مکتوب", "یک تست رابط سبز روی مسیر حیاتی"],
      en: ["Two compared Lighthouse reports", "A written performance budget", "One green UI test on a critical path"],
    },
    resources: [
      { title: "web.dev — Learn Performance", url: "https://web.dev/learn/performance", lang: "en", level: "intermediate", free: true },
    ],
    claims: ["c-004"],
    sources: ["src-gitclear2025"],
    lastReview: "2026-11-14",
  },
];
