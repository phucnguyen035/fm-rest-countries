export const formatNumber = (value: number): string => {
  return Intl.NumberFormat().format(value);
};
