# Marketplace Service Endpoints Documentation

This document contains all endpoints for the Marketplace service, which handles catalog, offers, orders, payments, and compliance.

---

## Table of Contents

- [Catalog Endpoints](#catalog-endpoints)
- [Compliance Endpoints](#compliance-endpoints)
- [Health Endpoints](#health-endpoints)
- [Offers Endpoints](#offers-endpoints)
- [Orders Endpoints](#orders-endpoints)
- [Payments Endpoints](#payments-endpoints)

---

## Catalog Endpoints

### GET /internal/catalog/categories
**Description:** List active categories
**Response:** CategoryDto[]

### POST /internal/catalog/categories
**Description:** Create a new category
**Body:** CreateCategoryInternalDto (includes ActorContextDto)
```typescript
{
  name: string,  // Non-empty, max 100 chars
  description?: string,  // Optional, max 500 chars
  displayOrder: number,  // Min 0, max 1000
  actor: ActorContextDto
}
```

**ActorContextDto:**
```typescript
{
  actorUserId: string,  // UUID
  ipAddress?: string,
  userAgent?: string,
  requestId?: string
}
```

**Response:** CategoryDto

### POST /internal/catalog/sku
**Description:** Create a new master SKU
**Body:** CreateMasterSkuInternalDto (includes ActorContextDto, optional ImageUploadDto)
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
  nafdacRegNo?: string,  // Optional, max 100 chars
  actor: ActorContextDto,
  image?: ImageUploadDto  // Optional
}
```

**ImageUploadDto:**
```typescript
{
  fileName: string,  // Max 255 chars
  mimeType: string,  // Max 100 chars
  size: number,  // 1-5MB
  base64: string  // Base64 encoded image
}
```

**Response:** MasterSkuDto

### PATCH /internal/catalog/sku/:id
**Description:** Update master SKU
**Params:** id
**Body:** UpdateMasterSkuInternalDto (includes ActorContextDto, optional ImageUploadDto)
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
  skuCode?: string,
  actor: ActorContextDto,
  image?: ImageUploadDto  // Optional
}
```
**Response:** MasterSkuDto

### DELETE /internal/catalog/sku/:id
**Description:** Soft delete master SKU
**Params:** id
**Body:** ActorContextDto
**Response:** 200 OK

### GET /internal/catalog/admin/sku
**Description:** List admin SKUs with filtering
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
**Response:** AdminSkuListResponseDto

### GET /internal/catalog
**Description:** Public catalog listing
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

### GET /internal/catalog/:id
**Description:** Get catalog item details
**Params:** id
**Response:** CatalogDetailDto

---

## Compliance Endpoints

### POST /internal/compliance/prescriptions/:userId
**Description:** Upload a prescription
**Params:** userId (UUID)
**Body:** UploadPrescriptionInternalDto (includes PrescriptionFileDto)
```typescript
{
  orderId?: string,  // Optional UUID
  file: PrescriptionFileDto
}
```

**PrescriptionFileDto:**
```typescript
{
  fileName: string,  // Max 255 chars
  mimeType: string,  // Max 100 chars
  size: number,  // 1-10MB
  base64: string  // Base64 encoded file
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

### GET /internal/compliance/prescriptions/:userId
**Description:** List prescriptions
**Params:** userId (UUID)
**Query:** ListPrescriptionsQueryDto
```typescript
{
  includeExpired?: boolean
}
```
**Response:** PrescriptionListResponseDto

### GET /internal/compliance/prescriptions/:userId/:prescriptionId/ownership
**Description:** Check prescription ownership
**Params:** userId, prescriptionId (UUIDs)
**Response:** { owns: boolean }

### DELETE /internal/compliance/prescriptions/:userId/:prescriptionId
**Description:** Delete prescription
**Params:** userId, prescriptionId (UUIDs)
**Response:** 204 No Content

### GET /internal/compliance/incidents
**Description:** List compliance incidents
**Query:** ComplianceIncidentsQueryDto
**Response:** ComplianceIncidentListResponseDto

### PATCH /internal/compliance/incidents/:id/resolve
**Description:** Resolve compliance incident
**Params:** id (UUID)
**Body:** ResolveComplianceIncidentDto & { actor: ActorContextDto }
```typescript
{
  resolutionNotes: string,  // Max 1000 chars
  actor: ActorContextDto
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

### GET /internal/compliance/expiry-report
**Description:** Get expiry report
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

### POST /internal/compliance/sweep
**Description:** Enqueue manual expiry sweep
**Response:** { jobId }

### POST /internal/compliance/sweep/run
**Description:** Run expiry sweep immediately
**Query:** fromQueue (boolean)
**Response:** Sweep result

---

## Health Endpoints

### GET /health
**Description:** Health check
**Response:** HealthCheckResult
- Checks: database, memory-heap, memory-rss

---

## Offers Endpoints

### GET /internal/offers/supplier/:userId
**Description:** List supplier offers
**Params:** userId (UUID)
**Query:** OfferListQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string,
  isActive?: boolean,
  masterSkuId?: string  // UUID
}
```
**Response:** OfferListResponseDto

### POST /internal/offers/supplier/:userId
**Description:** Create supplier offer
**Params:** userId (UUID)
**Body:** OfferCreateInternalDto (includes ActorContextDto)
```typescript
{
  masterSkuId: string,  // UUID
  price: number,  // Min 0.01
  stockQuantity: number,  // Min 0, integer
  batchNumber: string,  // Max 100 chars
  expiryDate: string,  // ISO-8601 date
  minOrderQty: number,  // Min 1, integer
  actor: ActorContextDto
}
```
**Response:** OfferDto
```typescript
{
  id: string,
  supplierId: string,
  supplierName: string,
  supplierRegion: string,
  masterSkuId: string,
  masterSkuName: string,
  categoryName: string,
  unitPrice: number,
  stockQuantity: number,
  batchNumber: string | null,
  expiryDate: string | null,
  daysUntilExpiry: number | null,
  minOrderQty: number,
  requiresColdChain: boolean,
  expiryWarning: boolean,
  outOfStock: boolean,
  pricePosition: PricePosition,  // enum: Lowest | Average | Premium
  isActive: boolean,
  version: number,
  createdAt: string,
  updatedAt: string
}
```

### PATCH /internal/offers/supplier/:userId/:offerId
**Description:** Update supplier offer
**Params:** userId, offerId (UUIDs)
**Body:** OfferUpdateInternalDto (includes ActorContextDto)
```typescript
{
  price?: number,  // Min 0.01
  stockQuantity?: number,  // Min 0, integer
  isActive?: boolean,
  currentVersion?: number,  // Min 1, integer
  supplierId?: string,
  skuCode?: string,
  masterSkuId?: string,
  actor: ActorContextDto
}
```
**Response:** OfferDto

### DELETE /internal/offers/supplier/:userId/:offerId
**Description:** Soft delete supplier offer
**Params:** userId, offerId (UUIDs)
**Body:** ActorContextDto
**Response:** 200 OK

### GET /internal/offers/ownership/:offerId/:userId
**Description:** Check offer ownership
**Params:** offerId, userId (UUIDs)
**Response:** { owns: boolean }

### GET /internal/offers/market/range/:masterSkuId
**Description:** Get market price range
**Params:** masterSkuId (UUID)
**Response:** MarketRangeDto (PriceRangeSummaryDto)
```typescript
{
  lowest: number | null,
  average: number | null,
  highest: number | null,
  offerCount: number
}
```

### GET /internal/offers/compare/:masterSkuId
**Description:** Compare single product
**Params:** masterSkuId (UUID)
**Response:** PriceComparisonDto (PriceComparisonResponseDto)
```typescript
{
  masterSkuId: string,
  masterSkuName: string,
  requiresColdChain: boolean,
  priceRange: PriceRangeSummaryDto,
  offers: OfferResponseDto[]
}
```

### GET /internal/offers/compare
**Description:** Compare basket of products
**Query:** skuIds (comma-separated UUIDs via ParseSkuIdsPipe)
**Response:** PriceComparisonDto (BasketPriceComparisonResponseDto)
```typescript
{
  products: PriceComparisonResponseDto[],
  supplierCoverageMatrix: SupplierCoverageMatrixDto[],
  cheapestMixAndMatch: CheapestMixAndMatchDto,
  singleSupplierBest: SingleSupplierBestDto[]
}
```

---

## Orders Endpoints

### POST /internal/procurement/draft/:userId
**Description:** Create or update draft cart
**Params:** userId (UUID)
**Body:** UpsertDraftCartDto
```typescript
{
  items: CartItemDto[]
}
```

**CartItemDto:**
```typescript
{
  offerId: string,  // UUID
  quantity: number  // Min 1, integer
}
```

**Response:** DraftCartDto
```typescript
{
  orderId: string,
  clinicId: string,
  status: OrderStatus,  // enum
  requiresColdChain: boolean,
  deliveryFee: DeliveryFeeBreakdownDto,
  supplierGroups: DraftSupplierGroupDto[],
  totalAmount: number,
  updatedAt: string
}
```

**DeliveryFeeBreakdownDto:**
```typescript
{
  baseFee: number,
  coldChainSurcharge: number,
  distanceSurcharge: number,
  consolidatedTotal: number
}
```

**DraftSupplierGroupDto:**
```typescript
{
  supplierId: string,
  supplierName: string,
  subtotal: number,
  items: DraftCartItemDetailDto[]
}
```

**DraftCartItemDetailDto:**
```typescript
{
  offerId: string,
  masterSkuId: string,
  productName: string,
  supplierId: string,
  supplierName: string,
  quantity: number,
  unitPrice: number,
  lineSubtotal: number,
  requiresColdChain: boolean
}
```

### GET /internal/procurement/draft/:userId
**Description:** Get draft cart
**Params:** userId (UUID)
**Response:** DraftCartDto

### DELETE /internal/procurement/draft/:userId
**Description:** Clear draft cart
**Params:** userId (UUID)
**Response:** 204 No Content

### POST /internal/procurement/submit/:userId
**Description:** Submit draft as order
**Params:** userId (UUID)
**Response:** OrderDto

### GET /internal/procurement/orders/:userId
**Description:** List vet orders
**Params:** userId (UUID)
**Query:** VetOrderListQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string,
  includeDraft?: boolean,
  status?: OrderStatus,  // enum
  fromDate?: string,  // ISO-8601 date
  toDate?: string  // ISO-8601 date
}
```
**Response:** OrderListResponseDto
```typescript
{
  data: OrderListItemDto[],
  meta: {
    nextCursor: string | null,
    hasNextPage: boolean
  }
}
```

**OrderListItemDto:**
```typescript
{
  id: string,
  orderNumber: string | null,
  status: OrderStatus,  // enum
  totalAmount: number,
  requiresColdChain: boolean,
  submittedAt: string | null,
  supplierCount: number,
  createdAt: string
}
```

### GET /internal/procurement/orders/:userId/:orderId
**Description:** Get order details
**Params:** userId, orderId (UUIDs)
**Response:** OrderDetailDto
```typescript
{
  id: string,
  orderNumber: string,
  clinicId: string,
  status: OrderStatus,  // enum
  requiresColdChain: boolean,
  deliveryCode: string,
  deliveryFee: DeliveryFeeBreakdownDto,
  totalAmount: number,
  submittedAt: string,
  cutoffBatchDate: string,
  supplierCount: number,
  itemCount: number,
  logistics?: {
    manifestId: string,
    riderId: string | null,
    riderName: string | null,
    stopSequence: number,
    manifestStatus: string,
    estimatedArrival: string | null
  } | null,
  subOrders: SubOrderDto[]
}
```

**SubOrderDto:**
```typescript
{
  id: string,
  supplierId: string,
  supplierName: string,
  status: SubOrderStatus,  // enum
  pickupCode: string,
  subtotalAmount: number,
  itemCount: number,
  items: OrderItemDto[]
}
```

**OrderItemDto:**
```typescript
{
  id: string,
  offerId: string,
  masterSkuId: string,
  productName: string,
  quantity: number,
  unitPrice: number,
  lineTotal: number,
  requiresColdChain: boolean,
  batchNumber: string | null,
  expiryDate: string | null
}
```

### GET /internal/procurement/orders/:userId/:orderId/ownership
**Description:** Check order ownership
**Params:** userId, orderId (UUIDs)
**Response:** { owns: boolean }

### PATCH /internal/procurement/orders/:userId/:orderId/cancel
**Description:** Cancel order
**Params:** userId, orderId (UUIDs)
**Body:** CancelOrderInternalDto (includes ActorContextDto)
```typescript
{
  reason?: string,  // Optional, max 500 chars
  actor: ActorContextDto
}
```
**Response:** OrderDto

---

## Payments Endpoints

### POST /internal/payments/initialize/:userId
**Description:** Initialize payment
**Params:** userId (UUID)
**Body:** InitializePaymentDto
```typescript
{
  orderId: string  // UUID
}
```
**Response:** PaymentInitializationDto
```typescript
{
  paymentId: string,
  reference: string,
  authorizationUrl: string,
  status: PaymentStatus,  // enum
  amount: MoneyDisplayDto
}
```

**MoneyDisplayDto:**
```typescript
{
  kobo: string,
  naira: string
}
```

### POST /internal/payments/webhooks/paystack
**Description:** Paystack webhook handler
**Body:** Record<string, unknown>
**Response:** { received: true }

### GET /internal/payments/verify/:userId/:paymentId
**Description:** Verify payment status
**Params:** userId, paymentId (UUIDs)
**Query:** source (optional)
```typescript
{
  source?: 'callback' | 'manual'
}
```
**Response:** PaymentVerificationDto
```typescript
{
  paymentId: string,
  orderId: string,
  paystackReference: string,
  paymentStatus: PaymentStatus,  // enum
  orderStatus: OrderStatus,  // enum
  amount: MoneyDisplayDto,
  paidAt: string | null
}
```

### POST /internal/payments/settlements/trigger/:orderId/:subOrderId
**Description:** Trigger settlement for delivered sub-order
**Params:** orderId, subOrderId (UUIDs)
**Response:** SettlementStatusDto

### GET /internal/payments/wallet/:userId
**Description:** Get supplier wallet balance
**Params:** userId (UUID)
**Query:** SupplierWalletQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string
}
```
**Response:** SupplierWalletDto (WalletSummaryDto)
```typescript
{
  supplierId: string,
  totalEarned: MoneyDisplayDto,
  pendingPayout: MoneyDisplayDto,
  totalOrdersFulfilled: number,
  settlements: SettlementListItemDto[],
  nextCursor: string | null,
  hasNextPage: boolean
}
```

**SettlementListItemDto:**
```typescript
{
  settlementId: string,
  orderId: string,
  orderNumber: string,
  status: SettlementStatus,  // enum
  grossAmount: MoneyDisplayDto,
  commissionAmount: MoneyDisplayDto,
  netAmount: MoneyDisplayDto,
  settledAt: string | null,
  createdAt: string
}
```

### GET /internal/payments/reports/financial
**Description:** Get financial report
**Query:** FinancialReportQueryDto
```typescript
{
  fromDate?: string,  // ISO-8601 date
  toDate?: string  // ISO-8601 date
}
```
**Response:** FinancialReportDto
```typescript
{
  fromDate: string,
  toDate: string,
  regions: RegionFinancialReportDto[],
  totals: {
    orderCount: number,
    gmv: MoneyDisplayDto,
    totalCommission: MoneyDisplayDto,
    totalDeliveryFees: MoneyDisplayDto,
    netPayableToSuppliers: MoneyDisplayDto
  }
}
```

---

## Common DTOs

### ActorContextDto
Used for audit trail in internal endpoints:
- actorUserId: string (UUID)
- ipAddress?: string
- userAgent?: string

### ImageUploadDto
For catalog image uploads:
- fileName: string (max 255 chars)
- mimeType: string (max 100 chars)
- size: number (1-5MB)
- base64: string (base64 encoded image)

### PrescriptionFileDto
For prescription file uploads:
- fileName: string (max 255 chars)
- mimeType: string (max 100 chars)
- size: number (1-10MB)
- base64: string (base64 encoded file)

### Common Query Parameters
- cursor: string (pagination cursor)
- limit: number (default 20, max 100)
- page: number (for page-based pagination)
- includeExpired: boolean (for prescription lists)
- fromDate: string (ISO date for reports)
- toDate: string (ISO date for reports)
- skuIds: string (comma-separated UUIDs via ParseSkuIdsPipe)
