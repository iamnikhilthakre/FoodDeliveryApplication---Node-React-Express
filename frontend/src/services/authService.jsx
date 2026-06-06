import axiosInstance from '../api/axios';

const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },
  
  updateProfile: async (userData) => {
    const response = await axiosInstance.put('/auth/profile', userData);
    return response.data;
  }
};

export default authService;
