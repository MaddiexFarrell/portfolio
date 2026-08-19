// -----------------------------------------------------------------------------
// Edit everything about your site from this single file.
// -----------------------------------------------------------------------------

export const profile = {
  name: "Maddie Farrell",
  role: "Product Designer",
  email: "maddiefarrell7@gmail.com",
  linkedin: "https://www.linkedin.com/in/madeline-farrell7/",
  bio: "Product designer focused on thoughtful product experiences, working across design and code to bring ideas into production.",
  status: "Currently designing in San Francisco :)",
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
  // What the company/product is, in one line. Optional — some roles fold it
  // into `role` instead.
  companyDescription?: string;
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
  // Poster frame shown before the video loads (instant paint, no black box).
  poster?: string;
  // Optional default video start time in seconds (defaults to 8 if not specified).
  videoStartTime?: number;
  // Optional logo to overlay on video (drop files into /public and reference as "/name.png").
  // Will appear in default state and fade out on hover.
  logo?: string;
};

export const experience: Experience[] = [
  {
    id: "mira",
    company: "Mira",
    location: "San Francisco",
    period: "2026",
    role: "Founder & CEO. AI native EA service for founders.",
    aside: "Most AI tools just make you faster at email. We take it off your plate entirely.",
    href: "https://mira-site.onrender.com/",
    color: "#F0C419",
    video: "/mira-hero.mp4",
    poster: "/mira-poster.jpg",
    logo: "/MiraLOGO.png",
  },
  {
    id: "vultron",
    company: "Vultron",
    location: "San Francisco",
    period: "2023 — 2026",
    role: "Founding designer.",
    companyDescription: "AI proposal platform for government contractors.",
    aside: "Nearly rebuilt this thing from scratch three times before it finally clicked.",
    href: "https://www.vultron.ai",
    color: "#4169E1",
    video: "/vultron-hero.mp4",
    poster: "/vultron-poster.jpg",
    videoStartTime: 1,
    logo: "/White Vultron (1).png",
  },
  {
    id: "pragma",
    company: "Pragma",
    location: "Los Angeles",
    period: "2021 — 2023",
    role: "Lead product designer. Backend game engine for live-service games.",
    aside: "My first time designing for developers instead of consumers — steep learning curve, in the best way.",
    href: "https://www.pragma.gg",
    color: "#8B5FBF",
    video: "/pragma-hero.mp4",
    poster: "/pragma-poster.jpg",
  },
  {
    id: "amazon",
    company: "Amazon",
    location: "San Francisco",
    period: "2020 — 2021",
    role: "Product designer. Worked on internal tooling.",
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
    role: "Product design intern. Worked on internal tooling for game development teams.",
    aside: "My first taste of designing something players would actually see and feel.",
    href: "https://www.blizzard.com",
    color: "#2D9CDB",
    image: "/blizzard-hero.png",
  },
];
