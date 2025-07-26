const { sequelize, Category, Product } = require("../models");
require("dotenv").config();

// Categories data
const categoriesData = [
  // Main categories
  {
    name: "Women's Clothing",
    slug: "womens-clothing",
    description: "Fashion for women",
    sortOrder: 1,
  },
  {
    name: "Men's Clothing",
    slug: "mens-clothing",
    description: "Fashion for men",
    sortOrder: 2,
  },
  {
    name: "Girls' Clothing",
    slug: "girls-clothing",
    description: "Fashion for girls",
    sortOrder: 3,
  },
  {
    name: "Boys' Clothing",
    slug: "boys-clothing",
    description: "Fashion for boys",
    sortOrder: 4,
  },
  {
    name: "Shoes",
    slug: "shoes",
    description: "Footwear for everyone",
    sortOrder: 5,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Fashion accessories",
    sortOrder: 6,
  },

  // Subcategories for Women
  {
    name: "Women's T-Shirts",
    slug: "womens-t-shirts",
    description: "T-shirts for women",
    sortOrder: 1,
  },
  {
    name: "Women's Shirts",
    slug: "womens-shirts",
    description: "Shirts for women",
    sortOrder: 2,
  },
  {
    name: "Women's Jackets",
    slug: "womens-jackets",
    description: "Jackets for women",
    sortOrder: 3,
  },
  {
    name: "Women's Jeans",
    slug: "womens-jeans",
    description: "Jeans for women",
    sortOrder: 4,
  },
  {
    name: "Women's Dresses",
    slug: "womens-dresses",
    description: "Dresses for women",
    sortOrder: 5,
  },
  {
    name: "Women's Skirts",
    slug: "womens-skirts",
    description: "Skirts for women",
    sortOrder: 6,
  },
  {
    name: "Women's Shorts",
    slug: "womens-shorts",
    description: "Shorts for women",
    sortOrder: 7,
  },
  {
    name: "Women's Trousers",
    slug: "womens-trousers",
    description: "Trousers for women",
    sortOrder: 8,
  },

  // Subcategories for Men
  {
    name: "Men's T-Shirts",
    slug: "mens-t-shirts",
    description: "T-shirts for men",
    sortOrder: 1,
  },
  {
    name: "Men's Shirts",
    slug: "mens-shirts",
    description: "Shirts for men",
    sortOrder: 2,
  },
  {
    name: "Men's Jackets",
    slug: "mens-jackets",
    description: "Jackets for men",
    sortOrder: 3,
  },
  {
    name: "Men's Jeans",
    slug: "mens-jeans",
    description: "Jeans for men",
    sortOrder: 4,
  },
  {
    name: "Men's Trousers",
    slug: "mens-trousers",
    description: "Trousers for men",
    sortOrder: 5,
  },

  // Shoes subcategories
  {
    name: "Women's Shoes",
    slug: "womens-shoes",
    description: "Shoes for women",
    sortOrder: 1,
  },
  {
    name: "Men's Shoes",
    slug: "mens-shoes",
    description: "Shoes for men",
    sortOrder: 2,
  },
  {
    name: "Girls' Shoes",
    slug: "girls-shoes",
    description: "Shoes for girls",
    sortOrder: 3,
  },
  {
    name: "Boys' Shoes",
    slug: "boys-shoes",
    description: "Shoes for boys",
    sortOrder: 4,
  },

  // Accessories subcategories
  {
    name: "Bags",
    slug: "bags",
    description: "Bags and handbags",
    sortOrder: 1,
  },
  {
    name: "Belts",
    slug: "belts",
    description: "Belts and accessories",
    sortOrder: 2,
  },
  {
    name: "Glasses",
    slug: "glasses",
    description: "Sunglasses and eyewear",
    sortOrder: 3,
  },
  {
    name: "Gloves",
    slug: "gloves",
    description: "Gloves and hand accessories",
    sortOrder: 4,
  },
  { name: "Hats", slug: "hats", description: "Hats and caps", sortOrder: 5 },
  {
    name: "Wallets",
    slug: "wallets",
    description: "Wallets and purses",
    sortOrder: 6,
  },
  {
    name: "Watches",
    slug: "watches",
    description: "Watches and timepieces",
    sortOrder: 7,
  },
];

