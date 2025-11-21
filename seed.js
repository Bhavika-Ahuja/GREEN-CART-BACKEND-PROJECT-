require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://bhavikaahuja495_db_user:%2E%23bnwhtZLkhYw6T@cluster0.mwpxdxh.mongodb.net/greencart?retryWrites=true&w=majority";

// Seed data for sellers
const sellers = [
  {
    name: "Sarah Green",
    email: "sarah@greenvalleyfarm.com",
    password: "password123",
    role: "seller",
    city: "Portland",
    businessName: "Green Valley Farm",
    businessDescription: "Organic farm producing fresh vegetables and fruits using sustainable farming practices"
  },
  {
    name: "Mike Johnson",
    email: "mike@ecosoapco.com",
    password: "password123",
    role: "seller",
    city: "Seattle",
    businessName: "EcoSoap Co.",
    businessDescription: "Handmade natural soaps and personal care products with zero waste packaging"
  },
  {
    name: "Lisa Chen",
    email: "lisa@sustainableliving.com",
    password: "password123",
    role: "seller",
    city: "San Francisco",
    businessName: "Sustainable Living",
    businessDescription: "Eco-friendly home goods and accessories for conscious consumers"
  },
  {
    name: "David Martinez",
    email: "david@organicharvest.com",
    password: "password123",
    role: "seller",
    city: "Austin",
    businessName: "Organic Harvest",
    businessDescription: "Fresh organic produce delivered from local farms"
  },
  {
    name: "Emma Wilson",
    email: "emma@greenstitch.com",
    password: "password123",
    role: "seller",
    city: "Denver",
    businessName: "Green Stitch",
    businessDescription: "Sustainable fashion and clothing made from organic and recycled materials"
  },
  {
    name: "James Brown",
    email: "james@earthroots.com",
    password: "password123",
    role: "seller",
    city: "Portland",
    businessName: "Earth Roots",
    businessDescription: "Organic beverages and health foods sourced locally"
  },
  {
    name: "Sophia Lee",
    email: "sophia@naturegarden.com",
    password: "password123",
    role: "seller",
    city: "Seattle",
    businessName: "Nature's Garden",
    businessDescription: "Garden supplies and plants for sustainable home gardening"
  }
];

