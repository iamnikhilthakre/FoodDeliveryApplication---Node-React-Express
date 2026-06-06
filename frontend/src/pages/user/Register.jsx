import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authApi';
import { loginSuccess } from '../../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      dispatch(loginSuccess(result));
      navigate('/');
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="min-h-[90vh] flex items-center justify-center section-padding bg-premium-light">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-lg p-12 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Join The Circle
            </span>
            <h2 className="text-3xl font-serif font-bold text-premium-dark">Create Account</h2>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 block mb-2">
                  Full Name
                </label>
                <div className="flex items-center border-b border-gray-200 focus-within:border-premium-dark transition-colors py-2">
                  <User size={16} className="text-premium-dark/30 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Julian Marc"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 block mb-2">
                  Phone Number
                </label>
                <div className="flex items-center border-b border-gray-200 focus-within:border-premium-dark transition-colors py-2">
                  <Phone size={16} className="text-premium-dark/30 mr-3" />
                  <input 
                    type="tel" 
                    placeholder="+44 20 7123 4567"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm placeholder:text-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 block mb-2">
                Email Address
              </label>
              <div className="flex items-center border-b border-gray-200 focus-within:border-premium-dark transition-colors py-2">
                <Mail size={16} className="text-premium-dark/30 mr-3" />
                <input 
                  type="email" 
                  placeholder="julian@luxury.com"
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

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/50 block mb-2">
                Account Type (Role)
              </label>
              <div className="flex items-center border-b border-gray-200 focus-within:border-premium-dark transition-colors py-2">
                <User size={16} className="text-premium-dark/30 mr-3" />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-transparent outline-none text-sm text-premium-dark"
                >
                  <option value="user">Customer</option>
                  <option value="admin">Administrator</option>
                  <option value="delivery">Delivery Partner (Courier)</option>
                </select>
              </div>
            </div>

            <p className="text-[9px] text-premium-dark/40 uppercase tracking-wider leading-relaxed text-center">
              By creating an account, you agree to our <a href="#" className="underline text-premium-dark">Terms of Service</a> and <a href="#" className="underline text-premium-dark">Privacy Policy</a>.
            </p>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-premium w-full flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Beginning...' : 'Begin Your Journey'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-[10px] uppercase tracking-widest text-premium-dark/40 mb-4">
              Already have an account?
            </p>
            <Link to="/login" className="text-xs font-bold text-premium-dark hover:text-premium-accent transition-colors uppercase tracking-widest">
              Sign In Instead
            </Link>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Register;
