import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <MainLayout>
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-premium-dark">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Dining" 
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
              Established 1924
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8">
              The Art of <br /> <span className="italic">Service</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-serif font-bold text-premium-dark mb-12">A Century of Excellence</h2>
            <div className="space-y-8 text-sm text-premium-dark/70 leading-relaxed font-light tracking-wide">
              <p>
                LuxeEats began not as a digital platform, but as a promise. In the winter of 1924, 
                our founder, Henri Marc, realized that true luxury wasn't defined by the walls of 
                a dining room, but by the precision of the service and the integrity of the ingredients.
              </p>
              <p>
                What started as a bespoke courier service for the elite of London's Mayfair has evolved 
                into a global standard for culinary logistics. We believe that a three-Michelin-star 
                meal should lose none of its soul in transit. Every dish we deliver is treated with 
                the reverence it deserves—transported in climate-controlled environments and handled 
                by professionals who understand the delicate balance of a reduction or the fragility 
                of a perfectly tempered chocolate.
              </p>
              <p>
                Today, LuxeEats remains a family-governed institution. We don't just partner with 
                restaurants; we curate an exclusive circle of culinary masters who share our obsession 
                with the "Golden Hour"—that precise moment when a dish is at its peak of flavor and 
                texture.
              </p>
              <p className="italic font-serif text-lg text-premium-dark pt-8">
                "We don't deliver food. We deliver an atmosphere."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 bg-premium-light">
        {[
          { title: "Precision", desc: "Every second is accounted for, ensuring your meal arrives at the exact temperature intended by the chef." },
          { title: "Curation", desc: "Our selection process is rigorous, accepting fewer than 5% of restaurants that apply to our circle." },
          { title: "Discretion", desc: "Our couriers are trained in the silent art of service, ensuring your privacy is never compromised." }
        ].map((item, idx) => (
          <div key={idx} className="p-16 border-r border-gray-100 last:border-0 flex flex-col items-center text-center">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-6">{item.title}</h3>
            <p className="text-xs text-premium-dark/60 leading-relaxed tracking-wide">{item.desc}</p>
          </div>
        ))}
      </section>
    </MainLayout>
  );
};

export default About;
