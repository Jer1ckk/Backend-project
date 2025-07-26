#!/usr/bin/env node

/**
 * Frontend Component API Integration Test
 * Tests how frontend components interact with backend APIs
 */

import { productService, categoryService, getCategorySlugFromPath } from './frontend/src/services/productService.js';
import { authAPI, productsAPI, categoriesAPI } from './frontend/src/services/api.js';

const testResults = {
  services: [],
  integration: [],
  components: [],
  summary: { total: 0, passed: 0, failed: 0 }
};

const log = (message, type = 'info') => {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
};

const recordTest = (category, testName, passed, error = null) => {
  const result = { name: testName, passed, error: error?.message || error };
  testResults[category].push(result);
  testResults.summary.total++;
  if (passed) testResults.summary.passed++;
  else testResults.summary.failed++;
};

// Test category slug mapping
const testCategorySlugMapping = () => {
  log('🔍 Testing Category Slug Mapping...', 'info');
  
  const testCases = [
    { input: 't-shirt', expected: 'womens-t-shirts' },
    { input: 'shirt', expected: 'womens-shirts' },
    { input: 'men/t-shirt', expected: 'mens-t-shirts' },
    { input: 'men/jeans', expected: 'mens-jeans' },
    { input: 'accessories/glasses', expected: 'accessories-glasses' },
    { input: 'women/dress', expected: 'womens-dresses' }
  ];
  
  testCases.forEach(({ input, expected }) => {
    try {
      const result = getCategorySlugFromPath(input);
      if (result === expected) {
        log(`✅ '${input}' → '${result}'`, 'success');
        recordTest('services', `Category Mapping: ${input}`, true);
      } else {
        log(`❌ '${input}' → '${result}' (expected '${expected}')`, 'error');
        recordTest('services', `Category Mapping: ${input}`, false, `Expected ${expected}, got ${result}`);
      }
    } catch (error) {
      log(`❌ Error mapping '${input}': ${error.message}`, 'error');
      recordTest('services', `Category Mapping: ${input}`, false, error);
    }
  });
};

// Test API service functions
const testAPIServices = async () => {
  log('🔧 Testing API Service Functions...', 'info');
  
  // Test productService.getAllProducts
  try {
    const result = await productService.getAllProducts();
    if (result.success && result.data) {
      log('✅ productService.getAllProducts() working', 'success');
      recordTest('services', 'Get All Products Service', true);
    } else {
      log('❌ productService.getAllProducts() failed', 'error');
      recordTest('services', 'Get All Products Service', false, result.error);
    }
  } catch (error) {
    log('❌ productService.getAllProducts() error', 'error');
    recordTest('services', 'Get All Products Service', false, error);
  }
  
  // Test productService.getProductsByCategory
  try {
    const result = await productService.getProductsByCategory('t-shirt');
    if (result.success) {
      log('✅ productService.getProductsByCategory() working', 'success');
      recordTest('services', 'Get Products By Category Service', true);
    } else {
      log('❌ productService.getProductsByCategory() failed', 'error');
      recordTest('services', 'Get Products By Category Service', false, result.error);
    }
  } catch (error) {
    log('❌ productService.getProductsByCategory() error', 'error');
    recordTest('services', 'Get Products By Category Service', false, error);
  }
  
  // Test categoryService.getAllCategories
  try {
    const result = await categoryService.getAllCategories();
    if (result.success && result.data) {
      log('✅ categoryService.getAllCategories() working', 'success');
      recordTest('services', 'Get All Categories Service', true);
    } else {
      log('❌ categoryService.getAllCategories() failed', 'error');
      recordTest('services', 'Get All Categories Service', false, result.error);
    }
  } catch (error) {
    log('❌ categoryService.getAllCategories() error', 'error');
    recordTest('services', 'Get All Categories Service', false, error);
  }
  
  // Test direct API calls
  try {
    const result = await productsAPI.getAll();
    if (result.success) {
      log('✅ productsAPI.getAll() working', 'success');
      recordTest('services', 'Products API Direct Call', true);
    } else {
      log('❌ productsAPI.getAll() failed', 'error');
      recordTest('services', 'Products API Direct Call', false, 'API call failed');
    }
  } catch (error) {
    log('❌ productsAPI.getAll() error', 'error');
    recordTest('services', 'Products API Direct Call', false, error);
  }
  
  try {
    const result = await categoriesAPI.getAll();
    if (result.success) {
      log('✅ categoriesAPI.getAll() working', 'success');
      recordTest('services', 'Categories API Direct Call', true);
    } else {
      log('❌ categoriesAPI.getAll() failed', 'error');
      recordTest('services', 'Categories API Direct Call', false, 'API call failed');
    }
  } catch (error) {
    log('❌ categoriesAPI.getAll() error', 'error');
    recordTest('services', 'Categories API Direct Call', false, error);
  }
};

