# Bumi Lestari recruitment showcase

A bilingual, browser-local hiring campaign built with React, TypeScript, and Vite. All people and materials are fictional. Open `/#apply` for Candidate intake. Use the perspective selector to switch between the two Assessors and the Coordinator. Reset the walkthrough from the footer.

## Run locally

Use Node.js 22.12 or later. Run `npm ci` and `npm run dev`. Open the URL printed by Vite. Build with `npm run build` and serve the production output with `npm run preview`. Cloudflare Pages serves the generated `dist/` directory.

## Browser tests

Install Chromium with `npx playwright install chromium`, then run `npm test`. To run the same checks against an existing preview, set `SHOWCASE_URL` to its full URL. Each browser context starts with its own Campaign.

[Cloudflare Pages build settings and deployment verification](deployment/README.md) · [Five-minute rehearsal guide in Bahasa Indonesia and English](docs/rehearsal.md)
