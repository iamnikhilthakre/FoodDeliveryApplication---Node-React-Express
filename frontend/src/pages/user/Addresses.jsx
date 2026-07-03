import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2, ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Addresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      address: "12 Grosvenor Square, Mayfair, London, W1K 2QQ",
      phone: "+44 20 7123 4567",
      isDefault: true
    },
    {
      id: 2,
      label: "Office",
      address: "80 Strand, London, WC2R 0RL",
      phone: "+44 20 7987 6543",
      isDefault: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    address: "",
    phone: "",
    isDefault: false
  });

  const handleOpenModal = (address = null) => {
    setEditingAddress(address);
    if (address) {
      setFormData(address);
    } else {
      setFormData({ label: "", address: "", phone: "", isDefault: false });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id } 
          : formData.isDefault ? { ...addr, isDefault: false } : addr
      ));
    } else {
      // Add new address
      const newId = Date.now();
      if (formData.isDefault) {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })).concat({ ...formData, id: newId }));
      } else {
        setAddresses([...addresses, { ...formData, id: newId }]);
      }
    }
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 hover:text-premium-accent mb-8 transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Back to Profile</span>
          </button>

          <div className="bg-white border border-gray-100 p-12 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-2 block">
                  Your Locations
                </span>
                <h1 className="text-3xl font-serif font-bold text-premium-dark">Shipping Addresses</h1>
              </div>
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center space-x-2 bg-premium-dark text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-premium-accent transition-colors"
              >
                <Plus size={14} />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="space-y-6">
              {addresses.map((addr) => (
                <motion.div 
                  key={addr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 border ${addr.isDefault ? 'border-premium-accent bg-premium-accent/5' : 'border-gray-100'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 flex items-center justify-center ${addr.isDefault ? 'bg-premium-accent text-white' : 'bg-gray-100 text-premium-dark/40'}`}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-sm font-bold text-premium-dark">{addr.label}</h3>
                          {addr.isDefault && (
                            <span className="text-[8px] uppercase tracking-widest bg-premium-accent text-white px-2 py-1">Default</span>
                          )}
                        </div>
                        <p className="text-xs text-premium-dark/60 mb-2">{addr.address}</p>
                        <p className="text-xs text-premium-dark/50">{addr.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleOpenModal(addr)}
                        className="text-premium-dark/40 hover:text-premium-accent transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(addr.id)}
                        className="text-premium-dark/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add/Edit Address Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white max-w-md w-full p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-premium-dark">
                  {editingAddress ? "Edit Address" : "Add New Address"}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-premium-dark/40 hover:text-premium-dark"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold block mb-2">
                    Label
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Home, Office"
                    className="w-full px-4 py-3 border border-gray-100 text-sm outline-none focus:border-premium-accent"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold block mb-2">
                    Address
                  </label>
                  <textarea 
                    required
                    placeholder="Enter your full address"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-100 text-sm outline-none focus:border-premium-accent resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold block mb-2">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border border-gray-100 text-sm outline-none focus:border-premium-accent"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 accent-premium-accent"
                  />
                  <label htmlFor="isDefault" className="text-xs text-premium-dark/70 font-bold uppercase tracking-widest">
                    Set as default address
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-gray-100 text-[10px] uppercase tracking-widest font-bold text-premium-dark hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-premium-dark text-white text-[10px] uppercase tracking-widest font-bold hover:bg-premium-accent transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Addresses;
