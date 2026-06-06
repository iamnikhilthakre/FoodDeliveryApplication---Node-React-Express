import axiosInstance from '../api/axios';

const foodService = {
  getAllRestaurants: async (params) => {
    const response = await axiosInstance.get('/restaurants', { params });
    return response.data;
  },
  
  getRestaurantDetails: async (id) => {
    const response = await axiosInstance.get(`/restaurants/${id}`);
    return response.data;
  },
  
  getFeaturedFoods: async () => {
    const response = await axiosInstance.get('/foods/featured');
    return response.data;
  },
  
  searchFoods: async (query) => {
    const response = await axiosInstance.get(`/foods/search?q=${query}`);
    return response.data;
  },

  addRestaurant: async (restaurantData) => {
    const response = await axiosInstance.post('/restaurants', restaurantData);
    return response.data;
  },

  addFood: async (foodData) => {
    const response = await axiosInstance.post('/foods', foodData);
    return response.data;
  }
};

export default foodService;
