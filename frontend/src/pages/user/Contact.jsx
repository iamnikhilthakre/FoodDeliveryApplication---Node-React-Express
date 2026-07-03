import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <MainLayout>
      <section className="section-padding pt-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-premium-dark">
              Contact Us
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-premium-accent/10 flex items-center justify-center text-premium-accent flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-premium-dark mb-2">Visit Us</h3>
                    <p className="text-xs text-premium-dark/60">
                      123 Premium Street<br />
                      Mayfair, London W1K 2HR
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-premium-accent/10 flex items-center justify-center text-premium-accent flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-premium-dark mb-2">Email Us</h3>
                    <a href="mailto:contact@luxeeats.com" className="text-xs text-premium-dark/60 hover:text-premium-accent transition-colors">
                      contact@luxeeats.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-premium-accent/10 flex items-center justify-center text-premium-accent flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-premium-dark mb-2">Call Us</h3>
                    <a href="tel:+442012345678" className="text-xs text-premium-dark/60 hover:text-premium-accent transition-colors">
                      +44 (0) 20 1234 5678
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-premium-light p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark bg-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    className="w-full border-b border-gray-100 py-3 outline-none focus:border-premium-dark bg-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-3">
                    Your Message
                  </label>
                  <textarea 
                    rows="6"
                    required
                    className="w-full border border-gray-100 p-4 outline-none focus:border-premium-dark bg-transparent"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <Button type="submit" className="w-full md:w-auto px-12">
                  <span className="flex items-center space-x-2">
                    <span>Send Message</span>
                    <Send size={14} />
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
