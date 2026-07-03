import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col mb-6">
              <span className="text-xl font-serif font-bold tracking-tighter text-premium-dark">
                LUXE<span className="text-premium-accent italic">EATS</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-premium-dark/50 -mt-1">
                Curated Dining
              </span>
            </Link>
            <p className="text-xs text-premium-dark/50 leading-relaxed max-w-xs">
              Experience the finest culinary delights delivered with precision and elegance. 
              Elevating your home dining to a masterpiece.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark mb-6">Explore</h4>
            <ul className="space-y-4 text-xs text-premium-dark/60">
              <li><Link to="/restaurants" className="hover:text-premium-accent transition-colors">Restaurants</Link></li>
              <li><Link to="/cuisines" className="hover:text-premium-accent transition-colors">Cuisines</Link></li>
              <li><Link to="/offers" className="hover:text-premium-accent transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark mb-6">Company</h4>
            <ul className="space-y-4 text-xs text-premium-dark/60">
              <li><Link to="/about" className="hover:text-premium-accent transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-premium-accent transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-premium-accent transition-colors">Careers</Link></li>
              <li><Link to="/faq" className="hover:text-premium-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="mailto:contact@luxeeats.com" className="text-premium-dark/40 hover:text-premium-accent transition-colors">
                <Mail size={18} strokeWidth={1.5} />
              </a>
              <a href="tel:+442012345678" className="text-premium-dark/40 hover:text-premium-accent transition-colors">
                <Phone size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-premium-dark/40 hover:text-premium-accent transition-colors">
                <Globe size={18} strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-xs text-premium-dark/50">
              Subscribe to our newsletter for curated updates.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-premium-dark/40">
            © 2026 LUXEEATS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-premium-dark/40">
            <Link to="/privacy" className="hover:text-premium-dark transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-premium-dark transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
