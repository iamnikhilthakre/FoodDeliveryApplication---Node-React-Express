require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const Food = require('./models/Food');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Clear existing data
    await Restaurant.deleteMany({});
    await Food.deleteMany({});
    console.log('Cleared existing data');

    // Create restaurants
    const restaurants = await Restaurant.create([
      {
        name: "L'Atelier de Cuisine",
        cuisine: "French",
        rating: 4.9,
        deliveryTime: "25-35",
        address: "Mayfair, London",
        reviews: 1240,
        description: "A symphony of traditional French techniques and modern culinary innovation. Led by Executive Chef Julian Marc.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Sora Sushi",
        cuisine: "Japanese",
        rating: 4.8,
        deliveryTime: "20-30",
        address: "Soho, London",
        reviews: 950,
        description: "Experience the art of Edomae-style sushi. Our fish is flown in daily from Toyosu Market.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Trattoria Milano",
        cuisine: "Italian",
        rating: 4.7,
        deliveryTime: "30-45",
        address: "Chelsea, London",
        reviews: 820,
        description: "Authentic Milanese cuisine in the heart of London.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "The Gilded Saffron",
        cuisine: "Modern Indian",
        rating: 4.9,
        deliveryTime: "40-55",
        address: "Belgravia, London",
        reviews: 1100,
        description: "A contemporary take on traditional Indian spices.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Azur Mediterranean",
        cuisine: "Mediterranean",
        rating: 4.6,
        deliveryTime: "25-40",
        address: "Kensington, London",
        reviews: 750,
        description: "Inspired by the sun-drenched coasts of the Mediterranean.",
        image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Luxe Grill",
        cuisine: "French",
        rating: 4.8,
        deliveryTime: "35-50",
        address: "Marylebone, London",
        reviews: 890,
        description: "The ultimate destination for steak lovers.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
      }
    ]);
    console.log('Restaurants created');

    // Create foods
    await Food.create([
      // L'Atelier de Cuisine (French)
      {
        name: "Truffle Tagliatelle",
        description: "Hand-rolled pasta, seasonal black truffle, 36-month aged Parmigiano Reggiano.",
        price: 45,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[0]._id,
        isFeatured: true
      },
      {
        name: "Duck Confit",
        description: "Slow-cooked duck leg, braised red cabbage, orange reduction.",
        price: 52,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1642231877874-ce3e205f39c0?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[0]._id
      },
      {
        name: "Crème Brûlée",
        description: "Classic French dessert with caramelized sugar top.",
        price: 14,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[0]._id
      },

      // Sora Sushi (Japanese)
      {
        name: "Omakase Selection",
        description: "Chef's choice of 12 premium nigiri pieces and one hand roll.",
        price: 120,
        category: "Specialty",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[1]._id,
        isFeatured: true
      },
      {
        name: "Wagyu Tataki",
        description: "Seared A5 Miyazaki Wagyu, ponzu, crispy garlic, scallions.",
        price: 45,
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1677607219966-22fbfa433667?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[1]._id
      },
      {
        name: "Dragon Roll",
        description: "Tempura shrimp, cucumber, avocado, eel sauce, spicy mayo.",
        price: 28,
        category: "Sushi",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[1]._id
      },

      // Trattoria Milano (Italian)
      {
        name: "Osso Buco",
        description: "Braised veal shanks with gremolata and saffron risotto.",
        price: 55,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[2]._id,
        isFeatured: true
      },
      {
        name: "Burrata Pugliese",
        description: "Creamy burrata, heirloom tomatoes, basil oil.",
        price: 24,
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1580638149300-65f0b9e8fbff?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[2]._id
      },
      {
        name: "Tiramisu Classico",

        description: "Espresso-soaked savoiardi, mascarpone, dark chocolate shavings.",
        price: 16,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[2]._id
      },

      // The Gilded Saffron (Modern Indian)
      {
        name: "Tandoori Lamb Chops",
        description: "New Zealand lamb, ginger-garlic marinade, mint chutney, kachumber salad.",
        price: 42,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[3]._id,
        isFeatured: true
      },
      {
        name: "Butter Chicken Deluxe",
        description: "Old Delhi style charcoal grilled chicken, creamy tomato gravy, fenugreek.",
        price: 34,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[3]._id
      },
      {
        name: "Chingri Malai Curry",
        description: "Old Delhi style charcoal grilled chicken, creamy tomato gravy, fenugreek.",
        price: 34,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1588644525273-f37b60d78512?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[3]._id
      },
      {
        name: "Saffron Phirni",
        description: "Ground rice pudding, Kashmiri saffron, silver leaf, pistachios.",
        price: 14,
        category: "Dessert",
        image: "https://images.slurrp.com/prodrich_article/1o4ri25lycg.webp?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[3]._id
      },

      // Azur Mediterranean
      {
        name: "Grilled Octopus",
        description: "Santorini style, fava bean purée, capers, caramelized onions.",
        price: 36,
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[4]._id,
        isFeatured: true
      },
      {
        name: "Lamb Kleftiko",
        description: "Slow-roasted lamb, oregano, lemon, garlic, feta-crusted potatoes.",
        price: 48,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[4]._id
      },
      {
        name: "Baklava Cheesecake",
        description: "Honey-soaked phyllo, pistachio crust, creamy vanilla filling.",
        price: 18,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[4]._id
      },

      // Luxe Grill
      {
        name: "Wagyu Ribeye",
        description: "MBS 9+ Wagyu, roasted garlic, smoked sea salt, red wine jus.",
        price: 95,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1648977555545-4dd006e30d3f?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[5]._id,
        isFeatured: true
      },
      {
        name: "Grilled Lobster Tail",
        description: "Butter-poached, garlic-herb crust, charred lemon, saffron aioli.",
        price: 72,
        category: "Main Course",
        image: "https://plus.unsplash.com/premium_photo-1664475931376-82ac86b4ae58?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[5]._id
      },
      {
        name: "Chocolate Fondant",
        description: "70% dark chocolate, raspberry coulis, Tahitian vanilla bean ice cream.",
        price: 18,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800",
        restaurant: restaurants[5]._id
      }
    ]);
    console.log('Foods created');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
