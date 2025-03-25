
export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const formatDiscountedPrice = (price: number, discountPercentage: number): string => {
  const discountedPrice = price * (1 - discountPercentage / 100);
  return formatPrice(discountedPrice);
};

export const getDiscountLabel = (discountPercentage: number): string => {
  return `${discountPercentage.toFixed(2)}% OFF`;
};
