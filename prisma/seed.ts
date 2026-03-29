import {
  OrganizationStatus,
  OrganizationType,
  PrismaClient,
  UserRole,
  UserStatus
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const platform = await prisma.organization.upsert({
    where: { code: "GP-PLATFORM" },
    update: {},
    create: {
      code: "GP-PLATFORM",
      name: "Garantie Plus",
      legalName: "Garantie Plus SAS",
      type: OrganizationType.platform,
      status: OrganizationStatus.active,
      email: "contact@garantie-plus.local"
    }
  });

  const reseller = await prisma.organization.upsert({
    where: { code: "TV-PARTNER-001" },
    update: {},
    create: {
      code: "TV-PARTNER-001",
      name: "TV Partner Marseille",
      type: OrganizationType.reseller,
      status: OrganizationStatus.active,
      email: "marseille@partner.local",
      wallet: {
        create: {
          balanceCents: 250000
        }
      }
    }
  });

  await prisma.user.upsert({
    where: { email: "founder@garantie-plus.local" },
    update: {},
    create: {
      organizationId: platform.id,
      role: UserRole.super_admin,
      status: UserStatus.active,
      email: "founder@garantie-plus.local",
      firstName: "Plateforme",
      lastName: "Owner"
    }
  });

  await prisma.user.upsert({
    where: { email: "reseller@partner.local" },
    update: {},
    create: {
      organizationId: reseller.id,
      role: UserRole.reseller,
      status: UserStatus.active,
      email: "reseller@partner.local",
      firstName: "Reseller",
      lastName: "Manager"
    }
  });

  await prisma.coveragePlan.upsert({
    where: { code: "TV-12-STD" },
    update: {},
    create: {
      code: "TV-12-STD",
      name: "TV Standard 12 mois",
      description: "Couverture standard pour TV jusqu'à 1 500 EUR",
      durationMonths: 12,
      retailPriceCents: 9900,
      resellerCostCents: 6900,
      maxDevicePriceCents: 150000
    }
  });

  await prisma.coveragePlan.upsert({
    where: { code: "TV-24-PRO" },
    update: {},
    create: {
      code: "TV-24-PRO",
      name: "TV Premium 24 mois",
      description: "Couverture étendue pour TV jusqu'à 3 000 EUR",
      durationMonths: 24,
      retailPriceCents: 17900,
      resellerCostCents: 12900,
      maxDevicePriceCents: 300000
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
