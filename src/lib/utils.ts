export function formatCurrency(amountInCents: number, locale = "fr-FR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR"
  }).format(amountInCents / 100);
}

export function formatRoleLabel(role: string) {
  return role
    .split("_")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}
