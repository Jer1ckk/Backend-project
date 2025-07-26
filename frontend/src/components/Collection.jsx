import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Collection.css";


import women1 from '../assets/women_shirt1.jpg';
import women2 from '../assets/women_shirt2.jpg';
import women3 from '../assets/women_shirt3.jpg';
import women4 from '../assets/women_shirt4.jpg';
import women5 from '../assets/women_shirt5.jpg';
import women6 from '../assets/women_shirt6.jpg';
import women7 from '../assets/women_shirt7.jpg';
import women8 from '../assets/women_shirt8.jpg';
import women9 from '../assets/women_shirt9.jpg';
import women10 from '../assets/women_shirt10.jpg';
import women11 from '../assets/women_shirt11.jpg';
import women12 from '../assets/women_shirt12.jpg';
import women13 from '../assets/women_jean13.jpg';
import women14 from '../assets/women_shorts14.jpg';
import women15 from '../assets/women_dress.jpg';
import women16 from '../assets/women_jean2.jpg';
import women17 from '../assets/women_jean3.jpg';
import women18 from '../assets/women_jean4.jpg';
import women19 from '../assets/women_shorts5.jpg';
import women20 from '../assets/women_skirt2.jpg';

import men1 from '../assets/men_shirt39.jpg';
import men2 from '../assets/men_shirt23.jpg';
import men3 from '../assets/men_shirt32.jpg';
import men4 from '../assets/men_jacket10.webp';
import men5 from '../assets/men_jacket19.webp';
import men6 from '../assets/men_jean2.jpg';
import men7 from '../assets/men_shirt24.jpg';
import men8 from '../assets/men_shirt10.webp';
import men9 from '../assets/men_shirt37.jpg';
import men10 from '../assets/men_shirt35.jpg';
import men11 from '../assets/men_shirt30.jpg';
import men12 from '../assets/men_shirt31.jpg';
import men13 from '../assets/men_shirt33.jpg';
import men14 from '../assets/men_trouser1.jpg';
import men15 from '../assets/men_trouser3.webp';
import men16 from '../assets/men_trouser9.webp';
import men17 from '../assets/men_jean7.jpg';
import men18 from '../assets/men_jean8.jpg';
import men19 from '../assets/men_jacket17.webp';
import men20 from '../assets/men_jacket1.jpg'

import boy1 from '../assets/boy_jean1.jpg';
import boy2 from '../assets/boy_jean2.jpg';
import boy3 from '../assets/boy_jean3.jpg';
import boy4 from '../assets/boy_jean4.jpg';
import boy5 from '../assets/boy_jean5.jpg';
import boy6 from '../assets/boy_jean6.jpg';
import boy7 from '../assets/boy_jean7.jpg';
import boy8 from '../assets/boy_jean8.jpg';
import boy9 from '../assets/boy_jean9.jpg';
import boy10 from '../assets/boy_jean10.jpg';
import boy11 from '../assets/boy_shirt1.jpg';
import boy12 from '../assets/boy_shirt2.jpg';
import boy13 from '../assets/boy_shirt3.jpg';
import boy14 from '../assets/boy_shirt4.jpg';
import boy15 from '../assets/boy_shirt5.jpg';
import boy16 from '../assets/boy_shirt6.jpg';
import boy17 from '../assets/boy_shirt7.jpg';
import boy18 from '../assets/boy_shirt8.jpg';
import boy19 from '../assets/boy_shirt9.jpg';
import boy20 from '../assets/boy_shirt10.jpg';

import girl1 from '../assets/girl_shirt1.jpg';
import girl2 from '../assets/girl_shirt2.jpg';
import girl3 from '../assets/girl_shirt3.jpg';
import girl4 from '../assets/girl_shirt4.jpg';
import girl5 from '../assets/girl_shirt5.jpg';
import girl6 from '../assets/girl_shirt6.jpg';
import girl7 from '../assets/girl_shirt7.jpg';
import girl8 from '../assets/girl_shirt8.jpg';
import girl9 from '../assets/girl_shirt9.jpg';
import girl10 from '../assets/girl_shirt10.jpg';
import girl11 from '../assets/girl_shirt11.jpg';
import girl12 from '../assets/girl_shirt12.jpg';
import girl13 from '../assets/girl_shirt13.jpg';
import girl14 from '../assets/girl_shirt14.jpg';
import girl15 from '../assets/girl_shirt15.jpg';
import girl16 from '../assets/girl_shirt16.jpg';
import girl17 from '../assets/girl_shirt17.jpg';
import girl18 from '../assets/girl_shirt18.jpg';
import girl19 from '../assets/girl_shirt19.jpg';
import girl20 from '../assets/girl_shirt20.jpg';

