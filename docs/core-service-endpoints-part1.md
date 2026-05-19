# Core Service Endpoints Documentation - Part 1: Admin & Core

This document contains admin and core endpoints for the Core service.

**Related Documents:**
- [Part 2: Herd & Operations](./core-service-endpoints-part2.md)

---

## Table of Contents

- [Admin Endpoints](#admin-endpoints)
- [Authentication Endpoints](#authentication-endpoints)
- [Entity Endpoints](#entity-endpoints)
- [Health Endpoints](#health-endpoints)

---

## Admin Endpoints

### GET /internal/admin/war-room/snapshot
**Description:** Get admin war room snapshot data
**Response:** AdminWarRoomSnapshotDto | null

### POST /internal/admin/war-room/snapshot/refresh
**Description:** Refresh war room snapshot
**Response:** AdminWarRoomSnapshotDto

### GET /internal/admin/orders
**Description:** List orders with filtering
**Query:** AdminOrderListQueryDto
**Response:** AdminOrderListResponseDto

### PATCH /internal/admin/orders/:orderId/status
**Description:** Update order status
**Params:** orderId (UUID)
**Body:** InternalOrderOverrideDto (includes ActorContextDto)
**Response:** { id, status, updatedAt }

### PATCH /internal/admin/orders/:orderId/notes
**Description:** Append notes to order
**Params:** orderId (UUID)
**Body:** InternalOrderNoteDto (includes ActorContextDto)
**Response:** { id, updatedAt }

### GET /internal/admin/users
**Description:** List users with filtering
**Query:** AdminUserListQueryDto
**Response:** AdminUserListResponseDto

### PATCH /internal/admin/users/:userId/deactivate
**Description:** Deactivate user
**Params:** userId (UUID)
**Body:** InternalUserDeactivateDto (includes ActorContextDto)
**Response:** { id, role, isActive, updatedAt }

### PATCH /internal/admin/users/:userId/reactivate
**Description:** Reactivate user
**Params:** userId (UUID)
**Body:** InternalUserReactivateDto (includes ActorContextDto)
**Response:** { id, role, isActive, updatedAt }

### POST /internal/admin/users
**Description:** Create admin user
**Body:** InternalCreateAdminDto (includes ActorContextDto)
**Response:** { id, email, role }

### GET /internal/admin/riders
**Description:** List riders
**Query:** AdminRiderListQueryDto
**Response:** AdminRiderListResponseDto

### PATCH /internal/admin/riders/:riderId/vehicle
**Description:** Update rider vehicle
**Params:** riderId (UUID)
**Body:** InternalRiderVehicleDto (includes ActorContextDto)
**Response:** { id, riderId, vehicleType, hasColdStorage }

### GET /internal/admin/audit-logs
**Description:** List audit logs
**Query:** AdminAuditLogQueryDto
**Response:** AdminAuditLogListResponseDto

### POST /internal/admin/broadcast
**Description:** Enqueue broadcast notification
**Body:** InternalBroadcastDto (includes ActorContextDto)
**Response:** AdminBroadcastEnqueueResponseDto

### POST /internal/admin/queues/audit
**Description:** Record queue admin audit
**Body:** InternalQueueAuditDto (includes ActorContextDto)
**Response:** { recorded: true }

---

## Authentication Endpoints

### POST /internal/auth/signup
**Description:** User signup
**Body:** SignupDto
**Response:** User data

### POST /internal/auth/verify-email
**Description:** Verify email
**Body:** VerifyEmailDto
**Response:** Verification status

### POST /internal/auth/resend-verification
**Description:** Resend verification email
**Body:** { userId }
**Response:** Status

### POST /internal/auth/roles/select
**Description:** Select user role
**Body:** InternalSelectRolesDto
**Response:** Status

### POST /internal/auth/onboarding/start
**Description:** Start onboarding
**Body:** StartOnboardingDto
**Response:** Onboarding data

### POST /internal/auth/onboarding/:id/submit
**Description:** Submit onboarding
**Params:** id
**Body:** SubmitOnboardingDto
**Response:** Status

### POST /internal/auth/referral/me
**Description:** Get referral info
**Body:** { userId }
**Response:** Referral data

### POST /internal/auth/login
**Description:** User login
**Body:** LoginDto
```typescript
{
  email: string,  // Valid email address
  password: string  // Non-empty password
}
```
**Response:** InternalAuthTokenResponseDto
```typescript
{
  accessToken: string,
  expiresIn: number,  // Seconds until token expires
  refreshToken: string,
  refreshExpiresIn: number,  // Seconds until refresh token expires
  user?: InternalAuthUserDto
}
```

**InternalAuthUserDto:**
```typescript
{
  id: string,
  email: string,
  firstName: string | null,
  lastName: string | null,
  roles: string[],
  isEmailVerified: boolean
}
```

### POST /internal/auth/refresh
**Description:** Refresh token
**Body:** RefreshTokenDto
```typescript
{
  refreshToken?: string  // Optional refresh token
}
```
**Response:** InternalAuthTokenResponseDto

### POST /internal/auth/logout
**Description:** User logout
**Body:**
```typescript
{
  userId: string,
  jti: string,
  familyId?: string  // Optional
}
```
**Response:** 204 No Content

### GET /internal/auth/me/:userId
**Description:** Get user profile
**Params:** userId
**Response:** User profile

### POST /internal/auth/register-clinic
**Description:** Register clinic
**Body:** RegisterClinicDto
```typescript
{
  email: string,  // Valid email address
  password: string,  // Strong password
  businessName: string,  // Non-empty
  phone: string,  // Non-empty
  vcnLicenseNumber: string,  // Non-empty
  address: string,  // Non-empty
  city: string,  // Non-empty
  regionId: string,  // UUID
  latitude: number,  // -90 to 90
  longitude: number  // -180 to 180
}
```
**Response:** Clinic data

### POST /internal/auth/register-supplier
**Description:** Register supplier
**Body:** RegisterSupplierDto
```typescript
{
  email: string,  // Valid email address
  password: string,  // Strong password
  businessName: string,  // Non-empty
  phone: string,  // Non-empty
  nafdacLicenseNumber: string,  // Non-empty
  address: string,  // Non-empty
  city: string,  // Non-empty
  regionId: string,  // UUID
  latitude: number,  // -90 to 90
  longitude: number  // -180 to 180
  workingHours?: string  // Optional
}
```
**Response:** Supplier data

### POST /internal/auth/forgot-password
**Description:** Request password reset
**Body:** ForgotPasswordDto
```typescript
{
  email: string  // Valid email address
}
```
**Response:** 202 Accepted

### POST /internal/auth/reset-password
**Description:** Reset password
**Body:** ResetPasswordDto
```typescript
{
  email: string,  // Valid email address
  otp: string,  // Exactly 6 digits
  newPassword: string  // Strong password
}
```
**Response:** Status

---

## Entity Endpoints

### GET /internal/entities/clinics
**Description:** List clinics
**Query:** OversightFilterDto
**Response:** Clinic list

### GET /internal/entities/suppliers
**Description:** List suppliers
**Query:** OversightFilterDto
**Response:** Supplier list

### POST /internal/entities/verify/:entityType/:id
**Description:** Verify entity
**Params:** entityType (CLINIC|SUPPLIER), id
**Body:** VerifyEntityInternalDto (includes ActorContextDto)
```typescript
{
  action: VerificationAction,  // enum: approve | reject
  notes?: string,  // Optional, non-empty
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

**Response:** Verification status

### GET /internal/entities/vet-profile/:userId
**Description:** Get vet profile
**Params:** userId
**Response:** Vet profile

### PATCH /internal/entities/vet-profile/:userId
**Description:** Update vet profile
**Params:** userId
**Body:** UpdateVetProfileInternalDto (includes ActorContextDto)
**Response:** Updated profile

### GET /internal/entities/supplier-profile/:userId
**Description:** Get supplier profile
**Params:** userId
**Response:** Supplier profile

### PATCH /internal/entities/supplier-profile/:userId
**Description:** Update supplier profile
**Params:** userId
**Body:** UpdateSupplierProfileInternalDto (includes ActorContextDto)
**Response:** Updated profile

### GET /internal/entities/regions
**Description:** List regions
**Query:** cursor, limit
**Response:** Region list

### POST /internal/entities/regions
**Description:** Create region
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

**Response:** Region data

### PATCH /internal/entities/regions/:id
**Description:** Update region
**Params:** id
**Body:** UpdateRegionDto
```typescript
{
  deliveryFeePerKm?: number,  // Optional, min 0
  isActive?: boolean,
  boundsPolygon?: PolygonPointDto[]  // Optional array of {lat, lng} points
}
```
**Response:** Updated region

---

## Health Endpoints

### GET /health
**Description:** Health check
**Response:** HealthCheckResult
- Checks: database, redis, supabase, aiHandoff