// Comprehensive products data based on frontend
const productsData = [
  // Women's T-Shirts
  {
    name: "Regular Fitted Crop T-Shirt",
    originalPrice: 39.99,
    salePrice: 11.997,
    discount: 70,
    image: "/assets/women_shirt1.jpg",
    colors: ["white", "red"],
    categorySlug: "womens-t-shirts",
    stock: 50,
    description: "Comfortable fitted crop t-shirt for everyday wear",
  },
  {
    name: "Regular Crop Textured T-Shirt",
    originalPrice: 44.99,
    salePrice: 13.497,
    discount: 70,
    image: "/assets/women_shirt2.jpg",
    colors: ["pink"],
    categorySlug: "womens-t-shirts",
    stock: 30,
    description: "Textured crop t-shirt with modern design",
  },
  {
    name: "Regular V-Neck T-Shirt",
    originalPrice: 49.99,
    salePrice: 14.997,
    discount: 70,
    image: "/assets/women_shirt3.jpg",
    colors: ["beige"],
    categorySlug: "womens-t-shirts",
    stock: 35,
    description: "Classic v-neck t-shirt for versatile styling",
  },
  {
    name: "Regular Polo T-Shirt",
    originalPrice: 54.99,
    salePrice: 16.497,
    discount: 70,
    image: "/assets/women_shirt4.jpg",
    colors: ["navy"],
    categorySlug: "womens-t-shirts",
    stock: 25,
    description: "Elegant polo t-shirt for smart casual look",
  },

  // Men's Shirts
  {
    name: "Casual Cotton Shirt",
    originalPrice: 49.99,
    salePrice: 34.99,
    discount: 30,
    image: "/assets/men_shirt1.webp",
    colors: ["white", "blue"],
    categorySlug: "mens-shirts",
    stock: 40,
    description: "Comfortable cotton shirt for everyday wear",
  },
  {
    name: "Formal Slim Shirt",
    originalPrice: 59.99,
    salePrice: 41.99,
    discount: 30,
    image: "/assets/men_shirt2.webp",
    colors: ["black"],
    categorySlug: "mens-shirts",
    stock: 30,
    description: "Slim fit formal shirt for professional occasions",
  },
  {
    name: "Checked Button-Up",
    originalPrice: 54.99,
    salePrice: 38.49,
    discount: 30,
    image: "/assets/men_shirt3.webp",
    colors: ["red", "black"],
    categorySlug: "mens-shirts",
    stock: 35,
    description: "Stylish checked button-up shirt",
  },

  // Men's Shoes
  {
    name: "Sport Sneakers",
    originalPrice: 59.99,
    salePrice: 17.99,
    discount: 70,
    image: "/assets/men_shoes1.jpg",
    colors: ["white", "blue"],
    categorySlug: "mens-shoes",
    stock: 25,
    description: "Comfortable sport sneakers for active lifestyle",
  },
  {
    name: "Casual Loafers",
    originalPrice: 64.99,
    salePrice: 19.49,
    discount: 70,
    image: "/assets/men_shoes2.jpg",
    colors: ["brown"],
    categorySlug: "mens-shoes",
    stock: 20,
    description: "Elegant casual loafers for everyday wear",
  },
  {
    name: "Formal Dress Shoes",
    originalPrice: 89.99,
    salePrice: 26.99,
    discount: 70,
    image: "/assets/men_shoes3.jpg",
    colors: ["black"],
    categorySlug: "mens-shoes",
    stock: 15,
    description: "Classic formal dress shoes for business occasions",
  },

  // Women's Shoes
  {
    name: "Chunky Sneakers",
    originalPrice: 59.99,
    salePrice: 17.99,
    discount: 70,
    image: "/assets/women_shoes1.jpg",
    colors: ["white", "pink"],
    categorySlug: "womens-shoes",
    stock: 30,
    description: "Trendy chunky sneakers for casual style",
  },
  {
    name: "Slip-On Flats",
    originalPrice: 49.99,
    salePrice: 14.99,
    discount: 70,
    image: "/assets/women_shoes2.jpg",
    colors: ["black"],
    categorySlug: "womens-shoes",
    stock: 40,
    description: "Comfortable slip-on flats for everyday wear",
  },
  {
    name: "Ankle Boots",
    originalPrice: 89.99,
    salePrice: 26.99,
    discount: 70,
    image: "/assets/women_shoes3.jpg",
    colors: ["brown"],
    categorySlug: "womens-shoes",
    stock: 20,
    description: "Stylish ankle boots for autumn fashion",
  },

  // Boys' Clothing
  {
    name: "Classic Boy Shirt",
    originalPrice: 29.99,
    salePrice: 20.99,
    discount: 30,
    image: "/assets/boy_shirt1.jpg",
    colors: ["blue", "white"],
    categorySlug: "boys-clothing",
    stock: 45,
    description: "Classic shirt for boys, perfect for school or casual wear",
  },
  {
    name: "Casual Cotton Shirt",
    originalPrice: 34.99,
    salePrice: 24.49,
    discount: 30,
    image: "/assets/boy_shirt2.jpg",
    colors: ["red", "grey"],
    categorySlug: "boys-clothing",
    stock: 35,
    description: "Comfortable cotton shirt for active boys",
  },

  // Girls' Clothing
  {
    name: "Floral Print Shirt",
    originalPrice: 35.99,
    salePrice: 25.19,
    discount: 30,
    image: "/assets/girl_shirt1.jpg",
    colors: ["pink", "white"],
    categorySlug: "girls-clothing",
    stock: 40,
    description: "Beautiful floral print shirt for girls",
  },
  {
    name: "Ruffled Sleeve Shirt",
    originalPrice: 39.99,
    salePrice: 27.99,
    discount: 30,
    image: "/assets/girl_shirt2.jpg",
    colors: ["white", "blue"],
    categorySlug: "girls-clothing",
    stock: 30,
    description: "Elegant ruffled sleeve shirt for special occasions",
  },

  // Accessories - Hats
  {
    name: "Classic Fedora Hat",
    originalPrice: 29.99,
    salePrice: 20.99,
    discount: 30,
    image: "/assets/hat1.webp",
    colors: ["brown", "black"],
    categorySlug: "hats",
    stock: 15,
    description: "Classic fedora hat for sophisticated style",
  },
  {
    name: "Casual Baseball Cap",
    originalPrice: 19.99,
    salePrice: 13.99,
    discount: 30,
    image: "/assets/hat2.webp",
    colors: ["blue", "white"],
    categorySlug: "hats",
    stock: 40,
    description: "Comfortable baseball cap for casual outings",
  },
  {
    name: "Summer Straw Hat",
    originalPrice: 24.99,
    salePrice: 17.49,
    discount: 30,
    image: "/assets/hat3.webp",
    colors: ["beige", "yellow"],
    categorySlug: "hats",
    stock: 25,
    description: "Lightweight straw hat perfect for summer",
  },

  // Accessories - Bags
  {
    name: "Leather Handbag",
    originalPrice: 89.99,
    salePrice: 62.99,
    discount: 30,
    image: "/assets/bag1.webp",
    colors: ["brown", "black"],
    categorySlug: "bags",
    stock: 20,
    description: "Premium leather handbag for elegant occasions",
  },
  {
    name: "Canvas Tote Bag",
    originalPrice: 39.99,
    salePrice: 27.99,
    discount: 30,
    image: "/assets/bag2.webp",
    colors: ["beige", "navy"],
    categorySlug: "bags",
    stock: 35,
    description: "Versatile canvas tote bag for everyday use",
  },

  // Accessories - Glasses
  {
    name: "Classic Aviator Sunglasses",
    originalPrice: 79.99,
    salePrice: 55.99,
    discount: 30,
    image: "/assets/glasses1.webp",
    colors: ["gold", "silver"],
    categorySlug: "glasses",
    stock: 25,
    description: "Timeless aviator sunglasses with UV protection",
  },
  {
    name: "Round Frame Sunglasses",
    originalPrice: 69.99,
    salePrice: 48.99,
    discount: 30,
    image: "/assets/glasses2.webp",
    colors: ["black", "brown"],
    categorySlug: "glasses",
    stock: 30,
    description: "Trendy round frame sunglasses for modern style",
  },
];

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to database
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // Sync database (create tables) - let's try without force first
    await sequelize.sync({ force: false, alter: true });
    console.log("✅ Database tables created");

    // Create categories
    console.log("📂 Creating categories...");
    const createdCategories = {};

    for (const categoryData of categoriesData) {
      const category = await Category.create(categoryData);
      createdCategories[category.slug] = category.id;
      console.log(`   ✓ Created category: ${category.name}`);
    }

    // Create products
    console.log("📦 Creating products...");

    for (const productData of productsData) {
      const { categorySlug, ...productInfo } = productData;
      const categoryId = createdCategories[categorySlug];

      if (!categoryId) {
        console.log(`   ⚠️  Category not found for slug: ${categorySlug}`);
        continue;
      }

      const product = await Product.create({
        ...productInfo,
        categoryId,
      });

      console.log(`   ✓ Created product: ${product.name}`);
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log(
      `📊 Created ${categoriesData.length} categories and ${productsData.length} products`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
