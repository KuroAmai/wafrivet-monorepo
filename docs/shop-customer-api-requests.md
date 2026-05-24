# Shop customer API requests (backend)

The shop frontend calls gateway **`/shopper/*`** routes for profile, addresses, and wishlist (JWT-scoped, no `:userId` in path). The browser talks to shop BFF under `/api/shopper/*`, which proxies with the shared `jwt` cookie.

## Wired via `/shopper/*` (done)

| Feature | Gateway | Shop BFF |
|---------|---------|----------|
| Profile | `GET/PATCH /shopper/profile` | `/api/shopper/profile` |
| Username | `PATCH /shopper/profile/username` | `/api/shopper/profile/username` |
| Avatar | `PATCH /shopper/profile/avatar` | `/api/shopper/profile/avatar` |
| Addresses | `GET/POST/PUT/DELETE /shopper/addresses`, `PATCH .../default` | `/api/shopper/addresses/*` |
| Wishlist | `GET/POST/DELETE /shopper/wishlist`, `DELETE .../:masterSkuId` | `/api/shopper/wishlist/*` |

Mutating BFF routes add `actor: { actorUserId }` from `GET /auth/me` on the server (not from the browser).

## Still requested (not in shopper gateway doc)

1. **`GET/POST /customer/procurement/*`** and **`GET /customer/orders`** — or relax `/vet/*` for `REGULAR_CUSTOMER` checkout
2. **`GET /notifications`** — include `REGULAR_CUSTOMER` in allowed roles
3. **`PATCH /users/profile`** on gateway for app onboarding wizard (optional overlap with `/shopper/profile`)

## Current shop wiring

| Feature | REGULAR_CUSTOMER | VET (clinic) |
|---------|------------------|--------------|
| Location | `GET /regions` + localStorage | Same |
| Profile | `GET /auth/me` + `/shopper/profile` | Same + vet profile for clinic address |
| Cart | localStorage | `/vet/procurement/draft` via shop BFF |
| Orders | empty state | `/vet/orders` via shop BFF |
| Checkout / Paystack | blocked + CTA | `/payments/initialize` |
| Addresses | `/shopper/addresses` | `GET/PATCH /vet/profile` |
| Saved items | `/shopper/wishlist` | Same API |
| Notifications | empty state | `GET /notifications` if role allowed |

Shop BFF proxies live under `apps/shop/src/app/api/`.

## Gateway verification (May 2026)

Smoke test against deployed gateway (`API_URL` in `.env.example`):

- `GET /api/v1/auth/me` without JWT → **401** (route exists).
- `GET /api/v1/shopper/profile` without JWT → **404** (`Cannot GET /api/v1/shopper/profile`) as of this wiring — shopper public routes may not be registered on the gateway yet, or paths may differ (e.g. `:userId` segment). When live, confirm shape with one authenticated `GET /api/shopper/profile` from shop dev and adjust BFF paths in `apps/shop/src/app/api/shopper/*` if needed.
