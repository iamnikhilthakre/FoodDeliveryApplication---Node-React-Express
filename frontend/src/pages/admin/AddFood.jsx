import React, { useState, useEffect } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import Button from '../../components/Button';
import foodService from '../../services/foodService';

const AddFood = () => {
  const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Specialty'];
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: categories[0],
    restaurant: '',
    image: '',
    isFeatured: false
  });

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await foodService.getAllRestaurants();
        setRestaurants(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, restaurant: data[0]._id }));
        }
      } catch (err) {
        console.error("Failed to load restaurants:", err);
      }
    };
    loadRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.restaurant) {
      alert("Please fill out name, price, and select a restaurant.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
      };
      await foodService.addFood(payload);
      alert("Dish published to catalog successfully!");
      setFormData({
        name: '',
        description: '',
        price: '',
        category: categories[0],
        restaurant: restaurants[0]?._id || '',
        image: '',
        isFeatured: false
      });
    } catch (error) {
      console.error("Failed to add food:", error);
      alert(error.response?.data?.message || "Failed to publish food selection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
          Catalog Management
        </span>
        <h1 className="text-4xl font-serif font-bold text-premium-dark">Add New Dish</h1>
      </div>

      <div className="bg-white border border-gray-100 p-12 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Image URL Input */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block">Dish Image URL</label>
            <input 
              type="text" 
              placeholder="e.g. https://images.unsplash.com/photo-..." 
              className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">Dish Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Truffle Tagliatelle" 
                  required
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">Price (USD)</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00" 
                  required
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">Category</label>
                <select 
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">Establishment</label>
                <select 
                  required
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                  value={formData.restaurant}
                  onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                >
                  {restaurants.length === 0 ? (
                    <option value="">No Restaurants Registered</option>
                  ) : (
                    restaurants.map(res => <option key={res._id} value={res._id}>{res.name}</option>)
                  )}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">Culinary Description</label>
            <textarea 
              rows="4" 
              placeholder="Describe the ingredients, techniques, and flavor profile..."
              className="w-full border border-gray-100 p-6 outline-none focus:border-premium-dark text-xs leading-relaxed italic"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="flex items-center space-x-4">
            <input 
              type="checkbox" 
              id="featured" 
              className="w-4 h-4 accent-premium-dark"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            />
            <label htmlFor="featured" className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/60 cursor-pointer">Mark as Featured Selection</label>
          </div>

          <div className="pt-10 border-t border-gray-50 flex justify-end space-x-6">
            <button 
              type="button" 
              onClick={() => setFormData({
                name: '',
                description: '',
                price: '',
                category: categories[0],
                restaurant: restaurants[0]?._id || '',
                image: '',
                isFeatured: false
              })}
              className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 hover:text-premium-dark"
            >
              Discard
            </button>
            <Button type="submit" disabled={loading} className="px-12">
              {loading ? 'Publishing...' : 'Publish to Catalog'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
