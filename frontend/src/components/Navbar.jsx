import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Offers', path: '/offers' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-2xl font-serif font-bold tracking-tighter text-premium-dark group-hover:text-premium-accent transition-colors">
              LUXE<span className="text-premium-accent italic">EATS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-premium-dark/50 -mt-1">
              Curated Dining
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-xs uppercase tracking-widest text-premium-dark/70 hover:text-premium-dark transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-premium-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="text-premium-dark/70 hover:text-premium-dark transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="text-premium-dark/70 hover:text-premium-dark transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-premium-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link to={isAuthenticated ? "/profile" : "/login"} className="hidden md:block text-premium-dark/70 hover:text-premium-dark transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-premium-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-premium-dark/70"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <Link to="/login" className="flex items-center space-x-2 text-premium-dark/70">
                  <User size={20} strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-widest">Profile</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
