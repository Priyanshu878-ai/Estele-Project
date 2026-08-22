# Estele — E-commerce Frontend (React)

Customer-facing storefront for a small e-commerce assignment, built in React and talking to a separate Laravel API backend. Styled loosely on estele.co (a jewelry brand) since that was given as the design reference — kept the storefront to a single static landing page and a small product catalog, per the assignment scope.

## What's inside

- Landing page with a featured products section
- Product detail page (Add to Cart / Buy Now)
- Cart (supports multiple products, quantity per item)
- Register / Login / Logout (talks to the Laravel Sanctum API)
- Checkout with Razorpay (test mode)

## Tech stack

- React + Vite
- React Router
- Axios
- Tailwind CSS
- Context API for auth and cart state (no Redux — wasn't needed at this size)

## Setup

```bash
npm install
npm run dev
```

Make sure the Laravel backend is running at `http://127.0.0.1:8000` first — the frontend expects the API there (see `src/services/api.js` if that ever changes).

Also make sure `index.html` has the Razorpay script tag, and that you're using Razorpay **test mode** keys on the backend — otherwise checkout won't open the payment popup correctly.

## What I'd add next

This is a scoped-down assignment version, so a few things were left out on purpose. If I were building this out properly:

- **Multiple product pages that don't need admin data to be "real"** — right now the whole storefront hinges on whatever's in the admin panel; a real store would need proper category pages, pagination, and filtering (price, material, etc.).
- **Persist the cart properly** — right now it resets on refresh since it's just in-memory context state. Should move to localStorage or sync it with the backend once a user logs in.
- **An AI-powered "style finder"** — something like uploading a photo of an outfit and getting jewelry recommendations that would go with it, or a chat-style assistant that helps someone pick a gift based on budget and occasion. Feels like a natural fit for a jewelry brand and something a lot of newer D2C sites are experimenting with.
- **Wishlist and order history pages** for logged-in users — right now there's no way to see past orders from the customer side, only from the admin panel.
- **Reviews and ratings** on the product page, since that's a big trust signal on any real e-commerce site.
- **Skeleton loaders instead of a plain spinner** — small thing, but it reads as more polished.
- **Form validation feedback** that's a bit more real-time (e.g., password strength, live email format check) rather than only showing an error after submit fails.
- **Accessibility pass** — keyboard navigation, alt text everywhere, proper focus states — didn't prioritize this given the timeline but it matters for anything going to real users.

Kept the scope tight here on purpose since the ask was a single product + static landing page, but this is the direction I'd take it if it were a real storefront.