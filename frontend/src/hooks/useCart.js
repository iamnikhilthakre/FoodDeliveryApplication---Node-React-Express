import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const { items, restaurantId } = useSelector((state) => state.cart);

  const addItem = (item, resId) => {
    dispatch(addToCart({ ...item, restaurantId: resId }));
  };

  const removeItem = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const clearAll = () => {
    dispatch(clearCart());
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = items.length > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  return {
    items,
    restaurantId,
    addItem,
    removeItem,
    clearAll,
    subtotal,
    deliveryFee,
    total,
    itemCount: items.reduce((acc, item) => acc + item.quantity, 0)
  };
};

export default useCart;
