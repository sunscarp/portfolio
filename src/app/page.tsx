"use client";
import { useEffect, useState } from "react";
const experience = [
  {
    role: "Product & Consulting Intern",
    company: "Inspire Infosol Pvt. Ltd. · Aviation Sustainability Analytics",
    time: "Aug 2024 – Feb 2025",
    points: [
      "Led an 11-member cross-functional team to design and ship a web-based sustainability data platform for an aviation client — delivered on time and to stakeholder spec.",
      "Architected a multi-level questionnaire system for airline staff across seniority levels; structured output fed an automated KPI ranking engine, eliminating manual scoring.",
      "Built a KPI screening framework converting unstructured ESG disclosures into quantifiable, benchmarkable metrics — enabling consistent cross-airline comparisons for the first time.",
      "Scoped a sustainability marketplace feature and produced high-fidelity Figma mockups used directly in client presentations and stakeholder alignment sessions.",
    ],
  },
  {
    role: "Website Lead",
    company: "Genosaathi · Biotech / Health Startup",
    time: "May – Aug 2025",
    points: [
      "Built and shipped the company's official website from zero, collaborating with the founder on information architecture, user flow, and content strategy.",
      "Made key product decisions on layout and what to include/cut to clearly communicate a complex biotech offering to a non-technical audience.",
    ],
  },
];
const projects = [
  {
    label: "M&A / Valuation",
    context: "May 2026",
    title: "M&A Valuation Intelligence Platform",
    detail: "End-to-end M&A valuation platform performing 3-stage DCF, trading comps, and precedent transaction analyses with WACC derivation, mid-year discounting, and interactive Plotly sensitivity heatmaps. Exports investor-ready branded PDF reports via ReportLab. Integrated a Groq LLM pipeline to auto-generate and validate valuation assumptions (growth rates, margins, control premium) with schema normalization and human-readable rationales — cutting manual assumption-drafting time significantly. Built with Python, Streamlit, ReportLab, Groq LLM, and yfinance.",
    link: "https://mergers-acquisition-analysis.streamlit.app/", // update with actual link
    linkLabel: "Live Platform",
  },
  {
    label: "Quant Finance",
    context: "April 2026",
    title: "Trump Signal Backtester — Interactive Market Impact Analyzer",
    detail:
      "Full-stack Streamlit web application quantifying causal impact of Trump's Truth Social posts on financial markets using a next-day return trading strategy. Engineered data pipeline integrating tweet dataset with real-time asset prices via yfinance; implemented regime-aware portfolio construction supporting equal-weight and inverse-volatility weighting. Conducted rigorous statistical analysis including t-tests, OLS regression, and event studies over [-3, +3] windows — replicating academic-style methodology. Features equity curves, return distributions, sentiment breakdowns, per-asset analysis, regression tables, and trade logs with Plotly visualizations and dark-theme UI.",
    link: "https://trump-vs-xauusd.streamlit.app/",
    linkLabel: "Live Demo",
  },
  {
    label: "Quant Research",
    context: "Oct 2025",
    title: "Regime-Aware HRP Portfolio Optimizer",
    detail:
      "Quant portfolio tool with hidden Markov regime detection built into a Streamlit dashboard. Outperformed traditional Hierarchical Risk Parity benchmarks on both Sharpe Ratio and Maximum Drawdown.",
    link: "https://hrp-portfolio.streamlit.app/",
    linkLabel: "Live demo",
  },
  {
    label: "Marketplace",
    context: "Freelance · 2024",
    title: "Salon Booking Platform",
    detail:
      "Multi-sided marketplace serving salons, customers, employees & admins with role-based dashboards, appointment management, service catalogue, and reviews system. Solo PM + developer — from discovery to delivery.",
    link: "https://github.com/sanskarpar/bookme",
    linkLabel: "GitHub",
  },
  {
    label: "E-commerce",
    context: "2024 – Present",
    title: "The Loopy Dragon",
    detail:
      "Built a complete live crochet store (theloopydragon.in) from scratch — catalog, checkout, SEO & Google Merchant Center integration. Serves 10–50 paying customers/month with zero paid acquisition.",
    link: "https://theloopydragon.in",
    linkLabel: "Live site",
  },
  {
    label: "Ops Analytics",
    context: "Freelance · 2024",
    title: "WooCommerce Operations Dashboard",
    detail:
      "Real-time dashboard aggregating order data across 5+ WooCommerce stores via API integration, with 15-minute anomaly detection scans and automated backups — cutting manual monitoring overhead significantly.",
    link: "https://github.com/sanskarpar/wooconnect",
    linkLabel: "GitHub",
  },
  {
    label: "Model Validation",
    context: "Jan – Feb 2025",
    title: "Derivatives Pricing Model Validation",
    detail:
      "Validated pricing models across 36+ futures contracts and built delta-neutral hedging strategies for Astral Ltd & Britannia Industries. Synthesised findings on basis risk and liquidity into structured stakeholder reports.",
    link: "/54_ASTRAL_BRITANNIA.pdf",
    linkLabel: "PDF",
  },
  {
    label: "Computer Vision",
    context: "Research · Jan 2026 - Present",
    title: "Sorghum Plant Detection (Swin + DeepLab + EfficientNetLite0)",
    detail:
      "ML pipeline for sorghum plant detection using Swin Transformer + DeepLab segmentation, EfficientNetLite0 backbone, and HSV/CLAHE preprocessing. Deployed as a Hugging Face Space so users can try the model interactively.",
    link: "https://huggingface.co/spaces/SNSKRP/EfficientNetLiteB0_Transformer_HSV_LAB_CLAHE",
    linkLabel: "Hugging Face",
  },
];
const leadership = [
  "Lead a 70+ member club across 12+ live consulting projects with professors and industry professionals — supervising end-to-end delivery, stakeholder management, and on-time execution.",
  "Generated ₹1L+ in revenue through client projects and events; organised a college-wide case competition with ₹1L+ prize pool.",
  "Designed and published a Product Management learning cohort on the club website; conducted a hands-on Figma prototyping workshop for club members.",
];
const skills = [
  {
    title: "Product & Design",
    items: ["Figma", "Notion", "Roadmapping", "User Research", "Feature Prioritization", "Agile", "Stakeholder Mgmt"],
  },
  {
    title: "Analytics & BI",
    items: ["Tableau", "Power BI", "Excel (Advanced)", "Regression Analysis", "Portfolio Optimization", "Risk Modelling"],
  },
  {
    title: "Development",
    items: ["Python", "Pandas / NumPy", "Next.js / React", "TypeScript", "SQL", "R", "VBA", "Git"],
  },
];
type Tab = "about" | "experience" | "projects" | "leadership" | "skills";
const TABS: { id: Tab; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
];
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // Read initial theme synchronously from the already-applied attribute (set by inline script)
  useEffect(() => {
    try {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") setTheme(attr);
      else setTheme("light");
    } catch (e) {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* ignore */
    }
  }, [theme]);
  return (
    <div className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-text)] font-sans">
      <main className="max-w-4xl mx-auto px-5 sm:px-6 pb-20">
        {/* HEADER */}
        <header className="pt-14 pb-12 border-b border-[color:var(--panel-border)] grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              Sanskar <em className="italic not-italic text-[color:var(--accent-warm)]">Paradeshi</em>
            </h1>
            <p className="mt-3 text-[14px] sm:text-[15px] text-[color:var(--muted-text)] font-light max-w-md leading-relaxed">
              Building data platforms, marketplaces, and delightful digital products. Product thinker who ships.
            </p>
          </div>
          <div className="text-sm font-mono text-[color:var(--muted-text)] space-y-2 sm:text-right">
            <div>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center gap-2 bg-[color:var(--panel-bg)] border border-[color:var(--panel-border)] rounded-full px-3 py-1 text-[11px] text-[color:var(--subtle-text)] hover:text-[color:var(--page-text)] transition-colors"
                aria-pressed={theme === "dark"}
                title="Toggle dark mode"
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </div>
            <div>
              <a href="mailto:sanskarparadeshi@gmail.com" className="text-[color:var(--accent-warm)] hover:underline">
                sanskarparadeshi@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/sanskar-paradeshi-b02629291/"
                target="_blank"
                rel="noreferrer"
                className="text-[color:var(--accent-warm)] hover:underline"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 bg-[color:var(--panel-bg)] border border-[color:var(--panel-border)] rounded-full px-3 py-1 text-[11px] text-[color:var(--subtle-text)]">
              BITS Pilani · ECE + Economics
            </div>
          </div>
        </header>
        {/* TABS - Completely rewritten to ensure no arrows */}
        <div className="flex border-b border-[color:var(--panel-border)] mt-8 sm:mt-10 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 gap-4 touch-scroll">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-5 py-3 text-[13px] font-medium whitespace-nowrap transition-all duration-200
                ${activeTab === tab.id
                  ? "text-[color:var(--page-text)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[color:var(--accent-warm)] flex-shrink-0"
                  : "text-[color:var(--muted-text)] hover:text-[color:var(--page-text)] flex-shrink-0"
                }
              `}
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* ABOUT */}
        {activeTab === "about" && (
          <section className="pt-10">
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[color:var(--accent-warm)] mb-1">Who I am</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 sm:mb-8">
              Product thinker,<br />builder, economist.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8">
              <div className="text-[15px] text-[color:var(--subtle-text)] leading-[1.8] space-y-4">
                <p>
                  I turn <strong className="text-[color:var(--page-text)] font-semibold">complex problems into simple, beautiful products</strong>. With a dual degree in ECE and Economics, I bring an unusual mix of quantitative rigour, technical execution, and business judgment to every product I work on.
                </p>
                <p>
                  I've shipped real products for clients and startups — from a{" "}
                  <strong className="text-[color:var(--page-text)] font-semibold">sustainability analytics platform for aviation</strong> to a{" "}
                  <strong className="text-[color:var(--page-text)] font-semibold">live e-commerce store</strong> serving paying customers with zero paid acquisition.
                </p>
                <p>
                  Currently VP of Product & Data Analytics at the BITS Hyderabad Consulting Group, leading 70+ members across 12+ live projects.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Currently at", value: "BITS Pilani, Hyderabad" },
                  { label: "Degree", value: "B.E. ECE + M.Sc. Economics" },
                  { label: "Focus areas", value: "Product · Quant · Platforms" },
                  { label: "Expected graduation", value: "May 2028" },
                ].map((item) => (
                  <div key={item.label} className="bg-[color:var(--panel-bg)] border border-[color:var(--panel-border)] rounded-xl px-4 py-3">
                    <div className="text-[10px] font-mono tracking-[0.12em] uppercase text-[color:var(--muted-text)] mb-1">{item.label}</div>
                    <div className="text-[14px] font-medium text-[color:var(--page-text)]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* EXPERIENCE */}
        {activeTab === "experience" && (
          <section className="pt-10">
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[color:var(--accent-warm)] mb-1">Work</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 sm:mb-8">
              Shipping with teams<br />that deliver.
            </h2>
            <div className="divide-y divide-[color:var(--panel-border)] border-t border-[color:var(--panel-border)]">
              {experience.map((item) => (
                <div key={item.role} className="py-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-[17px] font-semibold text-[color:var(--page-text)]">{item.role}</div>
                      <div className="text-[13px] font-mono mt-1 text-[color:var(--accent-warm)]">{item.company}</div>
                    </div>
                    <span className="text-[11px] font-mono text-[color:var(--muted-text)] bg-[color:var(--panel-bg)] border border-[color:var(--panel-border)] rounded-full px-3 py-1 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="text-[14px] text-[color:var(--subtle-text)] leading-relaxed list-none">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* PROJECTS */}
        {activeTab === "projects" && (
          <section className="pt-10">
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[color:var(--accent-warm)] mb-1">Selected work</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 sm:mb-8">
              Products that move<br />the needle.
            </h2>
            <div className="border border-[color:var(--panel-border)] rounded-xl overflow-hidden divide-y divide-[color:var(--panel-border)]">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="bg-[color:var(--card-bg)] hover:bg-[color:var(--card-hover)] transition-colors px-7 py-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="text-[10px] font-mono tracking-[0.12em] uppercase bg-[color:var(--tag-bg)] text-[color:var(--tag-text)] rounded-full px-3 py-1">
                      {project.label}
                    </span>
                    <span className="text-[11px] font-mono text-[color:var(--muted-text)]">{project.context}</span>
                  </div>
                  <div className="text-[16px] font-semibold text-[color:var(--page-text)] mt-3 leading-snug">{project.title}</div>
                  <div className="text-[13px] text-[color:var(--subtle-text)] leading-relaxed mt-2">{project.detail}</div>
                  <a
                    href={project.link}
                    target={project.link.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-1 mt-4 text-[12px] font-mono text-[color:var(--accent-warm)] border-b border-[color:var(--tag-bg)] hover:border-[color:var(--accent-warm)] pb-px transition-colors"
                  >
                    {project.linkLabel} ↗
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* LEADERSHIP */}
        {activeTab === "leadership" && (
          <section className="pt-10">
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[color:var(--accent-warm)] mb-1">Leadership</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 sm:mb-8">
              Building the club<br />from the inside.
            </h2>
            <div className="border border-[color:var(--panel-border)] rounded-xl overflow-hidden">
              <div className="bg-[color:var(--hero-bg)] px-7 py-6">
                <div className="font-serif text-[22px] text-[color:var(--hero-text)]">
                  Vice President, Product & Data Analytics
                </div>
                <div className="font-mono text-[12px] mt-2 text-[color:var(--hero-subtext)] tracking-wide">
                  BITS Hyderabad Consulting Group · May 2025 – Present
                </div>
              </div>
              <div className="divide-y divide-[color:var(--panel-border)]">
                {leadership.map((item, i) => (
                  <div key={i} className="flex gap-5 px-7 py-5">
                    <span className="font-mono text-[11px] text-[color:var(--accent-warm)] opacity-70 mt-[2px] shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-[14px] text-[color:var(--subtle-text)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* SKILLS */}
        {activeTab === "skills" && (
          <section className="pt-10">
            <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-[color:var(--accent-warm)] mb-1">Toolkit</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 sm:mb-8">
              Product, analytics,<br />and engineering.
            </h2>
            <div className="border border-[color:var(--panel-border)] rounded-xl overflow-hidden divide-y divide-[color:var(--panel-border)]">
              {skills.map((group) => (
                <div key={group.title} className="px-6 py-6 bg-[color:var(--card-bg)]">
                  <div className="text-[11px] font-mono tracking-[0.12em] uppercase text-[color:var(--accent-warm)] mb-3">
                    {group.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] text-[color:var(--chip-text)] bg-[color:var(--chip-bg)] border border-[color:var(--panel-border)] rounded-full px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}