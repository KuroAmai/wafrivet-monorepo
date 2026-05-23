# Herd Service Endpoints — Part 1: Overview, Animals, Farms, Tags, Sync, AI Context

The **Herd module** lives inside **wafrivet-core** (not a separate deployable). It manages livestock identity, NFC tags, clinical records, offline sync, and token-budgeted AI context for field and dashboard clients.

**Related:**
- [Part 2: Clinical records](./herd-service-endpoints-part2.md)
- [Core service (internal ops)](./core-service-endpoints-part1.md)
- [Deployed URLs](./deployed-services-urls.md)

**Source:** `services/core/src/herd/`

---

## Base URL and access

| Environment | Base path |
|-------------|-----------|
| Production (via Core, private) | `https://wafrivet-core-wdvfp4toqa-ew.a.run.app/api/v1/herd` |
| Local (Docker) | `http://core:3001/api/v1/herd` |

**Gateway:** Herd routes are **not** proxied through `wafrivet-api-gateway` today. Clients obtain a JWT from the gateway (`POST /api/v1/auth/login`) and call Core directly (or via a BFF that forwards the `Authorization` header). Core must be reachable from the client network (today: typically same-origin BFF or future gateway proxy).

**Global prefix:** `/api/v1`  
**Herd prefix:** `/herd`  
**Example:** `POST /api/v1/herd/animals`

---

## Authentication

- **Header:** `Authorization: Bearer <access_token>` (same RS256 JWT issued by Core auth / gateway login).
- **Guard:** `HerdJwtAuthGuard` validates the token and maps platform `UserRole` → **Herd effective roles** (see below).

### Platform `UserRole` → Herd effective role

| Platform `UserRole` (JWT `role` / `roles`) | Herd effective role |
|---------------------------------------------|---------------------|
| `ADMIN` | `ADMIN` |
| `SUPPORT` | `SUPPORT` |
| `FARMER` | `FARMER` |
| `VET` | `VETERINARIAN` |
| Farm membership `OWNER` or `isFarmOwner` | `FARMER` |
| Farm membership `FIELD_AGENT` | `FIELD_AGENT` |

`REGULAR_CUSTOMER` does **not** map to `FARMER` unless the user owns the farm (membership/ownership check).

### Herd effective roles (authorization)

Used in `@HerdRoles(...)` on handlers:

- `FARMER` — herd owner / farm access
- `VETERINARIAN` — vet clinical writes
- `FIELD_AGENT` — tag provisioning, some clinical writes
- `ADMIN` — full herd admin
- `SUPPORT` — sync outbox diagnostics only

---

## Cross-cutting behavior

### Headers

| Header | Required | Purpose |
|--------|----------|---------|
| `Authorization` | Yes | Bearer JWT |
| `idempotency-key` | Mutations with `@IdempotentCommand` | UUID; replay-safe writes (Redis-backed) |
| `x-correlation-id` | Optional | Tracing (propagated in logs) |

### Rate limits (per user, configurable via env)

| Throttle | Default | Applies to |
|----------|---------|------------|
| `read` | 120/min | GET/HEAD (except sync, ai-context, snapshots) |
| `mutate` | 30/min | POST/PATCH/DELETE (except sync, ai-context) |
| `sync` | 10/min | `/herd/sync/*` |
| `snapshot` | 60/min | `GET .../snapshot` |
| `ai` | 20/min | `POST .../ai-context/*` |

### Ownership

`HerdOwnershipGuard` enforces farm/animal access from JWT + farm membership. Endpoints with `@HerdOwnership({ animalUidParam })` or `{ farmIdParam }` require the actor to access that resource.

### Response envelope

Herd uses `HerdResponseInterceptor` and `HerdExceptionFilter`. Errors use `HERD_*` codes (e.g. `HERD_FORBIDDEN`, `HERD_NOT_FOUND`, `HERD_IDEMPOTENCY_REQUIRED`).

### Clinical list query (shared)

Used on `GET` list endpoints under `animals/:animalUid/...`:

