# Estele — E-commerce Assignment

A small e-commerce project built as a screening assignment — React frontend + Laravel backend, with a working Razorpay checkout (test mode) and a Laravel admin panel to manage products and orders.

## Structure

- **`/ecommerce-api`** — Laravel backend (REST API + Blade admin panel). [See its README](./ecommerce-api/README.md) for setup.
- **`/ecommerce-frontend`** — React storefront. [See its README](./ecommerce-frontend/README.md) for setup.

## Quick start

You need both running at the same time — the backend on `http://127.0.0.1:8000` and the frontend (via Vite) on `http://localhost:5173`.

1. Set up and run the backend first (see `/ecommerce-api/README.md`)
2. Then set up and run the frontend (see `/ecommerce-frontend/README.md`)
3. Open the frontend URL in your browser — it talks to the backend automatically

## What it covers

- Product listing, product page, cart (multi-item), checkout
- Register / login / logout
- Razorpay payment (test mode)
- Admin panel — add/edit/delete products, accept/deny orders