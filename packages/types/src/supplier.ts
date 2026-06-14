export type MoneyDisplayDto = {
  kobo: string;
  naira: string;
};

export type SettlementListItemDto = {
  settlementId: string;
  orderId: string;
  orderNumber: string;
  status: string;
  grossAmount: MoneyDisplayDto;
  commissionAmount: MoneyDisplayDto;
  netAmount: MoneyDisplayDto;
  settledAt: string | null;
  createdAt: string;
};

export type SupplierWalletDto = {
  supplierId: string;
  totalEarned: MoneyDisplayDto;
  pendingPayout: MoneyDisplayDto;
  totalOrdersFulfilled: number;
  settlements: SettlementListItemDto[];
  nextCursor: string | null;
  hasNextPage: boolean;
};

export type SupplierProfileDto = {
  id: string;
  regionId?: string;
  name?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  lat?: number;
  lng?: number;
  status?: string;
  verificationNotes?: string | null;
  updatedAt?: string;
};

export type UpdateSupplierProfileDto = {
  name?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  lat?: number;
  lng?: number;
};
