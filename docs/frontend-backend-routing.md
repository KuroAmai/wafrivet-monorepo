# Frontend ↔ Backend routing

**Last updated:** May 2026  
**Endpoint reference:** [`endpoint_documentation/`](./endpoint_documentation/) (canonical)  
**Gateway (primary):** `https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1`  
**Core (herd):** `https://wafrivet-core-wdvfp4toqa-ew.a.run.app/api/v1/herd`  
**Field Vet (farmer PIN):** `https://wafrivet-field-vet-wdvfp4toqa-ew.a.run.app`

See also [`endpoint_documentation/deployed-services-urls.md`](./endpoint_documentation/deployed-services-urls.md).

## Rules

1. **Browser clients** call the **API Gateway** at `/api/v1` for auth, admin, catalog, orders, roles, onboarding.
2. **Never** call `/internal/*` from the browser.
3. **Herd** — JWT from gateway login; call Core `/api/v1/herd/*` via BFF or direct (not on public gateway yet). See [`endpoint_documentation/herd-service-endpoints-part1.md`](./endpoint_documentation/herd-service-endpoints-part1.md).

## Central authentication (single sign-in UI)

All user-facing **sign-in and sign-up** live on **app** only (`/login`, `/signup`, `/verify`, `/onboarding`).

| App | Unauthenticated access |
|-----|-------------------------|
| **app** | Auth pages |
| **shop** | Public catalog; protected routes redirect to `app/login?returnTo=<full shop URL>` |
| **herd** | Protected routes redirect to app login with `returnTo` |

After login, the shared `jwt` on `.wafrivet.com` is sent back to `returnTo` when onboarding is complete.

Helpers in `@wafrivet/auth`: `getCentralLoginUrl`, `getCentralSignupUrl`, `isAllowedReturnTo`.

## Auth & onboarding (gateway)

| Step | Gateway |
|------|---------|
| Signup | `POST /auth/signup` |
| Verify / login | `POST /auth/verify-email`, `POST /auth/login` |
| Profile | `PATCH /users/profile` |
| Role pick | `GET /roles/options`, `POST /roles/select` |
| KYC | `POST /onboarding/start`, `POST /onboarding/:id/submit` |

Frontend flow: [`onboarding-frontend.md`](./onboarding-frontend.md).

## Per-app surface

| App | Public routes | Authenticated API |
|-----|---------------|-------------------|
| **app** | `/login`, `/signup`, `/onboarding`, `/welcome` (hub for pros; shoppers redirect out) | BFF under `/api/*` → gateway |
| **shop** | catalog, chemists; **REGULAR_CUSTOMER** post-auth landing | `/shopper/*` (profile, addresses, wishlist), `/vet/*`, `/supplier/*` via shop BFF |
| **herd** | — | Core `/herd/*` (same JWT) |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `API_URL` | Server-side gateway base (BFF routes); include `/api/v1` |
| `NEXT_PUBLIC_API_URL` | Gateway base including `/api/v1` |
| `AUTH_COOKIE_DOMAIN` | Shared session cookie domain (e.g. `.wafrivet.com`) |
| `NEXT_PUBLIC_AUTH_COOKIE_DOMAIN` | Client-side cookie domain (same as above) |
| `NEXT_PUBLIC_APP_URL` | App origin (central login/signup) |
| `NEXT_PUBLIC_SHOP_URL` | Shop origin (used in `returnTo`) |
| `NEXT_PUBLIC_HERD_URL` | Herd origin (used in `returnTo`) |
| `NEXT_PUBLIC_ENABLE_MOCK_AUTH` | Dev mock JWT |

## CORS

Allow credentials from localhost ports 3001–3003 and production `*.wafrivet.com` hosts.
