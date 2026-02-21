# Site Builder — Phase 1 MVP Spec

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Puck Editor (@measured/puck) for visual drag & drop
- Tailwind CSS v4
- Supabase for Auth + DB + Storage (project: ydukhgqlrajmawcopeos)
- Deploy on Vercel

## Phase 1 Features

### 1. Project Setup
- Next.js 15 app with App Router
- Tailwind CSS v4
- Puck editor integrated
- TypeScript strict mode

### 2. Block Components (Puck components)
Build these reusable blocks that users can drag & drop:
- **Hero** — Full-width hero with title, subtitle, CTA button, background image/color
- **Text** — Rich text block with heading + paragraph
- **Image** — Single image with alt text, caption, optional link
- **Gallery** — Grid of images (2-4 columns configurable)
- **CTA Button** — Standalone call-to-action button (text, link, style variants)
- **Contact Form** — Name, email, message fields (frontend only for now)
- **Spacer** — Configurable vertical spacing
- **Divider** — Horizontal line with style options

### 3. Editor Page (`/editor`)
- Full Puck editor with sidebar showing available blocks
- Drag & drop blocks onto the canvas
- Edit block properties in the sidebar
- Responsive preview (Desktop / Tablet / Mobile toggle)
- Undo/Redo support (Puck built-in)

### 4. Preview Page (`/preview`)
- Renders the current page data as a real website
- No editor UI, just the rendered blocks
- Responsive

### 5. Save/Load (Local Storage for MVP)
- Save page data to localStorage
- Load on editor mount
- Later: Supabase persistence

### 6. Starter Templates
Create 3 templates with pre-filled block data:
- **Restaurant** — Hero with food image, about section, menu highlights, contact/hours
- **Handwerker** — Hero with craft image, services list, testimonial, contact form
- **Portfolio** — Hero with name, project gallery, about me, contact

### 7. Theme System (Basic)
- Global config for: primary color, secondary color, font family, border radius
- Applied via CSS variables
- Editable in a settings panel

### 8. Multi-Page Support
- Page list sidebar (add/remove/rename pages)
- Each page has its own Puck data
- Navigation between pages in preview

## Design Guidelines
- Modern, clean UI — think Framer/Squarespace level polish
- Dark editor UI (like VS Code / Figma)
- Light preview output
- Mobile-first block designs
- Use shadcn/ui for editor UI components where helpful

## File Structure
```
src/
  app/
    page.tsx          — Landing/dashboard
    editor/
      page.tsx        — Puck editor
    preview/
      page.tsx        — Preview renderer
  components/
    blocks/           — All Puck block components
    editor/           — Editor-specific UI
    preview/          — Preview-specific UI
  lib/
    puck-config.ts    — Puck configuration with all blocks
    templates.ts      — Starter template data
    theme.ts          — Theme system
    storage.ts        — Save/load logic
  types/
    index.ts          — TypeScript types
```

## Important
- Use `@measured/puck` package (latest version)
- All blocks must be fully responsive
- Use Tailwind for all styling
- No hardcoded colors — use theme CSS variables
- Every block needs sensible defaults when dropped
