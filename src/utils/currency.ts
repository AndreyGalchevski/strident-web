export const formatCurrency = (cents: number) => {
  return (cents / 100).toLocaleString(undefined, {
    currency: "EUR",
    style: "currency",
  });
};
