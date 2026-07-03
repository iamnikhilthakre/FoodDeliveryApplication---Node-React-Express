import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';

const Careers = () => {
  return (
    <MainLayout>
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-premium-dark">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000" 
            alt="Careers" 
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
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8">
              Craft Your <br /> <span className="italic">Legacy</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-serif font-bold text-premium-dark mb-12 text-center">Open Positions</h2>
            
            <div className="space-y-8">
              {[
                { title: "Head of Culinary Logistics", location: "London", type: "Full-time" },
                { title: "Senior Courier (London)", location: "London", type: "Full-time" },
                { title: "Restaurant Relations Manager", location: "London", type: "Full-time" },
                { title: "UX/UI Designer", location: "Remote", type: "Full-time" }
              ].map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  className="p-8 border border-gray-100 hover:border-premium-accent transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-serif font-bold text-premium-dark mb-2 md:mb-0">{job.title}</h3>
                    <div className="flex space-x-4 text-xs uppercase tracking-widest text-premium-dark/60">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 text-[10px] uppercase tracking-widest font-bold text-premium-accent hover:underline">
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Careers;
