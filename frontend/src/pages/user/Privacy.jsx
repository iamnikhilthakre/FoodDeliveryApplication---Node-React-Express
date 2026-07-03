import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';

const Privacy = () => {
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-premium-dark mb-12">Privacy Policy</h1>
            
            <div className="space-y-8 text-sm text-premium-dark/70 leading-relaxed">
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">1. Information We Collect</h3>
                <p className="mb-4">We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment information.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">2. How We Use Your Information</h3>
                <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you about your orders.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">3. Information Sharing</h3>
                <p className="mb-4">We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-serif font-bold text-premium-dark mb-4">4. Data Security</h3>
                <p className="mb-4">We implement appropriate security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Privacy;
