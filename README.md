# Design Portfolio

A clean, minimal, white product-design portfolio built with **React + TypeScript + Vite**, styled with **Tailwind CSS** and animated with **Framer Motion**.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server & build
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [lucide-react](https://lucide.dev/) — icons

## Getting started

```bash
npm install
npm run dev      # start local dev server (http://localhost:5173)
npm run build    # production build to /dist
npm run preview  # preview the production build locally
```

## Making it yours

Almost everything is content-driven from one file:

- **`src/data/portfolio.ts`** — your name, role, headline, projects, experience, stats, socials, and skills. Start here.

Structure:

```
src/
├── data/portfolio.ts     # ← all editable content
├── components/
│   ├── Navbar.tsx        # sticky top nav
│   ├── Hero.tsx          # intro / headline
│   ├── Marquee.tsx       # scrolling skills strip
│   ├── Work.tsx          # project grid
│   ├── About.tsx         # bio + experience + stats
│   ├── Contact.tsx       # email + socials
│   ├── Footer.tsx
│   └── Reveal.tsx        # scroll-reveal animation helper
├── App.tsx               # page composition
└── index.css             # Tailwind + base styles + fonts
```

### Project images

Project covers currently use Tailwind gradient placeholders (the `cover` field in
each project). To use real images, drop them in `public/` and swap the gradient
`<div>` in `Work.tsx` for an `<img>` pointing at `/your-image.jpg`.

## Deploy

The `dist/` output is fully static — deploy to Vercel, Netlify, GitHub Pages, or
any static host. For Vercel/Netlify, just point them at this repo; the defaults
(`npm run build`, output `dist`) work out of the box.
