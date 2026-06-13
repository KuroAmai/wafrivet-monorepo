export type MarketplaceOrderStatus =
  | "DRAFT"
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | string;

export type OrderListItemDto = {
  id: string;
  orderNumber?: string | null;
  status: MarketplaceOrderStatus;
  totalAmount: number;
  requiresColdChain?: boolean;
  submittedAt?: string | null;
  supplierCount?: number;
  createdAt: string;
};

export type OrderListResponseDto = {
  data: OrderListItemDto[];
  meta?: {
    nextCursor?: string | null;
    hasNextPage?: boolean;
  };
};

export type DraftCartItemDto = {
  offerId: string;
  quantity: number;
};

export type DraftCartDto = {
  orderId?: string;
  clinicId?: string;
  status?: MarketplaceOrderStatus;
  requiresColdChain?: boolean;
  deliveryFee?: {
    baseFee?: number;
    coldChainSurcharge?: number;
    distanceSurcharge?: number;
    consolidatedTotal?: number;
  };
  supplierGroups?: Array<{
    supplierId: string;
    supplierName: string;
    subtotal: number;
    items: Array<{
      offerId: string;
      masterSkuId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
      lineSubtotal: number;
      requiresColdChain?: boolean;
    }>;
  }>;
  totalAmount?: number;
  updatedAt?: string;
  linkedAnimalIds?: string[];
};

export type VetProfileDto = {
  name?: string;
  phone?: string;
  address?: string;
  deliveryTimeWindow?: string;
  lat?: number;
  lng?: number;
};

export type PaymentInitializationDto = {
  paymentId: string;
  reference: string;
  authorizationUrl: string;
  status: string;
  amount?: { kobo?: string; naira?: string };
};
