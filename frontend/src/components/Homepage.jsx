import React, { useState } from "react";
import { Bell, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import bannerImg from '../assets/10.jpg'

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
      { name: "Shoes", link: "/shoes"},
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
      { name: "Shoes", link: "/men/shoes"},
    ],
  },
  {
    name: "Girls",
    items: [
      { name: "Clothing", link: "/girls/clothing" },
      { name: "Shoes", link: "/girls/shoes"},
    ],
  },
  {
    name: "Boys",
    items: [
      { name: "Clothing", link: "/boys/clothing" },
      { name: "Shoes", link: "/boys/shoes"},
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


function Homepage() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="homepage-container">
      {/* Header */}
      <div className="header">
        {/* Logo */}
        <div className="logo-container">
           <Link to="/" className="logo-bg">
            <span className="logo-text">
              <span className="logo-star">★</span>
              StyleStore
            </span>
          </Link>
        </div>
        {/* Search + Icons + Login/Register */}
        <div className="header-right">
          <div className="header-row">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
            {/* Icons area */}
            <div className="icons-area">
              <Bell size={20} className="text-black" />
              <Heart size={20} className="text-black" />
              <div className="shopping-bag-rel">
                <ShoppingBag size={22} className="text-black" />
                <span className="shopping-bag-badge">0</span>
              </div>
              <Link to="/login" className="login-link">LOGIN</Link>
              <Link to="/register" className="register-link">REGISTER</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Nav with Dropdowns and Links */}
      <div className="category-nav">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`category-group${openDropdown === cat.name ? " open" : ""}`}
            onMouseEnter={() => cat.items && setOpenDropdown(cat.name)}
            onMouseLeave={() => cat.items && setOpenDropdown(null)}
          >
            {cat.items ? (
              <button
                className={`category-btn${cat.name === "Women" ? " women" : ""}`}
                style={{ fontWeight: 700 }}
                onClick={() => setOpenDropdown(cat.name === openDropdown ? null : cat.name)}
                type="button"
              >
                {cat.name}
              </button>
            ) : (
              <a
                href={cat.link}
                className="category-btn"
                style={{ fontWeight: 700, textDecoration: "none", display: "inline-block" }}
              >
                {cat.name}
              </a>
            )}
            {/* Dropdown for categories with items */}
            {cat.items && (
              <div className="dropdown">
                <ul>
                  {cat.items.map((item) => (
                    <li key={item.name}>
                      <a href={item.link}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="Banner">
        <img src={bannerImg} alt="Banner" />
      </div>
    </div>
  );
}

export default Homepage;