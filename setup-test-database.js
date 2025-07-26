#!/usr/bin/env node

/**
 * Setup Test Database with Sample Data
 * Creates tables and populates them with test data for comprehensive testing
 */

const { sequelize } = require('./backend/config/database');
const { User, Category, Product, Favorite, CartItem } = require('./backend/models');

// Sample data
const sampleCategories = [
  { name: "Women's T-Shirts", slug: "womens-t-shirts", description: "Comfortable and stylish t-shirts for women", sortOrder: 1 },
  { name: "Women's Shirts", slug: "womens-shirts", description: "Elegant shirts for women", sortOrder: 2 },
  { name: "Women's Jackets", slug: "womens-jackets", description: "Stylish jackets for women", sortOrder: 3 },
  { name: "Women's Shoes", slug: "womens-shoes", description: "Comfortable and fashionable shoes", sortOrder: 4 },
  { name: "Women's Jeans", slug: "womens-jeans", description: "Premium denim jeans for women", sortOrder: 5 },
  { name: "Women's Dresses", slug: "womens-dresses", description: "Beautiful dresses for all occasions", sortOrder: 6 },
  { name: "Men's T-Shirts", slug: "mens-t-shirts", description: "Comfortable t-shirts for men", sortOrder: 7 },
  { name: "Men's Jeans", slug: "mens-jeans", description: "Premium denim jeans for men", sortOrder: 8 },
  { name: "Men's Jackets", slug: "mens-jackets", description: "Stylish jackets for men", sortOrder: 9 },
  { name: "Men's Shoes", slug: "mens-shoes", description: "Comfortable and durable shoes for men", sortOrder: 10 },
  { name: "Accessories - Glasses", slug: "accessories-glasses", description: "Stylish eyewear and sunglasses", sortOrder: 11 },
  { name: "Accessories - Watches", slug: "accessories-watches", description: "Premium watches and timepieces", sortOrder: 12 }
];

const sampleProducts = [
  {
    name: "Classic White T-Shirt",
    slug: "classic-white-tshirt",
    description: "A comfortable and versatile white t-shirt perfect for everyday wear",
    originalPrice: 25.99,
    salePrice: 19.99,
    discount: 23,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    colors: ["White", "Black", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 100,
    sku: "WT001",
    isFeatured: true,
    tags: ["casual", "basic", "cotton"]
  },
  {
    name: "Denim Blue Jeans",
    slug: "denim-blue-jeans",
    description: "Premium quality denim jeans with a perfect fit",
    originalPrice: 79.99,
    salePrice: 59.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    colors: ["Blue", "Dark Blue", "Light Blue"],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 75,
    sku: "DJ001",
    isFeatured: true,
    tags: ["denim", "casual", "premium"]
  },
  {
    name: "Elegant Summer Dress",
    slug: "elegant-summer-dress",
    description: "Beautiful floral summer dress perfect for warm weather",
    originalPrice: 89.99,
    salePrice: 69.99,
    discount: 22,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    colors: ["Floral", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L"],
    stock: 50,
    sku: "SD001",
    isFeatured: false,
    tags: ["dress", "summer", "elegant"]
  },
  {
    name: "Leather Jacket",
    slug: "leather-jacket",
    description: "Stylish leather jacket for a bold look",
    originalPrice: 199.99,
    salePrice: 149.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    sku: "LJ001",
    isFeatured: true,
    tags: ["leather", "jacket", "style"]
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Comfortable running shoes for active lifestyle",
    originalPrice: 129.99,
    salePrice: 99.99,
    discount: 23,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    colors: ["White", "Black", "Blue"],
    sizes: ["7", "8", "9", "10", "11"],
    stock: 80,
    sku: "RS001",
    isFeatured: false,
    tags: ["shoes", "running", "sport"]
  },
  {
    name: "Designer Sunglasses",
    slug: "designer-sunglasses",
    description: "Premium designer sunglasses with UV protection",
    originalPrice: 159.99,
    salePrice: 119.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    colors: ["Black", "Brown", "Gold"],
    sizes: ["One Size"],
    stock: 40,
    sku: "SG001",
    isFeatured: true,
    tags: ["sunglasses", "designer", "accessories"]
  }
];

const setupTestDatabase = async () => {
  try {
    console.log('🚀 Setting up test database...');
    
    // Force sync to create tables
    console.log('📋 Creating database tables...');
    await sequelize.sync({ force: true });
    console.log('✅ Tables created successfully');
    
    // Create categories
    console.log('📂 Creating categories...');
    const createdCategories = await Category.bulkCreate(sampleCategories);
    console.log(`✅ Created ${createdCategories.length} categories`);
    
    // Create products with category associations
    console.log('🛍️ Creating products...');
    const productsWithCategories = sampleProducts.map((product, index) => ({
      ...product,
      categoryId: createdCategories[index % createdCategories.length].id
    }));
    
    const createdProducts = await Product.bulkCreate(productsWithCategories);
    console.log(`✅ Created ${createdProducts.length} products`);
    
    // Create a test user
    console.log('👤 Creating test user...');
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      mobileNumber: '+1234567890',
      password: 'password123',
      gender: 'Male',
      country: 'Cambodia'
    });
    console.log('✅ Test user created');
    
    console.log('\n🎉 Test database setup completed successfully!');
    console.log(`📊 Database contains:`);
    console.log(`   • ${createdCategories.length} categories`);
    console.log(`   • ${createdProducts.length} products`);
    console.log(`   • 1 test user`);
    
    return {
      categories: createdCategories,
      products: createdProducts,
      user: testUser
    };
    
  } catch (error) {
    console.error('❌ Error setting up test database:', error);
    throw error;
  }
};

// Run setup if called directly
if (require.main === module) {
  setupTestDatabase()
    .then(() => {
      console.log('\n✅ Database setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupTestDatabase };
