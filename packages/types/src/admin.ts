export type OrderStatus =
  | "DRAFT"
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type AdminWarRoomSnapshotDto = {
  generatedAt: string;
  orderStatusBreakdown: Partial<Record<OrderStatus, number>>;
  todayOrderVolume: number;
  revenueCollectedToday: number;
  pendingSettlementAmount: number;
  activeRiders: number;
  openComplianceIncidents: number;
  unroutedOrders: number;
  activeManifests: number;
  source: "cache" | "fresh";
};

export type AdminOrderListItemDto = {
  id: string;
  orderNumber: string | null;
  status: OrderStatus;
  clinicId: string;
  clinicName: string;
  supplierNames: string[];
  paymentMethod: string | null;
  requiresColdChain: boolean;
  routeOptimizationFailed: boolean;
  itemCount: number;
  settlementStatus: string | null;
  totalAmount: number;
  createdAt: string;
};

export type CursorMeta = {
  nextCursor: string | null;
  hasNextPage: boolean;
};

export type AdminOrderListResponseDto = {
  data: AdminOrderListItemDto[];
  meta: CursorMeta;
};

export type AdminUserListItemDto = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export type AdminUserListResponseDto = {
  data: AdminUserListItemDto[];
  meta: CursorMeta;
};

export type AdminUserRoleAssignmentDto = {
  role: string;
  status: string;
};

export type AdminUserStatItemDto = {
  key: string;
  label: string;
  value: string | number;
  hint?: string;
};

export type AdminUserEntityKind =
  | "admin"
  | "support"
  | "farmer"
  | "vet"
  | "supplier"
  | "manufacturer"
  | "customer"
  | "rider"
  | "generic";

export type AdminUserEntitySummaryDto = {
  kind: AdminUserEntityKind;
  title: string;
  subtitle: string | null;
  address: string | null;
  regionName: string | null;
  kycStatus: string | null;
  verificationLabel: string | null;
  stats: AdminUserStatItemDto[];
};

export type AdminUserActivityItemDto = {
  id: string;
  text: string;
  time: string;
  type: string;
};

export type AdminUserDetailDto = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: string;
  roles: string[];
  roleAssignments: AdminUserRoleAssignmentDto[];
  isActive: boolean;
  isVerified: boolean;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  emailVerifiedAt: string | null;
  entity: AdminUserEntitySummaryDto;
  recentActivity: AdminUserActivityItemDto[];
};

export type EntityLifecycleStatus = "pending" | "active" | "rejected";

export type OversightSupplierListItemDto = {
  id: string;
  userId: string;
  regionId: string;
  name: string;
  ownerName: string | null;
  regionName: string;
  phone: string;
  address: string;
  status: EntityLifecycleStatus;
  isVerified: boolean;
  nafdacLicense: string | null;
  cacNumber: string | null;
  verificationNotes: string | null;
  kycVerifiedAt: string | null;
  submittedAt: string;
  createdAt: string;
};

export type OversightSupplierListResponseDto = {
  data: OversightSupplierListItemDto[];
  meta: CursorMeta;
};

export type AdminCatalogCategoryDto = {
  id: string;
  name: string;
  slug: string;
};

export type AdminCatalogSkuListItemDto = {
  id: string;
  skuCode: string;
  name: string;
  genericName: string;
  manufacturer: string;
  nafdacRegNo: string | null;
  isActive: boolean;
  createdAt: string;
  category: AdminCatalogCategoryDto;
};

export type AdminCatalogListResponseDto = {
  data: AdminCatalogSkuListItemDto[];
  meta: CursorMeta;
};
