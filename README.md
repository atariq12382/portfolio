# Portfolio

Vite + React + TypeScript + Tailwind CSS portfolio foundation with a **funky techno** design system.

## Stack

- Vite, React 19, TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- [motion](https://motion.dev/) (Framer Motion), GSAP, OGL, Three.js — installed for upcoming React Bits sections

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview production build
```

## Theme tokens

| Token | Hex | Tailwind |
|-------|-----|----------|
| bg | `#07070b` | `bg-bg` |
| surface | `#0f0f17` | `bg-surface` |
| acid | `#b6ff3b` | `bg-acid`, text selection |
| magenta | `#ff2bd6` | `bg-magenta` |
| cyan | `#22e4ff` | `bg-cyan` |
| text | `#e8e8f0` | `text-text` |
| muted | `#7a7a90` | `text-muted` |

Fonts: **Space Grotesk** (`font-heading`), **JetBrains Mono** (body / `font-mono`).

Utility classes: `.neon-text`, `.neon-border`, `.glitch-hover`. Global CRT scanlines, film grain, and grid respect `prefers-reduced-motion`.

## Contact form (EmailJS)

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_EMAILJS_SERVICE_ID` | Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID |

Template parameters: `from_name`, `reply_to`, `message`.

## Structure

```
src/
  components/   # SceneChrome, shared UI
  sections/     # page sections (empty)
  data/         # content (empty)
  hooks/
```