| Query | Type | Notes |
|-------|------|-------|
| `cursor` | string | Opaque cursor |
| `limit` | number | Default 20, max 100 |
| `page` | number | 1-based if no cursor |
| `since` | ISO-8601 | Filter `updated_at >= since` |
| `metricsNewestFirst` | boolean | Body-metrics only: newest-first ordering |

---

## Endpoint index (Part 1)

| Method | Path | Herd roles (mutations) | Notes |
|--------|------|------------------------|-------|
| `POST` | `/animals` | FIELD_AGENT, VETERINARIAN, ADMIN | Idempotent |
| `GET` | `/animals/:animalUid` | — (ownership) | |
| `GET` | `/animals/:animalUid/snapshot` | — (ownership) | Offline prefetch |
| `PATCH` | `/animals/:animalUid` | FIELD_AGENT, VETERINARIAN, ADMIN | Idempotent |
| `PATCH` | `/animals/:animalUid/status` | FIELD_AGENT, VETERINARIAN, ADMIN | Idempotent |
| `GET` | `/farms/:farmId/snapshot` | FARMER, VETERINARIAN, FIELD_AGENT, ADMIN | Paginated |
| `GET` | `/tags/:chipUid` | — | Resolve NFC scan |
| `POST` | `/tags/provision` | FIELD_AGENT, VETERINARIAN, ADMIN | Idempotent |
| `POST` | `/tags/replace` | FIELD_AGENT, VETERINARIAN, ADMIN | Idempotent |
| `GET` | `/tags/animal/:animalUid` | FIELD_AGENT, VETERINARIAN, ADMIN, FARMER | Tag history |
| `PATCH` | `/tags/:chipUid/status` | ADMIN, FIELD_AGENT, VETERINARIAN | Idempotent |
| `POST` | `/sync/batch` | FARMER, VETERINARIAN, FIELD_AGENT, ADMIN | Max 50 ops |
| `GET` | `/sync/delta/:farmId` | FARMER, VETERINARIAN, FIELD_AGENT, ADMIN | |
| `GET` | `/sync/outbox` | ADMIN, SUPPORT | Diagnostics |
| `POST` | `/ai-context/:animalUid` | FARMER, VETERINARIAN, FIELD_AGENT, ADMIN | Token-budgeted payload |

---

## Animals

### POST /animals
**Description:** Create animal; server allocates `animal_uid`.  
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN  
**Body:** `CreateAnimalDto`
```typescript
{
  farmId: string;           // UUID
  species: 'cattle' | 'goat' | 'pig' | 'sheep' | 'ram' | 'poultry' | 'horse' | 'donkey' | 'camel' | 'other';
  sex: 'male' | 'female' | 'unknown';
  breed?: string;
  dateOfBirth?: string;     // YYYY-MM-DD
  estimatedAgeMonths?: number;
  name?: string;
  tagEarNumber?: string;
  color?: string;
  weightKg?: number;
  notes?: string;
}
```
**Response:** `201` — `AnimalResponseDto` (includes `animalUid`, `status`, timestamps)

### GET /animals/:animalUid
**Description:** Get animal by `animal_uid`.  
**Response:** `200` — `AnimalResponseDto`

### GET /animals/:animalUid/snapshot
**Description:** Compact animal snapshot for offline pre-fetch (Redis-cached, alerts included).  
**Response:** `200` — `FarmAnimalSnapshotDto`

### PATCH /animals/:animalUid
**Description:** Partial update.  
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN  
**Body:** `UpdateAnimalDto` (optional fields from create)  
**Response:** `200` — `AnimalResponseDto`

### PATCH /animals/:animalUid/status
**Description:** Lifecycle status change.  
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN  
**Body:** `UpdateAnimalStatusDto`
```typescript
{ status: 'active' | 'quarantined' | 'deceased' | 'sold' | 'transferred'; reason?: string }
```
**Response:** `200` — `AnimalResponseDto`

---

## Farms

