const { Product, Category } = require('./models');

const checkProducts = async () => {
  try {
    console.log('🔍 Checking product count in database...\n');
    
    // Get total product count
    const totalProducts = await Product.count();
    console.log(`📊 Total products in database: ${totalProducts}`);
    
    // Get products by category
    const categories = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        attributes: ['id']
      }]
    });
    
    console.log('\n📋 Products per category:');
    categories.forEach(category => {
      const productCount = category.products ? category.products.length : 0;
      console.log(`  ${category.name}: ${productCount} products`);
    });
    
    console.log('\n✅ Database check completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkProducts();
