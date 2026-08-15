// -----------------------------------------------------------------------------
// Edit everything about your site from this single file.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Maddie Farrell",
  role: "Product Designer",
  email: "maddiefarrell7@gmail.com",
  linkedin: "https://www.linkedin.com/in/madeline-farrell7/",
  bio: "Maddie is a product designer that collaborates with product teams and developers to bring ideas to life.",
  status: "Currently building in San Francisco :)",
  // Drop a resume.pdf into /public for the "R" shortcut and this link to work.
  resumeUrl: "/resume.pdf",
};

// One entry per role. Drives both the left-hand project list and the
// right-hand experience list — same data, two views.
export type Experience = {
  id: string;
  company: string;
  location: string;
  period: string;
  // What you actually did there.
  role: string;
  // What the company/product is, in one line.
  companyDescription: string;
  // Candid, first-person aside shown in the sidebar on hover — this is where
  // your voice comes through. Draft copy below, edit freely.
  aside: string;
  // External link to the live company/product site (no internal case studies).
  href: string;
  // Signature accent color, used as the cover background when no image/video is set.
  color: string;
  // Optional cover image (drop files into /public and reference as "/name.png").
  image?: string;
  // Optional cover video (drop files into /public and reference as "/name.mp4").
  // Will autoplay on hover, loop, and be muted.
  video?: string;
};

export const experience: Experience[] = [
  {
    id: "mira",
    company: "Mira",
    location: "San Francisco",
    period: "2026",
    role: "Founder, building the executive assistant founders actually want.",
    companyDescription: "Human + AI chief of staff for email, scheduling, and coordination.",
    aside: "Most AI tools just make you faster at email. We take it off your plate entirely.",
    href: "https://mira-site.onrender.com/",
    color: "#F0C419",
    video: "/mira-hero.mp4",
  },
  {
    id: "vultron",
    company: "Vultron",
    location: "San Francisco",
    period: "2024 — 2026",
    role: "Founding designer across product, brand, and web.",
    companyDescription: "AI proposal platform for government contractors.",
    aside: "Nearly rebuilt this thing from scratch three times before it finally clicked.",
    href: "https://www.vultron.ai",
    color: "#4169E1",
    video: "/vultron-hero.mp4",
  },
  {
    id: "pragma",
    company: "Pragma",
    location: "Los Angeles",
    period: "2021 — 2024",
    role: "Product designer focused on developer tools and experiences.",
    companyDescription: "Backend game engine powering live-service games.",
    aside: "My first time designing for developers instead of consumers — steep learning curve, in the best way.",
    href: "https://www.pragma.gg",
    color: "#8B5FBF",
    video: "/pragma-hero.mp4",
  },
  {
    id: "amazon",
    company: "Amazon",
    location: "Seattle",
    period: "2020 — 2021",
    role: "Product designer focused on internal tools and experiences.",
    companyDescription: "Global technology company across cloud, commerce, and more.",
    aside: "Internal tools don't get much love — I tried to give them some anyway.",
    href: "https://www.amazon.com",
    color: "#FF9900",
    image: "/amazon-hero.png",
  },
  {
    id: "blizzard",
    company: "Blizzard",
    location: "Irvine",
    period: "2020",
    role: "Product design intern working on player-facing experiences.",
    companyDescription: "Game studio behind World of Warcraft, Overwatch, and Diablo.",
    aside: "My first taste of designing something players would actually see and feel.",
    href: "https://www.blizzard.com",
    color: "#2D9CDB",
    video: "/blizzard-hero.mp4",
  },
];
