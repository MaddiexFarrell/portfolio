// -----------------------------------------------------------------------------
// Edit everything about your portfolio from this single file.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Your Name",
  role: "Product Designer",
  location: "San Francisco, CA",
  // Short one-liner shown in the nav / footer
  tagline: "Product Designer",
  // The big statement on the hero
  headline: "Designing calm, human products that people actually love to use.",
  intro:
    "I'm a product designer focused on turning complex problems into simple, elegant experiences — from first sketch to shipped pixel.",
  email: "hello@yourname.com",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
    { label: "Dribbble", href: "https://dribbble.com/yourhandle" },
    { label: "Read.cv", href: "https://read.cv/yourhandle" },
    { label: "X / Twitter", href: "https://x.com/yourhandle" },
  ],
};

export const stats = [
  { value: "8+", label: "Years designing" },
  { value: "40+", label: "Products shipped" },
  { value: "3", label: "Design teams built" },
];

export const capabilities = [
  "Product Strategy",
  "UX / UI Design",
  "Design Systems",
  "Prototyping",
  "User Research",
  "Interaction Design",
  "Design Ops",
  "Front-end Handoff",
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  // Tailwind gradient classes used for the placeholder cover.
  cover: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: "atlas",
    title: "Atlas — Analytics, reimagined",
    category: "SaaS · 0 → 1",
    year: "2025",
    summary:
      "Led end-to-end design of a data platform, distilling dense dashboards into a focused, glanceable workspace.",
    cover: "from-neutral-900 via-neutral-700 to-neutral-500",
    tags: ["Product Strategy", "Design System", "Data Viz"],
  },
  {
    id: "bloom",
    title: "Bloom — Everyday banking",
    category: "Fintech · Mobile",
    year: "2024",
    summary:
      "A consumer finance app that makes money feel approachable, with playful moments grounded in trust.",
    cover: "from-emerald-200 via-teal-100 to-neutral-100",
    tags: ["Mobile", "Prototyping", "Research"],
  },
  {
    id: "north",
    title: "North — Design system",
    category: "Enterprise · Systems",
    year: "2024",
    summary:
      "Built a cross-platform design system adopted by 6 product teams, cutting design-to-ship time in half.",
    cover: "from-indigo-200 via-sky-100 to-neutral-100",
    tags: ["Design System", "Tokens", "Governance"],
  },
  {
    id: "harbor",
    title: "Harbor — Healthcare portal",
    category: "Health · Web",
    year: "2023",
    summary:
      "Redesigned a patient portal used by thousands, prioritizing clarity, accessibility, and calm.",
    cover: "from-rose-100 via-orange-50 to-neutral-100",
    tags: ["Accessibility", "UX", "Web"],
  },
];

export const experience = [
  {
    role: "Senior Product Designer",
    company: "Acme Inc.",
    period: "2022 — Present",
  },
  {
    role: "Product Designer",
    company: "Northwind Labs",
    period: "2019 — 2022",
  },
  {
    role: "UX Designer",
    company: "Studio Meridian",
    period: "2017 — 2019",
  },
];
