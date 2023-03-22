export const countDiscount = (price: number, discount: number) => {
  return (price - +(discount / 100).toFixed(2) * price).toFixed(2)
}
