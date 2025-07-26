const { sequelize, Category, Product } = require('../models');

const sampleData = {
  categories: [
    // Women's Categories
    { name: "Women's T-Shirts", slug: "womens-t-shirts", description: "Stylish t-shirts for women" },
    { name: "Women's Shirts", slug: "womens-shirts", description: "Elegant shirts for women" },
    { name: "Women's Jackets", slug: "womens-jackets", description: "Fashionable jackets for women" },
    { name: "Women's Shoes", slug: "womens-shoes", description: "Comfortable shoes for women" },
    { name: "Women's Skirts", slug: "womens-skirts", description: "Beautiful skirts for women" },
    { name: "Women's Shorts", slug: "womens-shorts", description: "Casual shorts for women" },
    { name: "Women's Jeans", slug: "womens-jeans", description: "Trendy jeans for women" },
    { name: "Women's Trousers", slug: "womens-trousers", description: "Professional trousers for women" },
    { name: "Women's Dresses", slug: "womens-dresses", description: "Elegant dresses for women" },
    
    // Men's Categories
    { name: "Men's T-Shirts", slug: "mens-t-shirts", description: "Comfortable t-shirts for men" },
    { name: "Men's Shirts", slug: "mens-shirts", description: "Professional shirts for men" },
    { name: "Men's Jackets", slug: "mens-jackets", description: "Stylish jackets for men" },
    { name: "Men's Shoes", slug: "mens-shoes", description: "Quality shoes for men" },
    { name: "Men's Jeans", slug: "mens-jeans", description: "Durable jeans for men" },
    { name: "Men's Trousers", slug: "mens-trousers", description: "Formal trousers for men" },
    
    // Kids Categories
    { name: "Girls Clothing", slug: "girls-clothing", description: "Cute clothing for girls" },
    { name: "Girls Shoes", slug: "girls-shoes", description: "Comfortable shoes for girls" },
    { name: "Boys Clothing", slug: "boys-clothing", description: "Cool clothing for boys" },
    { name: "Boys Shoes", slug: "boys-shoes", description: "Durable shoes for boys" },
    
    // Accessories
    { name: "Glasses", slug: "glasses", description: "Stylish eyewear" },
    { name: "Watches", slug: "watches", description: "Elegant timepieces" },
    { name: "Gloves", slug: "gloves", description: "Warm and comfortable gloves" },
    { name: "Belts", slug: "belts", description: "Quality leather belts" },
    { name: "Hats", slug: "hats", description: "Fashionable headwear" },
    { name: "Bags", slug: "bags", description: "Stylish bags and purses" },
    { name: "Wallets", slug: "wallets", description: "Premium wallets" }
  ],

  products: [
    // Women's T-Shirts
    { name: "Regular Fitted Crop T-Shirt", slug: "regular-fitted-crop-t-shirt", categorySlug: "womens-t-shirts", originalPrice: 39.99, salePrice: 27.99, discount: 30, image: "/images/women-tshirt-1.jpg", colors: ["white", "red"], sizes: ["S", "M", "L"], stock: 50 },
    { name: "Regular Crop Textured T-Shirt", slug: "regular-crop-textured-t-shirt", categorySlug: "womens-t-shirts", originalPrice: 44.99, salePrice: 31.49, discount: 30, image: "/images/women-tshirt-2.jpg", colors: ["pink"], sizes: ["S", "M", "L", "XL"], stock: 30 },
    { name: "Regular V-Neck T-Shirt", slug: "regular-v-neck-t-shirt", categorySlug: "womens-t-shirts", originalPrice: 49.99, salePrice: 34.99, discount: 30, image: "/images/women-tshirt-3.jpg", colors: ["beige"], sizes: ["XS", "S", "M", "L"], stock: 25 },
    
    // Women's Shirts
    { name: "Classic Button-Down Shirt", slug: "classic-button-down-shirt", categorySlug: "womens-shirts", originalPrice: 59.99, salePrice: 41.99, discount: 30, image: "/images/women-shirt-1.jpg", colors: ["white", "blue"], sizes: ["S", "M", "L", "XL"], stock: 40 },
    { name: "Silk Blouse", slug: "silk-blouse", categorySlug: "womens-shirts", originalPrice: 89.99, salePrice: 62.99, discount: 30, image: "/images/women-shirt-2.jpg", colors: ["cream", "black"], sizes: ["S", "M", "L"], stock: 20 },
    { name: "Casual Cotton Shirt", slug: "casual-cotton-shirt", categorySlug: "womens-shirts", originalPrice: 45.99, salePrice: 32.19, discount: 30, image: "/images/women-shirt-3.jpg", colors: ["striped"], sizes: ["S", "M", "L", "XL"], stock: 35 },
    
    // Women's Jackets
    { name: "Denim Jacket", slug: "denim-jacket", categorySlug: "womens-jackets", originalPrice: 79.99, salePrice: 55.99, discount: 30, image: "/images/women-jacket-1.jpg", colors: ["blue", "black"], sizes: ["S", "M", "L", "XL"], stock: 25 },
    { name: "Leather Jacket", slug: "leather-jacket", categorySlug: "womens-jackets", originalPrice: 199.99, salePrice: 139.99, discount: 30, image: "/images/women-jacket-2.jpg", colors: ["black", "brown"], sizes: ["S", "M", "L"], stock: 15 },
    { name: "Blazer", slug: "blazer", categorySlug: "womens-jackets", originalPrice: 129.99, salePrice: 90.99, discount: 30, image: "/images/women-jacket-3.jpg", colors: ["navy", "gray"], sizes: ["S", "M", "L", "XL"], stock: 30 },
    
    // Women's Shoes
    { name: "Running Sneakers", slug: "running-sneakers", categorySlug: "womens-shoes", originalPrice: 89.99, salePrice: 62.99, discount: 30, image: "/images/women-shoes-1.jpg", colors: ["white", "pink"], sizes: ["6", "7", "8", "9", "10"], stock: 40 },
    { name: "High Heels", slug: "high-heels", categorySlug: "womens-shoes", originalPrice: 119.99, salePrice: 83.99, discount: 30, image: "/images/women-shoes-2.jpg", colors: ["black", "red"], sizes: ["6", "7", "8", "9"], stock: 25 },
    { name: "Casual Flats", slug: "casual-flats", categorySlug: "womens-shoes", originalPrice: 59.99, salePrice: 41.99, discount: 30, image: "/images/women-shoes-3.jpg", colors: ["brown", "black"], sizes: ["6", "7", "8", "9", "10"], stock: 35 },
    
    // Men's T-Shirts
    { name: "Basic Cotton T-Shirt", slug: "basic-cotton-t-shirt", categorySlug: "mens-t-shirts", originalPrice: 29.99, salePrice: 20.99, discount: 30, image: "/images/men-tshirt-1.jpg", colors: ["white", "black", "gray"], sizes: ["S", "M", "L", "XL", "XXL"], stock: 60 },
    { name: "Graphic Print T-Shirt", slug: "graphic-print-t-shirt", categorySlug: "mens-t-shirts", originalPrice: 34.99, salePrice: 24.49, discount: 30, image: "/images/men-tshirt-2.jpg", colors: ["black", "navy"], sizes: ["S", "M", "L", "XL"], stock: 45 },
    { name: "V-Neck T-Shirt", slug: "v-neck-t-shirt", categorySlug: "mens-t-shirts", originalPrice: 32.99, salePrice: 23.09, discount: 30, image: "/images/men-tshirt-3.jpg", colors: ["white", "gray"], sizes: ["M", "L", "XL", "XXL"], stock: 40 },
    
    // Men's Shirts
    { name: "Formal Dress Shirt", slug: "formal-dress-shirt", categorySlug: "mens-shirts", originalPrice: 69.99, salePrice: 48.99, discount: 30, image: "/images/men-shirt-1.jpg", colors: ["white", "blue"], sizes: ["S", "M", "L", "XL", "XXL"], stock: 35 },
    { name: "Casual Plaid Shirt", slug: "casual-plaid-shirt", categorySlug: "mens-shirts", originalPrice: 54.99, salePrice: 38.49, discount: 30, image: "/images/men-shirt-2.jpg", colors: ["red", "blue"], sizes: ["M", "L", "XL"], stock: 30 },
    
    // Accessories
    { name: "Aviator Sunglasses", slug: "aviator-sunglasses", categorySlug: "glasses", originalPrice: 149.99, salePrice: 104.99, discount: 30, image: "/images/glasses-1.jpg", colors: ["gold", "silver"], sizes: ["One Size"], stock: 20 },
    { name: "Classic Watch", slug: "classic-watch", categorySlug: "watches", originalPrice: 299.99, salePrice: 209.99, discount: 30, image: "/images/watch-1.jpg", colors: ["silver", "gold"], sizes: ["One Size"], stock: 15 },
    { name: "Leather Belt", slug: "leather-belt", categorySlug: "belts", originalPrice: 49.99, salePrice: 34.99, discount: 30, image: "/images/belt-1.jpg", colors: ["black", "brown"], sizes: ["S", "M", "L", "XL"], stock: 25 }
  ]
};

const populateDatabase = async () => {
  try {
    console.log('🚀 Starting database population...');
    
    // Clear existing data
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
    console.log('✅ Cleared existing data');
    
    // Create categories
    const createdCategories = {};
    for (const categoryData of sampleData.categories) {
      const category = await Category.create(categoryData);
      createdCategories[categoryData.slug] = category.id;
      console.log(`✅ Created category: ${categoryData.name}`);
    }
    
    // Create products
    let productCount = 0;
    for (const productData of sampleData.products) {
      const categoryId = createdCategories[productData.categorySlug];
      if (categoryId) {
        await Product.create({
          ...productData,
          categoryId,
          colors: JSON.stringify(productData.colors),
          sizes: JSON.stringify(productData.sizes)
        });
        productCount++;
        console.log(`✅ Created product: ${productData.name}`);
      }
    }
    
    console.log(`\n🎉 Database population completed!`);
    console.log(`📊 Created ${sampleData.categories.length} categories`);
    console.log(`📦 Created ${productCount} products`);
    
  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the population script
populateDatabase();
