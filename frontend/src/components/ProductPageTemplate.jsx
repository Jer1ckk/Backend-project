import React, { useState, useEffect } from "react";
import { Heart, Bell, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts, useFavorites } from "../hooks/useProducts";
import Footer from "../components/Footer";

const categories = [
  {
    name: "Women",
    items: [
      { name: "T-shirt", link: "/t-shirt" },
      { name: "Shirt", link: "/shirt" },
      { name: "Jacket", link: "/jacket" },
      { name: "Skirt", link: "/skirt" },
      { name: "Shorts", link: "/shorts" },
      { name: "Jeans", link: "/jeans" },
      { name: "Trouser", link: "/trouser" },
      { name: "Dress", link: "/dress" },
      { name: "Shoes", link: "/shoes" },
    ],
  },
  {
    name: "Men",
    items: [
      { name: "T-shirt", link: "/men/t-shirt" },
      { name: "Jeans", link: "/men/jeans" },
      { name: "Jacket", link: "/men/jacket" },
      { name: "Trouser", link: "/men/trouser" },
      { name: "Shirt", link: "/men/shirt" },
      { name: "Shoes", link: "/men/shoes" },
    ],
  },
  {
    name: "Girls",
    items: [
      { name: "Clothing", link: "/girls/clothing" },
      { name: "Shoes", link: "/girls/shoes" },
    ],
  },
  {
    name: "Boys",
    items: [
      { name: "Clothing", link: "/boys/clothing" },
      { name: "Shoes", link: "/boys/shoes" },
    ],
  },
  {
    name: "Accessories",
    items: [
      { name: "Glasses", link: "/accessories/glasses" },
      { name: "Watches", link: "/accessories/watches"},
      { name: "Gloves", link: "/accessories/gloves" },
      { name: "Belt", link: "/accessories/belt" },
      { name: "Hat", link: "/accessories/hat" },
      { name: "Bag", link: "/accessories/bag" },
      { name: "Wallet", link: "/accessories/wallet" },
    ],
  },
];

const ProductPageTemplate = ({ 
  categoryPath, 
  pageTitle, 
  cssClassName = "women-tshirt-container",
  stylesheetPath 
}) => {
  const { isAuthenticated, user } = useAuth();
  const { products, loading, error, category } = useProducts(categoryPath);
  const { favorites, toggleFavorite, loadFavorites, isFavorite } = useFavorites();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Load favorites when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    }
  }, [isAuthenticated, loadFavorites]);

  const handleToggleFavorite = async (productId) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }
    
    await toggleFavorite(productId);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px'
      }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: 'red'
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="homepage-container">
        <div className="header">
          <div className="logo-container">
            <Link to="/" className="logo-bg">
              <span className="logo-text">
                <span className="logo-star">★</span>
                StyleStore
              </span>
            </Link>
          </div>
          <div className="header-right">
            <div className="header-row">
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
              <div className="icons-area">
                <Bell size={20} className="icon" />
                <div className="cart-container">
                  <ShoppingBag size={20} className="icon" />
                  <span className="cart-count">0</span>
                </div>
              </div>
            </div>
            <div className="auth-section">
              {isAuthenticated ? (
                <span className="user-greeting">Hello, {user?.firstName || 'User'}!</span>
              ) : (
                <>
                  <Link to="/login" className="auth-link">Login</Link>
                  <span className="separator">|</span>
                  <Link to="/register" className="auth-link">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="nav-menu">
          {categories.map((category, index) => (
            <div
              key={index}
              className="nav-item"
              onMouseEnter={() => setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="nav-title">{category.name}</span>
              {openDropdown === index && (
                <div className="dropdown-menu">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.link}
                      className="dropdown-item"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={cssClassName}>
          <div className="sale-banner">
            <div className="banner-content">
              <div className="sale-text">
                <span className="up-to">UP TO</span>
                <span className="percentage">70% OFF</span>
                <span className="sale-subtitle">ON MID-YEAR SALE</span>
              </div>
            </div>
          </div>
          <div className="women-tshirt-title">{pageTitle}</div>

          {/* Product Grid */}
          <div className="products-grids">
            {products.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                fontSize: '18px', 
                color: '#666',
                gridColumn: '1 / -1',
                padding: '40px'
              }}>
                No products found in this category.
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="product-cards">
                  <div className="product-image-containers">
                    <div className="discount-badge">{product.discount}%</div>
                    <button
                      className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
                      onClick={() => handleToggleFavorite(product.id)}
                    >
                      <Heart size={16} fill={isFavorite(product.id) ? '#ef4444' : 'none'} />
                    </button>
                    <img src={product.image} alt={product.name} className="product-images" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="price-container">
                      <span className="sale-price">US ${product.salePrice}</span>
                      <span className="original-price">US ${product.originalPrice}</span>
                    </div>
                    <div className="color-options">
                      {product.colors && JSON.parse(product.colors).map((color, index) => (
                        <div key={index} className={`color-dot ${color}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default ProductPageTemplate;
