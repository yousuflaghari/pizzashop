export const incrementQuantity = (quantity, setQuantity) => {
  setQuantity(quantity + 1);
};

export const decrementQuantity = (quantity, setQuantity) => {
  if (quantity > 0) {
    setQuantity(quantity - 1);
  }
};
