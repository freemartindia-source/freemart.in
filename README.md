# FreeMart.in — Ecommerce Starter

A responsive FreeMart.in storefront for regional Indian products.

## Included
- Home, Shop, Regions, Categories, Gifts
- Product detail pages
- Search, region/category filters, sorting
- Wishlist
- Cart + quantity management
- Checkout UI + local demo order history
- Account/order page
- About, FAQ, policies/contact placeholders
- Admin dashboard starter
- 30 catalogue products across 10 regions
- Express + SQLite API starter for products/orders
- Razorpay integration point prepared for server-side implementation

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

## Run backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
API: http://localhost:5000/api/health

## Before real launch
1. Replace demo product art with licensed product photographs.
2. Verify each artisan, GI and ODOP claim with authoritative source documentation.
3. Finalize GST/business details, shipping/return/privacy/terms.
4. Connect frontend checkout to backend order API.
5. Add Razorpay server-side order creation, signature verification and webhook handling.
6. Add authentication, customer database and transactional email.
7. Configure backups, HTTPS, domain and production environment.
