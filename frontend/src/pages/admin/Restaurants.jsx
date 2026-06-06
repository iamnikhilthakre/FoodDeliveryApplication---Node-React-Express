import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, Star, X } from 'lucide-react';
import Button from '../../components/Button';
import foodService from '../../services/foodService';
import Loader from '../../components/Loader';

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: '',
    rating: '5.0'
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await foodService.getAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error("Failed to load restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert("Name and Address are required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        rating: parseFloat(formData.rating || '5.0'),
        image: formData.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
      };
      await foodService.addRestaurant(payload);
      alert("Restaurant registered successfully!");
      setFormData({ name: '', address: '', image: '', rating: '5.0' });
      setShowAddForm(false);
      fetchRestaurants();
    } catch (err) {
      console.error("Failed to register restaurant:", err);
      alert(err.response?.data?.message || "Failed to register establishment.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRestaurants = restaurants.filter(res => 
    res.name?.toLowerCase().includes(search.toLowerCase()) ||
    res.address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
            Partnerships
          </span>
          <h1 className="text-4xl font-serif font-bold text-premium-dark">Establishments</h1>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-premium-dark/20 group-focus-within:text-premium-accent transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-gray-100 pl-10 pr-6 py-3 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-premium-accent transition-all w-64"
            />
          </div>
          <Button 
            variant="primary" 
            className="px-8"
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={14} className="mr-2" />
            <span>Register New</span>
          </Button>
        </div>
      </div>

      {/* Add New Restaurant Modal / Drop-down panel */}
      {showAddForm && (
        <div className="bg-white border border-gray-100 p-10 mb-12 shadow-md relative animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setShowAddForm(false)}
            className="absolute top-6 right-6 text-premium-dark/40 hover:text-premium-dark"
          >
            <X size={18} />
          </button>
          
          <h3 className="text-lg font-serif font-bold text-premium-dark mb-8 uppercase tracking-wider">Register Establishment</h3>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Establishment Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. L'Atelier de Cuisine"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Address (Location)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mayfair, London"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Image URL</label>
                <input 
                  type="text" 
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Initial Rating (1-5)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  min="1" 
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest bg-transparent"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end space-x-4">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 hover:text-premium-dark"
              >
                Cancel
              </button>
              <Button type="submit" disabled={submitting} className="px-8">
                {submitting ? "Registering..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {loading && restaurants.length === 0 ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRestaurants.length === 0 ? (
            <p className="text-xs uppercase tracking-widest text-premium-dark/30 text-center py-12 col-span-2">
              No registered establishments found.
            </p>
          ) : (
            filteredRestaurants.map((res) => (
              <div key={res._id} className="bg-white border border-gray-100 p-8 shadow-sm flex items-center justify-between group hover:border-premium-accent transition-all">
                <div className="flex items-center space-x-8">
                  <div className="w-16 h-16 bg-premium-light overflow-hidden flex items-center justify-center text-premium-dark">
                    {res.image ? (
                      <img src={res.image} alt={res.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <span className="font-serif text-xl">{res.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-sm font-bold text-premium-dark uppercase tracking-widest">{res.name}</h3>
                      <span className="text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 text-green-500 bg-green-50">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-premium-dark/40 font-bold">
                      <span className="flex items-center"><MapPin size={12} className="mr-1" /> {res.address}</span>
                      <span className="flex items-center"><Star size={12} className="mr-1 text-premium-accent" /> {res.rating || '5.0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRestaurants;
