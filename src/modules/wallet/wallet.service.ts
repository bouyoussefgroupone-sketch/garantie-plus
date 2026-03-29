import type { Prisma } from "@prisma/client";
import { WalletTransactionStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { WalletMutationInput } from "@/modules/wallet/wallet.types";

const NEGATIVE_TYPES = new Set(["debit", "refund"]);

export async function applyWalletMutation(input: WalletMutationInput) {
  return prisma.$transaction(async (tx) => {
    const existingTransaction = await tx.walletTransaction.findUnique({
      where: {
        idempotencyKey: input.idempotencyKey
      }
    });

    if (existingTransaction) {
      return existingTransaction;
    }

    const wallet = await tx.wallet.findUnique({
      where: {
        organizationId: input.organizationId
      }
    });

    if (!wallet) {
      throw new Error("Wallet not found for organization.");
    }

    const delta =
      NEGATIVE_TYPES.has(input.type) || input.amountCents < 0
        ? -Math.abs(input.amountCents)
        : Math.abs(input.amountCents);

    const nextBalance = wallet.balanceCents + delta;

    if (nextBalance < 0) {
      throw new Error("Insufficient wallet balance.");
    }

    await tx.wallet.update({
      where: {
        id: wallet.id
      },
      data: {
        balanceCents: nextBalance
      }
    });

    return tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        createdByUserId: input.actorUserId,
        type: input.type,
        reason: input.reason,
        status: WalletTransactionStatus.posted,
        amountCents: Math.abs(delta),
        balanceBeforeCents: wallet.balanceCents,
        balanceAfterCents: nextBalance,
        referenceType: input.referenceType,
        referenceId: input.referenceId,
        idempotencyKey: input.idempotencyKey,
        metadata: (input.metadata ?? {}) as Prisma.InputJsonValue
      }
    });
  });
}
