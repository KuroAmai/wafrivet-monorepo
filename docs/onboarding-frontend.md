# Onboarding — frontend (aligned with gateway)

Canonical API docs: [`endpoint_documentation/`](./endpoint_documentation/).

## Flow

1. **Signup** — on **app** only; `POST /auth/signup` (no role in body; backend default `REGULAR_CUSTOMER`). Core sends a **6-digit email OTP** via Redis + worker (Resend). Optional `?returnTo=` for shop/herd return after onboarding.
2. **Verify** — `/verify` on app: user enters OTP → `POST /auth/verify-email` `{ email, token }` → auto `POST /auth/login` with pending password → `resolvePostAuthDestination()` reads `GET /auth/me` and honors stored `returnTo` when allowed. Resend: `POST /auth/resend-verification-email` `{ email }` (public, no JWT).
3. **Onboarding** (`/onboarding`) when `needsOnboarding(me)`:
   - Steps 1–2: avatar (Dicebear URL) + display name (local UI only until gateway ships profile PATCH).
   - Step 3: professional roles from `GET /roles/options` (grid excludes `REGULAR_CUSTOMER`) → `POST /roles/select`, or **Skip for now** → `POST /roles/select` with `{ roles: ["REGULAR_CUSTOMER"] }`.
   - If response `user.kyc_required_for` is **empty** → redirect: farmers/vets to Herd, shoppers to **Shop** (`redirectByRole` → `NEXT_PUBLIC_SHOP_URL`), not app `/welcome`.
   - If **non-empty** → `POST /onboarding/start` → step 4 business form → `POST /onboarding/:id/submit`.

## BFF routes (apps/app)

| BFF | Gateway |
|-----|---------|
| `GET /api/auth/me` | `GET /auth/me` |
| `POST /api/auth/signup` | `POST /auth/signup` |
| `POST /api/auth/verify-email` | `POST /auth/verify-email` `{ email, token }` |
| `POST /api/auth/resend-verification-email` | `POST /auth/resend-verification-email` `{ email }` |
| `POST /api/auth/login` | `POST /auth/login` |
| `PATCH /api/users/profile` | `PATCH /users/profile` (**not on gateway yet** — BFF exists; wizard does not call it) |
| `GET /api/roles/options` | `GET /roles/options` |
| `POST /api/roles/select` | `POST /roles/select` |
| `GET /api/regions` | `GET /regions` |
| `POST /api/onboarding/start` | `POST /onboarding/start` |
| `POST /api/onboarding/[id]/submit` | `POST /onboarding/:id/submit` |

## Platform roles

**Role grid (step 3):** `FARMER`, `VET`, `SUPPLIER`, `MANUFACTURER` only.

**Skip / default shopper:** `REGULAR_CUSTOMER` (signup default; confirmed via skip or explicit select).

KYC required for: `VET`, `SUPPLIER`, `MANUFACTURER` only.

Product redirects (`@wafrivet/auth`): see [`apps/app/src/lib/platformRoles.ts`](../apps/app/src/lib/platformRoles.ts).

## `needsOnboarding` logic

- `kyc_required_for.length > 0` → stay on `/onboarding` (business step).
- Roles empty → `/onboarding`.
- Only `REGULAR_CUSTOMER` **and** `sessionStorage` `wafrivet_roles_confirmed` not set → role not confirmed yet → `/onboarding`.
- After successful `POST /roles/select`, the wizard sets `wafrivet_roles_confirmed=1` (cleared on logout).

## Mock auth

Cookie `wafrivet_mock_profile` tracks mock role/KYC state when `NEXT_PUBLIC_ENABLE_MOCK_AUTH=true`. Keep **false** in production so `/verify` uses live OTP.

## Email OTP infra (backend)

Signup verification requires **Redis** (OTP storage), the **notifications worker** with `RESEND_API_KEY`, and `@wafrivet/email` in the backend. Disable Supabase’s automatic signup confirmation email in the Supabase dashboard so users receive only the Wafrivet 6-digit code (Core confirms via admin API after OTP validation).

Phone signup still stores a `@wafrivet.local` email until SMS OTP exists; those users receive email OTP at that address.
