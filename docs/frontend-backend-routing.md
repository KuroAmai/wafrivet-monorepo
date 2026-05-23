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

## Auth & onboarding

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
| **app** | `/login`, `/signup`, `/onboarding` | BFF under `/api/*` → gateway |
| **shop** | catalog, chemists | `/vet/*`, `/supplier/*` |
| **herd** | — | Core `/herd/*` (same JWT) |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Gateway base including `/api/v1` |
| `NEXT_PUBLIC_ENABLE_MOCK_AUTH` | Dev mock JWT |

## CORS

Allow credentials from localhost ports 3001–3003 and production `*.wafrivet.com` hosts.