import accessories1 from '../assets/bag8.jpg';
import accessories2 from '../assets/bag7.jpg';
import accessories3 from '../assets/bag3.webp';
import accessories4 from '../assets/bag9.jpg';
import accessories5 from '../assets/bag13.jpg';
import accessories6 from '../assets/hat11.jpg';
import accessories7 from '../assets/glasses17.jpg';
import accessories8 from '../assets/hat8.jpg';
import accessories9 from '../assets/hat4.webp';
import accessories10 from '../assets/hat5.webp';
import accessories11 from '../assets/watches1.webp';
import accessories12 from '../assets/watches2.webp';
import accessories13 from '../assets/watches3.webp';
import accessories14 from '../assets/watches4.webp';
import accessories15 from '../assets/watches5.webp';
import accessories16 from '../assets/glove1.webp';
import accessories17 from '../assets/glove2.webp';
import accessories18 from '../assets/glove3.jpg'; 
import accessories19 from '../assets/glove4.webp';
import accessories20 from '../assets/glove5.webp';
import accessories21 from '../assets/wallet1.webp';
import accessories22 from '../assets/wallet2.webp';
import accessories23 from '../assets/wallet3.jpg'; 
import accessories24 from '../assets/wallet4.webp';
import accessories25 from '../assets/wallet5.webp';
import accessories26 from '../assets/glasses1.webp';
import accessories27 from '../assets/glasses2.webp';
import accessories28 from '../assets/glasses3.webp';
import accessories29 from '../assets/glasses4.webp';
import accessories30 from '../assets/glasses5.webp';



