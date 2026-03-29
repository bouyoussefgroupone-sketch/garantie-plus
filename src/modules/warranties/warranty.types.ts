export type CreateWarrantyInput = {
  organizationId: string;
  coveragePlanId: string;
  customerId: string;
  soldByUserId: string;
  walletTransactionId: string;
  policyNumber: string;
  deviceBrand: string;
  deviceModel: string;
  deviceSerialNumber: string;
  devicePriceCents: number;
  salePriceCents: number;
  purchaseDate: Date;
  coverageStartDate: Date;
  coverageEndDate: Date;
};
