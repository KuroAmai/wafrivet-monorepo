# All Service Endpoints Documentation

This document provides a comprehensive index of all endpoints across the Wafrivet-Backend services. For detailed endpoint documentation including payloads, responses, and authentication requirements, refer to the individual service documentation files linked below.

---

## Table of Contents

- [Service Documentation Index](#service-documentation-index)
- [Small Services Summary](#small-services-summary)
- [Common Patterns](#common-patterns)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

---

## Service Documentation Index

### API Gateway Service
**Files:**
- [api-gateway-service-endpoints-part1.md](./api-gateway-service-endpoints-part1.md) - User Management
- [api-gateway-service-endpoints-part2.md](./api-gateway-service-endpoints-part2.md) - Business Operations
- [api-gateway-service-endpoints-part3.md](./api-gateway-service-endpoints-part3.md) - Operations & Delivery

The API Gateway is the main entry point for frontend clients. It routes requests to appropriate backend services and handles authentication, rate limiting, and request validation.

**Controllers:** 29
**Key Features:**
- Admin management endpoints
- Authentication and onboarding
- Catalog and marketplace
- Compliance and prescriptions
- Entity management (clinics, suppliers, vets)
- Logistics and rider operations
- Notifications
- Email features (admin send, data export, referral activate, order rate — core internal; gateway proxy TBD)
- Payments and webhooks
- Procurement and orders
- Queue administration

**Endpoint Count:** ~100+ endpoints

---

### Core Service
**Files:**
- [core-service-endpoints-part1.md](./core-service-endpoints-part1.md) - Admin, auth (internal), entity, email
- [core-service-endpoints-part2.md](./core-service-endpoints-part2.md) - Logistics, notifications, rider (internal)

The Core service provides internal business logic used by the API Gateway and other services. It also hosts the **Herd module** at `/api/v1/herd/*` (see dedicated docs below).

**Controllers:** 20+ (including 12 Herd controllers)
**Key Features:**
- Internal admin operations
- Authentication (internal endpoints)
- Entity management (internal)
- Health checks
- **Herd** — animals, clinical, farms, NFC, sync, AI context (JWT; not on gateway yet)
- Logistics (internal)
- Notifications (internal)
- Internal email (`admin/emails/send`, `users/:userId/data-export`, `referrals/activate`, `orders/:orderId/rate`)
- Rider operations (internal)

**Endpoint Count:** ~100+ endpoints (incl. ~35 Herd routes)

**Internal email (Core, `/api/v1/internal`):**

| Method | Path | DTO / notes |
|--------|------|-------------|
| `POST` | `/admin/emails/send` | `AdminSendEmailDto` → worker + Resend |
| `GET` | `/users/:userId/data-export` | `DataExportResponseDto` |
| `POST` | `/referrals/activate` | `ReferralActivateDto` + `userId` |
| `POST` | `/orders/:orderId/rate` | `OrderRateDto` + `userId` |

Templates: frontend `@wafrivet/email` (backend stubs only). Gaps: [EMAIL_IMPLEMENTATION_GAPS.md](../EMAIL_IMPLEMENTATION_GAPS.md). Endpoints: [core-service-endpoints-part1.md](./core-service-endpoints-part1.md#internal-email-endpoints).

---

### Herd Module (Core `/api/v1/herd`)
**Files:**
- [herd-service-endpoints-part1.md](./herd-service-endpoints-part1.md) — overview, animals, farms, NFC tags, sync, AI context
- [herd-service-endpoints-part2.md](./herd-service-endpoints-part2.md) — clinical records (diagnoses, treatments, vaccinations, etc.)

Livestock identity, NFC tags, offline sync, and clinical history. Uses the same platform JWT as gateway login; **Herd effective roles** (`FARMER`, `VETERINARIAN`, …) are derived from platform `UserRole` (`FARMER`, `VET`, …).

**Access:** Call **wafrivet-core** directly (private Cloud Run) or via a BFF — not proxied on `wafrivet-api-gateway` today.

**Route groups:** `animals`, `farms`, `tags`, `sync`, `ai-context`, `animals/:animalUid/{diagnoses|treatments|vaccinations|deworming|reproductive-events|body-condition-weights|management-notes}`

---

### Marketplace Service
**File:** [marketplace-service-endpoints.md](./marketplace-service-endpoints.md)

The Marketplace service handles catalog management, offers, orders, payments, and compliance.

**Controllers:** 6
**Key Features:**
- Catalog management (categories, SKUs)
- Compliance (prescriptions, incidents, expiry reports)
- Offers (supplier offers, price comparison, market ranges)
- Orders (draft cart, order lifecycle)
- Payments (initialization, verification, webhooks, settlements, financial reports)

**Endpoint Count:** ~25 endpoints

---

### AI Field Vet Service
**File:** [ai-field-vet-service-endpoints.md](./ai-field-vet-service-endpoints.md)

The AI Field Vet service provides farmer authentication, session management, and payment webhooks for the field vet AI agent.

**Controllers:** 3 (Python FastAPI routers)
**Key Features:**
- Farmer authentication (phone + PIN login)
- PIN lifecycle (setup, reset via OTP)
- Delivery address management (structured addresses)
- Payment webhooks (Paystack)
- Session management (anonymous sessions, activity tracking)

**Endpoint Count:** ~15 endpoints

**Security Features:**
- PIN values never logged
- Bcrypt hashing with work factor ≥ 12
- Rate limiting via Redis
- Constant-time compare for OTP verification
- RLS policies for session operations

---

### Logistics Optimizer Service
**File:** [logistics-optimizer-service-endpoints.md](./logistics-optimizer-service-endpoints.md)

The Logistics Optimizer service (Python/FastAPI) provides route optimization using Google OR-Tools and Google Routes API.

**Controllers:** 1 (Python FastAPI router)
**Key Features:**
- Route optimization (minimize fuel costs with constraints)
- Route directions (turn-by-turn instructions)
- Route coordinates (decoded polylines for maps)
- Geocoding (address to coordinates)
- Reverse geocoding (coordinates to address)
- Health checks (service readiness)

**Endpoint Count:** ~6 endpoints

**Optimization Features:**
- Vehicle capacity constraints (weight and volume)
- Delivery time windows
- Distributor working hours
- Fuel consumption and pricing optimization

---

## Small Services Summary

### Disease Engine Service
**Controllers:** 1
**Endpoints:**
- GET /health - Health check (BullMQ, memory heap, memory RSS)

### Hardware Ingest Service
**Controllers:** 2
**Endpoints:**
- GET /health - Health check (BullMQ, memory heap, memory RSS)
- POST /webhooks/chirpstack - ChirpStack webhook handler (LoRaWAN uplink events)

### Logistics Service
**Controllers:** 3
**Endpoints:**
- POST /internal/logistics/optimize - Optimize routes
- POST /internal/logistics/enqueue - Enqueue optimization job
- GET /internal/logistics/manifests - List manifests
- GET /internal/logistics/eta/:userId/:orderId - Get order ETA
- GET /health - Health check (database, memory)

### Workers Service
**Controllers:** 1 (+ notification/email processors)
**Endpoints:**
- GET /health - Health check (BullMQ, memory heap, memory RSS)

**Async email (no HTTP):** Consumes BullMQ jobs from Core/Marketplace/schedulers; sends via Resend and `@wafrivet/email`. See [`Docs/emails.md`](../emails.md).

---

## Common Patterns

### Internal vs Public Endpoints

**Internal Endpoints** (prefixed with `/internal/`):
- Used for service-to-service communication
- Require service-to-service authentication (shared secrets, actor context)
- Include audit trail via ActorContextDto
- Not exposed to frontend clients

**Public Endpoints**:
- Exposed to frontend clients
- Require user authentication (JWT tokens, session cookies)
- May be marked with `@Public()` decorator for unauthenticated access

### Pagination Patterns

**Cursor-based Pagination:**
- Query parameters: `cursor`, `limit`
- Default limit: 20, max: 100
- Returns next cursor for subsequent requests
- Used in: orders, notifications, offers, regions

**Page-based Pagination:**
- Query parameters: `page`, `limit`
- Used in: farm snapshots, delta queries, outbox diagnostics

**Offset-based Pagination:**
- Query parameters: `offset`, `limit`
- Used in: dead letter queue listings

### Audit Trail Pattern

**ActorContextDto** (included in internal endpoints):
```typescript
{
  actorUserId: string (UUID),
  ipAddress?: string,
  userAgent?: string,
  requestId?: string
}
```

Used in:
- Admin operations (status changes, notes, user management)
- Entity updates (profile changes, verification)
- Catalog operations (SKU creation/updates)
- Compliance operations (incident resolution)
- Order operations (cancellation)
- Offer operations (create/update/delete)

### Ownership Guards

**Guards** validate user has access to resource:
- OrderOwnershipGuard - User owns the order
- OfferOwnershipGuard - Supplier owns the offer
- RiderStopOwnershipGuard - Rider assigned to the stop
- HerdOwnership - User has access to herd resource (farm/animal)

### Rate Limiting

**Herd Module Rate Limits:**
- HerdMutateRateLimit - Write operations (create/update/delete)
- HerdReadRateLimit - Read operations
- HerdAiContextRateLimit - AI context assembly
- HerdSnapshotPrefetchRateLimit - Snapshot endpoints
- HerdSyncRateLimit - Sync operations

**Other Rate Limits:**
- Login attempts (PIN verification)
- OTP requests (PIN reset)
- Rider location pings (configurable TTL and rate limit)

---

## Authentication

### User Roles

**Platform `UserRole` (Prisma / JWT)** — used by gateway, marketplace, and Herd JWT mapping:

| Role | Purpose | KYC |
|------|---------|-----|
| `ADMIN` | Platform admin | — |
| `SUPPORT` | Support staff | — |
| `VET` | Clinic / agro-vet | Required |
| `SUPPLIER` | Product supplier | Required |
| `MANUFACTURER` | Manufacturer | Required |
| `RIDER` | Delivery rider | Assigned by admin |
| `FARMER` | Livestock owner / herd user | No |
| `REGULAR_CUSTOMER` | Non-farmer buyer | No |
| `PERSON` | Reserved | — |

Selectable after signup via `GET/POST /api/v1/roles/*` on the gateway: `FARMER`, `REGULAR_CUSTOMER`, `VET`, `SUPPLIER`, `MANUFACTURER`.

**Herd effective roles** (Core `/api/v1/herd/*` only):

| Herd role | Typical source |
|-----------|----------------|
| `FARMER` | `UserRole.FARMER` or farm owner |
| `VETERINARIAN` | `UserRole.VET` |
| `FIELD_AGENT` | Farm membership |
| `ADMIN` / `SUPPORT` | Platform admin/support |

**AI Field Vet** uses a separate phone+PIN `farmer_id` — not `UserRole`. See [ai-field-vet-service-endpoints.md](./ai-field-vet-service-endpoints.md).

### Authentication Methods

**JWT Token Authentication:**
- Used by: API Gateway, Core, Marketplace services
- Bearer token in Authorization header
- Includes user ID, role, permissions
- Refresh token flow supported

**Session Cookie Authentication:**
- Used by: AI Field Vet service
- wafrivet_session cookie
- Anonymous sessions for unauthenticated users
- Session ID linked to phone number after login

**Service-to-Service Authentication:**
- Shared secrets (X-Optimizer-Secret header)
- Actor context for audit trail
- Internal endpoints only

### Guards

**JwtAuthGuard** - Validates JWT token
**RolesGuard** - Validates user has required role
**KycApprovedGuard** - Validates supplier KYC approval
**HerdRoles** - Validates herd role membership
**HerdOwnership** - Validates resource ownership

---

## Error Handling

### Standard HTTP Status Codes

- 200 OK - Successful request
- 201 Created - Resource created successfully
- 202 Accepted - Request accepted for processing
- 204 No Content - Successful request with no response body
- 400 Bad Request - Invalid input data
- 401 Unauthorized - Authentication required or failed
- 403 Forbidden - Insufficient permissions
- 404 Not Found - Resource not found
- 422 Unprocessable Entity - Validation error
- 429 Too Many Requests - Rate limit exceeded
- 500 Internal Server Error - Server error
- 503 Service Unavailable - Service temporarily unavailable

### Error Response Format

```typescript
{
  code: string,
  message: string,
  details?: any
}
```

### Common Error Codes

- AUTHENTICATION_FAILED - Invalid credentials
- PERMISSION_DENIED - Insufficient permissions
- RESOURCE_NOT_FOUND - Resource does not exist
- VALIDATION_ERROR - Input validation failed
- RATE_LIMIT_EXCEEDED - Too many requests
- WEBHOOK_VERIFICATION_FAILED - Invalid webhook signature
- SERVICE_UNAVAILABLE - Service temporarily down

---

## File Structure

All endpoint documentation files are located in the Wafrivet-Backend root directory:

```
Docs/endpoint_documentation/
├── all_Service_Endpoints.md (this file)
├── deployed-services-urls.md
├── api-gateway-service-endpoints-part1.md
├── api-gateway-service-endpoints-part2.md
├── api-gateway-service-endpoints-part3.md
├── core-service-endpoints-part1.md
├── core-service-endpoints-part2.md
├── herd-service-endpoints-part1.md
├── herd-service-endpoints-part2.md
├── marketplace-service-endpoints.md
├── ai-field-vet-service-endpoints.md
└── logistics-optimizer-service-endpoints.md
```

---

## Frontend Integration Guide

### For Frontend Designers

1. **Start with API Gateway documentation** - Most frontend endpoints are exposed through the API Gateway
2. **Check authentication requirements** - Ensure proper authentication headers/cookies are included
3. **Review payload schemas** - Use DTO definitions for request/response structures
4. **Handle errors gracefully** - Implement error handling for all standard status codes
5. **Use pagination correctly** - Follow cursor-based or page-based patterns as documented
6. **Consider rate limits** - Implement client-side rate limiting to avoid 429 responses

### Common Request Patterns

**Authenticated Request (JWT):**
```typescript
headers: {
  Authorization: `Bearer ${token}`
}
```

**Session-based Request (Cookie):**
```typescript
credentials: 'include' // for fetch/axios
```

**File Upload (Base64):**
```typescript
{
  fileName: string,
  mimeType: string,
  size: number,
  base64: string
}
```

### WebSocket Integration

The AI Field Vet service uses WebSocket connections for real-time agent communication. See [ai-field-vet-service-endpoints.md](./ai-field-vet-service-endpoints.md) for session management details.

---

## Service Dependencies

### External Services
- **Supabase** - Database and authentication
- **Redis** - Caching and rate limiting
- **Google OR-Tools** - Route optimization
- **Google Routes API** - Route directions and geocoding
- **Google Geocoding API** - Address to coordinates
- **Paystack** - Payment processing
- **Termii** - SMS notifications (temporarily disabled)

### Internal Service Communication
- API Gateway → Core (internal endpoints)
- API Gateway → Marketplace (internal endpoints)
- API Gateway → Logistics (internal endpoints)
- API Gateway → Logistics Optimizer (route optimization)
- Marketplace → Core (entity operations)
- **Herd clients → Core** (`/api/v1/herd/*`, same JWT as gateway; gateway proxy planned)
- All Services → Redis (caching, pub/sub)
- All Services → Supabase (database)

---

## Version Information

- API Gateway: NestJS (TypeScript)
- Core: NestJS (TypeScript)
- Marketplace: NestJS (TypeScript)
- AI Field Vet: FastAPI (Python)
- Logistics Optimizer: FastAPI (Python)
- Disease Engine: NestJS (TypeScript)
- Hardware Ingest: NestJS (TypeScript)
- Logistics: NestJS (TypeScript)
- Workers: NestJS (TypeScript)

---

## Support

For questions about specific endpoints, refer to the individual service documentation files linked above. For implementation questions, consult the service source code in the `services/` directory.
