# API Gateway Service Endpoints Documentation - Part 3: Operations & Delivery

This document contains operations and delivery endpoints for the API Gateway service.

**Related Documents:**
- [Part 1: User Management](./api-gateway-service-endpoints-part1.md)
- [Part 2: Business Operations](./api-gateway-service-endpoints-part2.md)

---

## Table of Contents

- [Notifications Endpoints](#notifications-endpoints)
- [Offers Endpoints](#offers-endpoints)
- [Payments Endpoints](#payments-endpoints)
- [Procurement Endpoints](#procurement-endpoints)
- [Queue Admin Endpoints](#queue-admin-endpoints)
- [Rider Endpoints](#rider-endpoints)
- [Common DTOs](#common-dtos)

---

## Notifications Endpoints

### GET /notifications
**Description:** List notifications
**Roles Required:** VET, SUPPLIER, RIDER
**Query:** ListNotificationsQueryDto
```typescript
{
  isRead?: boolean,
  cursor?: string,
  limit?: number
}
```
**Response:** NotificationListResponseDto

### GET /notifications/unread-count
**Description:** Get unread notification count
**Roles Required:** VET, SUPPLIER, RIDER
**Response:** { count }

### PATCH /notifications/:id/read
**Description:** Mark notification as read
**Roles Required:** VET, SUPPLIER, RIDER
**Params:** id (UUID)
**Response:** NotificationDto

### PATCH /notifications/read-all
**Description:** Mark all notifications as read
**Roles Required:** VET, SUPPLIER, RIDER
**Response:** { count }

### GET /notifications/preferences
**Description:** Get notification preferences
**Roles Required:** VET, SUPPLIER, RIDER
**Response:** NotificationPreferenceDto[]

### PATCH /notifications/preferences
**Description:** Update notification preferences
**Roles Required:** VET, SUPPLIER, RIDER
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

**Response:** NotificationPreferenceDto[]

### PATCH /notifications/preferences/direct
**Description:** Update preferences directly
**Roles Required:** VET, SUPPLIER, RIDER
**Body:** NotificationPreferenceDto[]
```typescript
{
  notificationType: NotificationTypeEnum,  // enum
  isEnabled: boolean
}[]
```
**Response:** NotificationPreferenceDto[]

---

## Offers Endpoints

### Market Endpoints

#### GET /market/range/:masterSkuId
**Description:** Get market price range for a product
**Public:** Yes
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

### Price Comparison Endpoints

#### GET /catalog/compare
**Description:** Compare basket of products
**Roles Required:** VET
**Query:** skuIds (comma-separated UUIDs)
**Response:** PriceComparisonDto (BasketPriceComparisonResponseDto)
```typescript
{
  products: PriceComparisonResponseDto[],
  supplierCoverageMatrix: SupplierCoverageMatrixDto[],
  cheapestMixAndMatch: CheapestMixAndMatchDto,
  singleSupplierBest: SingleSupplierBestDto[]
}
```

#### GET /catalog/:id/compare
**Description:** Compare single product
**Roles Required:** VET
**Params:** id (UUID)
**Response:** PriceComparisonDto

### Supplier Offers Endpoints

#### GET /supplier/offers
**Description:** List supplier offers
**Roles Required:** SUPPLIER
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

#### POST /supplier/offers
**Description:** Create supplier offer
**Roles Required:** SUPPLIER
**Guards:** KycApprovedGuard
**Body:** OfferCreateDto
```typescript
{
  masterSkuId: string,  // UUID
  price: number,  // Min 0.01
  stockQuantity: number,  // Min 0, integer
  batchNumber: string,  // Max 100 chars
  expiryDate: string,  // ISO-8601 date
  minOrderQty: number  // Min 1, integer
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

#### PATCH /supplier/offers/:offerId
**Description:** Update supplier offer
**Roles Required:** SUPPLIER
**Guards:** OfferOwnershipGuard, KycApprovedGuard
**Params:** offerId (UUID)
**Body:** OfferUpdateDto
```typescript
{
  price?: number,  // Min 0.01
  stockQuantity?: number,  // Min 0, integer
  isActive?: boolean,
  currentVersion?: number,  // Min 1, integer
  supplierId?: string,
  skuCode?: string,
  masterSkuId?: string
}
```
**Response:** OfferDto

#### DELETE /supplier/offers/:offerId
**Description:** Delete supplier offer
**Roles Required:** SUPPLIER
**Guards:** OfferOwnershipGuard, KycApprovedGuard
**Params:** offerId (UUID)
**Response:** OfferDto

---

## Payments Endpoints

### Admin Finance Endpoints

#### GET /admin/finance/tpv
**Description:** Get financial report (TPV)
**Roles Required:** ADMIN
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

#### POST /admin/finance/payout/:supplierId
**Description:** Manual payout to supplier
**Roles Required:** ADMIN
**Params:** supplierId (UUID)
**Response:** PayoutStatusDto

### Payments Endpoints

#### POST /payments/initialize
**Description:** Initialize payment
**Roles Required:** VET
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

#### GET /payments/:paymentId/verify
**Description:** Verify payment status
**Roles Required:** VET
**Params:** paymentId (UUID)
**Query:** VerifyPaymentQueryDto
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

### Webhook Endpoints

#### POST /webhooks/paystack
**Description:** Paystack webhook handler
**Public:** Yes
**Headers:** X-Paystack-Signature
**Body:** Webhook payload
**Response:** { ok: true }

### Supplier Wallet Endpoints

#### GET /supplier/wallet
**Description:** Get supplier wallet balance
**Roles Required:** SUPPLIER
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

---

## Procurement Endpoints

### POST /vet/procurement/draft
**Description:** Create or update draft cart
**Roles Required:** VET
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

### GET /vet/procurement/draft
**Description:** Get draft cart
**Roles Required:** VET
**Response:** DraftCartDto

### DELETE /vet/procurement/draft
**Description:** Clear draft cart
**Roles Required:** VET
**Response:** 204 No Content

### POST /vet/procurement
**Description:** Submit draft as order
**Roles Required:** VET
**Response:** OrderDto

### GET /vet/orders
**Description:** List vet orders
**Roles Required:** VET
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

### GET /vet/orders/:orderId
**Description:** Get order details
**Roles Required:** VET
**Guards:** OrderOwnershipGuard
**Params:** orderId (UUID)
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

### PATCH /vet/orders/:orderId/cancel
**Description:** Cancel order
**Roles Required:** VET
**Guards:** OrderOwnershipGuard
**Params:** orderId (UUID)
**Body:** CancelOrderDto
```typescript
{
  reason?: string  // Optional, max 500 chars
}
```
**Response:** OrderDto

---

## Queue Admin Endpoints

### GET /admin/queues/dlq
**Description:** List dead letter queue jobs
**Roles Required:** ADMIN
**Query:**
```typescript
{
  limit?: number,
  offset?: number
}
```
**Response:** DlqJobListResponseDto
```typescript
{
  data: DlqJobDto[]
}
```

**DlqJobDto:**
```typescript
{
  jobId: string,
  queueName: string,
  notificationType?: NotificationTypeEnum,  // enum
  recipientUserId?: string,  // UUID
  failedReason: string,
  attemptCount: string,
  lastFailedAt?: string  // ISO-8601 timestamp
}
```

### PATCH /admin/queues/dlq/:jobId/retry
**Description:** Retry a dead letter queue job
**Roles Required:** ADMIN
**Params:** jobId
**Response:** RetryResultDto

### POST /admin/queues/dlq/:queueName/retry-all
**Description:** Retry all DLQ jobs for a queue
**Roles Required:** ADMIN
**Params:** queueName
**Query:** cap
**Response:** BatchRetryResultDto

---

## Rider Endpoints

### PATCH /rider/status
**Description:** Update rider availability status
**Roles Required:** RIDER
**Body:** UpdateRiderStatusDto
```typescript
{
  status: RiderAvailabilityStatus  // enum: online | offline
}
```
**Response:** RiderStatusDto

### GET /rider/profile
**Description:** Get rider profile
**Roles Required:** RIDER
**Response:** RiderProfileDto
```typescript
{
  riderId: string,
  riderUserId: string,
  email: string,
  status: string,
  availabilityStatus: RiderAvailabilityStatus,  // enum: online | offline
  lastOnlineAt: string | null,
  vehicleType: string | null,
  hasColdStorage: boolean,
  totalDeliveries: number,
  rating: number,
  todayManifestSummary: {
    manifestId: string | null,
    status: string | null,
    totalStops: number,
    completedStops: number
  }
}
```

### GET /rider/manifest/today
**Description:** Get today's manifest for rider
**Roles Required:** RIDER
**Response:** RiderManifestDto

### POST /rider/stops/:stopId/arrive
**Description:** Mark stop as arrived
**Roles Required:** RIDER
**Guards:** RiderStopOwnershipGuard
**Params:** stopId (UUID)
**Response:** StopStatusDto

### POST /rider/stops/:stopId/pickup-confirm
**Description:** Confirm pickup at stop
**Roles Required:** RIDER
**Guards:** RiderStopOwnershipGuard
**Params:** stopId (UUID)
**Body:** ConfirmPickupDto
```typescript
{
  submittedCode: string  // 4-10 chars
}
```
**Response:** PickupConfirmationDto (StopExecutionResponseDto)
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

### POST /rider/stops/:stopId/delivery-confirm
**Description:** Confirm delivery at stop
**Roles Required:** RIDER
**Guards:** RiderStopOwnershipGuard
**Params:** stopId (UUID)
**Body:** ConfirmDeliveryDto
```typescript
{
  submittedCode: string  // 4-10 chars
}
```
**Response:** DeliveryConfirmationDto (StopExecutionResponseDto)
```typescript
{
  idempotent: boolean,
  stop: RouteStopDto
}
```

### POST /rider/location
**Description:** Ping rider location
**Roles Required:** RIDER
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

---

## Common DTOs

### AuthenticatedUser
- id: string (UUID)
- email: string
- role: UserRole
- permissions: string[]

### UserRole Enum
- ADMIN
- VET
- SUPPLIER
- RIDER

### Common Query Parameters
- cursor: string (pagination cursor)
- limit: number (default 20, max 100)
- offset: number (for offset-based pagination)

### Error Codes
All endpoints may return standard error responses:
- 400 Bad Request - Invalid input
- 401 Unauthorized - Authentication required
- 403 Forbidden - Insufficient permissions
- 404 Not Found - Resource not found
- 429 Too Many Requests - Rate limited
- 500 Internal Server Error - Server error
