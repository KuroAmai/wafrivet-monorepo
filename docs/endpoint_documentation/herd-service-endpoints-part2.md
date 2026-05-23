# Herd Service Endpoints — Part 2: Clinical Records

All paths are under **`/api/v1/herd`**. See [Part 1](./herd-service-endpoints-part1.md) for auth, headers, rate limits, and list-query parameters.

**Source:** `services/core/src/herd/clinical/`

---

## Clinical endpoint pattern

Most clinical resources follow:

- `GET /animals/:animalUid/<resource>` — list (newest first unless noted)
- `POST /animals/:animalUid/<resource>` — create (`201`)
- Diagnoses also support `GET/PATCH .../:id`

**Shared query:** `HerdClinicalListQueryDto` — `cursor`, `limit`, `page`, `since`, `metricsNewestFirst` (body-metrics only).

**Ownership:** All routes use `@HerdOwnership({ animalUidParam: 'animalUid' })`.

**Idempotency:** `POST` creates use `@IdempotentCommand` — send `idempotency-key` header.

---

## Diagnoses

**Base:** `/animals/:animalUid/diagnoses`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/` | — | List diagnoses |
| `POST` | `/` | VETERINARIAN, ADMIN | Create diagnosis |
| `GET` | `/:id` | — | Get with inline treatments |
| `PATCH` | `/:id` | VETERINARIAN, ADMIN | Update (status transitions from ONGOING) |

**Create body (`CreateDiagnosisDto`):** chief complaint, provisional/confirmed diagnosis fields, severity, status (`ONGOING` | `RESOLVED` | …), vet notes, etc. (see `diagnoses.dto.ts`).

---

## Treatments

**Base:** `/animals/:animalUid/treatments`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/` | — | List treatments |
| `POST` | `/` | VETERINARIAN, ADMIN | Create treatment (often linked to diagnosis) |

---

## Vaccinations

**Base:** `/animals/:animalUid/vaccinations`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/status` | — | Compliance status per vaccine type |
| `GET` | `/` | — | List vaccination records |
| `POST` | `/` | VETERINARIAN, FIELD_AGENT, ADMIN | Create vaccination |

---

## Deworming

**Base:** `/animals/:animalUid/deworming`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/` | — | List deworming events |
| `POST` | `/` | VETERINARIAN, FIELD_AGENT, ADMIN | Create deworming record |

---

## Reproductive events

**Base:** `/animals/:animalUid/reproductive-events`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/` | — | List events |
| `POST` | `/` | VETERINARIAN, FIELD_AGENT, ADMIN | Create event (heat, breeding, pregnancy, birth, etc.) |

---

## Body condition & weights

**Base:** `/animals/:animalUid/body-condition-weights`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/` | — | Time series (ascending by `recorded_at`; use `metricsNewestFirst=true` for descending) |
| `POST` | `/` | — (ownership only) | Create metric |

**Note:** `POST` has no `@HerdRoles` — any user with farm/animal ownership (typically **FARMER**) may record metrics.

---

## Management notes

**Base:** `/animals/:animalUid/management-notes`

| Method | Path | Roles (write) | Description |
|--------|------|---------------|-------------|
| `GET` | `/` | — | List notes |
| `POST` | `/` | — (ownership only) | Create note |

**Note:** `POST` has no `@HerdRoles` — farmers with ownership can add notes.

---

## Offline sync operation types

Clinical creates can be replayed via `POST /herd/sync/batch` using:

| Sync `type` | Target resource |
|-------------|-----------------|
| `CREATE_DIAGNOSIS` | Diagnoses |
| `UPDATE_DIAGNOSIS` | Diagnoses |
| `CREATE_TREATMENT` | Treatments |
| `CREATE_VACCINATION` | Vaccinations |
| `CREATE_DEWORMING` | Deworming |
| `CREATE_REPRODUCTIVE_EVENT` | Reproduction |
| `CREATE_METRIC` | Body condition / weights |
| `CREATE_NOTE` | Management notes |

Payload shape per type matches the corresponding `Create*Dto` fields.

---

## Role matrix (clinical writes)

| Resource | FARMER | VETERINARIAN | FIELD_AGENT | ADMIN |
|----------|--------|--------------|-------------|-------|
| Diagnosis create/update | — | ✓ | — | ✓ |
| Treatment create | — | ✓ | — | ✓ |
| Vaccination create | — | ✓ | ✓ | ✓ |
| Deworming create | — | ✓ | ✓ | ✓ |
| Reproduction create | — | ✓ | ✓ | ✓ |
| Body metric create | ✓* | ✓* | ✓* | ✓* |
| Management note create | ✓* | ✓* | ✓* | ✓* |

\*Via ownership guard only (no explicit `@HerdRoles`).

---

## DTO source files

| Module | DTO file |
|--------|----------|
| Diagnoses | `clinical/diagnoses/diagnoses.dto.ts` |
| Treatments | `clinical/treatments/treatments.dto.ts` |
| Vaccinations | `clinical/vaccinations/vaccinations.dto.ts` |
| Deworming | `clinical/deworming/deworming.dto.ts` |
| Reproduction | `clinical/reproduction/reproduction.dto.ts` |
| Body metrics | `clinical/body-metrics/body-metrics.dto.ts` |
| Management notes | `clinical/management-notes/management-notes.dto.ts` |
