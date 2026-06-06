import React, { useMemo } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Share2, Heart, Info } from 'lucide-react';
import FoodCard from '../../components/FoodCard';
import useCart from '../../hooks/useCart';
import { useParams } from 'react-router-dom';

const FoodDetails = () => {
  const { addItem } = useCart();
  const { id } = useParams();

  // Mock data for restaurants
  const restaurants = {
    1: {
      id: 1,
      name: "L'Atelier de Cuisine",
      cuisine: "French",
      rating: 4.9,
      reviews: 1240,
      deliveryTime: "25-35",
      location: "Mayfair, London",
      description: "A symphony of traditional French techniques and modern culinary innovation. Led by Executive Chef Julian Marc, L'Atelier brings the essence of Parisian fine dining to your home.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000",
      menu: [
        { id: 101, name: "Truffle Tagliatelle", description: "Hand-rolled pasta, seasonal black truffle, 36-month aged Parmigiano Reggiano.", price: 45, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800" },
        { id: 102, name: "Duck Confit", description: "Slow-cooked duck leg, braised red cabbage, orange reduction, parsnip silk.", price: 52, image: "https://images.unsplash.com/photo-1514516348920-f5d9b7a70249?auto=format&fit=crop&q=80&w=800" },
        { id: 103, name: "Lobster Thermidor", description: "Native lobster, brandy cream, gruyère crust, wilted spinach.", price: 68, image: "https://images.unsplash.com/photo-1553243772-c892706f1839?auto=format&fit=crop&q=80&w=800" },
        { id: 104, name: "Foie Gras Poêlé", description: "Seared foie gras, spiced brioche, fig compote, port reduction.", price: 38, image: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    2: {    
      id: 2, 
      name: "Sora Sushi",
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 950,
      deliveryTime: "20-30",
      location: "Soho, London",
      description: "Experience the art of Edomae-style sushi. Our fish is flown in daily from Toyosu Market, Tokyo, to ensure the highest quality for our patrons.",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=2000",
      menu: [
        { id: 201, name: "Omakase Selection", description: "Chef's choice of 12 premium nigiri pieces and one hand roll.", price: 120, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800" },
        { id: 202, name: "Wagyu Tataki", description: "Seared A5 Miyazaki Wagyu, ponzu, crispy garlic, scallions.", price: 45, image: "https://images.unsplash.com/photo-1529692236671-f1f6e946a8b5?auto=format&fit=crop&q=80&w=800" },
        { id: 203, name: "Dragon Roll", description: "Tempura shrimp, cucumber, avocado, eel sauce, spicy mayo.", price: 28, image: "https://images.unsplash.com/photo-1559700015-8d44c38b7495?auto=format&fit=crop&q=80&w=800" },
        { id: 204, name: "Matcha Tiramisu", description: "Green tea infused ladyfingers, mascarpone cream, cocoa powder.", price: 18, image: "https://images.unsplash.com/photo-1536184071535-78906f7172c2?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    3: {
      id: 3,
      name: "Trattoria Milano",
      cuisine: "Italian",
      rating: 4.7,
      reviews: 820,
      deliveryTime: "30-45",
      location: "Chelsea, London",
      description: "Authentic Milanese cuisine in the heart of London. From Osso Buco to Risotto alla Milanese, we bring the flavors of Northern Italy to your table.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000",
      menu: [
        { id: 301, name: "Osso Buco", description: "Braised veal shanks with gremolata and saffron risotto.", price: 55, image: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&q=80&w=800" },
        { id: 302, name: "Burrata Pugliese", description: "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic.", price: 24, image: "https://images.unsplash.com/photo-1516100882582-76c9a444dd53?auto=format&fit=crop&q=80&w=800" },
        { id: 303, name: "Risotto alla Milanese", description: "Saffron-infused Arborio rice, bone marrow, Parmigiano Reggiano.", price: 38, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800" },
        { id: 304, name: "Tiramisu Classico", description: "Espresso-soaked savoiardi, mascarpone, dark chocolate shavings.", price: 16, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    4: {
      id: 4,
      name: "The Gilded Saffron",
      cuisine: "Modern Indian",
      rating: 4.9,
      reviews: 1100,
      deliveryTime: "40-55",
      location: "Belgravia, London",
      description: "A contemporary take on traditional Indian spices. Our menu celebrates the rich culinary heritage of India with a modern, sophisticated twist.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000",
      menu: [
        { id: 401, name: "Tandoori Lamb Chops", description: "New Zealand lamb, ginger-garlic marinade, mint chutney, kachumber salad.", price: 42, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
        { id: 402, name: "Butter Chicken Deluxe", description: "Old Delhi style charcoal grilled chicken, creamy tomato gravy, fenugreek.", price: 34, image: "https://images.unsplash.com/photo-1603894584713-f484439d3b73?auto=format&fit=crop&q=80&w=800" },
        { id: 403, name: "Paneer Tikka", description: "Cottage cheese, bell peppers, pickling spices, yogurt marinade.", price: 26, image: "https://images.unsplash.com/photo-1567184109411-47a7a3946d2f?auto=format&fit=crop&q=80&w=800" },
        { id: 404, name: "Saffron Phirni", description: "Ground rice pudding, Kashmiri saffron, silver leaf, pistachios.", price: 14, image: "https://images.unsplash.com/photo-1589113182023-708e184abc33?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    5: {
      id: 5,
      name: "Azur Mediterranean",
      cuisine: "Mediterranean",
      rating: 4.6,
      reviews: 750,
      deliveryTime: "25-40",
      location: "Kensington, London",
      description: "Inspired by the sun-drenched coasts of the Mediterranean. We focus on fresh, seasonal ingredients and the vibrant flavors of the sea.",
      image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=2000",
      menu: [
        { id: 501, name: "Grilled Octopus", description: "Santorini style, fava bean purée, capers, caramelized onions.", price: 36, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800" },
        { id: 502, name: "Lamb Kleftiko", description: "Slow-roasted lamb, oregano, lemon, garlic, feta-crusted potatoes.", price: 48, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" },
        { id: 503, name: "Meze Platter", description: "Hummus, babaganoush, tzatziki, dolmades, warm pita bread.", price: 28, image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800" },
        { id: 504, name: "Baklava Cheesecake", description: "Honey-soaked phyllo, pistachio crust, creamy vanilla filling.", price: 18, image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800" }
      ]
    },
    6: {
      id: 6,
      name: "Luxe Grill",
      cuisine: "French",
      rating: 4.8,
      reviews: 890,
      deliveryTime: "35-50",
      location: "Marylebone, London",
      description: "The ultimate destination for steak lovers. We source the finest cuts of meat and grill them to perfection over an open wood fire.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
      menu: [
        { id: 601, name: "Wagyu Ribeye", description: "MBS 9+ Wagyu, roasted garlic, smoked sea salt, red wine jus.", price: 95, image: "https://images.unsplash.com/photo-1546248136-24b0ca44796d?auto=format&fit=crop&q=80&w=800" },
        { id: 602, name: "Grilled Lobster Tail", description: "Butter-poached, garlic-herb crust, charred lemon, saffron aioli.", price: 72, image: "https://images.unsplash.com/photo-1553243772-c892706f1839?auto=format&fit=crop&q=80&w=800" },
        { id: 603, name: "Truffle Mac & Cheese", description: "Gruyère, sharp cheddar, black truffle, panko herb crust.", price: 22, image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800" },
        { id: 604, name: "Chocolate Fondant", description: "70% dark chocolate, raspberry coulis, Tahitian vanilla bean ice cream.", price: 18, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800" }
        ]
    }
  };

  const restaurant = useMemo(() => restaurants[id] || restaurants[1], [id]);

  const handleAddToCart = (food) => {
    addItem(food, restaurant.id);
  };

  return (
    <MainLayout>
      {/* Restaurant Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-premium-dark/40 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-premium-accent mb-6 block">
              {restaurant.cuisine}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] uppercase tracking-widest text-white/70 font-bold">
              <span className="flex items-center"><Star fill="currentColor" size={14} className="text-premium-accent mr-2" /> {restaurant.rating} ({restaurant.reviews} Reviews)</span>
              <span className="flex items-center"><Clock size={14} className="mr-2" /> {restaurant.deliveryTime} Min</span>
              <span className="flex items-center"><MapPin size={14} className="mr-2" /> {restaurant.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info & Menu */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-6">About</h4>
                  <p className="text-xs text-premium-dark/50 leading-relaxed italic">
                    "{restaurant.description}"
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-6">Details</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold">
                      <Info size={14} className="mr-3 text-premium-accent" />
                      Allergens Information
                    </li>
                    <li className="flex items-center text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold">
                      <Share2 size={14} className="mr-3 text-premium-accent" />
                      Share Experience
                    </li>
                    <li className="flex items-center text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold">
                      <Heart size={14} className="mr-3 text-premium-accent" />
                      Add to Favorites
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-16 border-b border-gray-100 pb-8">
                <h2 className="text-3xl font-serif font-bold text-premium-dark">Signature Menu</h2>
                <span className="text-[10px] uppercase tracking-widest text-premium-dark/30 font-bold">
                  {restaurant.menu.length} CURATED DISHES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {restaurant.menu.map((item, idx) => (
                  <FoodCard key={item.id} food={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FoodDetails;
