import { productsAPI, categoriesAPI } from "./api.js";

// Helper function to map category names to slugs
const getCategorySlugMap = () => {
  return {
    // Women's categories
    "t-shirt": "womens-t-shirts",
    shirt: "womens-shirts",
    jacket: "womens-jackets",
    shoes: "womens-shoes",
    skirt: "womens-skirts",
    shorts: "womens-shorts",
    jeans: "womens-jeans",
    trouser: "womens-trousers",
    dress: "womens-dresses",

    // Men's categories
    "men/t-shirt": "mens-t-shirts",
    "men/shirt": "mens-shirts",
    "men/jacket": "mens-jackets",
    "men/shoes": "mens-shoes",
    "men/jeans": "mens-jeans",
    "men/trouser": "mens-trousers",

    // Kids categories
    "girls/clothing": "girls-clothing",
    "girls/shoes": "girls-shoes",
    "boys/clothing": "boys-clothing",
    "boys/shoes": "boys-shoes",

    // Accessories
    "accessories/glasses": "glasses",
    "accessories/watches": "watches",
    "accessories/gloves": "gloves",
    "accessories/belt": "belts",
    "accessories/hat": "hats",
    "accessories/bag": "bags",
    "accessories/wallet": "wallets",
  };
};

// Helper function to get category slug from route path
const getCategorySlugFromPath = (path) => {
  const slugMap = getCategorySlugMap();
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return slugMap[cleanPath] || cleanPath;
};

// Product service to handle product-related operations
export const productService = {
  // Get all products with optional filters
  getAllProducts: async (filters = {}) => {
    try {
      const response = await productsAPI.getAll(filters);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch products",
      };
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryPath, filters = {}) => {
    try {
      // First map the category path to the correct slug
      const categorySlug = getCategorySlugFromPath(categoryPath);

      // Then get the category to find its ID
      const categoryResponse = await categoriesAPI.getById(categorySlug);

      if (!categoryResponse.success) {
        throw new Error("Category not found");
      }

      const categoryId = categoryResponse.data.category.id;

      // Then get products for that category
      const response = await productsAPI.getAll({
        ...filters,
        category: categoryId,
      });

      return {
        success: true,
        data: response.data,
        category: categoryResponse.data.category,
      };
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch products",
      };
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await productsAPI.getById(id);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch product",
      };
    }
  },

  // Search products
  searchProducts: async (searchTerm, filters = {}) => {
    try {
      const response = await productsAPI.getAll({
        ...filters,
        search: searchTerm,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error searching products:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to search products",
      };
    }
  },
};

// Category service
export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await categoriesAPI.getAll();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch categories",
      };
    }
  },

  // Get category by ID or slug
  getCategory: async (id) => {
    try {
      const response = await categoriesAPI.getById(id);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching category:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch category",
      };
    }
  },
};

// Export the helper functions
export { getCategorySlugMap, getCategorySlugFromPath };
