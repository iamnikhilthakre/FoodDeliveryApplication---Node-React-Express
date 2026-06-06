import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authApi';
import { loginSuccess } from '../../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      dispatch(loginSuccess(result));
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
      alert(error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="min-h-[80vh] flex items-center justify-center section-padding bg-premium-light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-md p-12 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Welcome Back
            </span>
            <h2 className="text-3xl font-serif font-bold text-premium-dark">Sign In</h2>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 block mb-2">
                  Email Address
                </label>
                <div className="flex items-center border-b border-gray-200 focus-within:border-premium-dark transition-colors py-2">
                  <Mail size={16} className="text-premium-dark/30 mr-3" />
                  <input 
                    type="email" 
                    placeholder="name@luxury.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 block mb-2">
                  Password
                </label>
                <div className="flex items-center border-b border-gray-200 focus-within:border-premium-dark transition-colors py-2">
                  <Lock size={16} className="text-premium-dark/30 mr-3" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 accent-premium-dark" />
                <span className="text-[10px] uppercase tracking-widest text-premium-dark/50">Remember me</span>
              </label>
              <a href="#" className="text-[10px] uppercase tracking-widest text-premium-accent font-bold hover:underline">
                Forgot?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-premium w-full flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Entering...' : 'Enter The Gallery'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-[10px] uppercase tracking-widest text-premium-dark/40 mb-4">
              New to LuxeEats?
            </p>
            <Link to="/register" className="text-xs font-bold text-premium-dark hover:text-premium-accent transition-colors uppercase tracking-widest">
              Create An Account
            </Link>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Login;
