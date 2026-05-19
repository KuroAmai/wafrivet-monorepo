# API Gateway Service Endpoints Documentation - Part 2: Business Operations

This document contains business operations endpoints for the API Gateway service.

**Related Documents:**
- [Part 1: User Management](./api-gateway-service-endpoints-part1.md)
- [Part 3: Operations & Delivery](./api-gateway-service-endpoints-part3.md)

---

## Table of Contents

- [Catalog Endpoints](#catalog-endpoints)
- [Compliance Endpoints](#compliance-endpoints)
- [Entity Endpoints](#entity-endpoints)
- [Health Endpoints](#health-endpoints)
- [Logistics Endpoints](#logistics-endpoints)
- [Me Endpoints](#me-endpoints)

---

## Catalog Endpoints

### Admin Catalog Endpoints

#### POST /admin/catalog/categories
**Description:** Create a new product category
**Roles Required:** ADMIN
**Body:** CreateCategoryDto
```typescript
{
  name: string,  // Non-empty, max 100 chars
  description?: string,  // Optional, max 500 chars
  displayOrder: number,  // Min 0, max 1000
  display_order?: number  // Optional, min 0, max 1000
}
```
**Response:** CategoryDto

#### POST /admin/catalog
**Description:** Create a new master SKU
**Roles Required:** ADMIN
**Body:** CreateMasterSkuDto
```typescript
{
  skuCode: string,  // Non-empty, max 80 chars
  categoryId: string,  // UUID
  name: string,  // Non-empty, max 255 chars
  genericName: string,  // Non-empty, max 255 chars
  activeIngredient: string,  // Non-empty, max 500 chars
  manufacturer: string,  // Non-empty, max 255 chars
  dosageForm: string,  // Non-empty, max 100 chars
  strength?: string,  // Optional, max 100 chars
  unitOfMeasure: string,  // Non-empty, max 50 chars
  packageSize?: number,  // Optional, min 1
  description?: string,  // Optional, max 2000 chars
  requiresColdChain?: boolean,
  requiresPrescription?: boolean,
  nafdacRegNo?: string  // Optional, max 100 chars
}
```
**Response:** MasterSkuDto

#### PATCH /admin/catalog/:id
**Description:** Update master SKU
**Roles Required:** ADMIN
**Params:** id (UUID)
**Body:** UpdateMasterSkuDto
```typescript
{
  categoryId?: string,  // UUID
  name?: string,  // Max 255 chars
  genericName?: string,  // Max 255 chars
  activeIngredient?: string,  // Max 500 chars
  manufacturer?: string,  // Max 255 chars
  dosageForm?: string,  // Max 100 chars
  strength?: string,  // Max 100 chars
  unitOfMeasure?: string,  // Max 50 chars
  packageSize?: number,  // Min 1
  description?: string,  // Max 2000 chars
  requiresColdChain?: boolean,
  requiresPrescription?: boolean,
  nafdacRegNo?: string,  // Max 100 chars
  skuCode?: string
}
```
**Response:** MasterSkuDto

#### DELETE /admin/catalog/:id
**Description:** Soft delete master SKU
**Roles Required:** ADMIN
**Params:** id (UUID)
**Response:** 200 OK

#### GET /admin/catalog
**Description:** List admin catalog with filtering
**Roles Required:** ADMIN
**Query:** AdminCatalogFilterDto
```typescript
{
  categoryId?: string,  // UUID
  isActive?: boolean,
  requiresColdChain?: boolean,
  cursor?: string,  // UUID
  limit?: number  // Default 20, min 1, max 100
}
```
**Response:** AdminCatalogResponseDto

### Public Catalog Endpoints

#### GET /catalog/categories
**Description:** List active categories
**Public:** Yes
**Response:** CategoryDto[]

#### GET /catalog
**Description:** Public catalog listing
**Public:** Yes
**Query:** PublicCatalogFilterDto
```typescript
{
  q?: string,  // Optional, max 200 chars (search query)
  categoryId?: string,  // UUID
  category_id?: string,  // UUID (snake_case variant)
  requiresColdChain?: boolean,
  requires_cold_chain?: boolean,  // snake_case variant
  inStock?: boolean,
  in_stock?: boolean,  // snake_case variant
  priceMin?: number,  // Min 0
  price_min?: number,  // snake_case variant, min 0
  priceMax?: number,  // Min 0
  price_max?: number,  // snake_case variant, min 0
  sortBy?: CatalogSortBy,  // enum: price_asc | price_desc | name_asc | newest (default newest)
  cursor?: string,
  limit?: number  // Default 20, min 1, max 100
}
```
**Response:** PublicCatalogResponseDto

#### GET /catalog/:id
**Description:** Get catalog item details
**Public:** Yes
**Params:** id (UUID)
**Response:** CatalogDetailDto

---

## Compliance Endpoints

### Admin Compliance Endpoints

#### GET /admin/compliance/incidents
**Description:** List compliance incidents
**Roles Required:** ADMIN
**Query:** ComplianceIncidentsQueryDto
**Response:** ComplianceIncidentListResponseDto

#### PATCH /admin/compliance/incidents/:id/resolve
**Description:** Resolve a compliance incident
**Roles Required:** ADMIN
**Params:** id (UUID)
**Body:** ResolveComplianceIncidentDto
```typescript
{
  resolutionNotes: string  // Max 1000 chars
}
```
**Response:** ComplianceIncidentDto
```typescript
{
  id: string,
  incidentType: ComplianceIncidentType,  // enum
  entityType: string,
  entityId: string,
  description: string,
  severity: ComplianceSeverity,  // enum
  createdAt: string,
  resolvedAt: string | null,
  resolvedBy: string | null,
  resolutionNotes: string | null,
  context: Record<string, unknown>
}
```

#### GET /admin/compliance/expiry-report
**Description:** Get expiry compliance report
**Roles Required:** ADMIN
**Query:** ExpiryReportQueryDto
```typescript
{
  fromDate?: string,  // ISO-8601 date
  toDate?: string  // ISO-8601 date
}
```
**Response:** ExpiryReportDto
```typescript
{
  supplierId: string,
  supplierName: string,
  categoryName: string,
  offersCount: number
}[]
```

#### POST /admin/compliance/expiry-sweep/trigger
**Description:** Trigger expiry sweep job
**Roles Required:** ADMIN
**Response:** Job ID

### Vet Prescription Endpoints

#### POST /vet/prescriptions
**Description:** Upload a prescription
**Roles Required:** VET
**Body:** UploadPrescriptionDto
```typescript
{
  orderId?: string  // Optional UUID
}
```
**Response:** PrescriptionDto
```typescript
{
  id: string,
  orderId: string | null,
  mimeType: string,
  uploadedAt: string,  // ISO-8601 timestamp
  validUntil: string,  // ISO-8601 timestamp
  documentUrl: string,
  isExpired: boolean
}
```

#### GET /vet/prescriptions
**Description:** List prescriptions
**Roles Required:** VET
**Query:** ListPrescriptionsQueryDto
```typescript
{
  includeExpired?: boolean
}
```
**Response:** PrescriptionListResponseDto

#### DELETE /vet/prescriptions/:prescriptionId
**Description:** Delete a prescription
**Roles Required:** VET
**Params:** prescriptionId (UUID)
**Response:** 204 No Content

---

## Entity Endpoints

### Admin Oversight Endpoints

#### GET /admin/oversight/clinics
**Description:** List clinics for oversight
**Roles Required:** ADMIN
**Query:** OversightFilterDto
```typescript
{
  cursor?: string,  // UUID
  limit?: number,  // Default 20, min 1, max 100
  status?: EntityLifecycleStatus,  // enum: pending | active | rejected
  regionId?: string  // UUID
}
```
**Response:** ClinicListResponseDto

#### GET /admin/oversight/suppliers
**Description:** List suppliers for oversight
**Roles Required:** ADMIN
**Query:** OversightFilterDto
**Response:** SupplierListResponseDto

#### PATCH /admin/oversight/verify/:entityType/:id
**Description:** Verify entity (clinic or supplier)
**Roles Required:** ADMIN
**Params:** entityType (CLINIC|SUPPLIER), id (UUID)
**Body:** VerifyEntityDto
```typescript
{
  action: VerificationAction,  // enum: approve | reject
  notes?: string  // Optional, non-empty
}
```
**Response:** Verification status

### Regions Endpoints

#### GET /regions
**Description:** List regions
**Public:** Yes
**Query:** cursor, limit
**Response:** RegionListResponseDto

#### POST /admin/regions
**Description:** Create a new region
**Roles Required:** ADMIN
**Body:** CreateRegionDto
```typescript
{
  name: string,  // Non-empty
  defaultDeliveryFee: number,  // Min 0
  boundsPolygon?: PolygonPointDto[]  // Optional array of {lat, lng} points
}
```

**PolygonPointDto:**
```typescript
{
  lat: number,  // Latitude
  lng: number  // Longitude
}
```

**Response:** RegionDto

#### PATCH /admin/regions/:id
**Description:** Update region
**Roles Required:** ADMIN
**Params:** id (UUID)
**Body:** UpdateRegionDto
```typescript
{
  deliveryFeePerKm?: number,  // Optional, min 0
  isActive?: boolean,
  boundsPolygon?: PolygonPointDto[]  // Optional array of {lat, lng} points
}
```
**Response:** RegionDto

### Profile Endpoints

#### GET /supplier/profile
**Description:** Get supplier profile
**Roles Required:** SUPPLIER
**Response:** SupplierProfileDto

#### PATCH /supplier/profile
**Description:** Update supplier profile
**Roles Required:** SUPPLIER
**Body:** UpdateSupplierProfileDto
```typescript
{
  name?: string,  // Optional, non-empty
  phone?: string,  // Optional, non-empty
  address?: string,  // Optional, non-empty
  workingHours?: string,  // Optional, non-empty
  lat?: number,  // Optional, latitude
  lng?: number  // Optional, longitude
}
```
**Response:** SupplierProfileDto

#### GET /vet/profile
**Description:** Get vet profile
**Roles Required:** VET
**Response:** VetProfileDto

#### PATCH /vet/profile
**Description:** Update vet profile
**Roles Required:** VET
**Body:** UpdateVetProfileDto
```typescript
{
  name?: string,  // Optional, non-empty
  phone?: string,  // Optional, non-empty
  address?: string,  // Optional, non-empty
  deliveryTimeWindow?: string,  // Optional, non-empty
  lat?: number,  // Optional, latitude
  lng?: number  // Optional, longitude
}
```
**Response:** VetProfileDto

---

## Health Endpoints

### GET /health
**Description:** Health check endpoint
**Public:** Yes
**Response:** HealthCheckResult

---

## Logistics Endpoints

### Admin Logistics Endpoints

#### GET /admin/logistics/manifests
**Description:** List logistics manifests
**Roles Required:** ADMIN
**Query:** LogisticsManifestQueryDto
```typescript
{
  manifestDate?: string,  // ISO-8601 date
  regionId?: string,  // UUID
  status?: RouteManifestStatusDto,  // enum: PENDING | ASSIGNED | IN_PROGRESS | COMPLETED | CANCELLED
  limit?: number  // Default 20, min 1, max 100
}
```
**Response:** ManifestListResponseDto
```typescript
{
  data: LogisticsManifestListItemDto[]
}
```

**LogisticsManifestListItemDto:**
```typescript
{
  id: string,
  routeDate: string,
  status: string,
  riderId: string | null,
  riderName: string | null,
  estimatedDistanceKm: number | null,
  estimatedDurationMinutes: number | null,
  stopsCount: number,
  deliveryOrdersCount: number,
  createdAt: string
}
```

#### POST /admin/logistics/rerun
**Description:** Rerun logistics optimization
**Roles Required:** ADMIN
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

#### POST /admin/logistics/optimize-now
**Description:** Trigger immediate optimization
**Roles Required:** ADMIN
**Body:** TriggerRouteOptimizationDto
**Response:** Optimization result

### Vet Logistics Endpoints

#### GET /vet/logistics/orders/:orderId/eta
**Description:** Get order ETA
**Roles Required:** VET
**Params:** orderId (UUID)
**Guards:** OrderOwnershipGuard
**Response:** EtaResponseDto (VetOrderEtaDto)
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

## Me Endpoints

### GET /me/dashboard-layout
**Description:** Get dashboard layout (stub)
**Public:** Yes
**Query:** role
**Response:** { version, widgets }

### PATCH /me/dashboard-layout
**Description:** Save dashboard layout (stub)
**Public:** Yes
**Body:** layout data
**Response:** 204 No Content
