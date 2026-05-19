# API Gateway Service Endpoints Documentation - Part 1: User Management

This document contains user management endpoints for the API Gateway service.

**Related Documents:**
- [Part 2: Business Operations](./api-gateway-service-endpoints-part2.md)
- [Part 3: Operations & Delivery](./api-gateway-service-endpoints-part3.md)

---

## Table of Contents

- [Admin Endpoints](#admin-endpoints)
- [Authentication Endpoints](#authentication-endpoints)
- [Onboarding Endpoints](#onboarding-endpoints)
- [Referral Endpoints](#referral-endpoints)
- [Roles Endpoints](#roles-endpoints)

---

## Admin Endpoints

### GET /admin/war-room/snapshot
**Description:** Get admin war room snapshot data
**Roles Required:** ADMIN
**Response:** AdminWarRoomSnapshotDto
```typescript
{
  generatedAt: string,  // ISO-8601 timestamp
  orderStatusBreakdown: WarRoomOrderStatusBreakdown,  // Partial<Record<OrderStatus, number>>
  todayOrderVolume: number,
  revenueCollectedToday: number,
  pendingSettlementAmount: number,
  activeRiders: number,
  openComplianceIncidents: number,
  unroutedOrders: number,
  activeManifests: number,
  source: 'cache' | 'fresh'
}
```

### SSE /admin/war-room/live
**Description:** Server-sent events for live war room updates
**Roles Required:** ADMIN

### GET /admin/orders
**Description:** List all orders with filtering
**Roles Required:** ADMIN
**Query:** AdminOrderListQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string,
  status?: OrderStatus,  // enum
  clinicId?: string,  // UUID
  supplierId?: string,  // UUID
  fromDate?: string,  // ISO-8601 date
  toDate?: string,  // ISO-8601 date
  requiresColdChain?: boolean,
  routeOptimizationFailed?: boolean
}
```
**Response:** AdminOrderListResponseDto
```typescript
{
  data: AdminOrderListItemDto[],
  meta: {
    nextCursor: string | null,
    hasNextPage: boolean
  }
}
```

**AdminOrderListItemDto:**
```typescript
{
  id: string,
  orderNumber: string | null,
  status: OrderStatus,
  clinicId: string,
  clinicName: string,
  requiresColdChain: boolean,
  routeOptimizationFailed: boolean,
  itemCount: number,
  settlementStatus: string | null,
  totalAmount: number,
  createdAt: string
}
```

### PATCH /admin/orders/:orderId/status
**Description:** Update order status
**Roles Required:** ADMIN
**Params:** orderId (UUID)
**Body:** AdminOrderOverrideDto
```typescript
{
  newStatus: OrderStatus,  // enum
  adminNote: string  // Non-empty, max 500 chars
}
```
**Response:** { id, status, updatedAt }

### PATCH /admin/orders/:orderId/notes
**Description:** Append notes to an order
**Roles Required:** ADMIN
**Params:** orderId (UUID)
**Body:** AdminOrderNoteDto
```typescript
{
  note: string  // Non-empty, max 500 chars
}
```
**Response:** { id, updatedAt }

### GET /admin/users
**Description:** List all users with filtering
**Roles Required:** ADMIN
**Query:** AdminUserListQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string,
  role?: string,
  isActive?: boolean
}
```
**Response:** AdminUserListResponseDto
```typescript
{
  data: AdminUserListItemDto[],
  meta: {
    nextCursor: string | null,
    hasNextPage: boolean
  }
}
```

**AdminUserListItemDto:**
```typescript
{
  id: string,
  email: string,
  role: string,
  isActive: boolean,
  createdAt: string,
  lastLoginAt: string | null
}
```

### PATCH /admin/users/:userId/deactivate
**Description:** Deactivate a user account
**Roles Required:** ADMIN
**Params:** userId (UUID)
**Body:** AdminUserDeactivateDto
```typescript
{
  reason: string  // Non-empty, max 500 chars
}
```
**Response:** { id, role, isActive, updatedAt }

### PATCH /admin/users/:userId/reactivate
**Description:** Reactivate a deactivated user account
**Roles Required:** ADMIN
**Params:** userId (UUID)
**Body:** AdminUserReactivateDto
```typescript
{
  reason?: string  // Optional, max 500 chars
}
```
**Response:** { id, role, isActive, updatedAt }

### POST /admin/users
**Description:** Create a new admin user
**Roles Required:** ADMIN
**Body:** AdminCreateUserDto
```typescript
{
  email: string,  // Non-empty, max 255 chars
  temporaryPassword: string  // Non-empty, max 120 chars
}
```
**Response:** { id, email, role }

### GET /admin/riders
**Description:** List all riders with filtering
**Roles Required:** ADMIN
**Query:** AdminRiderListQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string
}
```
**Response:** AdminRiderListResponseDto
```typescript
{
  data: AdminRiderListItemDto[],
  meta: {
    nextCursor: string | null,
    hasNextPage: boolean
  }
}
```

**AdminRiderListItemDto:**
```typescript
{
  id: string,
  userId: string,
  status: RiderStatus,  // enum
  lastOnlineAt: string | null,
  vehicleType: string | null,
  hasColdStorage: boolean,
  completedManifests: number
}
```

### PATCH /admin/riders/:riderId/vehicle
**Description:** Update rider vehicle information
**Roles Required:** ADMIN
**Params:** riderId (UUID)
**Body:** AdminRiderVehicleUpdateDto
```typescript
{
  vehicleType: string,  // Non-empty
  hasColdStorage: boolean,
  reason?: string  // Optional, max 500 chars
}
```
**Response:** { id, riderId, vehicleType, hasColdStorage }

### GET /admin/audit-logs
**Description:** List audit logs with filtering
**Roles Required:** ADMIN
**Query:** AdminAuditLogQueryDto
```typescript
{
  limit?: number,  // Default 20, min 1, max 100
  cursor?: string,
  actionType?: string,
  entityType?: string,
  actorId?: string,  // UUID
  fromDate?: string,  // ISO-8601 date
  toDate?: string  // ISO-8601 date
}
```
**Response:** AdminAuditLogListResponseDto
```typescript
{
  data: AdminAuditLogListItemDto[],
  meta: {
    nextCursor: string | null,
    hasNextPage: boolean
  }
}
```

**AdminAuditLogListItemDto:**
```typescript
{
  id: string,
  actorId: string | null,
  actorEmail: string | null,
  actionType: string,
  entityType: string,
  entityId: string | null,
  metadataPreview: string,
  createdAt: string
}
```

### POST /admin/broadcast
**Description:** Send broadcast notification to users
**Roles Required:** ADMIN
**Body:** AdminBroadcastNotificationDto
```typescript
{
  subject: string,  // Non-empty, max 255 chars
  body: string,  // Non-empty, max 500 chars
  targetAudience: AdminBroadcastAudience,  // enum: all_users | all_vets | all_suppliers | all_riders
  channel: AdminBroadcastChannel  // enum: email | in_app | both
}
```
**Response:** AdminBroadcastEnqueueResponseDto
```typescript
{
  broadcastId: string,
  estimatedRecipientCount: number
}
```

---

## Authentication Endpoints

### POST /auth/login
**Description:** User login with email and password
**Body:** LoginDto
```typescript
{
  email: string,  // Valid email address
  password: string  // Non-empty password
}
```
**Response:** AuthTokenResponseDto
```typescript
{
  accessToken: string,
  expiresIn: number  // Seconds until token expires
}
```

### POST /auth/signup
**Description:** User registration
**Body:** SignupDto
```typescript
{
  firstName: string,  // Non-empty
  lastName: string,  // Non-empty
  email: string,  // Valid email address
  password: string,  // Strong password (meets policy requirements)
  referralCode?: string  // Optional referral code
}
```
**Response:** User data (AuthUserProfileDto)
```typescript
{
  id: string,  // UUID
  email: string,
  role: UserRole,  // ADMIN | VET | SUPPLIER | RIDER
  roles?: UserRole[],
  isVerified: boolean,
  isActive: boolean,
  createdAt: string,  // ISO-8601 timestamp
  updatedAt: string  // ISO-8601 timestamp
}
```

### POST /auth/verify-email
**Description:** Verify user email with token
**Body:** VerifyEmailDto
```typescript
{
  email: string,  // Valid email address
  token?: string  // Optional verification token
}
```
**Response:** Verification status

### POST /auth/resend-verification
**Description:** Resend email verification
**Body:** { userId }
**Response:** Status

### POST /auth/refresh
**Description:** Refresh access token
**Body:** RefreshTokenDto
```typescript
{
  refreshToken?: string  // Optional refresh token
}
```
**Response:** AuthTokenResponseDto
```typescript
{
  accessToken: string,
  expiresIn: number  // Seconds until token expires
}
```

### POST /auth/logout
**Description:** User logout
**Body:** { userId, jti, familyId? }
**Response:** 204 No Content

### GET /auth/me
**Description:** Get current user profile
**Roles Required:** VET, SUPPLIER, RIDER
**Response:** UserProfileDto (AuthUserProfileDto)
```typescript
{
  id: string,  // UUID
  email: string,
  role: UserRole,  // ADMIN | VET | SUPPLIER | RIDER
  roles?: UserRole[],
  isVerified: boolean,
  isActive: boolean,
  createdAt: string,  // ISO-8601 timestamp
  updatedAt: string  // ISO-8601 timestamp
}
```

### POST /auth/roles/select
**Description:** Select user role (for multi-role users)
**Roles Required:** VET, SUPPLIER, RIDER
**Body:** SelectRolesDto
```typescript
{
  roles: UserRole[]  // Array of selected roles (non-empty)
}
```
**Response:** Updated token with selected role

### POST /auth/register-clinic
**Description:** Register a new clinic
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

### POST /auth/register-supplier
**Description:** Register a new supplier
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

### POST /auth/forgot-password
**Description:** Request password reset
**Body:** ForgotPasswordDto
```typescript
{
  email: string  // Valid email address
}
```
**Response:** 202 Accepted

### POST /auth/reset-password
**Description:** Reset password with token
**Body:** ResetPasswordDto
```typescript
{
  email: string,  // Valid email address
  otp: string,  // Exactly 6 digits
  newPassword: string  // Strong password
}
```
**Response:** Password reset status

---

## Onboarding Endpoints

### POST /onboarding/start
**Description:** Start onboarding process
**Body:** StartOnboardingDto
```typescript
{
  role: UserRole  // enum: VET | SUPPLIER | MANUFACTURER
}
```
**Response:** Onboarding session data

### POST /onboarding/:id/submit
**Description:** Submit onboarding data
**Params:** id (onboarding session ID)
**Body:** SubmitOnboardingDto
```typescript
{
  role: UserRole,  // enum: VET | SUPPLIER | MANUFACTURER
  regionId: string,  // UUID
  businessName: string,  // Non-empty
  phone: string,  // Non-empty
  address: string,  // Non-empty
  city: string,  // Non-empty
  latitude: number,  // -90 to 90
  longitude: number,  // -180 to 180
  vcnLicenseNumber?: string,  // Required if role is VET
  nafdacLicenseNumber?: string,  // Required if role is SUPPLIER or MANUFACTURER
  cacNumber?: string,  // Optional, non-empty
  workingHours?: string  // Optional, non-empty
}
```
**Response:** Completion status

---

## Referral Endpoints

### GET /referral/me
**Description:** Get user's referral information
**Roles Required:** VET, SUPPLIER, RIDER
**Response:** ReferralDto

---

## Roles Endpoints

### GET /roles/options
**Description:** Get available role options
**Roles Required:** VET, SUPPLIER, RIDER
**Response:** RoleOptionsDto

### POST /roles/select
**Description:** Select a role
**Roles Required:** VET, SUPPLIER, RIDER
**Body:** SelectRolesDto
```typescript
{
  roles: UserRole[]  // Array of selected roles (non-empty)
}
```
**Response:** Updated token
