import type { Claim, SourceRecord } from "./types";

// Public claim registry — mirrors research/CLAIMS.md. Only claims shown on the evidence page live here.
export const claims: Claim[] = [
  {
    id: "c-001",
    kind: "causal",
    statement: {
      fa: "در یک آزمایش تصادفی، ۹۵ برنامه‌نویسِ دارای Copilot یک تکلیف سبز‌ساز را ۵۵٫۸٪ سریع‌تر از گروه شاهد تمام کردند (۷۱٫۲ در برابر ۱۶۰٫۹ دقیقه).",
      en: "In a randomized experiment, 95 programmers with GitHub Copilot finished a standardized greenfield task 55.8% faster than controls (71.2 vs 160.9 minutes).",
    },
    caveats: {
      fa: "تکلیف واحد، تازه‌کار-پسند (پروژه از صفر)، استخدام از Upwork؛ نه یک اندازه‌گیری «تحویل» در دنیای واقعی.",
      en: "One task, greenfield-friendly, Upwork-recruited; not an end-to-end delivery measurement.",
    },
    sourceIds: ["src-peng2023", "src-ziegler2023"],
  },
  {
    id: "c-002",
    kind: "causal",
    statement: {
      fa: "در آزمایش میدانی METR، ۱۶ نگهدار باتجربه‌ی مخازن اپن‌سورس با ابزارهای هوش مصنوعی اوایل ۲۰۲۵ روی ۲۴۶ مسئله ۱۹٪ کندتر شدند — و هم‌زمان معتقد بودند ۲۰٪ سریع‌تر شده‌اند.",
      en: "In METR's field RCT, 16 experienced open-source maintainers were 19% slower with early-2025 AI tools across 246 issues — while believing they had been 20% faster.",
    },
    caveats: {
      fa: "نمونه کوچک (۱۶ نفر)، مخازن بالغ با میلیون‌ها خط؛ ابزارهای اوایل ۲۰۲۵؛ قابل‌تعمیم به همه‌ی بافت‌ها نیست.",
      en: "Small n (16), mature million-line repos, early-2025 tools; not generalizable to every setting.",
    },
    sourceIds: ["src-metr2025"],
  },
  {
    id: "c-003",
    kind: "survey",
    statement: {
      fa: "DORA ۲۰۲۴: هر ۲۵٪ افزایش در به‌کارگیری هوش مصنوعی با +۷٫۵٪ کیفیت مستندات و +۳٫۴٪ کیفیت کد همراه بود اما با −۱٫۵٪ throughput تحویل و −۷٫۲٪ ثبات تحویل.",
      en: "DORA 2024: a 25% increase in AI adoption is associated with +7.5% documentation quality and +3.4% code quality — but −1.5% delivery throughput and −7.2% delivery stability.",
    },
    caveats: {
      fa: "همبستگی نه علیّت؛ نظرسنجی ≈۳٫۰۰۰ نفر (۳۹٫۰۰۰ رقم ده ساله است)؛ ادراک پاسخ‌دهندگان.",
      en: "Correlation, not causation; ~3,000-respondent survey (39,000 is the decade-cumulative figure); respondent perception.",
    },
    sourceIds: ["src-dora2024"],
    volatile: true,
  },
  {
    id: "c-004",
    kind: "observed",
    statement: {
      fa: "تحلیل GitClear روی ۲۱۱ میلیون خط تغییر ۲۰۲۰-۲۰۲۴: سهم بازآرایی از ۲۴٫۱٪ به ۹٫۵٪ افت کرد و خطوط copy/paste از ۸٫۳٪ به ۱۲٫۳٪ رسید؛ در ۲۰۲۴ کد تکراری از بازآرایی پیشی گرفت.",
      en: "GitClear's analysis of 211M changed lines (2020-2024): refactoring share fell 24.1%→9.5% and copy/pasted lines rose 8.3%→12.3%; in 2024 duplicated code exceeded refactoring for the first year.",
    },
    caveats: {
      fa: "همبستگی نه علیّت؛ روش‌شناسی مخازن شفاف کامل نیست؛ «۴x کلون» را نتوانستیم از منبع اصلی تأیید کنیم.",
      en: "Correlational; repo methodology not fully transparent; the widely-quoted '4x clones' could not be verified from the primary source.",
    },
    sourceIds: ["src-gitclear2025"],
    volatile: true,
  },
  {
    id: "c-005",
    kind: "survey",
    statement: {
      fa: "استک‌اورفلو ۲۰۲۵ (۴۹٫۰۰۹ پاسخ): ۸۴٪ از ابزارهای هوش مصنوعی استفاده می‌کنند یا برنامه دارند؛ ۴۶٪ به دقت آن‌ها بی‌اعتمادند در برابر ۳۳٪ اعتماد؛ ۶۶٪ از جواب‌های «تقریباً درست» کلافه‌اند.",
      en: "Stack Overflow 2025 (49,009 responses): 84% use or plan to use AI tools; 46% distrust their accuracy vs 33% trusting; 66% are frustrated by 'almost right' answers.",
    },
    caveats: {
      fa: "نمونه‌ی خودانتخابِ کاربران استک‌اورفلو؛ ادراکِ خودگزارش‌شده.",
      en: "Self-selected Stack Overflow audience; self-reported perception.",
    },
    sourceIds: ["src-so2025"],
    volatile: true,
  },
  {
    id: "c-006",
    kind: "survey",
    statement: {
      fa: "استک‌اورفلو ۲۰۲۴: ۴۵٪ توسعه‌دهندگان حرفه‌ای می‌گویند ابزارهای هوش مصنوعی در تکالیف پیچیده بد عمل می‌کنند؛ ۷۰٪ هوش مصنوعی را تهدید شغل خود نمی‌بینند.",
      en: "Stack Overflow 2024: 45% of professional developers say AI tools are bad at complex tasks; 70% do not see AI as a threat to their job.",
    },
    caveats: {
      fa: "ادراک، نه اندازه‌گیری؛ مبنای «پیچیده» تعریف‌نشده.",
      en: "Perception, not measurement; 'complex' is undefined.",
    },
    sourceIds: ["src-so2024"],
    volatile: true,
  },
  {
    id: "c-007",
    kind: "survey",
    statement: {
      fa: "جت‌برینز ۲۰۲۵: ۸۵٪ استفاده‌ی منظم از ابزارهای هوش مصنوعی؛ بویلرپلیت و جست‌وجو بیشترین سپرده‌شده‌ها و منطق اپلیکیشن، دیباگ و فهم کد کمترین‌ها — و ۶۸٪ انتظار دارند تسلط بر هوش مصنوعی شرط شغل شود.",
      en: "JetBrains 2025: 85% regularly use AI tools; boilerplate and search are most delegated while application logic, debugging, and code understanding are least delegated — and 68% expect AI proficiency to become a job requirement.",
    },
    caveats: {
      fa: "خودگزارشی؛ تعریف «استفاده منظم» به ابزار وابسته است.",
      en: "Self-report; 'regular use' definition varies by tool.",
    },
    sourceIds: ["src-jetbrains2024"],
    volatile: true,
  },
  {
    id: "c-009",
    kind: "survey",
    statement: {
      fa: "آزمایش‌های Ziegler و همکاران (خانواده‌ی همان آزمایش c-001): بیش از ۹۰٪ کاربران Copilot «تکمیل سریع‌تر» را احساس کردند — ادراک، نه اندازه‌گیری.",
      en: "Ziegler et al.'s experiments (same family as c-001): >90% of Copilot users reported feeling faster completion — perception, not measurement.",
    },
    caveats: {
      fa: "تأمین‌شده توسط فروشنده؛ ادراکِ خودگزارش‌شده.",
      en: "Vendor-run; self-reported perception.",
    },
    sourceIds: ["src-ziegler2023"],
  },
  {
    id: "c-010",
    kind: "survey",
    statement: {
      fa: "مک‌کینزی State of AI: ۷۸٪ سازمان‌های پاسخ‌دهنده حداقل در یک حوزه از هوش مصنوعی استفاده می‌کنند (نسخه‌ی مارس ۲۰۲۵؛ افزایش از ۷۲٪) و در نسخه‌ی پایزی ۲۰۲۵ حدود ۸۸٪ گزارش شد.",
      en: "McKinsey State of AI: 78% of responding organizations use AI in at least one function (March 2025 edition, up from 72%); ~88% reported in the late-2025 edition.",
    },
    caveats: {
      fa: "نظرسنجی سازمانیِ خودگزارش، منافع تجاری مشاوره؛ صفحه‌ی کامل برای ما بسته بود (بخشی تأییدشده).",
      en: "Organizational self-report by a consultancy with commercial interest; full page was bot-blocked (partially verified).",
    },
    sourceIds: ["src-mckinsey-soai2025"],
    volatile: true,
  },
  {
    id: "c-011",
    kind: "observed",
    statement: {
      fa: "Octoverse ۲۰۲۵: بیش از ۱۸۰ میلیون توسعه‌دهنده روی گیت‌هاب؛ ۳۶ میلیون فقط در یک سال؛ تایپ‌اسکریپت در اوت ۲۰۲۵ برای اولین‌بار پرکاربردترین زبان شد؛ ۸۰٪ تازه‌واردها در هفته‌ی اول از Copilot استفاده می‌کنند.",
      en: "Octoverse 2025: >180M developers on GitHub; 36M joined in a single year; TypeScript became the most-used language in August 2025 for the first time; ~80% of new developers use Copilot in their first week.",
    },
    caveats: {
      fa: "تله‌متری پلتفرم، نه نمونه‌گیری تصادفی؛ فعالیت مخازن خصوصی (۸۱٫۵٪ مشارکت‌ها) دیده‌نشدنی است؛ «سیگنال مشاهده‌ای، نه ادعای علّی».",
      en: "Platform telemetry, not random sampling; private-repo activity (81.5% of contributions) invisible; GitHub's own caveat: 'observational signals rather than causal claims'.",
    },
    sourceIds: ["src-octoverse2025"],
    volatile: true,
  },
  {
    id: "c-012",
    kind: "forecast",
    statement: {
      fa: "WEF آینده‌ی مشاغل ۲۰۲۵: کارفرماها انتظار دارند تا ۲۰۳۰ ۳۹٪ مهارت‌های هسته‌ی کارگران تغییر کند؛ «توسعه‌دهندگان نرم‌افزار» در فهرست پرشتاب‌ترین نقش‌ها؛ خالص +۷۸ میلیون شغل تا ۲۰۳۰ (برآورد از نظرسنجی).",
      en: "WEF Future of Jobs 2025: employers expect 39% of workers' core skills to change by 2030; 'Software and Applications Developers' rank among the fastest-growing roles; net +78M jobs by 2030 (survey extrapolation).",
    },
    caveats: {
      fa: "برآورد کارفرمایان بزرگ (≥۵۰۰ کارمند، ۵۵ اقتصاد)؛ پیش‌بینی است نه واقعیت ثبت‌شده.",
      en: "Large-employer survey (≥500 employees, 55 economies); a forecast, not recorded reality.",
    },
    sourceIds: ["src-wef2025"],
    volatile: true,
  },
  {
    id: "c-013",
    kind: "observed",
    statement: {
      fa: "«کوکابوراها در معدن» (داده‌ی حقوق‌ودستمزد ADP آمریکا، بازبینی اوت ۲۰۲۶): اشتغال ۲۲-۲۵ ساله‌ها در مشاغل درمعرضِ هوش مصنوعی ۱۹٪ زیرِ مسیر «هم‌گام با همتایان کمتر-درمعرض» — با کاهش استخدام، نه اخراج؛ «توسعه‌ی نرم‌افزار» از نمونه‌های موردهاست.",
      en: "'Canaries in the Coal Mine' (US ADP payroll, Aug 2026 revision): employment of 22-25-year-olds in AI-exposed occupations sits 19% below the kept-pace counterfactual — via reduced hiring, not layoffs; software development is a named case study.",
    },
    caveats: {
      fa: "فقط آمریکا، یک ارائه‌دهنده‌ی داده‌ی حقوق‌ودستمزد؛ سه نسخه‌ی بازبینی‌شده (۱۳٪→۱۶٪→۱۹٪)؛ تفسیرها موضوع بحث‌اند.",
      en: "US only, one payroll provider; three revised vintages (13%→16%→19%); interpretations are debated.",
    },
    sourceIds: ["src-stanford-canaries2025"],
    volatile: true,
  },
  {
    id: "c-014",
    kind: "observed",
    statement: {
      fa: "O*NET (منبع: BLS، دستمزد ۲۰۲۵، فقط آمریکا): میانگین حقوق سالانه‌ی توسعه‌دهندگان نرم‌افزار ۱۳۵٫۹۸۰ دلار؛ ۱٫۷۱ میلیون شاغل؛ رشد ۲۰۲۵-۲۰۳۵ «بسیار سریع‌تر از میانگین» با ۹۵٫۳۰۰ فرصت شغلی در سال.",
      en: "O*NET (source: BLS, 2025 wages, US only): Software Developers median pay $135,980/year; 1.72M employed; 2025-2035 growth 'much faster than average' with 95,300 annual openings.",
    },
    caveats: {
      fa: "صفحه‌ی BLS OOH برای ما در دسترس نبود؛ O*NET تجمیع متفاوتی از مشاغل دارد؛ فقط آمریکا.",
      en: "The BLS OOH page was inaccessible to us; O*NET uses a different occupation aggregation; US only.",
    },
    sourceIds: ["src-bls-swe"],
    volatile: true,
  },
  {
    id: "c-016",
    kind: "causal",
    statement: {
      fa: "Pearce و همکاران (IEEE S&P 2022): از ۱٫۶۸۹ برنامه‌ی تولیدی Copilot در ۸۹ سناریوی امنیت‌محور، حدود ۴۰٪ آسیب‌پذیر بودند.",
      en: "Pearce et al. (IEEE S&P 2022): ~40% of 1,689 programs generated by Copilot across 89 security-relevant scenarios contained vulnerabilities.",
    },
    caveats: {
      fa: "مدل ۲۰۲۱؛ سناریوهای ساختگی؛ امنیت از آن زمان در برخی کارها بهتر شده اما Veracode ۲۰۲۵ می‌گوید نه چندان.",
      en: "2021-era model; synthetic scenarios; security has improved in some tasks since — but Veracode 2025 says not much.",
    },
    sourceIds: ["src-pearce2022"],
  },
  {
    id: "c-017",
    kind: "causal",
    statement: {
      fa: "وراکود ۲۰۲۵ (۱۰۰+ مدل): ۴۵٪ نمونه‌های کد تولیدی تست امنیتی را رد کردند و فلج OWASP Top 10 وارد کردند؛ Java بدترین (۷۲٪)، XSS در ۸۶٪؛ «امنیت مستقل از اندازه/نسل مدل ثابت ماند».",
      en: "Veracode 2025 (100+ LLMs): 45% of generated samples failed security tests, introducing OWASP Top 10 flaws; Java worst (72%), XSS failures 86%; 'security performance remained flat, regardless of model size or training sophistication'.",
    },
    caveats: {
      fa: "آزمایش فروشنده‌ی امنیت؛ جزئیات هارنس در گزارش کاملِ gated بود.",
      en: "Security-vendor experiment; harness details were in the gated full report.",
    },
    sourceIds: ["src-veracode2025"],
    volatile: true,
  },
  {
    id: "c-018",
    kind: "recommendation",
    statement: {
      fa: "OWASP Top 10 برای اپلیکیشن‌های LLM: تزریق پرامپت (LLM01) ریسک شماره‌یک است — متنِ بازیابی‌شده داده است نه دستور؛ مجوزِ عامل را محدود (LLM06) و مصرف را سقف‌دار (LLM10) کن.",
      en: "OWASP Top 10 for LLM Applications: prompt injection (LLM01) is risk #1 — treat retrieved text as data, never instructions; bound agent agency (LLM06) and consumption (LLM10).",
    },
    caveats: {
      fa: "ویراست ۲۰۲۵ مرجع این پلتفرم است؛ ویراست ۲۰۲۶ (اوت ۲۰۲۶) جایگزین آن شده و در بازبینی بعدی مرور می‌شود.",
      en: "The 2025 edition is referenced here; the 2026 edition (Aug 2026) supersedes it and will be reviewed at the next refresh.",
    },
    sourceIds: ["src-owasp-llm10"],
    volatile: true,
  },
  {
    id: "c-019",
    kind: "recommendation",
    statement: {
      fa: "OWASP Top 10 وب (ویراست ۲۰۲۵، جایگزین ۲۰۲۱) واژگان پایه‌ی امنیت وب است که موضوع «امنیت، حریم خصوصی و وابستگی‌ها» تدریس می‌کند.",
      en: "The OWASP Web Top 10 (2025 edition, superseding 2021) provides the baseline web-security vocabulary taught in the 'Security, Privacy & Dependencies' topic.",
    },
    caveats: { fa: "استاندارد جامعه‌محور؛ جایگزین آموزش امنیت رسمی نیست.", en: "Community standard; not a substitute for formal security training." },
    sourceIds: ["src-owasp-top10"],
    volatile: true,
  },
  {
    id: "c-020",
    kind: "causal",
    statement: {
      fa: "دانلوسکی و همکاران (۲۰۱۳): از ده تکنیک مطالعه، فقط «آزمون تمرینی» و «تمرین توزیع‌شده» رتبه‌ی کاربرد بالا گرفتند؛ خواندن مجدد و هایلایت‌کردن کاربرد پایین.",
      en: "Dunlosky et al. (2013): of ten study techniques, only practice testing and distributed practice earned 'high utility'; rereading and highlighting are low-utility.",
    },
    caveats: { fa: "مرور نظام‌مند؛ شدت اثر بر حسب موضوع متفاوت است.", en: "Systematic review; effect sizes vary by domain." },
    sourceIds: ["src-dunlosky2013"],
  },
  {
    id: "c-021",
    kind: "causal",
    statement: {
      fa: "فراتحلیل Adesope و همکاران (۲۰۱۷): آزمون تمرینی نسبت به بازخوانی g≈۰٫۵۱ و نسبت به فعالیت پرکننده/هیچ g≈۰٫۹۳.",
      en: "Adesope et al.'s meta-analysis (2017): practice testing beats restudying (g≈0.51) and filler/no-activity (g≈0.93).",
    },
    caveats: {
      fa: "متن کامل برای ما gated بود؛ جهت اثر از چکیده‌ی ERIC و مقادیر از یک خلاصه‌ی ثانویه‌ی مستقل.",
      en: "Full text was gated for us; direction from the ERIC abstract, values from one independent secondary summary.",
    },
    sourceIds: ["src-adesope2017"],
  },
  {
    id: "c-022",
    kind: "causal",
    statement: {
      fa: "Bjork و Bjork: دشواری‌های مطلوب (فاصله‌گذاری، درهم‌تنیدگی، بازیابی) یادگیری ماندگار می‌سازند — اما فقط وقتی یادگیرنده دانش زمینه‌ای کافی دارد؛ وگرنه ناکام‌کننده‌اند.",
      en: "Bjork & Bjork: desirable difficulties (spacing, interleaving, retrieval) build durable learning — but only when the learner has enough background knowledge; otherwise they backfire.",
    },
    caveats: { fa: "فصل تلفیقی از پژوهش‌های آزمایشگاهی؛ مرزِ شرطی صریح است.", en: "A synthesis chapter; the boundary condition is explicit." },
    sourceIds: ["src-bjork2011"],
  },
  {
    id: "c-023",
    kind: "observed",
    statement: {
      fa: "لیستر و همکاران (۲۰۰۴، ۹۴۱ دانشجو در ۷ کشور): بسیاری از تازه‌کارها در پایان درس نمی‌توانند کدِ کوتاه را قابل‌اعتماد ردیابی یا توضیح دهند (ردیف پایین ~۳۰٪ درست در برابر ~۹۰٪ ردیف بالا).",
      en: "Lister et al. (2004, 941 students across 7 countries): many end-of-course novices cannot reliably trace or explain short programs (bottom quartile ~30% correct vs ~90% top).",
    },
    caveats: { fa: "دوره‌ی پیش از هوش مصنوعی (۲۰۰۴)؛ عمدتاً Java؛ ولی مکانیزم در عصر AI حیاتی‌تر هم هست.", en: "Pre-AI (2004); mostly Java; the mechanism matters even more in the AI era." },
    sourceIds: ["src-lister2004"],
  },
  {
    id: "c-024",
    kind: "recommendation",
    statement: {
      fa: "«تمام‌شدن» در این پلتفرم یعنی درکِ اثبات‌شده (ردیابی/توضیح/ساخت دوباره/تست) — نه تماشا یا تولید کد با هوش مصنوعی. مبنای شواهد: c-020 تا c-023.",
      en: "'Completion' on this platform means demonstrated understanding (trace/explain/rebuild/test) — not watching or AI-generated code. Evidence basis: c-020..c-023.",
    },
    caveats: { fa: "پیشنهاد تحریریه با مبنای پژوهشی.", en: "Editorial recommendation grounded in research." },
    sourceIds: ["src-dunlosky2013", "src-adesope2017", "src-bjork2011", "src-lister2004"],
  },
  {
    id: "c-026",
    kind: "recommendation",
    statement: {
      fa: "SEEK (SE2014): امنیت هم حوزه‌ی مستقل است و هم دغدغه‌ی گذرسالِ کل چرخه‌ی عمر — برنامه‌ی درسی ما همین را دنبال می‌کند؛ این سند پیشا-LLM است و لایه‌ی هوش مصنوعی را پلتفرم اضافه می‌کند.",
      en: "SEEK (SE2014): security is both a standalone area and a crosscutting lifecycle concern — our curriculum follows this; the document predates LLMs, so the AI layer is added by the platform.",
    },
    caveats: { fa: "SE2024 تا تاریخ دسترسی منتشر نشده بود.", en: "SE2024 was not published as of the access date." },
    sourceIds: ["src-se2024"],
  },
  {
    id: "c-027",
    kind: "recommendation",
    statement: {
      fa: "SWEBOK v4 (۲۰۲۴): «عملیات مهندسی نرم‌افزار» و «امنیت نرم‌افزار» حوزه‌ی مستقل‌اند و Agile/DevOps ادغام شده‌اند — عملیات و امنیت دانشِ هسته‌ای توسعه‌دهنده است، نه تخصص جدا.",
      en: "SWEBOK v4 (2024): 'Software Engineering Operations' and 'Software Security' are standalone knowledge areas and Agile/DevOps are integrated — ops and security are core developer knowledge, not separate specialisms.",
    },
    caveats: { fa: "متون پذیرفته‌شده‌ی عمومی؛ متغیر با نسخه‌های بعدی.", en: "Generally-accepted body; varies with future editions." },
    sourceIds: ["src-swebok4"],
  },
  {
    id: "c-028",
    kind: "recommendation",
    statement: {
      fa: "امنیت، حریم خصوصی و بهداشت وابستگی‌ها در «پایه‌ی مشترک» تدریس می‌شوند، نه به‌عنوان درس‌های اختیاری — مبنای شواهد: c-026، c-027، c-016، c-017.",
      en: "Security, privacy and dependency hygiene are taught in the shared foundation, not as electives — evidence basis: c-026, c-027, c-016, c-017.",
    },
    caveats: { fa: "پیشنهاد تحریریه با مبنای استاندارد و آزمایش.", en: "Editorial recommendation grounded in standards and experiments." },
    sourceIds: ["src-se2024", "src-swebok4", "src-owasp-top10", "src-veracode2025"],
  },
  {
    id: "c-031",
    kind: "recommendation",
    statement: {
      fa: "برنامه‌ی درسی، مهارت‌هایی را تمرین می‌دهد که توسعه‌دهندگان خودشان نمی‌سپارند (مشخصه‌نویسی، تجزیه، بازبینی، تست، دیباگ — c-007) و سپردن بویلرپلیت را به‌عنوان عملِ صریح و قابل‌بازبینی می‌آموزد.",
      en: "The curriculum trains the skills developers refuse to delegate (specification, decomposition, review, testing, debugging — c-007) and teaches AI delegation of boilerplate as explicit, reviewable practice.",
    },
    caveats: { fa: "پیشنهاد تحریریه بر پایه‌ی الگوی سپردنِ خودگزارش‌شده.", en: "Editorial recommendation based on the self-reported delegation pattern." },
    sourceIds: ["src-jetbrains2024", "src-se2024"],
  },
  {
    id: "c-032",
    kind: "recommendation",
    statement: {
      fa: "ادعاهای بهره‌وری هوش مصنوعی در دو سطح ارائه می‌شوند: «سرعت تکلیف» در برابر «عملکرد تحویل»؛ هر دو METR (کندتر در میدان) و پنگ (سریع‌تر در تکلیف سبز) در بافت خودشان درست‌اند.",
      en: "AI productivity claims are presented at two levels: task speed vs delivery performance; both METR (slower in the field) and Peng (faster on a greenfield task) are true in their settings.",
    },
    caveats: { fa: "قواعد ارائه‌ی شواهد این پلتفرم.", en: "This platform's evidence-presentation rule." },
    sourceIds: ["src-peng2023", "src-metr2025", "src-dora2024"],
  },
  {
    id: "c-e2",
    kind: "recommendation",
    statement: {
      fa: "اولین فریم‌ورک این مسیر ری‌اکت است (مستندات رسمی عالی، اکوسیستم بزرگ، سازگار با TS)؛ Vue/Svelte جایگزین‌های مشروع‌اند و نام برده می‌شوند اما تدریس نمی‌شوند.",
      en: "The first framework is React (excellent official docs, large ecosystem, TS-first); Vue/Svelte are legitimate alternatives — named, not taught.",
    },
    caveats: { fa: "انتخاب تحریریه؛ مبنای فنی: کیفیت مستندات react.dev.", en: "Editorial choice; technical basis: react.dev docs quality." },
    sourceIds: ["src-react-docs"],
  },
  {
    id: "c-037",
    kind: "recommendation",
    statement: {
      fa: "سواد عملیات دانشِ هسته‌ای توسعه‌دهنده است: پیکربندی به‌عنوان متغیر محیطی (دوازده‌عاملی)، مشاهده‌پذیری و هشدارِ علامت‌محور (چهار سیگنال طلایی SRE).",
      en: "Operations literacy is core developer knowledge: config as environment variables (twelve-factor), observability and symptom-based alerting (SRE's four golden signals).",
    },
    caveats: { fa: "پیشنهاد تحریریه بر پایه‌ی دو مرجع نگهدار‌نوشته.", en: "Editorial recommendation based on two maintainer-authored references." },
    sourceIds: ["src-12factor", "src-srebook"],
  },
  {
    id: "c-030",
    kind: "observed",
    statement: {
      fa: "بارکه و همکاران (۲۰۲۳، مطالعه‌ی کیفی): کار با کدساز در دو حالت رخ می‌دهد — «شتاب‌دهی» (پیاده‌سازیِ برنامه‌ی خودت) و «اکتشاف» (مدل راه را نشان می‌دهد)؛ تازه‌کارها به اکتشاف و انتظارات بزرگ‌تر از مدل متمایل‌اند — مکانیزم وابستگیِ بیش‌ازحد.",
      en: "Barke et al. (2023, qualitative): code-generation work splits into 'acceleration' (implementing your plan) and 'exploration' (the model leads); novices lean on exploration with inflated model expectations — an over-reliance mechanism.",
    },
    caveats: { fa: "n=20، کیفی؛ تعمیم عددی ندارد.", en: "n=20, qualitative; no numeric generalization." },
    sourceIds: ["src-barke2023"],
  },
  {
    id: "c-035",
    kind: "observed",
    statement: {
      fa: "WCAG 2.2 توصیه‌ی رسمی W3C است (دسامبر ۲۰۲۴): نُه معیار جدید از جمله focus-not-obscured و target-size؛ معیار ۴٫۱٫۱ حذف شد؛ هدف انطباق این پلتفرم سطح AA است.",
      en: "WCAG 2.2 is the W3C Recommendation (December 2024): nine new success criteria including focus-not-obscured and target-size; 4.1.1 Parsing removed; this platform targets AA conformance.",
    },
    caveats: { fa: "استاندارد با به‌روزرسانی‌های دوره‌ای.", en: "A standard with periodic updates." },
    sourceIds: ["src-wcag22"],
  },
];

export const claimById = new Map(claims.map((c) => [c.id, c]));
