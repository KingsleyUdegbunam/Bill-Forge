export function formatPenceToPounds(pence) {
  const amountInPounds = pence / 100;

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amountInPounds);
}
