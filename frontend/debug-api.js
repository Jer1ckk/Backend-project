// Debug API calls
import { productService, getCategorySlugFromPath } from './src/services/productService.js';

const debugAPI = async () => {
  try {
    console.log('🔍 Debugging API calls...\n');

    // Test category slug mapping
    console.log('1. Testing category slug mapping:');
    const testPaths = ['t-shirt', 'shirt', 'men/t-shirt', 'men/jeans', 'accessories/glasses'];
    
    testPaths.forEach(path => {
      const slug = getCategorySlugFromPath(path);
      console.log(`  '${path}' → '${slug}'`);
    });
    console.log('');

    // Test specific problematic category
    console.log('2. Testing men/jeans category:');
    const menJeansSlug = getCategorySlugFromPath('men/jeans');
    console.log(`  men/jeans maps to: ${menJeansSlug}`);
    
    const result = await productService.getProductsByCategory('men/jeans');
    console.log(`  API call result:`, result.success ? 'SUCCESS' : `ERROR: ${result.error}`);
    
    if (result.success) {
      console.log(`  Category found: ${result.category?.name}`);
      console.log(`  Products found: ${result.data.products?.length || 0}`);
    }
    console.log('');

    // Test a working category
    console.log('3. Testing womens-t-shirts category:');
    const tshirtResult = await productService.getProductsByCategory('t-shirt');
    console.log(`  API call result:`, tshirtResult.success ? 'SUCCESS' : `ERROR: ${tshirtResult.error}`);
    
    if (tshirtResult.success) {
      console.log(`  Category found: ${tshirtResult.category?.name}`);
      console.log(`  Products found: ${tshirtResult.data.products?.length || 0}`);
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
};

// Run the debug
debugAPI();
