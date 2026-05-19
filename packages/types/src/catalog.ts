export type CategoryDto = {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
};

export type MasterSkuDto = {
  id: string;
  skuCode: string;
  categoryId: string;
  name: string;
  genericName: string;
  activeIngredient: string;
  manufacturer: string;
  dosageForm: string;
  strength?: string;
  unitOfMeasure: string;
  packageSize?: number;
  description?: string;
  requiresColdChain?: boolean;
  requiresPrescription?: boolean;
  nafdacRegNo?: string;
};

export type CatalogListResponseDto = {
  data: MasterSkuDto[];
  meta?: { nextCursor?: string | null; hasNextPage?: boolean };
};
