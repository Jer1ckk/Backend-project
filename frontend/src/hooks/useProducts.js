import { useState, useEffect } from "react";
import {
  productService,
  getCategorySlugFromPath,
} from "../services/productService";

// Custom hook for managing products
export const useProducts = (categoryPath = null, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let result;

        if (categoryPath) {
          // Get products by category
          const categorySlug = getCategorySlugFromPath(categoryPath);
          result = await productService.getProductsByCategory(
            categorySlug,
            filters
          );

          if (result.success) {
            setProducts(result.data.products || []);
            setCategory(result.category);
          } else {
            setError(result.error);
          }
        } else {
          // Get all products
          result = await productService.getAllProducts(filters);

          if (result.success) {
            setProducts(result.data.products || []);
          } else {
            setError(result.error);
          }
        }
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error in useProducts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryPath, JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
    category,
    refetch: () => {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
          let result;

          if (categoryPath) {
            const categorySlug = getCategorySlugFromPath(categoryPath);
            result = await productService.getProductsByCategory(
              categorySlug,
              filters
            );

            if (result.success) {
              setProducts(result.data.products || []);
              setCategory(result.category);
            } else {
              setError(result.error);
            }
          } else {
            result = await productService.getAllProducts(filters);

            if (result.success) {
              setProducts(result.data.products || []);
            } else {
              setError(result.error);
            }
          }
        } catch (err) {
          setError("Failed to fetch products");
          console.error("Error in useProducts refetch:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    },
  };
};

// Custom hook for managing favorites
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Toggle favorite status
  const toggleFavorite = async (productId) => {
    setLoading(true);

    try {
      // Import here to avoid circular dependency
      const { favoritesAPI } = await import("../services/api.js");

      const result = await favoritesAPI.toggle(productId);

      if (result.success) {
        const newFavorites = new Set(favorites);

        if (result.data.isFavorite) {
          newFavorites.add(productId);
        } else {
          newFavorites.delete(productId);
        }

        setFavorites(newFavorites);
        return { success: true, isFavorite: result.data.isFavorite };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update favorite",
      };
    } finally {
      setLoading(false);
    }
  };

  // Load user's favorites
  const loadFavorites = async () => {
    try {
      const { favoritesAPI } = await import("../services/api.js");
      const result = await favoritesAPI.getAll();

      if (result.success) {
        const favoriteIds = new Set(
          result.data.products.map((product) => product.id)
        );
        setFavorites(favoriteIds);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    loadFavorites,
    isFavorite: (productId) => favorites.has(productId),
  };
};

export default useProducts;
