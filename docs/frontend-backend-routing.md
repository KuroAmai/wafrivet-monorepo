# Frontend ↔ Backend routing

**Last updated:** May 2026  
**Gateway (primary):** `https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app`  
**Core (herd fallback):** `https://wafrivet-core-wdvfp4toqa-ew.a.run.app`  
**Field Vet (farmer PIN):** `https://wafrivet-field-vet-wdvfp4toqa-ew.a.run.app`

## Rules

1. **Browser clients** call the **API Gateway** for auth, admin, catalog, vet procurement, supplier offers, and notifications.
2. **Never** call `/internal/*` from the browser.
3. **Herd** data is implemented with **gateway-first, core fallback** in `@wafrivet/api` (`herdApi.listAnimals` tries `GET {gateway}/herd/animals`, then `GET {core}/animals`).

## Auth

| App | Method | Notes |
|-----|--------|--------|
| `apps/app`, `apps/shop` | `POST /auth/login` via Next route `/api/auth/login` | Sets `jwt` cookie; client uses Bearer via `@wafrivet/api` |
| `apps/herd` | TBD with backend | Spike: confirm **Gateway JWT** vs **Field Vet** `POST /farmers/login` (phone + PIN) |
| Mock demo | `NEXT_PUBLIC_ENABLE_MOCK_AUTH=true` | `mock-token` accepted only when flag set (dev) |

## Per-app surface

| App | Public routes | Authenticated API prefixes |
|-----|---------------|----------------------------|
| **app** | `/login`, `/signup` | `/admin/*`, `/auth/me`, `/me/*` |
| **shop** | `/`, `/catalog/*`, `/chemists` | `/vet/*`, `/supplier/*`, `/notifications` |
| **herd** | — | `/herd/*` or core `/animals`, `/farms`, `/sync` |

## Environment variables

| Variable | Default |
|----------|---------|
| `NEXT_PUBLIC_API_URL` / `VITE_API_URL` | Gateway URL |
| `NEXT_PUBLIC_CORE_URL` / `VITE_CORE_URL` | Core URL |
| `NEXT_PUBLIC_FIELD_VET_URL` / `VITE_FIELD_VET_URL` | Field Vet URL |
| `NEXT_PUBLIC_ENABLE_MOCK_AUTH` | `false` in production |

## CORS

Backend must allow credentials from:

- `http://localhost:3001` (app)
- `http://localhost:3002` (herd)
- `http://localhost:3003` (shop)
- Production hosts: `app.wafrivet.com`, `shop.wafrivet.com`, `herd.wafrivet.com`

## Open items (confirm with backend)

- [ ] Exact gateway prefix for herd (`/herd` vs proxy-only)
- [ ] Farmer login: gateway signup vs Field Vet PIN
- [ ] Refresh token cookie vs body-only refresh
- [ ] Idempotency header name for herd mutations