// Test component integration scenarios
const testComponentIntegration = async () => {
  log('🎨 Testing Component Integration Scenarios...', 'info');
  
  // Test scenario: User visits Women's T-shirt page
  try {
    log('Testing: User visits Women\'s T-shirt page', 'info');
    const categoryPath = 't-shirt';
    const categorySlug = getCategorySlugFromPath(categoryPath);
    const result = await productService.getProductsByCategory(categoryPath);
    
    if (result.success && result.data && result.category) {
      log(`✅ T-shirt page integration working (${result.data.products?.length || 0} products)`, 'success');
      recordTest('integration', 'Women T-shirt Page Integration', true);
    } else {
      log('❌ T-shirt page integration failed', 'error');
      recordTest('integration', 'Women T-shirt Page Integration', false, result.error);
    }
  } catch (error) {
    log('❌ T-shirt page integration error', 'error');
    recordTest('integration', 'Women T-shirt Page Integration', false, error);
  }
  
  // Test scenario: User searches for products
  try {
    log('Testing: User searches for "shirt"', 'info');
    const result = await productService.searchProducts('shirt');
    
    if (result.success && result.data) {
      log(`✅ Search integration working (${result.data.products?.length || 0} results)`, 'success');
      recordTest('integration', 'Product Search Integration', true);
    } else {
      log('❌ Search integration failed', 'error');
      recordTest('integration', 'Product Search Integration', false, result.error);
    }
  } catch (error) {
    log('❌ Search integration error', 'error');
    recordTest('integration', 'Product Search Integration', false, error);
  }
  
  // Test scenario: Homepage loads all products
  try {
    log('Testing: Homepage loads all products', 'info');
    const result = await productService.getAllProducts({ limit: 10 });
    
    if (result.success && result.data) {
      log(`✅ Homepage integration working (${result.data.products?.length || 0} products)`, 'success');
      recordTest('integration', 'Homepage Products Integration', true);
    } else {
      log('❌ Homepage integration failed', 'error');
      recordTest('integration', 'Homepage Products Integration', false, result.error);
    }
  } catch (error) {
    log('❌ Homepage integration error', 'error');
    recordTest('integration', 'Homepage Products Integration', false, error);
  }
  
  // Test scenario: Collection page loads categories
  try {
    log('Testing: Collection page loads categories', 'info');
    const result = await categoryService.getAllCategories();
    
    if (result.success && result.data) {
      log(`✅ Collection page integration working (${result.data.categories?.length || 0} categories)`, 'success');
      recordTest('integration', 'Collection Categories Integration', true);
    } else {
      log('❌ Collection page integration failed', 'error');
      recordTest('integration', 'Collection Categories Integration', false, result.error);
    }
  } catch (error) {
    log('❌ Collection page integration error', 'error');
    recordTest('integration', 'Collection Categories Integration', false, error);
  }
};

