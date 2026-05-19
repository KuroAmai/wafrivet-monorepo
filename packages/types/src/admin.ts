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
  firstName?: string;
  lastName?: string;
};

export type AdminUserListResponseDto = {
  data: AdminUserListItemDto[];
  meta: CursorMeta;
};
