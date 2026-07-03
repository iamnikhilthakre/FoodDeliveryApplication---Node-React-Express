import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Percent, Gift, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: 'First Order Discount',
      description: 'Get 20% off on your first order with code WELCOME20',
      discount: '20%',
      code: 'WELCOME20',
      validUntil: 'Dec 31, 2026'
    },
    {
      id: 2,
      title: 'Weekend Special',
      description: 'Free delivery on orders over $50 every weekend',
      discount: 'Free Delivery',
      code: 'WEEKEND50',
      validUntil: 'Every Weekend'
    },
    {
      id: 3,
      title: 'Loyalty Reward',
      description: 'Earn points for every order and redeem for discounts',
      discount: 'Points System',
      code: 'LOYALTY',
      validUntil: 'Ongoing'
    }
  ];

  return (
    <MainLayout>
      <section className="section-padding pt-32 bg-premium-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Exclusive Deals
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-premium-dark mb-4">
              Special Offers
            </h1>
            <p className="text-premium-dark/60 max-w-2xl mx-auto">
              Enjoy exclusive discounts and promotions from our partner restaurants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-premium-accent/10 flex items-center justify-center text-premium-accent">
                    <Percent size={24} />
                  </div>
                  <span className="text-2xl font-serif font-bold text-premium-accent">
                    {offer.discount}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-premium-dark mb-3">
                  {offer.title}
                </h3>
                <p className="text-xs text-premium-dark/60 mb-6 leading-relaxed">
                  {offer.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-premium-dark/40 text-[10px] uppercase tracking-widest">
                    <Clock size={12} className="mr-2" />
                    {offer.validUntil}
                  </div>
                  <span className="text-xs font-bold text-premium-accent uppercase tracking-widest">
                    {offer.code}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/restaurants" 
              className="btn-premium inline-flex items-center space-x-2"
            >
              <span>Explore Restaurants</span>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Offers;
