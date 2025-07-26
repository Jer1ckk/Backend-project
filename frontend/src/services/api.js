import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Check if localStorage is available (browser environment)
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

// Products API functions
export const productsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },
};

// Categories API functions
export const categoriesAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/categories", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

// Favorites API functions
export const favoritesAPI = {
  getAll: async (params = {}) => {
    const response = await api.get("/favorites", { params });
    return response.data;
  },

  add: async (productId) => {
    const response = await api.post("/favorites", { productId });
    return response.data;
  },

  remove: async (productId) => {
    const response = await api.delete(`/favorites/${productId}`);
    return response.data;
  },

  toggle: async (productId) => {
    const response = await api.post("/favorites/toggle", { productId });
    return response.data;
  },
};

// Cart API functions
export const cartAPI = {
  get: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  add: async (cartData) => {
    const response = await api.post("/cart", cartData);
    return response.data;
  },

  update: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  remove: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  clear: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },
};

export default api;
