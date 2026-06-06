import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  PlusSquare,
  Home
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: PlusSquare, label: 'Add Food', path: '/admin/add-food' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    { icon: Utensils, label: 'Restaurants', path: '/admin/restaurants' },
    { icon: Users, label: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="flex min-h-screen bg-premium-light">
      {/* Sidebar */}
      <aside className="w-64 bg-premium-dark text-white fixed h-full z-20">
        <div className="p-8">
          <Link to="/" className="flex flex-col mb-12">
            <span className="text-xl font-serif font-bold tracking-tighter text-white">
              LUXE<span className="text-premium-accent italic">EATS</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 -mt-1">
              Admin Portal
            </span>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className={`flex items-center space-x-4 p-4 text-[10px] uppercase tracking-widest font-bold transition-all ${
                    isActive ? 'bg-premium-accent text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-8 border-t border-white/5">
          <Link to="/" className="flex items-center space-x-4 p-4 text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-all">
            <Home size={16} />
            <span>View Site</span>
          </Link>
          <button 
            onClick={logout}
            className="flex items-center space-x-4 p-4 text-[10px] uppercase tracking-widest font-bold text-red-400/60 hover:text-red-400 transition-all w-full text-left"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminLayout;
