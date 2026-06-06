import axiosInstance from '../api/axios';

const paymentService = {
  createPaymentIntent: async (amount) => {
    const response = await axiosInstance.post('/payments/create-intent', { amount });
    return response.data;
  },
  
  verifyPayment: async (paymentId) => {
    const response = await axiosInstance.post('/payments/verify', { paymentId });
    return response.data;
  },
  
  getPaymentHistory: async () => {
    const response = await axiosInstance.get('/payments/history');
    return response.data;
  }
};

export default paymentService;
