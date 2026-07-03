import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Settings, LogOut, ChevronRight, Package, Shield, Navigation } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, isAdmin, isDelivery } = useAuth();
  const navigate = useNavigate();
  
  // Mock data if no user
  const userData = user || {
    name: "Julian Marc",
    email: "julian@luxury.com",
    phone: "+44 20 7123 4567",
    address: "12 Grosvenor Square, Mayfair, London",
    memberSince: "May 2026"
  };

  const menuItems = [
    { icon: Package, label: "My Orders", path: "/orders" },
    { icon: MapPin, label: "Shipping Addresses", path: "/addresses" },
    { icon: Settings, label: "Account Settings", path: "/settings" },
  ];

  if (isAdmin) {
    menuItems.push({ icon: Shield, label: "Admin Console", path: "/admin" });
  }
  if (isDelivery) {
    menuItems.push({ icon: Navigation, label: "Courier Console", path: "/delivery" });
  }

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white border border-gray-100 p-12 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="w-32 h-32 bg-premium-dark flex items-center justify-center text-white text-4xl font-serif">
                {userData.name.charAt(0)}
              </div>
              <div className="flex-grow text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-2 block">
                  Premium Member
                </span>
                <h1 className="text-4xl font-serif font-bold text-premium-dark mb-4">{userData.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] uppercase tracking-widest text-premium-dark/40 font-bold">
                  <span className="flex items-center"><Mail size={12} className="mr-2" /> {userData.email}</span>
                  <span className="flex items-center"><Phone size={12} className="mr-2" /> {userData.phone}</span>
                </div>
              </div>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600 transition-colors"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Sidebar Menu */}
            <div className="md:col-span-1 space-y-4">
              {menuItems.map((item) => (
                <button 
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between p-6 bg-white border border-gray-100 hover:border-premium-accent transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <item.icon size={16} className="text-premium-dark/30 group-hover:text-premium-accent" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-premium-dark">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-premium-dark/20" />
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white border border-gray-100 p-10">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-8 pb-4 border-b border-gray-50">
                  Primary Address
                </h3>
                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 bg-premium-accent/10 flex items-center justify-center text-premium-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-premium-dark/60 leading-relaxed uppercase tracking-widest">
                      {userData.address}
                    </p>
                    <button 
                      onClick={() => navigate('/addresses')}
                      className="mt-4 text-[10px] uppercase tracking-widest font-bold text-premium-accent hover:underline"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-premium-dark text-white p-10 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Luxe Rewards</h3>
                  <p className="text-2xl font-serif font-bold mb-2">2,450 Points</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">
                    Next Tier: Platinum (500 points remaining)
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-premium-accent/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
