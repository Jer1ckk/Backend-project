// Simple API test script
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Get categories
    console.log('2. Testing categories endpoint...');
    const categoriesResponse = await axios.get(`${BASE_URL}/api/categories`);
    console.log('✅ Categories:', categoriesResponse.data.data.categories.length, 'categories found');
    console.log('');

    // Test 3: Get products
    console.log('3. Testing products endpoint...');
    const productsResponse = await axios.get(`${BASE_URL}/api/products`);
    console.log('✅ Products:', productsResponse.data.data.products.length, 'products found');
    console.log('');

    // Test 4: User registration
    console.log('4. Testing user registration...');
    const registerData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobileNumber: '1234567890',
      password: 'password123',
      gender: 'Male',
      country: 'Cambodia',
      city: 'Phnom Penh'
    };

    const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
    console.log('✅ User registered successfully');
    const token = registerResponse.data.data.token;
    console.log('');

    // Test 5: User login
    console.log('5. Testing user login...');
    const loginData = {
      telephone: 'john.doe@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
    console.log('✅ User logged in successfully');
    console.log('');

    // Test 6: Get user profile (authenticated)
    console.log('6. Testing authenticated profile endpoint...');
    const profileResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.data.user.firstName, profileResponse.data.data.user.lastName);
    console.log('');

    // Test 7: Add to favorites (authenticated)
    console.log('7. Testing add to favorites...');
    const favoriteData = { productId: 1 };
    const favoriteResponse = await axios.post(`${BASE_URL}/api/favorites`, favoriteData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Product added to favorites');
    console.log('');

    // Test 8: Get favorites (authenticated)
    console.log('8. Testing get favorites...');
    const favoritesResponse = await axios.get(`${BASE_URL}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Favorites retrieved:', favoritesResponse.data.data.products.length, 'favorites found');
    console.log('');

    // Test 9: Add to cart (authenticated)
    console.log('9. Testing add to cart...');
    const cartData = {
      productId: 1,
      quantity: 2,
      selectedColor: 'white',
      selectedSize: 'M'
    };
    const cartResponse = await axios.post(`${BASE_URL}/api/cart`, cartData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Product added to cart');
    console.log('');

    // Test 10: Get cart (authenticated)
    console.log('10. Testing get cart...');
    const getCartResponse = await axios.get(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Cart retrieved:', getCartResponse.data.data.items.length, 'items in cart');
    console.log('Total:', getCartResponse.data.data.summary.total);
    console.log('');

    console.log('🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run tests
testAPI();
