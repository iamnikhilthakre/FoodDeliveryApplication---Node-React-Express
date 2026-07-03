import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Bell, Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "Julian Marc",
    email: user?.email || "julian@luxury.com",
    phone: user?.phone || "+44 20 7123 4567"
  });
  const [allowMultiRestaurant, setAllowMultiRestaurant] = useState(() => {
    return JSON.parse(localStorage.getItem('allowMultiRestaurant')) || false;
  });

  useEffect(() => {
    localStorage.setItem('allowMultiRestaurant', JSON.stringify(allowMultiRestaurant));
  }, [allowMultiRestaurant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
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

          <div className="bg-white border border-gray-100 p-12 shadow-sm">
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-2 block">
                Account Settings
              </span>
              <h1 className="text-3xl font-serif font-bold text-premium-dark">Manage Your Account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark pb-4 border-b border-gray-100">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold flex items-center">
                      <User size={12} className="mr-2" />
                      Full Name
                    </label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-premium-accent focus:outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold flex items-center">
                      <Mail size={12} className="mr-2" />
                      Email Address
                    </label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-premium-accent focus:outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold flex items-center">
                      <Phone size={12} className="mr-2" />
                      Phone Number
                    </label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-premium-accent focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-6 pt-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark pb-4 border-b border-gray-100">
                  Security
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold flex items-center">
                      <Lock size={12} className="mr-2" />
                      Current Password
                    </label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-premium-accent focus:outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold flex items-center">
                      <Shield size={12} className="mr-2" />
                      New Password
                    </label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-premium-accent focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Cart Settings */}
              <div className="space-y-6 pt-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark pb-4 border-b border-gray-100">
                  Cart Settings
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Shield size={16} className="text-premium-dark/40" />
                      <span className="text-sm text-premium-dark">Allow ordering from multiple restaurants</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={allowMultiRestaurant}
                      onChange={(e) => setAllowMultiRestaurant(e.target.checked)}
                      className="w-4 h-4 accent-premium-accent" 
                    />
                  </label>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-6 pt-6">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark pb-4 border-b border-gray-100">
                  Notifications
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Bell size={16} className="text-premium-dark/40" />
                      <span className="text-sm text-premium-dark">Email notifications for orders</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-premium-accent" />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Bell size={16} className="text-premium-dark/40" />
                      <span className="text-sm text-premium-dark">Promotional offers and discounts</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 accent-premium-accent" />
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <button 
                  type="submit"
                  className="bg-premium-dark text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-premium-accent transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Settings;
