# Estele — E-commerce Backend (Laravel)

Backend for a small e-commerce assignment — built with Laravel as a pure REST API for the React frontend, plus a separate Blade-based admin panel for managing products and orders.

## What's inside

- Product API (list/view products) for the storefront
- Auth API (register/login/logout) using Sanctum tokens
- Order API — customers place orders after payment
- Razorpay integration (test mode) for checkout
- Admin panel (Blade views, not exposed to the storefront) with two tabs:
  - **Products** — add, edit, delete
  - **Orders** — view all orders, accept or deny each one

## Tech stack

- Laravel 12
- SQLite (zero config, works out of the box)
- Laravel Sanctum (token auth)
- Razorpay PHP SDK

## Setup

```bash
composer install
copy .env.example .env
php artisan key:generate
```

This project uses SQLite, so no separate database server is needed — just create an empty database file:

```bash
type nul > database\database.sqlite
```

Then run migrations:

```bash
php artisan migrate
```

Add your Razorpay test keys to `.env`:


Start the server:

```bash
php artisan serve
```

- API base: `http://127.0.0.1:8000/api`
- Admin panel: `http://127.0.0.1:8000/admin/products`

## API endpoints (quick reference)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/products | No | List all products |
| GET | /api/products/{id} | No | Single product |
| POST | /api/register | No | Create account |
| POST | /api/login | No | Login, returns token |
| POST | /api/logout | Yes | Logout |
| GET | /api/orders | Yes | Logged-in user's orders |
| POST | /api/orders | Yes | Place an order |
| POST | /api/payment/create-order | Yes | Create Razorpay order |
| POST | /api/payment/verify | Yes | Verify Razorpay payment signature |

## What I'd add next

This was built for a screening assignment, so I kept the scope tight on purpose. If I were to take this further into an actual product, here's the direction I'd go:

- **Proper product catalog** — categories, variants (size/color for jewelry, like different metal finishes), multiple images per product, search and filters instead of one hardcoded product.
- **Inventory handling that actually matters** — right now stock is just a number on the product; it should decrease when an order is accepted and there should be a low-stock warning in the admin panel.
- **Real order lifecycle** — shipped/delivered/cancelled statuses, not just accept/deny, plus email or WhatsApp notifications when status changes.
- **An actual admin dashboard** — right now it's two plain tables. Real sales numbers, best-selling products, revenue over time — the kind of thing a store owner would actually check every morning.
- **AI-assisted product listing** — auto-generate product descriptions and SEO tags from a couple of photos and a product name, instead of typing everything manually in the admin form. Also a simple AI search bar where a customer can type something like "gift under ₹1000 for a wedding" and get relevant products, instead of exact keyword matching.
- **A recommendation layer** — "customers also bought" or "goes well with" suggestions based on past orders, which is a pretty standard thing on real e-commerce sites now.
- **Better fraud/spam protection** on the order flow — rate limiting, maybe a captcha on registration, since right now there's nothing stopping someone from spamming fake orders.
- **Queued jobs** for anything slow — sending confirmation emails, generating invoices — instead of doing it inline in the request.
- **Tests** — I skipped writing PHPUnit tests given the timeline, but this is the first thing I'd add for anything beyond a demo.

None of this was needed for what was asked, but it's roughly how I'd think about growing this if it were a real product.