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
- Payments and webhooks
- Procurement and orders
- Queue administration

**Endpoint Count:** ~100+ endpoints

---

### Core Service
**Files:**
- [core-service-endpoints-part1.md](./core-service-endpoints-part1.md) - Admin & Core
- [core-service-endpoints-part2.md](./core-service-endpoints-part2.md) - Herd & Operations

The Core service provides internal business logic services used by the API Gateway and other services.

**Controllers:** 20
**Key Features:**
- Internal admin operations
- Authentication (internal endpoints)
- Entity management (internal)
- Health checks
- Herd management (animals, clinical records, farms, NFC tags, sync)
- Logistics (internal)
- Notifications (internal)
- Rider operations (internal)

**Endpoint Count:** ~80+ endpoints

**Herd Module Endpoints:**
- AI Context: Assemble token-budgeted AI context for animals
- Animals: CRUD operations, status updates, snapshots
- Clinical Records: Diagnoses, treatments, vaccinations, deworming, reproduction, body metrics, management notes
- Farms: Farm-level snapshots for offline pre-fetch
- NFC Tags: Provision, replace, resolve, status updates
- Sync: Batch operations, delta queries, outbox diagnostics

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
**Controllers:** 1
**Endpoints:**
- GET /health - Health check (BullMQ, memory heap, memory RSS)

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

**UserRole Enum:**
- ADMIN - Full system access
- VET - Veterinary clinic users
- SUPPLIER - Product suppliers
- RIDER - Delivery riders

**Herd Roles:**
- FARMER - Farm owners
- VETERINARIAN - Veterinarians
- FIELD_AGENT - Field agents
- ADMIN - Herd administrators
- SUPPORT - Support staff

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
Wafrivet-Backend/
├── all_Service_Endpoints.md (this file)
├── api-gateway-service-endpoints-part1.md (User Management)
├── api-gateway-service-endpoints-part2.md (Business Operations)
├── api-gateway-service-endpoints-part3.md (Operations & Delivery)
├── core-service-endpoints-part1.md (Admin & Core)
├── core-service-endpoints-part2.md (Herd & Operations)
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
