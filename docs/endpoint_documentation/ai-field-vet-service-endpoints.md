# AI Field Vet Service Endpoints Documentation

This document contains all endpoints for the AI Field Vet service, which provides farmer authentication, session management, and payment webhooks for the field vet AI agent.

> **Identity model:** `/farmers/*` here uses **phone + PIN** and returns a `farmer_id` (session cookie). That is separate from platform **`UserRole.FARMER`** (email/JWT signup via API Gateway → Core). For herd records, NFC, and clinical history, use [herd-service-endpoints-part1.md](./herd-service-endpoints-part1.md). Linking phone farmers to platform users is product-specific and not enforced in these routes.

**Transactional email** (order receipts, OTP, welcome, etc.) is **not** implemented in this service. It runs on the Nest **worker** with frontend `@wafrivet/email` and Core internal routes documented in [core-service-endpoints-part1.md](./core-service-endpoints-part1.md#internal-email-endpoints).

---

## Table of Contents

- [Farmers Endpoints](#farmers-endpoints)
- [Payments Endpoints](#payments-endpoints)
- [Sessions Endpoints](#sessions-endpoints)

---

## Farmers Endpoints

### POST /farmers/login
**Description:** Authenticate farmer with phone number + 6-digit PIN
**Status:** 200 OK
**Response:** LoginResponse
- farmer_id: string
- phone_number: string
- name: string | null
- pin_set: boolean
- needs_pin_setup: boolean
- message: string

**Request Body:**
```json
{
  "phone_number": "+2348012345678",
  "pin": "123456"
}
```

**Error Responses:**
- 401: Incorrect PIN (includes attempt count)
- 422: Invalid phone number or PIN format
- 429: Account locked (includes lockout seconds)
- 503: Service unavailable

### POST /farmers/pin
**Description:** Set the farmer's 6-digit PIN (first-time setup)
**Status:** 200 OK
**Response:** SetPinResponse
- ok: boolean

**Request Body:**
```json
{
  "phone_number": "+2348012345678",
  "pin": "123456",
  "name": "John Doe"
}
```

**Error Responses:**
- 422: Invalid phone number or PIN format
- 503: Service unavailable

### POST /farmers/pin/reset/request
**Description:** Request a PIN reset OTP via SMS
**Status:** 200 OK
**Response:** OtpRequestResponse
- sent: boolean
- message: string

**Request Body:**
```json
{
  "phone_number": "+2348012345678"
}
```

**Note:** Currently returns 503 (temporarily unavailable during maintenance)

### POST /farmers/pin/reset/verify
**Description:** Verify OTP and set new PIN
**Status:** 200 OK
**Response:** OtpVerifyResponse
- ok: boolean
- message: string

**Request Body:**
```json
{
  "phone_number": "+2348012345678",
  "otp": "123456",
  "new_pin": "654321"
}
```

**Note:** Currently returns 503 (temporarily unavailable during maintenance)

### GET /farmers/delivery-address
**Description:** Get saved delivery address for logged-in farmer
**Status:** 200 OK
**Response:** DeliveryAddressResponse
- address: string | null
- message: string

**Error Responses:**
- 503: Service unavailable

### GET /farmers/addresses
**Description:** List saved structured delivery addresses
**Status:** 200 OK
**Response:** AddressBookResponse
- selected_id: string | null
- addresses: StructuredAddress[]
- message: string

**StructuredAddress:**
- id: string
- unit: string
- street: string
- city: string
- state: string
- country: string
- postal_code: string
- delivery_phone: string
- is_default: boolean
- formatted: string
- created_at: string | null
- updated_at: string | null

### POST /farmers/addresses
**Description:** Create a structured delivery address
**Status:** 201 Created
**Response:** AddressMutationResponse
- address: StructuredAddress
- message: string

**Request Body:**
```json
{
  "unit": "Apt 4",
  "street": "123 Main Street",
  "city": "Lagos",
  "state": "Lagos",
  "country": "Nigeria",
  "postal_code": "100001",
  "delivery_phone": "+2348012345678",
  "set_default": true
}
```

### PUT /farmers/addresses/{address_id}
**Description:** Update a saved delivery address
**Status:** 200 OK
**Response:** AddressMutationResponse
- address: StructuredAddress
- message: string

**Request Body:**
```json
{
  "unit": "Apt 5",
  "street": "124 Main Street",
  "city": "Lagos",
  "state": "Lagos",
  "country": "Nigeria",
  "postal_code": "100001",
  "delivery_phone": "+2348012345678",
  "set_default": false
}
```

### DELETE /farmers/addresses/{address_id}
**Description:** Delete a saved delivery address
**Status:** 200 OK
**Response:** AddressDeleteResponse
- deleted_id: string
- selected_id: string | null
- message: string

### POST /farmers/addresses/select
**Description:** Select default delivery address for checkout
**Status:** 200 OK
**Response:** AddressMutationResponse
- address: StructuredAddress
- message: string

**Request Body:**
```json
{
  "address_id": "uuid-string"
}
```

### PUT /farmers/delivery-address
**Description:** Save delivery address for logged-in farmer (legacy endpoint)
**Status:** 200 OK
**Response:** DeliveryAddressResponse
- address: string
- message: string

**Request Body:**
```json
{
  "address": "123 Main Street, Lagos, Nigeria"
}
```

**Note:** Supports both legacy plain text and structured address fields

---

## Payments Endpoints

### POST /payments/webhook
**Description:** Paystack payment webhook - verify HMAC and queue processing
**Status:** 200 OK
**Response:** { status: "received" }

**Headers:**
- X-Paystack-Signature: HMAC signature

**Request Body:** Paystack webhook payload

**Processing Pipeline:**
1. Read raw bytes (preserves exact provider JSON for HMAC)
2. Verify X-Paystack-Signature with HMAC-SHA256
3. Parse event JSON
4. Return HTTP 200 immediately (Paystack has 5-second SLA)
5. Schedule DB update + Redis pub/sub publish as BackgroundTask

**Error Responses:**
- 400: Missing or invalid signature
- 400: Invalid JSON body

**Note:** Only processes "charge.success" events; other events are logged and acknowledged

---

## Sessions Endpoints

### POST /sessions
**Description:** Upsert session on first visit
**Status:** 201 Created
**Response:** SessionUpsertResponse
- session_id: string
- expires_at: string (ISO-8601 UTC timestamp)

**Request Body:**
```json
{
  "device_fingerprint": "sha256-prefix",
  "phone_number": "+2348012345678"
}
```

**Security:**
- Requires valid wafrivet_session cookie
- RLS policy ensures anon role can only INSERT rows where session_id matches cookie
- Device fingerprint capped to 128 characters server-side

### POST /sessions/activity
**Description:** Record session activity (updates last_active_at)
**Status:** 200 OK
**Response:** ActivityResponse
- ok: boolean

**Security:**
- Requires valid wafrivet_session cookie
- Safe to call repeatedly on WebSocket reconnect

---

## Common Request/Response Models

### Phone Number Pattern
- Must match E.164 format: `^\+[1-9]\d{6,14}$`
- Example: +2348012345678

### PIN Pattern
- Must be exactly 6 digits: `^\d{6}$`

### Address Fields
- unit: string (1-120 chars)
- street: string (2-200 chars)
- city: string (2-120 chars)
- state: string (2-120 chars)
- country: string (2-120 chars)
- postal_code: string (2-32 chars)
- delivery_phone: string (7-32 chars)

### Session Cookie
- All endpoints require valid `wafrivet_session` cookie
- Enforced by `get_session` dependency
- Session ID is authoritative; body session_id is ignored

---

## Security Notes

### PIN Security
- PIN values NEVER appear in any log record or error response
- PIN values are hashed with bcrypt (work factor ≥ 12)
- Rate limiting on login and OTP endpoints via Redis-backed lockout mechanisms
- Constant-time compare for OTP verification (hmac.compare_digest)

### Session Security
- No session data returned in error responses
- Session ID never logged in error traces
- Device fingerprint length-capped to 128 characters

### Webhook Security
- Raw request body read BEFORE JSON parsing
- HMAC comparison prevents timing attacks
- Invalid signatures return 400 without mutating payment state

---

## Rate Limiting

### Login Endpoint
- Failed attempts tracked in Redis
- Account lockout after multiple failed attempts
- Lockout duration configured via PIN service

### OTP Endpoint
- OTP stored in Redis with 10-minute TTL
- Single-use OTP (deleted immediately after verification)
- Rate limited to prevent abuse

### Session Endpoints
- No explicit rate limiting
- Safe to call repeatedly for activity updates
