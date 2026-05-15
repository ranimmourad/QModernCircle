# Modern Circle

## Project Overview
- **Name**: Modern Circle
- **Goal**: A luxurious, minimalist website for a calm non-smoking coffee shop and concept store in El Mourouj 6, Tunisia.
- **Aesthetic**: Slow-living, Scandinavian Pinterest-minimalist café — calm, peaceful, Instagram-worthy.

## Tech Stack
- **Framework**: Next.js 14 (App Router) — pure, no Vite, no Hono, no Cloudflare Workers
- **Styling**: TailwindCSS with custom palette (`cream`, `cocoa`, `bark`, `terracotta`, `olive`)
- **Fonts**: Italiana (display) + Cormorant Garamond (serif) + Inter (body) via `next/font/google`
- **Animations**: Framer Motion (scroll, fade-up, parallax, lightbox, FAQ)
- **Carousels**: Swiper.js (featured drinks, reviews)
- **State**: React Context API (`CartContext`) with `localStorage` persistence
- **Data**: Local TypeScript arrays (no database)

## Routes / Functional URIs
| Route | Description |
|---|---|
| `/` | Coffee Shop landing page — hero, marquee, about, drinks carousel, brunch menu, work-friendly parallax, values, masonry gallery with lightbox, reviews, reservation form, contact + FAQ |
| `/boutique` | Concept Store — search bar, category filters, animated product grid with stock status |
| `/cart` | Cart / checkout page with quantity controls, total, summary |
| `/admin-login` | "Coming Soon" placeholder |
| `/employee-login` | "Coming Soon" placeholder |

## Data Architecture
- **Products**: `data/products.ts` — typed mock products across 6 categories (Handmade Clothing, Beauty/Skincare, Bags & Wallets, Accessories, Stickers, Ceramics & Stoneware).
- **Cart state**: `context/CartContext.tsx` — provider, hook, `localStorage` persistence.
- **No external database** — fully local mock data per spec.

## User Guide
1. Land on `/` — scroll through the full coffee-shop experience.
2. Click the gallery photos to open the lightbox (press **ESC** to close).
3. Use the reservation form to book a table.
4. Click **Boutique** in the nav to visit the concept store, search and filter products.
5. Click **Add to Cart** on any in-stock product → cart icon updates in the navbar.
6. Click the cart icon → review items, adjust quantities, checkout.
7. Footer contains discrete **Admin Login** and **Employee Login** links.

## Design Tokens (Tailwind)
- `cream` `#F3EFE8` — backgrounds
- `cocoa` `#4A3728` — main text
- `bark` `#6B5744` — secondary text
- `terracotta` `#C27C5B` — accents
- `olive` `#8FA78F` — in-stock indicator

> Strict rule: **no hardcoded hex in components** — only the tokens above.

## Development
```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
# → http://localhost:3000
```

## Deployment Status
- **Platform**: Local sandbox (Next.js production server via PM2)
- **Status**: Active
- **Last Updated**: 2026-05-15
