
/**
 * Format a number as EUR currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
