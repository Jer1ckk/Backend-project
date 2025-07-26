const { sequelize, Product, Category } = require('./models');

const simpleCheck = async () => {
  try {
    console.log('🔍 Checking database content...\n');
    
    const categories = await Category.findAll();
    const products = await Product.findAll();
    
    console.log('📊 Database Status:');
    console.log(`Categories: ${categories.length}`);
    console.log(`Products: ${products.length}\n`);
    
    if (categories.length === 0) {
      console.log('❌ No categories found! Database might be empty.');
    } else {
      console.log('📋 Categories:');
      categories.forEach(cat => {
        console.log(`- ${cat.name} (slug: ${cat.slug}, id: ${cat.id})`);
      });
    }
    
    if (products.length === 0) {
      console.log('❌ No products found! Database might be empty.');
    } else {
      console.log('\n📦 Products:');
      products.forEach(prod => {
        console.log(`- ${prod.name} (categoryId: ${prod.categoryId})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  } finally {
    await sequelize.close();
  }
};

simpleCheck();
