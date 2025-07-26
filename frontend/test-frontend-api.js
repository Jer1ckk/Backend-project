// Test frontend API integration
import { productService, getCategorySlugFromPath } from './src/services/productService.js';

const testFrontendAPI = async () => {
  try {
    console.log('🧪 Testing frontend API integration...\n');

    // Test 1: Category slug mapping
    console.log('1. Testing category slug mapping...');
    const tshirtSlug = getCategorySlugFromPath('t-shirt');
    console.log(`'t-shirt' maps to: '${tshirtSlug}'`);
    
    const menTshirtSlug = getCategorySlugFromPath('men/t-shirt');
    console.log(`'men/t-shirt' maps to: '${menTshirtSlug}'`);
    console.log('');

    // Test 2: Get products by category
    console.log('2. Testing getProductsByCategory...');
    const result = await productService.getProductsByCategory('t-shirt');
    
    if (result.success) {
      console.log('✅ Successfully fetched products');
      console.log(`Category: ${result.category?.name}`);
      console.log(`Products found: ${result.data.products?.length || 0}`);
      
      if (result.data.products && result.data.products.length > 0) {
        console.log('First product:', result.data.products[0].name);
      }
    } else {
      console.log('❌ Failed to fetch products:', result.error);
    }
    console.log('');

    // Test 3: Get all products
    console.log('3. Testing getAllProducts...');
    const allProductsResult = await productService.getAllProducts();
    
    if (allProductsResult.success) {
      console.log('✅ Successfully fetched all products');
      console.log(`Total products: ${allProductsResult.data.products?.length || 0}`);
    } else {
      console.log('❌ Failed to fetch all products:', allProductsResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
};

// Run the test
testFrontendAPI();
