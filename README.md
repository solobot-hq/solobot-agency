# SoloBotAgency — SaaS Starter (Next.js 14 + Tailwind + Clerk + Stripe)

World-class starter combining Apple-level minimalism, Jasper-style SaaS sections, ClickUp-like dashboard flow, and Notion-clean cards.

## Quick Start

```bash
# 1) Install deps
npm install

# 2) Copy env
cp .env.example .env.local
# Fill Clerk and Stripe keys (or leave empty to test basic pages)

# 3) Dev
npm run dev
```

- Landing page: `/`
- Auth pages (Clerk): `/sign-in`, `/sign-up`
- Dashboard: `/dashboard` (currently not protected; see `middleware.ts` for Clerk config)
- Logo: `public/sl.png` (replace with your official `sl.png`)

## Tech
- Next.js App Router
- TailwindCSS
- Clerk (auth) — placeholders ready
- Stripe — placeholder `lib` for future billing integration

## Customize
- Brand color in `tailwind.config.js` (`solobot`)
- Typography via `styles/globals.css` (Poppins-like stack)
- Components in `/components`
- Tool pages in `/app/dashboard/*`

## Notes
- To enable auth protection, use Clerk's `authMiddleware` in `middleware.ts` and set the `config.matcher`.
- Add Stripe server routes and webhooks as needed.
