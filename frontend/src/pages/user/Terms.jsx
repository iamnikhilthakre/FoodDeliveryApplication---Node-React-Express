import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-premium-dark mb-12">Terms of Service</h1>
            
            <div className="space-y-8 text-sm text-premium-dark/70 leading-relaxed">
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">1. Acceptance of Terms</h3>
                <p className="mb-4">By using our services, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">2. Service Description</h3>
                <p className="mb-4">LuxeEats provides a platform for ordering food from curated partner restaurants for delivery to your specified address.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">3. Orders and Payments</h3>
                <p className="mb-4">All orders are subject to availability. Prices include delivery fees and applicable taxes. Payments are processed at the time of ordering.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">4. Cancellation and Refunds</h3>
                <p className="mb-4">Orders can be cancelled up to 2 hours before scheduled delivery. Refunds are issued at our discretion for issues with food quality or delivery.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Terms;
