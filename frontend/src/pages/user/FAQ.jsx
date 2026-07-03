import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do you ensure food quality during delivery?",
      answer: "We use climate-controlled containers and our couriers are trained in handling delicate culinary items. Every delivery is timed to match the chef's precise specifications."
    },
    {
      question: "What areas do you currently service?",
      answer: "We currently service the Greater London area, with plans to expand to other major European cities in the near future."
    },
    {
      question: "Can I place an order in advance?",
      answer: "Absolutely! We allow pre-ordering up to 7 days in advance, ensuring your meal is prepared exactly when you want it."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, Apple Pay, and Google Pay for your convenience."
    },
    {
      question: "How do I modify or cancel an existing order?",
      answer: "Orders can be modified or cancelled up to 2 hours before the scheduled delivery time through your account dashboard."
    }
  ];

  return (
    <MainLayout>
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-premium-dark">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=2000" 
            alt="FAQ" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-premium-accent mb-6 block">
              Got Questions?
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8">
              You Asked, <br /> <span className="italic">We Answer</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-serif font-bold text-premium-dark mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  className="border border-gray-100"
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-sm font-bold text-premium-dark uppercase tracking-wide">{faq.question}</h3>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform text-premium-dark/40 ${openIndex === idx ? 'rotate-180 text-premium-accent' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-xs text-premium-dark/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQ;
