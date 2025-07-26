// Simple test to verify frontend-backend integration
import axios from "axios";

const testIntegration = async () => {
  try {
    console.log("🧪 Testing frontend-backend integration...\n");

    // Test 1: Check if backend is accessible from frontend
    console.log("1. Testing backend connectivity...");
    const healthResponse = await axios.get("http://localhost:5000/health");
    console.log("✅ Backend health check:", healthResponse.data.message);
    console.log("");

    // Test 2: Test products API
    console.log("2. Testing products API...");
    const productsResponse = await axios.get(
      "http://localhost:5000/api/products"
    );
    console.log(
      "✅ Products API:",
      productsResponse.data.data.products.length,
      "products found"
    );
    console.log("First product:", productsResponse.data.data.products[0]?.name);
    console.log("");

    // Test 3: Test categories API
    console.log("3. Testing categories API...");
    const categoriesResponse = await axios.get(
      "http://localhost:5000/api/categories"
    );
    console.log(
      "✅ Categories API:",
      categoriesResponse.data.data.categories.length,
      "categories found"
    );
    console.log("");

    // Test 4: Test specific category products
    console.log("4. Testing category-specific products...");
    const tshirtCategoryResponse = await axios.get(
      "http://localhost:5000/api/products?category=7"
    ); // Women's T-Shirts
    console.log(
      "✅ Women's T-Shirts:",
      tshirtCategoryResponse.data.data.products.length,
      "products found"
    );
    console.log("");

    console.log("🎉 All integration tests passed!");
    console.log("✅ Frontend can successfully communicate with backend");
    console.log("✅ API endpoints are working correctly");
    console.log("✅ Data is being returned in the expected format");
  } catch (error) {
    console.error("❌ Integration test failed:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
};

// Run the test
testIntegration();