// Test specific component routes
const testComponentRoutes = () => {
  log('🛣️ Testing Component Route Mappings...', 'info');
  
  const routeComponents = [
    { path: '/t-shirt', component: 'Women_T_shirt', category: 'womens-t-shirts' },
    { path: '/shirt', component: 'Women_shirt', category: 'womens-shirts' },
    { path: '/jacket', component: 'Women_jacket', category: 'womens-jackets' },
    { path: '/shoes', component: 'Women_shoes', category: 'womens-shoes' },
    { path: '/jeans', component: 'Women_jeans', category: 'womens-jeans' },
    { path: '/dress', component: 'Women_dress', category: 'womens-dresses' },
    { path: '/men-t-shirt', component: 'Men_T_shirt', category: 'mens-t-shirts' },
    { path: '/men-jeans', component: 'Men_jeans', category: 'mens-jeans' },
    { path: '/accessories-glasses', component: 'Accessories_glasses', category: 'accessories-glasses' }
  ];
  
  routeComponents.forEach(({ path, component, category }) => {
    try {
      // Extract category from path and verify mapping
      const pathCategory = path.replace('/', '');
      const mappedCategory = getCategorySlugFromPath(pathCategory);
      
      if (mappedCategory === category) {
        log(`✅ Route ${path} → ${component} → ${category}`, 'success');
        recordTest('components', `Route Mapping: ${path}`, true);
      } else {
        log(`❌ Route ${path} mapping incorrect: expected ${category}, got ${mappedCategory}`, 'error');
        recordTest('components', `Route Mapping: ${path}`, false, `Expected ${category}, got ${mappedCategory}`);
      }
    } catch (error) {
      log(`❌ Route ${path} mapping error: ${error.message}`, 'error');
      recordTest('components', `Route Mapping: ${path}`, false, error);
    }
  });
};

// Generate comprehensive report
const generateReport = () => {
  log('\n📊 Frontend Integration Test Report', 'info');
  log('=' .repeat(50), 'info');
  
  const { total, passed, failed } = testResults.summary;
  const successRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;
  
  log(`\nSUMMARY:`, 'info');
  log(`Total Tests: ${total}`, 'info');
  log(`Passed: ${passed}`, 'success');
  log(`Failed: ${failed}`, failed > 0 ? 'error' : 'info');
  log(`Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
  
  // Category breakdown
  Object.entries(testResults).forEach(([category, tests]) => {
    if (category === 'summary' || tests.length === 0) return;
    
    const categoryPassed = tests.filter(t => t.passed).length;
    const categoryTotal = tests.length;
    
    log(`\n${category.toUpperCase()}: ${categoryPassed}/${categoryTotal}`, 'info');
    
    tests.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      const color = test.passed ? 'success' : 'error';
      log(`  ${status} ${test.name}`, color);
      if (!test.passed && test.error) {
        log(`    Error: ${test.error}`, 'error');
      }
    });
  });
  
  log('\nRECOMMENDations:', 'info');
  if (failed === 0) {
    log('🎉 All frontend integrations are working correctly!', 'success');
    log('✅ Components are properly connected to backend APIs', 'success');
    log('✅ Category mappings are functioning correctly', 'success');
    log('✅ Service layer is working as expected', 'success');
  } else {
    log('⚠️  Some integrations need attention:', 'warning');
    log('- Check backend server is running on http://localhost:5000', 'warning');
    log('- Verify database is seeded with test data', 'warning');
    log('- Check network connectivity between frontend and backend', 'warning');
    log('- Review failed tests above for specific issues', 'warning');
  }
};

// Main execution
const runFrontendTests = async () => {
  log('🚀 Starting Frontend Integration Tests...', 'info');
  
  // Test category slug mapping (synchronous)
  testCategorySlugMapping();
  
  // Test component route mappings (synchronous)
  testComponentRoutes();
  
  // Test API services (asynchronous)
  await testAPIServices();
  
  // Test component integration scenarios (asynchronous)
  await testComponentIntegration();
  
  // Generate report
  generateReport();
};

// Export for use in other test files
export { runFrontendTests, testResults };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runFrontendTests().catch(error => {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  });
}
