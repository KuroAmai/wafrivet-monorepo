# Core Service Endpoints Documentation - Part 2: Herd & Operations

This document contains herd management and operations endpoints for the Core service.

**Related Documents:**
- [Part 1: Admin & Core](./core-service-endpoints-part1.md)

---

## Table of Contents

- [Herd AI Context Endpoints](#herd-ai-context-endpoints)
- [Herd Animals Endpoints](#herd-animals-endpoints)
- [Herd Body Metrics Endpoints](#herd-body-metrics-endpoints)
- [Herd Deworming Endpoints](#herd-deworming-endpoints)
- [Herd Diagnoses Endpoints](#herd-diagnoses-endpoints)
- [Herd Management Notes Endpoints](#herd-management-notes-endpoints)
- [Herd Reproduction Endpoints](#herd-reproduction-endpoints)
- [Herd Treatments Endpoints](#herd-treatments-endpoints)
- [Herd Vaccinations Endpoints](#herd-vaccinations-endpoints)
- [Herd Farms Endpoints](#herd-farms-endpoints)
- [Herd NFC Tags Endpoints](#herd-nfc-tags-endpoints)
- [Herd Sync Endpoints](#herd-sync-endpoints)
- [Logistics Endpoints](#logistics-endpoints)
- [Notifications Endpoints](#notifications-endpoints)
- [Rider Endpoints](#rider-endpoints)
- [Common DTOs](#common-dtos)

---

## Herd AI Context Endpoints

### POST /ai-context/:animalUid
**Description:** Assemble AI context for an animal
**Route:** /ai-context/:animalUid
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN
**Guards:** HerdAiContextRateLimit, HerdOwnership
**Params:** animalUid
**Body:** AiContextRequestDto
```typescript
{
  // AI context request fields (specific to AI context assembly)
}
```
**Response:** AiContextResponseDto
```typescript
{
  // AI context response fields (token-budgeted context for the animal)
}
```

---

## Herd Animals Endpoints

### POST /animals
**Description:** Create animal (allocates animal_uid)
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, IdempotentCommand
**Body:** CreateAnimalDto
```typescript
{
  // Animal creation fields (specific to herd module)
}
```
**Response:** AnimalResponseDto
```typescript
{
  // Animal response fields
}
```

### GET /animals/:animalUid/snapshot
**Description:** Get compact animal snapshot for offline pre-fetch
**Roles:** All authenticated
**Decorators:** HerdSnapshotPrefetchRateLimit, HerdOwnership
**Params:** animalUid
**Response:** FarmAnimalSnapshotDto

### GET /animals/:animalUid
**Description:** Get animal by animal_uid
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Response:** AnimalResponseDto

### PATCH /animals/:animalUid
**Description:** Update animal fields (partial)
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** UpdateAnimalDto
**Response:** AnimalResponseDto

### PATCH /animals/:animalUid/status
**Description:** Update animal lifecycle status
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** UpdateAnimalStatusDto
**Response:** AnimalResponseDto

---

## Herd Body Metrics Endpoints

### GET /animals/:animalUid/body-condition-weights
**Description:** List body condition/weight metrics (time series)
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** MetricListResponseDto

### POST /animals/:animalUid/body-condition-weights
**Description:** Create body condition/weight metric
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateMetricDto
**Response:** MetricResponseDto

---

## Herd Deworming Endpoints

### GET /animals/:animalUid/deworming
**Description:** List deworming history
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** DewormingListResponseDto

### POST /animals/:animalUid/deworming
**Description:** Create deworming record
**Roles:** VETERINARIAN, FIELD_AGENT, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateDewormingDto
```typescript
{
  // Deworming creation fields
}
```
**Response:** DewormingResponseDto
```typescript
{
  // Deworming response fields
}
```

---

## Herd Diagnoses Endpoints

### GET /animals/:animalUid/diagnoses
**Description:** List diagnoses (newest first)
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** DiagnosisListResponseDto

### POST /animals/:animalUid/diagnoses
**Description:** Create diagnosis
**Roles:** VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateDiagnosisDto
```typescript
{
  // Diagnosis creation fields
}
```
**Response:** DiagnosisResponseDto
```typescript
{
  // Diagnosis response fields
}
```

### GET /animals/:animalUid/diagnoses/:id
**Description:** Get diagnosis with inline treatments
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid, id
**Response:** DiagnosisResponseDto

### PATCH /animals/:animalUid/diagnoses/:id
**Description:** Update diagnosis (status transitions from ONGOING)
**Roles:** VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid, id
**Body:** UpdateDiagnosisDto
**Response:** DiagnosisResponseDto

---

## Herd Management Notes Endpoints

### GET /animals/:animalUid/management-notes
**Description:** List management notes
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** ManagementNoteListResponseDto

### POST /animals/:animalUid/management-notes
**Description:** Create management note
**Roles:** All authenticated
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateManagementNoteDto
**Response:** ManagementNoteResponseDto

---

## Herd Reproduction Endpoints

### GET /animals/:animalUid/reproductive-events
**Description:** List reproductive events
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** ReproductiveEventListResponseDto

### POST /animals/:animalUid/reproductive-events
**Description:** Create reproductive event
**Roles:** VETERINARIAN, FIELD_AGENT, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateReproductiveEventDto
**Response:** ReproductiveEventResponseDto

---

## Herd Treatments Endpoints

### GET /animals/:animalUid/treatments
**Description:** List treatments
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** TreatmentListResponseDto

### POST /animals/:animalUid/treatments
**Description:** Create treatment
**Roles:** VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateTreatmentDto
```typescript
{
  // Treatment creation fields
}
```
**Response:** TreatmentResponseDto
```typescript
{
  // Treatment response fields
}
```

---

## Herd Vaccinations Endpoints

### GET /animals/:animalUid/vaccinations/status
**Description:** Get vaccination compliance status per vaccine type
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Response:** VaccinationStatusResponseDto

### GET /animals/:animalUid/vaccinations
**Description:** List vaccinations
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Query:** HerdClinicalListQueryDto
**Response:** VaccinationListResponseDto

### POST /animals/:animalUid/vaccinations
**Description:** Create vaccination record
**Roles:** VETERINARIAN, FIELD_AGENT, ADMIN
**Decorators:** HerdMutateRateLimit, HerdOwnership, IdempotentCommand
**Params:** animalUid
**Body:** CreateVaccinationDto
```typescript
{
  // Vaccination creation fields
}
```
**Response:** VaccinationResponseDto
```typescript
{
  // Vaccination response fields
}
```

---

## Herd Farms Endpoints

### GET /farms/:farmId/snapshot
**Description:** Farm-level animal snapshot for offline pre-fetch
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN
**Decorators:** HerdSnapshotPrefetchRateLimit, HerdOwnership
**Params:** farmId
**Query:** page, limit
**Response:** FarmSnapshotResponseDto

---

## Herd NFC Tags Endpoints

### GET /tags/:chipUid
**Description:** Resolve scanned chip_uid to animal+tag record
**Roles:** All authenticated
**Decorators:** HerdReadRateLimit
**Params:** chipUid
**Response:** TagResolutionResponseDto

### POST /tags/provision
**Description:** Provision (bind) a chip UID to an animal
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, IdempotentCommand
**Body:** ProvisionTagDto
```typescript
{
  // NFC tag provision fields
}
```
**Response:** NfcTagResponseDto
```typescript
{
  // NFC tag response fields
}
```

### POST /tags/replace
**Description:** Replace an animal tag (atomic swap)
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN
**Decorators:** HerdMutateRateLimit, IdempotentCommand
**Body:** ReplaceTagDto
```typescript
{
  // NFC tag replacement fields
}
```
**Response:** NfcTagResponseDto

### GET /tags/animal/:animalUid
**Description:** Get tag history for an animal (descending)
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN, FARMER
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** animalUid
**Response:** NfcTagResponseDto[]

### PATCH /tags/:chipUid/status
**Description:** Update tag status (active/lost/removed/damaged)
**Roles:** ADMIN, FIELD_AGENT, VETERINARIAN
**Decorators:** HerdMutateRateLimit, IdempotentCommand
**Params:** chipUid
**Body:** UpdateTagStatusDto
**Response:** NfcTagResponseDto

---

## Herd Sync Endpoints

### POST /sync/batch
**Description:** Submit batch of offline-queued operations (max 50)
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN
**Decorators:** HerdSyncRateLimit
**Body:** SyncBatchDto
```typescript
{
  operations: SyncOperationDto[],  // Max 50 operations
  clientCreatedAt: string,  // ISO-8601 timestamp
  deviceId?: string,
  operationId?: string
}
```
**Response:** SyncBatchResponseDto
```typescript
{
  processed: number,
  failed: number,
  errors?: SyncErrorDto[]
}
```

### GET /sync/delta/:farmId
**Description:** Farm delta of changed records since timestamp
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN
**Decorators:** HerdReadRateLimit, HerdOwnership
**Params:** farmId
**Query:** since, page, limit
**Response:** SyncDeltaResponseDto

### GET /sync/outbox
**Description:** Operational outbox listing for diagnostics (Admin/Support only)
**Roles:** ADMIN, SUPPORT
**Query:** page, limit, status, submittedBy, animalUid
**Response:** SyncOutboxResponseDto

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
**Description:** Dispatch notification
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
**Response:** 202 Accepted

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

### Herd Roles
- FARMER
- VETERINARIAN
- FIELD_AGENT
- ADMIN
- SUPPORT

### Herd Decorators
- HerdMutateRateLimit: Rate limit for write operations
- HerdReadRateLimit: Rate limit for read operations
- HerdOwnership: Validates user has access to resource
- HerdAiContextRateLimit: Specific rate limit for AI context
- HerdSnapshotPrefetchRateLimit: Rate limit for snapshot endpoints
- HerdSyncRateLimit: Rate limit for sync operations
- IdempotentCommand: Ensures idempotency for operations

### Common Query Parameters
- cursor: string (pagination cursor)
- limit: number (default 20, max 100)
- page: number (for page-based pagination)
- since: string (ISO timestamp for delta queries)
- includeExpired: boolean (for prescription lists)
