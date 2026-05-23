# Onboarding — frontend (aligned with gateway)

Canonical API docs: [`endpoint_documentation/`](./endpoint_documentation/).

## Flow

1. **Signup** — `POST /auth/signup` (no role in body; backend default `REGULAR_CUSTOMER`).
2. **Verify** — OTP + login; `resolveAuthDestination()` reads `GET /auth/me`.
3. **Onboarding** (`/onboarding`) when `needsOnboarding(me)`:
   - Steps 1–2: avatar (Dicebear URL) + display name → `PATCH /users/profile`.
   - Step 3: `GET /roles/options` UI → `POST /roles/select` with `{ roles: [PlatformSelectableRole] }`.
   - If response `user.kyc_required_for` is **empty** → redirect (farmer / regular customer done).
   - If **non-empty** → `POST /onboarding/start` → step 4 business form → `POST /onboarding/:id/submit`.

## BFF routes (apps/app)

| BFF | Gateway |
|-----|---------|
| `GET /api/auth/me` | `GET /auth/me` |
| `PATCH /api/users/profile` | `PATCH /users/profile` |
| `GET /api/roles/options` | `GET /roles/options` |
| `POST /api/roles/select` | `POST /roles/select` |
| `GET /api/regions` | `GET /regions` |
| `POST /api/onboarding/start` | `POST /onboarding/start` |
| `POST /api/onboarding/[id]/submit` | `POST /onboarding/:id/submit` |

## Platform roles

Selectable: `FARMER`, `REGULAR_CUSTOMER`, `VET`, `SUPPLIER`, `MANUFACTURER`.

KYC required for: `VET`, `SUPPLIER`, `MANUFACTURER` only.

Product redirects (`@wafrivet/auth`): see [`apps/app/src/lib/platformRoles.ts`](../apps/app/src/lib/platformRoles.ts).

## `needsOnboarding` logic

- `kyc_required_for.length > 0` → stay on `/onboarding` (business step).
- Roles empty or only `REGULAR_CUSTOMER` → role not chosen yet → `/onboarding`.

## Mock auth

Cookie `wafrivet_mock_profile` tracks mock role/KYC state when `NEXT_PUBLIC_ENABLE_MOCK_AUTH=true`.
