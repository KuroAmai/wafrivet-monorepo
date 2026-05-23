# Shop customer API requests (backend)

The shop frontend uses **vet marketplace APIs** when the JWT includes `VET`. Users with **only** `REGULAR_CUSTOMER` use local cart, addresses, and wishlist until the following gateway routes exist.

## Requested routes

1. **`GET/POST/PATCH/DELETE /customer/addresses`** — structured delivery address book
2. **`GET/POST /customer/procurement/*`** and **`GET /customer/orders`** — or relax `/vet/*` guards for `REGULAR_CUSTOMER`
3. **`GET /notifications`** — include `REGULAR_CUSTOMER` in allowed roles
4. **`PATCH /users/profile`** — expose on gateway (display name, avatar)
5. **`regionId`** on user profile — optional default shop region

## Current shop wiring

| Feature | REGULAR_CUSTOMER | VET (clinic) |
|---------|------------------|--------------|
| Location | `GET /regions` + localStorage | Same |
| Profile | `GET /auth/me` | Same |
| Cart | localStorage | `/vet/procurement/draft` via shop BFF |
| Orders | empty state | `/vet/orders` via shop BFF |
| Checkout / Paystack | blocked + CTA | `/payments/initialize` |
| Addresses | localStorage | `GET/PATCH /vet/profile` |
| Saved items | localStorage wishlist | Same |
| Notifications | empty state | `GET /notifications` if role allowed |

Shop BFF proxies live under `apps/shop/src/app/api/`.
