# Core Service Endpoints Documentation - Part 2: Operations

Internal logistics, notifications, rider APIs, and a pointer to the Herd module.

**Related Documents:**
- [Part 1: Admin & Core](./core-service-endpoints-part1.md)
- [Herd module Part 1](./herd-service-endpoints-part1.md) — animals, farms, NFC, sync, AI context
- [Herd module Part 2](./herd-service-endpoints-part2.md) — clinical records

---

## Table of Contents

- [Herd module (separate docs)](#herd-module-separate-docs)
- [Logistics Endpoints](#logistics-endpoints)
- [Notifications Endpoints](#notifications-endpoints)
- [Rider Endpoints](#rider-endpoints)
- [Common DTOs](#common-dtos)

---

## Herd module (separate docs)

Herd endpoints are implemented under **`/api/v1/herd/*`** in Core (`services/core/src/herd/`). They are **not** exposed on the API gateway today.

**Documentation:**
- [herd-service-endpoints-part1.md](./herd-service-endpoints-part1.md) — overview, auth, animals, farms, tags, sync, AI context (~20 routes)
- [herd-service-endpoints-part2.md](./herd-service-endpoints-part2.md) — diagnoses, treatments, vaccinations, deworming, reproduction, metrics, notes

**Controllers:** `AnimalsController`, `FarmsController`, `NfcController`, `SyncController`, `AiContextController`, plus 7 clinical controllers.

---

## Logistics Endpoints

### POST /internal/logistics/optimize
**Description:** Optimize routes
**Body:** TriggerRouteOptimizationDto
```typescript
{
  manifestDate?: string,  // Optional, ISO-8601 date
  regionId?: string,  // Optional, UUID
  source?: string,  // Optional
  requestId?: string,  // Optional
  actorUserId?: string  // Optional, UUID
}
```
**Response:** Optimization result

### POST /internal/logistics/enqueue
**Description:** Enqueue optimization job
**Body:** TriggerRouteOptimizationDto
```typescript
{
  manifestDate?: string,  // Optional, ISO-8601 date
  regionId?: string,  // Optional, UUID
  source?: string,  // Optional
  requestId?: string,  // Optional
  actorUserId?: string  // Optional, UUID
}
```
**Response:** Job ID

### GET /internal/logistics/manifests
**Description:** List manifests
**Query:** LogisticsManifestQueryDto
```typescript
{
  manifestDate?: string,  // ISO-8601 date
  regionId?: string,  // UUID
  status?: RouteManifestStatusDto,  // enum: PENDING | ASSIGNED | IN_PROGRESS | COMPLETED | CANCELLED
  limit?: number  // Default 20, min 1, max 100
}
```
**Response:** Manifest list

### GET /internal/logistics/eta/:userId/:orderId
**Description:** Get order ETA
**Params:** userId, orderId (UUIDs)
**Response:** ETA data (VetOrderEtaDto)
```typescript
{
  orderId: string,
  manifestId: string | null,
  riderId: string | null,
  riderName: string | null,
  stopSequence: number | null,
  manifestStatus: string | null,
  estimatedArrival: string | null
}
```

---

## Notifications Endpoints

### GET /internal/notifications/:userId
**Description:** List notifications
**Params:** userId (UUID)
**Query:** ListNotificationsQueryDto
```typescript
{
  isRead?: boolean,
  cursor?: string,
  limit?: number
}
```
**Response:** Notification list

### GET /internal/notifications/:userId/unread-count
**Description:** Get unread count
**Params:** userId (UUID)
**Response:** { count }

### PATCH /internal/notifications/:userId/:notificationId/read
**Description:** Mark notification as read
**Params:** userId, notificationId (UUIDs)
**Response:** Notification

### PATCH /internal/notifications/:userId/read-all
**Description:** Mark all as read
**Params:** userId (UUID)
**Response:** { count }

### GET /internal/notifications/:userId/preferences
**Description:** Get preferences
**Params:** userId (UUID)
**Response:** Preferences

### PATCH /internal/notifications/:userId/preferences
**Description:** Update preferences
**Params:** userId (UUID)
**Body:** UpdateNotificationPreferencesDto
```typescript
{
  preferences: NotificationPreferenceDto[]
}
```

**NotificationPreferenceDto:**
```typescript
{
  notificationType: NotificationTypeEnum,  // enum
  isEnabled: boolean
}
```

**Response:** Updated preferences

### POST /internal/notifications/dispatch
**Description:** Dispatch notification (email via worker + Resend when `recipientEmail` is set)
**Body:** NotificationJobPayloadDto
```typescript
{
  notificationType: NotificationTypeEnum,  // enum
  recipientUserId: string,  // UUID
  recipientEmail?: string,  // required for email channel
  subject: string,  // Max 255 chars
  title: string,  // Non-empty
  body: string,  // Non-empty
  metadata?: {
    emailTemplateId?: string,      // EmailTemplateId — overrides type→template mapping
    emailTemplateProps?: object,   // props for @wafrivet/email template
    [key: string]: unknown
  }
}
```
**Response:** 202 Accepted

See `Docs/emails.md` for queue routing and template IDs.

### POST /internal/notifications/in-app
**Description:** Create in-app notification
**Body:** NotificationJobPayloadDto
```typescript
{
  notificationType: NotificationTypeEnum,  // enum
  recipientUserId: string,  // UUID
  recipientEmail?: string,
  subject: string,  // Max 255 chars
  title: string,  // Non-empty
  body: string,  // Non-empty
  metadata?: Record<string, unknown>
}
```
**Response:** Notification

### PATCH /internal/notifications/:userId/preferences/direct
**Description:** Update preferences directly
**Params:** userId (UUID)
**Body:** NotificationPreferenceDto[]
**Response:** Updated preferences

---

## Rider Endpoints

### PATCH /internal/rider/:userId/status
**Description:** Update rider status
**Params:** userId (UUID)
**Body:** UpdateRiderStatusDto
```typescript
{
  status: RiderAvailabilityStatus  // enum: online | offline
}
```
**Response:** Status

### GET /internal/rider/:userId/profile
**Description:** Get rider profile
**Params:** userId (UUID)
**Response:** Profile

### GET /internal/rider/:userId/manifest/today
**Description:** Get today's manifest
**Params:** userId (UUID)
**Response:** Manifest

### GET /internal/rider/:userId/stops/:stopId/ownership
**Description:** Check stop ownership
**Params:** userId, stopId (UUIDs)
**Response:** { owns: boolean }

### POST /internal/rider/:userId/stops/:stopId/arrive
**Description:** Mark stop as arrived
**Params:** userId, stopId (UUIDs)
**Response:** Stop status

### POST /internal/rider/:userId/stops/:stopId/pickup-confirm
**Description:** Confirm pickup
**Params:** userId, stopId (UUIDs)
**Body:** ConfirmPickupDto
```typescript
{
  submittedCode: string  // 4-10 chars
}
```
**Response:** Confirmation (StopExecutionResponseDto)
```typescript
{
  idempotent: boolean,
  stop: RouteStopDto
}
```

**RouteStopDto:**
```typescript
{
  id: string,
  manifestId: string,
  stopSequence: number,
  stopType: string,
  status: string,
  entityId: string,
  entityType: string,
  locationName: string | null,
  address: string,
  estimatedArrivalTime: string | null,
  completedAt: string | null,
  pickupCode: string | null
}
```

### POST /internal/rider/:userId/stops/:stopId/delivery-confirm
**Description:** Confirm delivery
**Params:** userId, stopId (UUIDs)
**Body:** ConfirmDeliveryDto
```typescript
{
  submittedCode: string  // 4-10 chars
}
```
**Response:** Confirmation (StopExecutionResponseDto)

### POST /internal/rider/:userId/location
**Description:** Ping rider location
**Params:** userId (UUID)
**Body:** RiderLocationDto
```typescript
{
  lat: number,  // -90 to 90
  lng: number,  // -180 to 180
  heading?: number,  // Optional, 0-360
  accuracyMeters?: number  // Optional, min 0
}
```
**Response:** 202 Accepted

### GET /internal/rider/tracking/:userId/orders/:orderId
**Description:** Get order tracking
**Params:** userId, orderId (UUIDs)
**Response:** RiderTrackingSnapshotDto
```typescript
{
  orderId: string,
  riderId: string,
  riderAvailabilityStatus: RiderAvailabilityStatus | null,
  orderStatus: string,
  location: RiderLocationSnapshotDto | null
}
```

**RiderLocationSnapshotDto:**
```typescript
{
  riderId: string,
  lat: number,
  lng: number,
  heading?: number,
  accuracyMeters?: number,
  timestamp: string
}
```

---

## Common DTOs

### ActorContextDto
Used in internal endpoints for audit trail:
- actorUserId: string (UUID)
- ipAddress?: string
- userAgent?: string
- requestId?: string

### Herd module
See [herd-service-endpoints-part1.md](./herd-service-endpoints-part1.md) for Herd effective roles, headers (`idempotency-key`), rate limits, and error codes.

### Common Query Parameters
- cursor: string (pagination cursor)
- limit: number (default 20, max 100)
- page: number (for page-based pagination)
- since: string (ISO timestamp for delta queries)
- includeExpired: boolean (for prescription lists)
