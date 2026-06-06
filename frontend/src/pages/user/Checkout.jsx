import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import useCart from '../../hooks/useCart';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../features/orders/orderApi';
import { clearCart } from '../../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, subtotal, deliveryFee, total } = useCart();
  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    apartment: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!address.street) {
      alert("Please provide a delivery address.");
      setStep(1);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({ food: item.id, quantity: item.quantity })),
        totalPrice: total,
        address: `${address.street}${address.apartment ? ', ' + address.apartment : ''}`
      };
      
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      setStep(3);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(error || "Order placement failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 border-b border-gray-200 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
                The Final Step
              </span>
              <h1 className="text-4xl font-serif font-bold text-premium-dark">Checkout</h1>
            </div>
            {/* Stepper */}
            <div className="flex items-center space-x-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    step >= s ? 'bg-premium-dark text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && <div className="w-12 h-[1px] bg-gray-200" />}
                </div>
              ))}
            </div>
          </div>

          {step === 3 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center bg-white p-20 border border-gray-100 shadow-xl"
            >
              <div className="w-20 h-20 bg-green-500/10 flex items-center justify-center text-green-500 mx-auto mb-10">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-premium-dark mb-6">Order Confirmed</h2>
              <p className="text-xs text-premium-dark/50 uppercase tracking-widest leading-relaxed mb-10">
                Your culinary journey has begun. <br />
                Our courier will arrive in approximately 35 minutes.
              </p>
              <button 
                onClick={() => navigate('/orders')}
                className="btn-premium w-full"
              >
                Track Your Order
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              {/* Left Column: Forms */}
              <div className="lg:col-span-2 space-y-12">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-12 border border-gray-100 shadow-sm"
                  >
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-10 pb-6 border-b border-gray-50 flex items-center">
                      <MapPin size={16} className="mr-4 text-premium-accent" />
                      Delivery Information
                    </h3>
                    <form className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Street Address</label>
                          <input 
                            type="text" 
                            placeholder="12 Grosvenor Square" 
                            className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest" 
                            value={address.street}
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Apartment / Suite</label>
                          <input 
                            type="text" 
                            placeholder="Penthouse 4" 
                            className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest" 
                            value={address.apartment}
                            onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                          />
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-premium w-full mt-12 flex items-center justify-center space-x-3"
                      >
                        <span>Continue to Payment</span>
                        <ChevronRight size={14} />
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-12 border border-gray-100 shadow-sm"
                  >
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-10 pb-6 border-b border-gray-50 flex items-center">
                      <CreditCard size={16} className="mr-4 text-premium-accent" />
                      Payment Method
                    </h3>
                    <div className="space-y-8">
                      <div className="border border-premium-dark p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CreditCard size={20} className="text-premium-dark" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Credit or Debit Card</span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-premium-dark" />
                      </div>
                      <div className="space-y-6">
                        <input type="text" placeholder="CARD NUMBER" className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest" />
                        <div className="grid grid-cols-2 gap-8">
                          <input type="text" placeholder="MM/YY" className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest" />
                          <input type="text" placeholder="CVC" className="w-full border-b border-gray-200 py-3 outline-none focus:border-premium-dark text-xs uppercase tracking-widest" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-[9px] uppercase tracking-[0.2em] text-premium-dark/30 bg-premium-light p-4">
                        <Lock size={12} />
                        <span>Secured by 256-bit encryption</span>
                      </div>
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="btn-premium w-full mt-12"
                      >
                        {loading ? 'Processing...' : 'Complete Order'}
                      </button>
                      <button 
                        onClick={() => setStep(1)}
                        className="w-full text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 hover:text-premium-dark transition-colors"
                      >
                        Back to Delivery
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column: Summary */}
              <div className="lg:col-span-1">
                <div className="bg-premium-dark text-white p-10 sticky top-32">
                  <h3 className="text-xl font-serif font-bold mb-8 border-b border-white/10 pb-6 uppercase tracking-widest">Your Selection</h3>
                  <div className="space-y-6 mb-12">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-grow pr-4">
                          <p className="text-[10px] uppercase tracking-widest font-bold">{item.name}</p>
                          <p className="text-[8px] uppercase tracking-widest text-white/40 mt-1">QTY: {item.quantity}</p>
                        </div>
                        <span className="text-[10px] font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                      <span>Delivery</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-6 border-t border-white/10">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Total</span>
                      <span className="text-3xl font-serif font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Checkout;
