# Deploying product apps with live API data

Marketing (`apps/web`, root Vite) does **not** use the product API. Deploy these separately:

| App | Directory | Dev port | Required env |
|-----|-----------|----------|--------------|
| App (admin/farmer) | `apps/app` | 3001 | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL` |
| Shop | `apps/shop` | 3003 | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SHOP_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (branding uploads) |
| Herd | `apps/herd` | 3002 | `VITE_API_URL`, `VITE_CORE_URL`, `VITE_HERD_URL` |

Copy [.env.example](.env.example) into each app's `.env.local` (dev) or hosting dashboard (prod).

## Shared auth cookie (production)

Set on **app** and **shop** (and any host that sets `jwt`):

```bash
AUTH_COOKIE_DOMAIN=.wafrivet.com
NEXT_PUBLIC_AUTH_COOKIE_DOMAIN=.wafrivet.com
```

- All product hosts must be `https://*.wafrivet.com` (not bare `wafrivet.com` unless you also serve the app there).
- Login BFF routes set `jwt` with `Domain=.wafrivet.com`, so signup on **app** → verify → redirect to **shop** `/dashboard` does not require a second sign-in.
- `localhost` ports do **not** share cookies; test SSO on deployed subdomains only.

## Verify live API after deploy

1. Open the **product** URL (not marketing-only).
2. DevTools → **Network** → filter `wafrivet-api-gateway` or your `NEXT_PUBLIC_API_URL` host.
3. Log in at `/login` → expect `POST /api/auth/login` → 200 and `jwt` cookie with **Domain** `.wafrivet.com`.
4. Chemist signup on app → after verify, open shop `/dashboard` without logging in again (same cookie).
5. Open `/admin/users` → expect `GET .../admin/users` (401/CORS if misconfigured).
6. If calls fail: fix **CORS** on the gateway for your origin before expecting UI changes.

## CORS origins to allow (credentials)

- `http://localhost:3001`, `3002`, `3003`
- `https://app.wafrivet.com`, `https://shop.wafrivet.com`, `https://herd.wafrivet.com`

## Mock/demo mode

Set `NEXT_PUBLIC_ENABLE_MOCK_AUTH=true` or `VITE_ENABLE_MOCK_AUTH=true` only for demos. When false, failed API calls show errors instead of fake data.

## Role-based smoke tests (after CORS + env)

| App | Role | Steps |
|-----|------|--------|
| **app** | ADMIN | `/login` → `/admin` → Network shows `GET /admin/war-room/snapshot` and `/admin/users` |
| **app** | ADMIN | `/admin/marketplace` → `GET /admin/orders` |
| **shop** | VET | `/login` → chemist dashboard → `GET` vet orders |
| **shop** | SUPPLIER | `/distributor` → `GET` supplier offers |
| **shop** | — | `/` marketplace → `GET /catalog`; `/product/{id}` → `GET /catalog/{id}` |
| **herd** | FARMER | `/login` → `/` → `GET` animals (gateway `/herd/animals` or core `/animals`) |

If a step returns 401, use an account with the correct role. If CORS blocks the request, fix the gateway allowlist before re-testing UI.
