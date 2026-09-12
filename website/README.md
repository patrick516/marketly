# Marketly

A simple online marketplace: a customer-facing storefront, an admin panel for managing products, and a lightweight local API tying them together while the real backend is still being built.

## Project structure

This is a multi-folder project (not a single app):

selling-platform/
├── website/ # Customer-facing storefront (Next.js)
├── frontend/ # Admin panel — vendor/owner side (Vite + React)
└── api-server/ # Temporary local JSON API (json-server) shared by both

Each part runs independently on its own port during development.

| Part         | Tech                             | Port | Purpose                                  |
| ------------ | -------------------------------- | ---- | ---------------------------------------- |
| `website`    | Next.js, Tailwind, shadcn/ui     | 3000 | What customers browse and buy from       |
| `frontend`   | Vite, React, Tailwind, shadcn/ui | 5173 | Where the vendor/admin manages the store |
| `api-server` | json-server                      | 4000 | Mock REST API for products & categories  |

## Why a separate `api-server`?

There's no real backend yet. Both `website` and `frontend` need to read and write the same product/category data, but they run on different origins (`localhost:3000` vs `localhost:5173`), so browser storage like `localStorage` can't be shared between them.

`api-server` is a tiny local REST API (via `json-server`) that both apps talk to over HTTP instead. It behaves like a real backend (`GET`, `POST`, `PATCH`, `DELETE` on `/products` and `/categories`) so that when a real backend is eventually built, only the base URL in each app's `lib/api.ts` needs to change — nothing else.

**This is temporary.** Data lives in `api-server/db.json` and is not production-ready (no auth, no validation, no persistence beyond the local file).

## Getting started

Run all three in separate terminals, in this order:

### 1. API server

```bash
cd api-server
npm install
npm start
```

Runs on `http://localhost:4000`. Confirm it's working by visiting `http://localhost:4000/products` in a browser.

### 2. Website

```bash
cd website
npm install
npm run dev
```

Runs on `http://localhost:3000`.

### 3. Admin panel

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

All three need to be running at the same time for the full flow (add a product in admin → see it on the website) to work.

## What's implemented so far

**Website**

- Homepage: hero, popular categories, trending products
- Product detail pages
- Category pages (filtered product listing)
- Dynamic cart: add to cart with quantity, update/remove items, persisted in `localStorage`
- Checkout: "Proceed via WhatsApp" builds an order summary message and opens WhatsApp with it pre-filled — no payment gateway involved
- Login page is a stub that redirects to the admin panel

**Admin panel**

- Dashboard: stat cards, sales chart (placeholder data), recent products
- Products: list, add, edit, delete
- Stock is managed manually — there's no automatic "decrement on purchase" since orders aren't placed through a payment system. After confirming a sale over WhatsApp, the admin records it via "Record a sale" on that product, which reduces stock by the quantity actually sold
- Sidebar + topbar layout with mobile-responsive nav, global search bar (UI only, not wired to real search yet), user menu

## Known limitations / not built yet

- No real backend — `api-server` is a stand-in and has no authentication or data validation
- No real admin login/auth — anyone who opens the admin panel URL can use it
- No payment integration — all orders are confirmed manually over WhatsApp
- No order history/log — stock decreases when recorded, but there's no record of what was "sold" and when
- Search bar and notification bell in the admin topbar are UI placeholders
- Image upload stores images as base64 text directly in `db.json` (no real file storage yet) — fine for testing, not for production

## Design system

Both apps share the same Tailwind color tokens (defined in each `tailwind.config.js`):

- **Brand (navy/indigo):** `#1E3A5F` — sidebar, headings, primary structure
- **Coral (accent):** `#FF6B4A` — CTAs, prices, active states, badges
- **Surface:** `#F8F9FC` — page background
- **Ink:** `#1a2332` — body text

Admin panel uses shadcn/ui components throughout; keep new UI consistent with the existing rounded-corner, soft-shadow style rather than introducing new visual patterns.

## Migrating off `api-server` later

When a real backend exists:

1. Update `API_URL` in `website/lib/api.ts` and `frontend/src/lib/api.ts` to point to the real API
2. Confirm the real API's response shapes match the `Product`/`Category` types already defined in both `lib/api.ts` files (or update the types to match)
3. Remove the `api-server` folder
