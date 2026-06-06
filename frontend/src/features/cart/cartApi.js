import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const syncCart = createAsyncThunk(
  'cart/sync',
  async (cartItems, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/cart/sync', { items: cartItems });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to sync cart');
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);
