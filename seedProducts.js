// Script to populate database with sample products
const sampleProducts = [
  // SAREES (3 products)
  {
    name: "Urban Drape Rockies Blue Handwoven Saree",
    description: "Elegant handwoven saree in stunning Rockies Blue. Perfect for special occasions. Crafted with premium quality fabric.",
    price: 38000,
    category: "sarees",
    images: ["https://fmlk.lk/cdn/shop/products/fwwf_720x.jpg?v=1662200240"],
    sizes: ["One Size"],
    colors: ["Blue"],
    stock: 12,
    featured: true,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: "Urban Drape Poreallas Nights Handwoven Saree",
    description: "Stunning Poreallas Nights design handwoven saree. Elegant and sophisticated for evening events.",
    price: 38000,
    category: "sarees",
    images: ["https://fmlk.lk/cdn/shop/products/jnjnj_720x.jpg?v=1754903537"],
    sizes: ["One Size"],
    colors: ["Purple", "Gold"],
    stock: 15,
    featured: true,
    rating: 4.5,
    numReviews: 18
  },
  {
    name: "Urban Drape Dahawal Ira Saree",
    description: "Beautiful Dahawal Ira saree with traditional motifs. Premium handwoven quality for festive occasions.",
    price: 23500,
    category: "sarees",
    images: ["https://fmlk.lk/cdn/shop/products/vzcd_720x.jpg?v=1662171135"],
    sizes: ["One Size"],
    colors: ["Maroon", "Gold"],
    stock: 0,
    featured: false,
    rating: 4.9,
    numReviews: 31
  },

  // DRESSES (3 products)
  {
    name: "Queen Of Heart Dress",
    description: "Elegant Queen Of Heart dress. Perfect for parties and special occasions. Flattering silhouette.",
    price: 12760,
    category: "dresses",
    images: ["https://fmlk.lk/cdn/shop/products/1_077ea745-4b1d-402f-9548-0e97a28c73ed_720x.jpg?v=1630642213"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    stock: 20,
    featured: true,
    rating: 4.4,
    numReviews: 35
  },
  {
    name: "Grey Kimono Wrap Dress",
    description: "Stylish grey kimono wrap dress. Comfortable and elegant. Perfect for casual and semi-formal occasions.",
    price: 16135,
    category: "dresses",
    images: ["https://fmlk.lk/cdn/shop/files/grey_wrap_dress_720x.jpg?v=1753764520"],
    sizes: ["S", "M", "L"],
    colors: ["Grey"],
    stock: 15,
    featured: true,
    rating: 4.7,
    numReviews: 42
  },
  {
    name: "Indigo Tie Dye Kimono Wrap Dress",
    description: "Beautiful indigo tie dye kimono wrap dress. Unique artisan design. Comfortable fit for all day wear.",
    price: 16135,
    category: "dresses",
    images: ["https://fmlk.lk/cdn/shop/files/01_indigo_wrap_dress_720x.jpg?v=1753765819"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Indigo"],
    stock: 22,
    featured: true,
    rating: 4.6,
    numReviews: 28
  },

  // TOPS (3 products)
  {
    name: "Grey Tie Dye Top",
    description: "Trendy grey tie dye top. Comfortable and stylish. Perfect for casual outings.",
    price: 7185,
    category: "tops",
    images: ["https://fmlk.lk/cdn/shop/files/grey_top_720x.jpg?v=1753765217"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey"],
    stock: 25,
    featured: true,
    rating: 4.3,
    numReviews: 19
  },
  {
    name: "Indigo Tie Dye Top",
    description: "Beautiful indigo tie dye top. Hand-crafted with unique patterns. Comfortable cotton blend.",
    price: 7185,
    category: "tops",
    images: ["https://fmlk.lk/cdn/shop/products/1_2e462f28-64c3-4364-a67b-e738b650babe_720x.jpg?v=1630642492"],
    sizes: ["S", "M", "L"],
    colors: ["Indigo"],
    stock: 20,
    featured: true,
    rating: 4.5,
    numReviews: 25
  },
  {
    name: "Batik Clubs Top - Black",
    description: "Stylish batik clubs top in black. Unique artisan batik design. Perfect for casual and smart casual looks.",
    price: 11160,
    category: "tops",
    images: ["https://fmlk.lk/cdn/shop/products/1_dd407b29-f6db-4fff-94c4-5d3f92080709_720x.jpg?v=1533960449"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 18,
    featured: false,
    rating: 4.4,
    numReviews: 22
  }
];

// Function to create admin user and add products
async function addProductsToDatabase() {
  let successCount = 0;
  let errorCount = 0;

  console.log('Step 1: Creating admin user...\n');

  // First, create an admin user
  try {
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    require('dotenv').config();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const User = require('./models/User');

    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@fmlk.com' });

    if (!admin) {
      // Create admin user directly in database
      admin = await User.create({
        name: 'Admin',
        email: 'admin@fmlk.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✓ Admin user created');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Get admin token
    const jwt = require('jsonwebtoken');
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    console.log('✓ Admin token generated\n');

  } catch (error) {
    console.log(`✗ Error creating admin: ${error.message}`);
    return;
  }

  console.log('Step 2: Adding products to database...\n');

  const Product = require('./models/Product');

  // Clear existing products first
  await Product.deleteMany({});
  console.log('✓ Cleared existing products\n');

  for (const product of sampleProducts) {
    try {
      await Product.create(product);
      successCount++;
      console.log(`✓ Added: ${product.name}`);
    } catch (error) {
      errorCount++;
      console.log(`✗ Error adding ${product.name}: ${error.message}`);
    }
  }

  console.log(`\n===========================================`);
  console.log(`Product Import Complete!`);
  console.log(`Successfully added: ${successCount} products`);
  console.log(`Failed: ${errorCount} products`);
  console.log(`===========================================`);
  console.log(`\nAdmin Credentials:`);
  console.log(`Email: admin@fmlk.com`);
  console.log(`Password: admin123`);
  console.log(`===========================================\n`);

  process.exit(0);
}

// Run the function
addProductsToDatabase();