// Products by category
const productsByCategory = {
  Vegetables: [
    { name: "Organic Tomatoes", description: "Fresh organic tomatoes grown locally without pesticides", price: 4.99, tags: ["organic", "local"], carbon: "Low", stock: 50 },
    { name: "Fresh Carrots", description: "Crunchy organic carrots perfect for salads and cooking", price: 3.49, tags: ["organic", "local"], carbon: "Very Low", stock: 60 },
    { name: "Green Lettuce", description: "Crisp organic lettuce harvested daily", price: 2.99, tags: ["organic", "local"], carbon: "Very Low", stock: 40 },
    { name: "Bell Peppers", description: "Colorful organic bell peppers rich in vitamins", price: 5.99, tags: ["organic", "local"], carbon: "Low", stock: 35 },
    { name: "Organic Spinach", description: "Fresh spinach leaves packed with nutrients", price: 3.99, tags: ["organic", "local"], carbon: "Very Low", stock: 45 },
    { name: "Broccoli", description: "Organic broccoli crowns full of fiber", price: 4.49, tags: ["organic", "local"], carbon: "Low", stock: 30 },
    { name: "Zucchini", description: "Fresh organic zucchini for healthy meals", price: 3.79, tags: ["organic", "local"], carbon: "Very Low", stock: 40 },
    { name: "Cucumber", description: "Crisp organic cucumbers perfect for salads", price: 2.49, tags: ["organic", "local"], carbon: "Very Low", stock: 55 },
    { name: "Kale", description: "Nutrient-rich organic kale leaves", price: 3.99, tags: ["organic", "local"], carbon: "Very Low", stock: 35 },
    { name: "Sweet Potatoes", description: "Organic sweet potatoes rich in vitamins", price: 4.29, tags: ["organic", "local"], carbon: "Low", stock: 50 }
  ],
  Fruits: [
    { name: "Organic Apples", description: "Crisp organic apples from local orchards", price: 5.99, tags: ["organic", "local"], carbon: "Low", stock: 60 },
    { name: "Fresh Strawberries", description: "Sweet organic strawberries picked fresh", price: 6.99, tags: ["organic", "local"], carbon: "Low", stock: 40 },
    { name: "Bananas", description: "Fair trade organic bananas", price: 3.99, tags: ["organic", "fair-trade"], carbon: "Medium", stock: 80 },
    { name: "Blueberries", description: "Antioxidant-rich organic blueberries", price: 7.99, tags: ["organic", "local"], carbon: "Low", stock: 35 },
    { name: "Oranges", description: "Juicy organic oranges full of vitamin C", price: 5.49, tags: ["organic", "local"], carbon: "Low", stock: 50 },
    { name: "Grapes", description: "Sweet organic grapes perfect for snacking", price: 6.49, tags: ["organic", "local"], carbon: "Low", stock: 45 },
    { name: "Peaches", description: "Ripe organic peaches from local farms", price: 5.99, tags: ["organic", "local"], carbon: "Low", stock: 30 },
    { name: "Pears", description: "Fresh organic pears with natural sweetness", price: 4.99, tags: ["organic", "local"], carbon: "Low", stock: 40 },
    { name: "Watermelon", description: "Refreshing organic watermelon", price: 8.99, tags: ["organic", "local"], carbon: "Low", stock: 25 },
    { name: "Avocados", description: "Creamy organic avocados rich in healthy fats", price: 7.49, tags: ["organic"], carbon: "Medium", stock: 55 }
  ],
  "Personal Care": [
    { name: "Handmade Lavender Soap", description: "Natural soap with essential lavender oil", price: 8.50, tags: ["handmade", "vegan", "zero-waste"], carbon: "Very Low", stock: 100 },
    { name: "Organic Shampoo Bar", description: "Plastic-free shampoo bar with natural ingredients", price: 12.99, tags: ["handmade", "vegan", "zero-waste"], carbon: "Very Low", stock: 80 },
    { name: "Natural Deodorant", description: "Aluminum-free deodorant with essential oils", price: 9.99, tags: ["handmade", "vegan"], carbon: "Very Low", stock: 70 },
    { name: "Bamboo Toothbrush", description: "Biodegradable bamboo toothbrush", price: 4.99, tags: ["zero-waste", "vegan"], carbon: "Very Low", stock: 150 },
    { name: "Organic Body Lotion", description: "Moisturizing lotion with organic ingredients", price: 15.99, tags: ["handmade", "vegan", "organic"], carbon: "Very Low", stock: 60 },
    { name: "Face Cream", description: "Natural face cream for all skin types", price: 18.99, tags: ["handmade", "vegan", "organic"], carbon: "Very Low", stock: 50 },
    { name: "Lip Balm Set", description: "Set of 3 natural lip balms", price: 11.99, tags: ["handmade", "vegan"], carbon: "Very Low", stock: 90 },
    { name: "Bath Bombs", description: "Handmade bath bombs with essential oils", price: 6.99, tags: ["handmade", "vegan"], carbon: "Very Low", stock: 100 },
    { name: "Organic Sunscreen", description: "Reef-safe mineral sunscreen", price: 16.99, tags: ["organic", "vegan"], carbon: "Low", stock: 45 },
    { name: "Hair Conditioner Bar", description: "Solid conditioner bar for healthy hair", price: 13.99, tags: ["handmade", "vegan", "zero-waste"], carbon: "Very Low", stock: 65 }
  ],
  "Home & Garden": [
    { name: "Reusable Shopping Bags", description: "Durable cotton shopping bags set of 5", price: 12.99, tags: ["recycled", "zero-waste"], carbon: "Low", stock: 120 },
    { name: "Bamboo Utensil Set", description: "Portable bamboo cutlery set", price: 9.99, tags: ["zero-waste", "vegan"], carbon: "Very Low", stock: 100 },
    { name: "Beeswax Food Wraps", description: "Reusable alternative to plastic wrap", price: 14.99, tags: ["handmade", "zero-waste"], carbon: "Very Low", stock: 80 },
    { name: "Compost Bin", description: "Kitchen compost bin for organic waste", price: 29.99, tags: ["recycled", "zero-waste"], carbon: "Low", stock: 40 },
    { name: "Herb Garden Kit", description: "Complete kit to grow herbs at home", price: 24.99, tags: ["organic", "local"], carbon: "Low", stock: 50 },
    { name: "Solar Garden Lights", description: "Solar-powered outdoor lighting", price: 34.99, tags: ["zero-waste"], carbon: "Low", stock: 35 },
    { name: "Recycled Planters", description: "Set of 3 planters made from recycled materials", price: 19.99, tags: ["recycled"], carbon: "Low", stock: 60 },
    { name: "Natural Cleaning Kit", description: "Eco-friendly cleaning products bundle", price: 27.99, tags: ["vegan", "zero-waste"], carbon: "Very Low", stock: 45 },
    { name: "Bamboo Dish Set", description: "Biodegradable bamboo plates and bowls", price: 32.99, tags: ["zero-waste", "vegan"], carbon: "Low", stock: 55 },
    { name: "Rain Barrel", description: "Collect rainwater for garden irrigation", price: 89.99, tags: ["recycled"], carbon: "Medium", stock: 15 }
  ],
  Clothing: [
    { name: "Organic Cotton T-Shirt", description: "Soft organic cotton tee in various colors", price: 24.99, tags: ["organic", "fair-trade"], carbon: "Low", stock: 100 },
    { name: "Recycled Denim Jeans", description: "Stylish jeans made from recycled denim", price: 59.99, tags: ["recycled"], carbon: "Medium", stock: 60 },
    { name: "Hemp Hoodie", description: "Comfortable hoodie made from hemp fiber", price: 49.99, tags: ["organic", "vegan"], carbon: "Low", stock: 45 },
    { name: "Bamboo Socks", description: "Soft bamboo fiber socks pack of 3", price: 15.99, tags: ["organic", "vegan"], carbon: "Very Low", stock: 120 },
    { name: "Organic Yoga Pants", description: "Stretchy organic cotton yoga pants", price: 39.99, tags: ["organic", "fair-trade"], carbon: "Low", stock: 70 },
    { name: "Recycled Jacket", description: "Warm jacket made from recycled materials", price: 79.99, tags: ["recycled"], carbon: "Medium", stock: 35 },
    { name: "Linen Dress", description: "Elegant dress made from organic linen", price: 64.99, tags: ["organic", "handmade"], carbon: "Low", stock: 40 },
    { name: "Cotton Tote Bag", description: "Reusable organic cotton tote", price: 12.99, tags: ["organic", "zero-waste"], carbon: "Very Low", stock: 150 },
    { name: "Wool Sweater", description: "Cozy sweater from ethically sourced wool", price: 69.99, tags: ["organic", "fair-trade"], carbon: "Low", stock: 50 },
    { name: "Organic Underwear Set", description: "Comfortable organic cotton underwear", price: 29.99, tags: ["organic", "fair-trade"], carbon: "Very Low", stock: 80 }
  ],
  "Food & Beverages": [
    { name: "Organic Coffee Beans", description: "Fair trade organic coffee beans", price: 14.99, tags: ["organic", "fair-trade"], carbon: "Medium", stock: 90 },
    { name: "Raw Honey", description: "Local raw honey from sustainable beekeepers", price: 11.99, tags: ["organic", "local"], carbon: "Very Low", stock: 70 },
    { name: "Organic Green Tea", description: "Premium organic green tea leaves", price: 9.99, tags: ["organic", "fair-trade"], carbon: "Low", stock: 100 },
    { name: "Almond Butter", description: "Organic almond butter with no additives", price: 12.99, tags: ["organic", "vegan"], carbon: "Low", stock: 60 },
    { name: "Quinoa", description: "Organic quinoa from fair trade farms", price: 8.99, tags: ["organic", "fair-trade", "vegan"], carbon: "Low", stock: 80 },
    { name: "Coconut Oil", description: "Cold-pressed organic coconut oil", price: 13.99, tags: ["organic", "vegan"], carbon: "Medium", stock: 75 },
    { name: "Organic Pasta", description: "Whole wheat organic pasta", price: 4.99, tags: ["organic", "vegan"], carbon: "Low", stock: 120 },
    { name: "Herbal Tea Set", description: "Collection of 6 organic herbal teas", price: 16.99, tags: ["organic", "fair-trade"], carbon: "Low", stock: 55 },
    { name: "Organic Olive Oil", description: "Extra virgin organic olive oil", price: 18.99, tags: ["organic"], carbon: "Low", stock: 65 },
    { name: "Dark Chocolate", description: "Fair trade organic dark chocolate bars", price: 5.99, tags: ["organic", "fair-trade", "vegan"], carbon: "Medium", stock: 110 }
  ],
  Other: [
    { name: "Recycled Notebook", description: "Journal made from recycled paper", price: 8.99, tags: ["recycled"], carbon: "Very Low", stock: 100 },
    { name: "Eco-Friendly Backpack", description: "Backpack made from recycled plastic bottles", price: 44.99, tags: ["recycled"], carbon: "Medium", stock: 40 },
    { name: "Wooden Toys Set", description: "Handmade wooden toys for children", price: 29.99, tags: ["handmade"], carbon: "Low", stock: 35 },
    { name: "Soy Candles", description: "Hand-poured soy candles with essential oils", price: 16.99, tags: ["handmade", "vegan"], carbon: "Very Low", stock: 80 },
    { name: "Yoga Mat", description: "Eco-friendly yoga mat from natural rubber", price: 54.99, tags: ["organic", "vegan"], carbon: "Low", stock: 45 },
    { name: "Reusable Water Bottle", description: "Stainless steel insulated water bottle", price: 24.99, tags: ["zero-waste"], carbon: "Low", stock: 90 },
    { name: "Beeswax Candles", description: "Natural beeswax candles set of 4", price: 19.99, tags: ["handmade"], carbon: "Very Low", stock: 70 },
    { name: "Organic Pet Treats", description: "Healthy organic treats for dogs", price: 11.99, tags: ["organic", "local"], carbon: "Low", stock: 60 },
    { name: "Meditation Cushion", description: "Organic cotton meditation cushion", price: 39.99, tags: ["organic", "handmade"], carbon: "Low", stock: 30 },
    { name: "Essential Oil Set", description: "Set of 6 organic essential oils", price: 34.99, tags: ["organic", "vegan"], carbon: "Low", stock: 55 }
  ]
};

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({ role: 'seller' });
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create sellers
    console.log('👥 Creating sellers...');
    const createdSellers = [];
    for (const sellerData of sellers) {
      const seller = new User(sellerData);
      await seller.save();
      createdSellers.push(seller);
      console.log(`   ✓ Created seller: ${seller.businessName}`);
    }

    // Create products
    console.log('📦 Creating products...');
    let totalProducts = 0;
    
    for (const [category, products] of Object.entries(productsByCategory)) {
      console.log(`\n   Category: ${category}`);
      
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        const seller = createdSellers[i % createdSellers.length]; // Distribute products among sellers
        
        const product = new Product({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: category,
          sustainabilityTags: productData.tags,
          stock: productData.stock,
          carbonFootprint: productData.carbon,
          seller: seller._id,
          images: ['/images/placeholder.jpg'],
          rating: Math.random() * 2 + 3, // Random rating between 3-5
          totalRatings: Math.floor(Math.random() * 50) + 5 // Random 5-55 ratings
        });
        
        await product.save();
        totalProducts++;
        console.log(`   ✓ ${productData.name}`);
      }
    }

    console.log(`\n✅ Database seeded successfully!`);
    console.log(`   📊 Created ${createdSellers.length} sellers`);
    console.log(`   📦 Created ${totalProducts} products`);
    console.log(`   🎯 ${Object.keys(productsByCategory).length} categories`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
