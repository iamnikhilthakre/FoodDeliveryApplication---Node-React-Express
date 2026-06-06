export const calculateSubtotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateTotal = (items, deliveryFee = 0, taxRate = 0) => {
  const subtotal = calculateSubtotal(items);
  const tax = subtotal * taxRate;
  return subtotal + deliveryFee + tax;
};

export default calculateTotal;
