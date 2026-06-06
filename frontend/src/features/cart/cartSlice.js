import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  restaurantId: localStorage.getItem('cartRestaurantId') || null,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, restaurantId } = action.payload;
      
      // If adding from a different restaurant, clear cart first
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
      }
      
      state.restaurantId = restaurantId;
      localStorage.setItem('cartRestaurantId', restaurantId);

      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, price, image, quantity: 1 });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity -= 1;
      }
      
      if (state.items.length === 0) {
        state.restaurantId = null;
        localStorage.removeItem('cartRestaurantId');
      }
      
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartRestaurantId');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