### GET /farms/:farmId/snapshot
**Description:** Farm-level paginated animal snapshots for offline pre-fetch.  
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN  
**Query:** `page` (default 1), `limit` (default 20, max 100)  
**Response:** `200` — `FarmSnapshotResponseDto`

---

## NFC tags (`/tags`)

Chip UID format: colon-separated hex octets, e.g. `04:AB:3C:12:67:2E:80`.

### GET /tags/:chipUid
**Description:** Resolve scanned chip to animal + active tag record.  
**Response:** `200` — `TagResolutionResponseDto`

### POST /tags/provision
**Description:** Bind chip to animal.  
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN  
**Body:** `ProvisionTagDto`
```typescript
{ chipUid: string; animalUid: string; provisionedAt?: string; notes?: string }
```
**Response:** `201` — `NfcTagResponseDto`

### POST /tags/replace
**Description:** Atomic tag swap.  
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN  
**Body:** `ReplaceTagDto`
```typescript
{
  oldChipUid: string;
  newChipUid: string;
  animalUid: string;
  reason: 'lost' | 'damaged' | 'routine_replacement' | 'other';
  replacedAt?: string;
  notes?: string;
}
```
**Response:** `200` — `NfcTagResponseDto`

### GET /tags/animal/:animalUid
**Description:** Tag history for animal (newest first).  
**Roles:** FIELD_AGENT, VETERINARIAN, ADMIN, FARMER  
**Response:** `200` — `NfcTagResponseDto[]`

### PATCH /tags/:chipUid/status
**Description:** Update tag status.  
**Roles:** ADMIN, FIELD_AGENT, VETERINARIAN  
**Body:** `UpdateTagStatusDto`
```typescript
{ status: 'active' | 'lost' | 'removed' | 'damaged'; statusNote?: string; statusChangedAt?: string }
```
**Response:** `200` — `NfcTagResponseDto`

---

## Sync

### POST /sync/batch
**Description:** Replay up to **50** offline-queued operations.  
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN  
**Body:** `SyncBatchDto`
```typescript
{
  deviceId: string;       // UUID
  clientTimestamp: string; // ISO-8601
  operations: Array<{
    id: string;           // UUID — per-op idempotency key
    type: 'CREATE_DIAGNOSIS' | 'UPDATE_DIAGNOSIS' | 'CREATE_TREATMENT' |
          'CREATE_VACCINATION' | 'CREATE_DEWORMING' | 'CREATE_REPRODUCTIVE_EVENT' |
          'CREATE_METRIC' | 'CREATE_NOTE';
    animalUid: string;
    payload: Record<string, unknown>;
    clientCreatedAt: string;
  }>;
}
```
**Response:** `200` — `SyncBatchResponseDto` (per-item `PROCESSED` | `CONFLICT` | `REJECTED` | `REPLAYED` | `IN_PROGRESS`)

### GET /sync/delta/:farmId
**Description:** Changed records since timestamp (paginated).  
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN  
**Query:** `since` (required ISO-8601), `page`, `limit`  
**Response:** `200` — `SyncDeltaResponseDto`

### GET /sync/outbox
**Description:** Operational sync outbox (support/admin).  
**Roles:** ADMIN, SUPPORT  
**Query:** `page`, `limit`, `status`, `submittedBy`, `animalUid`  
**Response:** `200` — `SyncOutboxResponseDto`

---

## AI context

### POST /ai-context/:animalUid
**Description:** Assemble token-budgeted context for AI agents (diagnoses, treatments, alerts, etc.).  
**Roles:** FARMER, VETERINARIAN, FIELD_AGENT, ADMIN  
**Body:** `AiContextRequestDto`
```typescript
{
  sections?: Array<
    'IDENTITY' | 'DIAGNOSES' | 'TREATMENTS' | 'VACCINATIONS' | 'DEWORMING' |
    'REPRODUCTION' | 'METRICS' | 'NOTES' | 'ALERTS'
  >;  // omit = all sections
}
```
**Response:** `201` — `AiContextResponseDto`

---

## Swagger

When Core runs with Swagger enabled, Herd controllers are tagged `Herd - *` under `/api/v1/herd`.
