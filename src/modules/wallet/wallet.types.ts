export type WalletMutationInput = {
  organizationId: string;
  actorUserId?: string;
  amountCents: number;
  type: "credit" | "debit" | "adjustment" | "reversal" | "refund";
  reason:
    | "top_up"
    | "warranty_purchase"
    | "manual_adjustment"
    | "order_reversal"
    | "refund"
    | "bonus";
  referenceType?: string;
  referenceId?: string;
  idempotencyKey: string;
  metadata?: Record<string, unknown>;
};
