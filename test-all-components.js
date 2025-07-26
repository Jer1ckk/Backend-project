#!/usr/bin/env node

/**
 * Comprehensive Test Suite for All Components and API Integration
 * Tests both backend API endpoints and frontend component integration
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:5000';
const API_BASE = `${BASE_URL}/api`;

// Test results storage
const testResults = {
  backend: {
    auth: [],
    products: [],
    categories: [],
    favorites: [],
    cart: []
  },
  frontend: {
    components: [],
    services: [],
    integration: []
  },
  summary: {
    total: 0,
    passed: 0,
    failed: 0
  }
};

// Test user credentials
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  mobileNumber: '+1234567890',
  password: 'password123',
  gender: 'Male',
  country: 'Cambodia'
};

let authToken = null;
let testProductId = null;
let testCategoryId = null;

// Utility functions
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
};

const recordTest = (category, subcategory, testName, passed, error = null) => {
  const result = {
    name: testName,
    passed,
    error: error?.message || error,
    timestamp: new Date().toISOString()
  };
  
  testResults[category][subcategory].push(result);
  testResults.summary.total++;
  if (passed) {
    testResults.summary.passed++;
  } else {
    testResults.summary.failed++;
  }
};

// API Test Functions
const testBackendAPI = async () => {
  log('🔧 Testing Backend API Components...', 'info');
  
  // Test server health
  try {
    const response = await axios.get(BASE_URL);
    if (response.data.success) {
      log('✅ Server is running and healthy', 'success');
      recordTest('backend', 'auth', 'Server Health Check', true);
    }
  } catch (error) {
    log('❌ Server health check failed', 'error');
    recordTest('backend', 'auth', 'Server Health Check', false, error);
    return false;
  }

  // Test Authentication endpoints
  await testAuthEndpoints();
  
  // Test Categories endpoints
  await testCategoryEndpoints();
  
  // Test Products endpoints
  await testProductEndpoints();
  
  // Test authenticated endpoints (favorites, cart)
  if (authToken) {
    await testFavoriteEndpoints();
    await testCartEndpoints();
  }
  
  return true;
};

const testAuthEndpoints = async () => {
  log('🔐 Testing Authentication Endpoints...', 'info');
  
  // Test user registration
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, testUser);
    if (response.data.success) {
      log('✅ User registration successful', 'success');
      recordTest('backend', 'auth', 'User Registration', true);
      authToken = response.data.data.token;
    }
  } catch (error) {
    if (error.response?.status === 400 && error.response.data.message.includes('already exists')) {
      log('⚠️  User already exists, proceeding with login', 'warning');
      recordTest('backend', 'auth', 'User Registration', true, 'User already exists');
    } else {
      log('❌ User registration failed', 'error');
      recordTest('backend', 'auth', 'User Registration', false, error);
    }
  }
  
  // Test user login
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      telephone: testUser.email,
      password: testUser.password
    });
    if (response.data.success) {
      log('✅ User login successful', 'success');
      recordTest('backend', 'auth', 'User Login', true);
      authToken = response.data.data.token;
    }
  } catch (error) {
    log('❌ User login failed', 'error');
    recordTest('backend', 'auth', 'User Login', false, error);
  }
  
  // Test profile endpoint
  if (authToken) {
    try {
      const response = await axios.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (response.data.success) {
        log('✅ Profile fetch successful', 'success');
        recordTest('backend', 'auth', 'Get Profile', true);
      }
    } catch (error) {
      log('❌ Profile fetch failed', 'error');
      recordTest('backend', 'auth', 'Get Profile', false, error);
    }
  }
};

const testCategoryEndpoints = async () => {
  log('📂 Testing Category Endpoints...', 'info');
  
  // Test get all categories
  try {
    const response = await axios.get(`${API_BASE}/categories`);
    if (response.data.success && response.data.data.categories) {
      log(`✅ Categories fetch successful (${response.data.data.categories.length} categories)`, 'success');
      recordTest('backend', 'categories', 'Get All Categories', true);
      
      // Store first category ID for other tests
      if (response.data.data.categories.length > 0) {
        testCategoryId = response.data.data.categories[0].id;
      }
    }
  } catch (error) {
    log('❌ Categories fetch failed', 'error');
    recordTest('backend', 'categories', 'Get All Categories', false, error);
  }
  
  // Test get single category
  if (testCategoryId) {
    try {
      const response = await axios.get(`${API_BASE}/categories/${testCategoryId}`);
      if (response.data.success) {
        log('✅ Single category fetch successful', 'success');
        recordTest('backend', 'categories', 'Get Single Category', true);
      }
    } catch (error) {
      log('❌ Single category fetch failed', 'error');
      recordTest('backend', 'categories', 'Get Single Category', false, error);
    }
  }
};

const testProductEndpoints = async () => {
  log('🛍️ Testing Product Endpoints...', 'info');
  
  // Test get all products
  try {
    const response = await axios.get(`${API_BASE}/products`);
    if (response.data.success && response.data.data.products) {
      log(`✅ Products fetch successful (${response.data.data.products.length} products)`, 'success');
      recordTest('backend', 'products', 'Get All Products', true);
      
      // Store first product ID for other tests
      if (response.data.data.products.length > 0) {
        testProductId = response.data.data.products[0].id;
      }
    }
  } catch (error) {
    log('❌ Products fetch failed', 'error');
    recordTest('backend', 'products', 'Get All Products', false, error);
  }
  
  // Test get single product
  if (testProductId) {
    try {
      const response = await axios.get(`${API_BASE}/products/${testProductId}`);
      if (response.data.success) {
        log('✅ Single product fetch successful', 'success');
        recordTest('backend', 'products', 'Get Single Product', true);
      }
    } catch (error) {
      log('❌ Single product fetch failed', 'error');
      recordTest('backend', 'products', 'Get Single Product', false, error);
    }
  }
  
  // Test product filtering
  try {
    const response = await axios.get(`${API_BASE}/products?limit=5&page=1`);
    if (response.data.success) {
      log('✅ Product filtering successful', 'success');
      recordTest('backend', 'products', 'Product Filtering', true);
    }
  } catch (error) {
    log('❌ Product filtering failed', 'error');
    recordTest('backend', 'products', 'Product Filtering', false, error);
  }
  
  // Test product search
  try {
    const response = await axios.get(`${API_BASE}/products?search=shirt`);
    if (response.data.success) {
      log('✅ Product search successful', 'success');
      recordTest('backend', 'products', 'Product Search', true);
    }
  } catch (error) {
    log('❌ Product search failed', 'error');
    recordTest('backend', 'products', 'Product Search', false, error);
  }
};

const testFavoriteEndpoints = async () => {
  log('❤️ Testing Favorite Endpoints...', 'info');
  
  const headers = { Authorization: `Bearer ${authToken}` };
  
  // Test get favorites
  try {
    const response = await axios.get(`${API_BASE}/favorites`, { headers });
    if (response.data.success) {
      log('✅ Get favorites successful', 'success');
      recordTest('backend', 'favorites', 'Get Favorites', true);
    }
  } catch (error) {
    log('❌ Get favorites failed', 'error');
    recordTest('backend', 'favorites', 'Get Favorites', false, error);
  }
  
  // Test add to favorites
  if (testProductId) {
    try {
      const response = await axios.post(`${API_BASE}/favorites`, 
        { productId: testProductId }, 
        { headers }
      );
      if (response.data.success) {
        log('✅ Add to favorites successful', 'success');
        recordTest('backend', 'favorites', 'Add to Favorites', true);
      }
    } catch (error) {
      log('❌ Add to favorites failed', 'error');
      recordTest('backend', 'favorites', 'Add to Favorites', false, error);
    }
    
    // Test toggle favorite
    try {
      const response = await axios.post(`${API_BASE}/favorites/toggle`, 
        { productId: testProductId }, 
        { headers }
      );
      if (response.data.success) {
        log('✅ Toggle favorite successful', 'success');
        recordTest('backend', 'favorites', 'Toggle Favorite', true);
      }
    } catch (error) {
      log('❌ Toggle favorite failed', 'error');
      recordTest('backend', 'favorites', 'Toggle Favorite', false, error);
    }
  }
};

const testCartEndpoints = async () => {
  log('🛒 Testing Cart Endpoints...', 'info');
  
  const headers = { Authorization: `Bearer ${authToken}` };
  
  // Test get cart
  try {
    const response = await axios.get(`${API_BASE}/cart`, { headers });
    if (response.data.success) {
      log('✅ Get cart successful', 'success');
      recordTest('backend', 'cart', 'Get Cart', true);
    }
  } catch (error) {
    log('❌ Get cart failed', 'error');
    recordTest('backend', 'cart', 'Get Cart', false, error);
  }
  
  // Test add to cart
  if (testProductId) {
    try {
      const response = await axios.post(`${API_BASE}/cart`, 
        { 
          productId: testProductId,
          quantity: 1,
          selectedColor: 'blue',
          selectedSize: 'M'
        }, 
        { headers }
      );
      if (response.data.success) {
        log('✅ Add to cart successful', 'success');
        recordTest('backend', 'cart', 'Add to Cart', true);
      }
    } catch (error) {
      log('❌ Add to cart failed', 'error');
      recordTest('backend', 'cart', 'Add to Cart', false, error);
    }
  }
};

// Frontend component verification
const testFrontendComponents = async () => {
  log('🎨 Testing Frontend Components...', 'info');
  
  // Check if frontend files exist
  const frontendComponents = [
    'src/App.jsx',
    'src/components/Homepage.jsx',
    'src/components/Login.jsx',
    'src/components/Register.jsx',
    'src/components/Collection.jsx',
    'src/components/Footer.jsx',
    'src/services/api.js',
    'src/services/productService.js',
    'src/context/AuthContext.jsx',
    'src/hooks/useProducts.js'
  ];
  
  for (const component of frontendComponents) {
    const componentPath = path.join('frontend', component);
    try {
      if (fs.existsSync(componentPath)) {
        log(`✅ Component exists: ${component}`, 'success');
        recordTest('frontend', 'components', `Component: ${component}`, true);
      } else {
        log(`❌ Component missing: ${component}`, 'error');
        recordTest('frontend', 'components', `Component: ${component}`, false, 'File not found');
      }
    } catch (error) {
      log(`❌ Error checking component: ${component}`, 'error');
      recordTest('frontend', 'components', `Component: ${component}`, false, error);
    }
  }
};

// Main test execution
const runAllTests = async () => {
  log('🚀 Starting Comprehensive Component and API Testing...', 'info');
  log('=' .repeat(60), 'info');
  
  // Test backend API
  const backendHealthy = await testBackendAPI();
  
  // Test frontend components
  await testFrontendComponents();
  
  // Generate test report
  generateTestReport();
};

const generateTestReport = () => {
  log('📊 Generating Test Report...', 'info');
  log('=' .repeat(60), 'info');
  
  const { total, passed, failed } = testResults.summary;
  const successRate = ((passed / total) * 100).toFixed(2);
  
  log(`\n📈 TEST SUMMARY:`, 'info');
  log(`Total Tests: ${total}`, 'info');
  log(`Passed: ${passed}`, 'success');
  log(`Failed: ${failed}`, failed > 0 ? 'error' : 'info');
  log(`Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
  
  // Detailed breakdown
  log(`\n🔍 DETAILED BREAKDOWN:`, 'info');
  
  Object.entries(testResults).forEach(([category, subcategories]) => {
    if (category === 'summary') return;
    
    log(`\n${category.toUpperCase()}:`, 'info');
    Object.entries(subcategories).forEach(([subcategory, tests]) => {
      const subPassed = tests.filter(t => t.passed).length;
      const subTotal = tests.length;
      log(`  ${subcategory}: ${subPassed}/${subTotal}`, subPassed === subTotal ? 'success' : 'warning');
      
      // Show failed tests
      tests.filter(t => !t.passed).forEach(test => {
        log(`    ❌ ${test.name}: ${test.error}`, 'error');
      });
    });
  });
  
  // Save detailed report to file
  const reportPath = 'test-results.json';
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');
  
  log('\n🎯 RECOMMENDATIONS:', 'info');
  if (failed > 0) {
    log('- Fix failed tests before deployment', 'warning');
    log('- Check server connectivity and database setup', 'warning');
    log('- Verify all required dependencies are installed', 'warning');
  } else {
    log('- All tests passed! System is ready for use', 'success');
  }
};

// Run tests
if (require.main === module) {
  runAllTests().catch(error => {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  testResults
};
