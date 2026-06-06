import axiosInstance from '../api/axios';

const orderService = {
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  },
  
  getUserOrders: async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
  },
  
  getOrderById: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },
  
  trackOrder: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}/track`);
    return response.data;
  },
  
  updateOrderStatus: async (id, status) => {
    const response = await axiosInstance.put(`/orders/${id}/status`, { status });
    return response.data;
  }
};

export default orderService;
