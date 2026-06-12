export type OfferCreateDto = {
  masterSkuId: string;
  price: number;
  stockQuantity: number;
  batchNumber: string;
  expiryDate: string;
  minOrderQty: number;
};

export type OfferUpdateDto = {
  price?: number;
  stockQuantity?: number;
  batchNumber?: string;
  expiryDate?: string;
  minOrderQty?: number;
  isActive?: boolean;
};

export type SupplierOfferDto = {
  id: string;
  masterSkuId: string;
  skuName?: string;
  productName?: string;
  price?: number;
  pricePerUnit?: number;
  stockQuantity?: number;
  batchNumber?: string;
  expiryDate?: string;
  minOrderQty?: number;
  isActive?: boolean;
  status?: string;
};

export type SupplierSubOrderDto = {
  id: string;
  orderId: string;
  orderNumber?: string | null;
  status: string;
  subtotalAmount: number;
  itemCount?: number;
  createdAt: string;
  customerName?: string;
};