const Collections = [
  {
    title: "Women's collection",
    products: [
      { id: 1, name: "Women's Basic Tee", color: "White", price: 19.99, originalPrice: 29.99, image: women1, onSale: true },
      { id: 2, name: "Women's Pink Shirt", color: "Pink", price: 21.99, originalPrice: 31.99, image: women2, onSale: true },
      { id: 3, name: "Women's Cream Blouse", color: "Cream", price: 23.99, originalPrice: 33.99, image: women3, onSale: true },
      { id: 4, name: "Women's Navy Top", color: "Navy", price: 25.99, originalPrice: 35.99, image: women4, onSale: true },
      { id: 5, name: "Women's Summer Dress", color: "Yellow", price: 27.99, originalPrice: 37.99, image: women5, onSale: true },
      { id: 6, name: "Women's Floral Skirt", color: "Floral", price: 29.99, originalPrice: 39.99, image: women6, onSale: true },
      { id: 7, name: "Women's Black Jeans", color: "Black", price: 31.99, originalPrice: 41.99, image: women7, onSale: true },
      { id: 8, name: "Women's White Blazer", color: "White", price: 33.99, originalPrice: 43.99, image: women8, onSale: true },
      { id: 9, name: "Women's Red Sweater", color: "Red", price: 35.99, originalPrice: 45.99, image: women9, onSale: true },
      { id: 10, name: "Women's Blue Jacket", color: "Blue", price: 37.99, originalPrice: 47.99, image: women10, onSale: true },
      { id: 11, name: "Women's Green Cardigan", color: "Green", price: 39.99, originalPrice: 49.99, image: women11, onSale: true },
      { id: 12, name: "Women's Yellow Top", color: "Yellow", price: 41.99, originalPrice: 51.99, image: women12, onSale: true },
      { id: 13, name: "Women's Purple Dress", color: "Purple", price: 43.99, originalPrice: 53.99, image: women13, onSale: true },
      { id: 14, name: "Women's Orange Skirt", color: "Orange", price: 45.99, originalPrice: 55.99, image: women14, onSale: true },
      { id: 15, name: "Women's Grey Pants", color: "Grey", price: 47.99, originalPrice: 57.99, image: women15, onSale: true },
      { id: 16, name: "Women's Brown Coat", color: "Brown", price: 49.99, originalPrice: 59.99, image: women16, onSale: true },
      { id: 17, name: "Women's Pink Blouse", color: "Pink", price: 51.99, originalPrice: 61.99, image: women17, onSale: true },
      { id: 18, name: "Women's Navy Jeans", color: "Navy", price: 53.99, originalPrice: 63.99, image: women18, onSale: true },
      { id: 19, name: "Women's White Tee", color: "White", price: 55.99, originalPrice: 65.99, image: women19, onSale: true },
      { id: 20, name: "Women's Black Dress", color: "Black", price: 57.99, originalPrice: 67.99, image: women20, onSale: true },
    ]
  },
  {
    title: "Men's collection",
    products: [
      { id: 21, name: "Men's Basic Tee", color: "White", price: 22.99, originalPrice: 32.99, image: men1, onSale: true },
      { id: 22, name: "Men's Pink Shirt", color: "Pink", price: 24.99, originalPrice: 34.99, image: men2, onSale: true },
      { id: 23, name: "Men's Cream Button-up", color: "Cream", price: 26.99, originalPrice: 36.99, image: men3, onSale: true },
      { id: 24, name: "Men's Navy Polo", color: "Navy", price: 28.99, originalPrice: 38.99, image: men4, onSale: true },
      { id: 25, name: "Men's Summer Shorts", color: "Yellow", price: 30.99, originalPrice: 40.99, image: men5, onSale: true },
      { id: 26, name: "Men's Floral Shirt", color: "Floral", price: 32.99, originalPrice: 42.99, image: men6, onSale: true },
      { id: 27, name: "Men's Black Jeans", color: "Black", price: 34.99, originalPrice: 44.99, image: men7, onSale: true },
      { id: 28, name: "Men's White Blazer", color: "White", price: 36.99, originalPrice: 46.99, image: men8, onSale: true },
      { id: 29, name: "Men's Red Sweater", color: "Red", price: 38.99, originalPrice: 48.99, image: men9, onSale: true },
      { id: 30, name: "Men's Blue Jacket", color: "Blue", price: 40.99, originalPrice: 50.99, image: men10, onSale: true },
      { id: 31, name: "Men's Green Cardigan", color: "Green", price: 42.99, originalPrice: 52.99, image: men11, onSale: true },
      { id: 32, name: "Men's Yellow Top", color: "Yellow", price: 44.99, originalPrice: 54.99, image: men12, onSale: true },
      { id: 33, name: "Men's Purple Shirt", color: "Purple", price: 46.99, originalPrice: 56.99, image: men13, onSale: true },
      { id: 34, name: "Men's Orange Shorts", color: "Orange", price: 48.99, originalPrice: 58.99, image: men14, onSale: true },
      { id: 35, name: "Men's Grey Pants", color: "Grey", price: 50.99, originalPrice: 60.99, image: men15, onSale: true },
      { id: 36, name: "Men's Brown Coat", color: "Brown", price: 52.99, originalPrice: 62.99, image: men16, onSale: true },
      { id: 37, name: "Men's Pink Blazer", color: "Pink", price: 54.99, originalPrice: 64.99, image: men17, onSale: true },
      { id: 38, name: "Men's Navy Jeans", color: "Navy", price: 56.99, originalPrice: 66.99, image: men18, onSale: true },
      { id: 39, name: "Men's White Tee", color: "White", price: 58.99, originalPrice: 68.99, image: men19, onSale: true },
      { id: 40, name: "Men's Black Jacket", color: "Black", price: 60.99, originalPrice: 70.99, image: men20, onSale: true },
    ]
  },
   {
    title: "Girl's Collection",
    products: [
      { id: 41, name: "Girl's Basic Tee",   price: 16.99, originalPrice: 24.99, image: girl1,  color: "White",  onSale: true },
      { id: 42, name: "Girl's Pink Shirt",  price: 17.99, originalPrice: 25.99, image: girl2,  color: "Pink",   onSale: true },
      { id: 43, name: "Girl's Cream Top",   price: 18.99, originalPrice: 26.99, image: girl3,  color: "Cream",  onSale: true },
      { id: 44, name: "Girl's Navy Shirt",  price: 19.99, originalPrice: 27.99, image: girl4,  color: "Navy",   onSale: true },
      { id: 45, name: "Girl's Summer Dress",price: 20.99, originalPrice: 28.99, image: girl5,  color: "Yellow", onSale: true },
      { id: 46, name: "Girl's Floral Skirt",price: 21.99, originalPrice: 29.99, image: girl6,  color: "Multi",  onSale: true },
      { id: 47, name: "Girl's Black Jeans", price: 22.99, originalPrice: 30.99, image: girl7,  color: "Black",  onSale: true },
      { id: 48, name: "Girl's White Blazer",price: 23.99, originalPrice: 31.99, image: girl8,  color: "White",  onSale: true },
      { id: 49, name: "Girl's Red Sweater", price: 24.99, originalPrice: 32.99, image: girl9,  color: "Red",    onSale: true },
      { id: 50, name: "Girl's Blue Jacket", price: 25.99, originalPrice: 33.99, image: girl10, color: "Blue",   onSale: true },
      { id: 51, name: "Girl's Green Cardigan",price: 26.99,originalPrice: 34.99,image: girl11, color: "Green",  onSale: true },
      { id: 52, name: "Girl's Yellow Top",  price: 27.99, originalPrice: 35.99, image: girl12, color: "Yellow", onSale: true },
      { id: 53, name: "Girl's Purple Dress",price: 28.99, originalPrice: 36.99, image: girl13, color: "Purple", onSale: true },
      { id: 54, name: "Girl's Orange Skirt",price: 29.99, originalPrice: 37.99, image: girl14, color: "Orange", onSale: true },
      { id: 55, name: "Girl's Grey Pants",  price: 30.99, originalPrice: 38.99, image: girl15, color: "Grey",   onSale: true },
      { id: 56, name: "Girl's Brown Coat",  price: 31.99, originalPrice: 39.99, image: girl16, color: "Brown",  onSale: true },
      { id: 57, name: "Girl's Pink Blouse", price: 32.99, originalPrice: 40.99, image: girl17, color: "Pink",   onSale: true },
      { id: 58, name: "Girl's Navy Jeans",  price: 33.99, originalPrice: 41.99, image: girl18, color: "Navy",   onSale: true },
      { id: 59, name: "Girl's White Tee",   price: 34.99, originalPrice: 42.99, image: girl19, color: "White",  onSale: true },
      { id: 60, name: "Girl's Black Dress", price: 35.99, originalPrice: 43.99, image: girl20, color: "Black",  onSale: true },
    ]
  },

  {
    title: "Boy's Collection",
    products: [
      { id: 61, name: "Boy's Basic Tee",    price: 17.99, originalPrice: 25.99, image: boy11, color: "White",  onSale: true },
      { id: 62, name: "Boy's Pink Shirt",   price: 18.99, originalPrice: 26.99, image: boy12, color: "Pink",   onSale: true },
      { id: 63, name: "Boy's Cream Top",    price: 19.99, originalPrice: 27.99, image: boy13, color: "Cream",  onSale: true },
      { id: 64, name: "Boy's Navy Shirt",   price: 20.99, originalPrice: 28.99, image: boy14, color: "Navy",   onSale: true },
      { id: 65, name: "Boy's Summer Shorts",price: 21.99, originalPrice: 29.99, image: boy15, color: "Yellow", onSale: true },
      { id: 66, name: "Boy's Floral Shirt", price: 22.99, originalPrice: 30.99, image: boy16, color: "Multi",  onSale: true },
      { id: 67, name: "Boy's Black Jeans",  price: 23.99, originalPrice: 31.99, image: boy1,  color: "Black",  onSale: true },
      { id: 68, name: "Boy's White Blazer", price: 24.99, originalPrice: 32.99, image: boy2,  color: "White",  onSale: true },
      { id: 69, name: "Boy's Red Sweater",  price: 25.99, originalPrice: 33.99, image: boy3,  color: "Red",    onSale: true },
      { id: 70, name: "Boy's Blue Jacket",  price: 26.99, originalPrice: 34.99, image: boy4,  color: "Blue",   onSale: true },
      { id: 71, name: "Boy's Green Cardigan",price: 27.99,originalPrice: 35.99,image: boy5,  color: "Green",  onSale: true },
      { id: 72, name: "Boy's Yellow Top",   price: 28.99, originalPrice: 36.99, image: boy6,  color: "Yellow", onSale: true },
      { id: 73, name: "Boy's Purple Shirt", price: 29.99, originalPrice: 37.99, image: boy7,  color: "Purple", onSale: true },
      { id: 74, name: "Boy's Orange Shorts",price: 30.99, originalPrice: 38.99, image: boy8,  color: "Orange", onSale: true },
      { id: 75, name: "Boy's Grey Pants",   price: 31.99, originalPrice: 39.99, image: boy9,  color: "Grey",   onSale: true },
      { id: 76, name: "Boy's Brown Coat",   price: 32.99, originalPrice: 40.99, image: boy10, color: "Brown",  onSale: true },
      { id: 77, name: "Boy's Pink Blazer",  price: 33.99, originalPrice: 41.99, image: boy17, color: "Pink",   onSale: true },
      { id: 78, name: "Boy's Navy Jeans",   price: 34.99, originalPrice: 42.99, image: boy18, color: "Navy",   onSale: true },
      { id: 79, name: "Boy's White Tee",    price: 35.99, originalPrice: 43.99, image: boy19, color: "White",  onSale: true },
      { id: 80, name: "Boy's Black Jacket", price: 36.99, originalPrice: 44.99, image: boy20, color: "Black",  onSale: true },
    ]
  },

  {
  title: "Accessories",
  products: [
    { id: 81, name: "Leather Bag", color: "Brown", price: 65.99, originalPrice: 85.99, image: accessories1, onSale: true },
    { id: 82, name: "Travel Bag", color: "Black", price: 59.99, originalPrice: 79.99, image: accessories2, onSale: true },
    { id: 83, name: "Mini Purse", color: "Pink", price: 45.99, originalPrice: 69.99, image: accessories3, onSale: true },
    { id: 84, name: "Brown Backpack", color: "Brown", price: 72.99, originalPrice: 94.99, image: accessories4, onSale: true },
    { id: 85, name: "Elegant Clutch", color: "White", price: 49.99, originalPrice: 64.99, image: accessories5, onSale: true },
    { id: 86, name: "Pink Scarf", color: "Pink", price: 24.99, originalPrice: 34.99, image: accessories6, onSale: true },
    { id: 87, name: "Red Hat", color: "Red", price: 14.99, originalPrice: 24.99, image: accessories7, onSale: true },
    { id: 88, name: "Wool Hat", color: "Grey", price: 19.99, originalPrice: 27.99, image: accessories8, onSale: true },
    { id: 89, name: "Navy Cap", color: "Navy", price: 17.99, originalPrice: 25.99, image: accessories9, onSale: true },
    { id: 90, name: "White Cap", color: "White", price: 14.99, originalPrice: 24.99, image: accessories10, onSale: true },
    { id: 91, name: "Classic Watch", color: "Gold", price: 89.99, originalPrice: 119.99, image: accessories11, onSale: true },
    { id: 92, name: "Sport Watch", color: "Black", price: 79.99, originalPrice: 109.99, image: accessories12, onSale: true },
    { id: 93, name: "Silver Watch", color: "Silver", price: 69.99, originalPrice: 99.99, image: accessories13, onSale: true },
    { id: 94, name: "Rose Gold Watch", color: "Rose Gold", price: 84.99, originalPrice: 114.99, image: accessories14, onSale: true },
    { id: 95, name: "Leather Strap Watch", color: "Brown", price: 54.99, originalPrice: 74.99, image: accessories15, onSale: true },
    { id: 96, name: "Blue Gloves", color: "Blue", price: 12.99, originalPrice: 22.99, image: accessories16, onSale: true },
    { id: 97, name: "Winter Gloves", color: "Grey", price: 15.99, originalPrice: 25.99, image: accessories17, onSale: true },
    { id: 98, name: "Wool Gloves", color: "White", price: 14.99, originalPrice: 20.99, image: accessories18, onSale: true }, // .jpg
    { id: 99, name: "Navy Gloves", color: "Navy", price: 13.99, originalPrice: 23.99, image: accessories19, onSale: true },
    { id: 100, name: "Black Gloves", color: "Black", price: 11.99, originalPrice: 19.99, image: accessories20, onSale: true },
    { id: 101, name: "Brown Wallet", color: "Brown", price: 34.99, originalPrice: 44.99, image: accessories21, onSale: true },
    { id: 102, name: "Red Wallet", color: "Red", price: 32.99, originalPrice: 42.99, image: accessories22, onSale: true },
    { id: 103, name: "Purple Wallet", color: "Purple", price: 34.99, originalPrice: 44.99, image: accessories23, onSale: true }, // .jpg
    { id: 104, name: "Orange Keychain", color: "Orange", price: 7.99, originalPrice: 17.99, image: accessories24, onSale: true },
    { id: 105, name: "Black Wallet", color: "Black", price: 33.99, originalPrice: 43.99, image: accessories25, onSale: true },
    { id: 106, name: "Black Sunglasses", color: "Black", price: 29.99, originalPrice: 39.99, image: accessories26, onSale: true },
    { id: 107, name: "Round Sunglasses", color: "Brown", price: 31.99, originalPrice: 41.99, image: accessories27, onSale: true },
    { id: 108, name: "Blue Tint Glasses", color: "Blue", price: 27.99, originalPrice: 37.99, image: accessories28, onSale: true },
    { id: 109, name: "Clear Lens Glasses", color: "Clear", price: 19.99, originalPrice: 29.99, image: accessories29, onSale: true },
    { id: 110, name: "Cat Eye Glasses", color: "Pink", price: 22.99, originalPrice: 32.99, image: accessories30, onSale: true }
  ]
}

];

const Collection = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="collections-container">
      {Collections.map((Collection, collectionIndex) => (
        <div key={collectionIndex} className="collection-section">
          <h2 className="collection-title">{Collection.title}</h2>
          <div className="products-grid">
            {Collection.products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  {product.onSale && <div className="sale-badge">SALE</div>}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-pricing">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;