import { createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchUserOrders, fetchOrderDetails } from './orderApi';

const initialState = {
  orders: [],
  activeOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      // Fetch Details
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.activeOrder = action.payload;
      });
  }
});

export const { setActiveOrder } = orderSlice.actions;
export default orderSlice.reducer;
