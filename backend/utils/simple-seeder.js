const { sequelize } = require('../config/database');
require('dotenv').config();

const simpleSeeder = async () => {
  try {
    console.log('🌱 Starting simple database setup...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Drop database and recreate
    await sequelize.query('DROP DATABASE IF EXISTS clothing_store_db');
    await sequelize.query('CREATE DATABASE clothing_store_db');
    await sequelize.query('USE clothing_store_db');
    
    console.log('✅ Database recreated');
    
    // Create tables manually with simple SQL
    await sequelize.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        mobileNumber VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        gender ENUM('Male', 'Female') NOT NULL,
        country VARCHAR(50) NOT NULL DEFAULT 'Cambodia',
        city VARCHAR(50),
        isActive BOOLEAN DEFAULT true,
        lastLogin DATETIME,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await sequelize.query(`
      CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        parentId INT,
        isActive BOOLEAN DEFAULT true,
        sortOrder INT DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parentId) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    
    await sequelize.query(`
      CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        description TEXT,
        originalPrice DECIMAL(10,2) NOT NULL,
        salePrice DECIMAL(10,2) NOT NULL,
        discount INT NOT NULL DEFAULT 0,
        image VARCHAR(500) NOT NULL,
        colors JSON,
        sizes JSON,
        categoryId INT NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        sku VARCHAR(100) UNIQUE,
        isActive BOOLEAN DEFAULT true,
        isFeatured BOOLEAN DEFAULT false,
        tags JSON,
        weight DECIMAL(8,2),
        dimensions JSON,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
      )
    `);
    
    await sequelize.query(`
      CREATE TABLE favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        productId INT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product (userId, productId)
      )
    `);
    
    await sequelize.query(`
      CREATE TABLE cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        selectedColor VARCHAR(50),
        selectedSize VARCHAR(20),
        priceAtTime DECIMAL(10,2) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    
    console.log('✅ Tables created successfully');
    
    // Insert sample categories
    const categories = [
      { name: 'Women\'s Clothing', slug: 'womens-clothing' },
      { name: 'Men\'s Clothing', slug: 'mens-clothing' },
      { name: 'Girls\' Clothing', slug: 'girls-clothing' },
      { name: 'Boys\' Clothing', slug: 'boys-clothing' },
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Accessories', slug: 'accessories' },
      { name: 'Women\'s T-Shirts', slug: 'womens-t-shirts' },
      { name: 'Men\'s Shirts', slug: 'mens-shirts' },
      { name: 'Men\'s Shoes', slug: 'mens-shoes' },
      { name: 'Women\'s Shoes', slug: 'womens-shoes' },
      { name: 'Hats', slug: 'hats' },
      { name: 'Bags', slug: 'bags' },
      { name: 'Glasses', slug: 'glasses' }
    ];
    
    for (const category of categories) {
      await sequelize.query(
        'INSERT INTO categories (name, slug) VALUES (?, ?)',
        { replacements: [category.name, category.slug] }
      );
    }
    
    console.log('✅ Categories inserted');
    
    // Insert sample products
    const products = [
      {
        name: 'Regular Fitted Crop T-Shirt',
        slug: 'regular-fitted-crop-t-shirt',
        originalPrice: 39.99,
        salePrice: 11.997,
        discount: 70,
        image: '/assets/women_shirt1.jpg',
        colors: JSON.stringify(['white', 'red']),
        categoryId: 7, // Women's T-Shirts
        stock: 50,
        sku: 'WTS001'
      },
      {
        name: 'Casual Cotton Shirt',
        slug: 'casual-cotton-shirt',
        originalPrice: 49.99,
        salePrice: 34.99,
        discount: 30,
        image: '/assets/men_shirt1.webp',
        colors: JSON.stringify(['white', 'blue']),
        categoryId: 8, // Men's Shirts
        stock: 40,
        sku: 'MS001'
      },
      {
        name: 'Sport Sneakers',
        slug: 'sport-sneakers',
        originalPrice: 59.99,
        salePrice: 17.99,
        discount: 70,
        image: '/assets/men_shoes1.jpg',
        colors: JSON.stringify(['white', 'blue']),
        categoryId: 9, // Men's Shoes
        stock: 25,
        sku: 'MSH001'
      }
    ];
    
    for (const product of products) {
      await sequelize.query(
        'INSERT INTO products (name, slug, originalPrice, salePrice, discount, image, colors, categoryId, stock, sku) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        { 
          replacements: [
            product.name, 
            product.slug, 
            product.originalPrice, 
            product.salePrice, 
            product.discount, 
            product.image, 
            product.colors, 
            product.categoryId, 
            product.stock, 
            product.sku
          ] 
        }
      );
    }
    
    console.log('✅ Products inserted');
    console.log('🎉 Simple database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in simple seeder:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// Run seeder if called directly
if (require.main === module) {
  simpleSeeder();
}

module.exports = { simpleSeeder };
