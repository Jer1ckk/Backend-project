const axios = require("axios");

// Base URL for the API
const API_BASE = "http://localhost:5000/api";

// Sample product data templates for different categories
const productTemplates = {
  // Women's categories
  "womens-t-shirts": {
    names: [
      "Classic Cotton T-Shirt",
      "V-Neck Tee",
      "Striped T-Shirt",
      "Graphic Print Tee",
      "Basic White Tee",
      "Oversized T-Shirt",
      "Fitted Tee",
      "Long Sleeve Tee",
      "Crop Top Tee",
      "Vintage Style Tee",
      "Pocket T-Shirt",
      "Tie-Dye Tee",
      "Floral Print Tee",
      "Solid Color Tee",
      "Raglan Sleeve Tee",
      "Scoop Neck Tee",
      "Henley T-Shirt",
      "Athletic Tee",
      "Casual Cotton Tee",
      "Designer T-Shirt",
    ],
    colors: [
      '["white", "black", "gray"]',
      '["pink", "blue", "purple"]',
      '["red", "green", "yellow"]',
      '["navy", "beige", "maroon"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [15, 45],
  },
  "womens-shirts": {
    names: [
      "Button-Down Shirt",
      "Blouse",
      "Silk Shirt",
      "Denim Shirt",
      "Flannel Shirt",
      "Oxford Shirt",
      "Peasant Blouse",
      "Wrap Shirt",
      "Tunic Shirt",
      "Chambray Shirt",
      "Linen Shirt",
      "Chiffon Blouse",
      "Plaid Shirt",
      "White Dress Shirt",
      "Casual Button-Up",
      "Sleeveless Blouse",
      "Ruffle Shirt",
      "Embroidered Blouse",
      "Striped Shirt",
      "Flowy Blouse",
    ],
    colors: [
      '["white", "blue", "pink"]',
      '["black", "gray", "cream"]',
      '["navy", "burgundy", "sage"]',
      '["coral", "mint", "lavender"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [25, 85],
  },
  "womens-jackets": {
    names: [
      "Denim Jacket",
      "Leather Jacket",
      "Blazer",
      "Bomber Jacket",
      "Trench Coat",
      "Cardigan",
      "Windbreaker",
      "Puffer Jacket",
      "Moto Jacket",
      "Peacoat",
      "Varsity Jacket",
      "Utility Jacket",
      "Cropped Jacket",
      "Oversized Blazer",
      "Quilted Jacket",
      "Suede Jacket",
      "Military Jacket",
      "Kimono Jacket",
      "Sherpa Jacket",
      "Wool Coat",
    ],
    colors: [
      '["black", "brown", "navy"]',
      '["gray", "beige", "olive"]',
      '["burgundy", "camel", "charcoal"]',
      '["cream", "rust", "forest"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [45, 150],
  },
  "womens-shoes": {
    names: [
      "High Heels",
      "Sneakers",
      "Boots",
      "Flats",
      "Sandals",
      "Loafers",
      "Ankle Boots",
      "Pumps",
      "Wedges",
      "Ballet Flats",
      "Running Shoes",
      "Knee-High Boots",
      "Espadrilles",
      "Mules",
      "Oxford Shoes",
      "Platform Shoes",
      "Mary Janes",
      "Slip-On Sneakers",
      "Hiking Boots",
      "Dress Shoes",
    ],
    colors: [
      '["black", "brown", "nude"]',
      '["white", "gray", "navy"]',
      '["red", "pink", "purple"]',
      '["tan", "burgundy", "gold"]',
    ],
    sizes: [
      '["5", "6", "7", "8", "9"]',
      '["6", "7", "8", "9", "10"]',
      '["5.5", "6.5", "7.5", "8.5", "9.5"]',
    ],
    priceRange: [35, 120],
  },
  "womens-skirts": {
    names: [
      "A-Line Skirt",
      "Pencil Skirt",
      "Maxi Skirt",
      "Mini Skirt",
      "Pleated Skirt",
      "Wrap Skirt",
      "Denim Skirt",
      "Midi Skirt",
      "Circle Skirt",
      "Asymmetrical Skirt",
      "Tiered Skirt",
      "Leather Skirt",
      "Floral Skirt",
      "High-Waisted Skirt",
      "Bodycon Skirt",
      "Tulle Skirt",
      "Cargo Skirt",
      "Button-Front Skirt",
      "Slit Skirt",
      "Tennis Skirt",
    ],
    colors: [
      '["black", "navy", "gray"]',
      '["pink", "blue", "white"]',
      '["red", "green", "purple"]',
      '["brown", "beige", "burgundy"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [20, 75],
  },
  "womens-shorts": {
    names: [
      "Denim Shorts",
      "High-Waisted Shorts",
      "Bermuda Shorts",
      "Athletic Shorts",
      "Cargo Shorts",
      "Linen Shorts",
      "Bike Shorts",
      "Paperbag Shorts",
      "Tailored Shorts",
      "Cutoff Shorts",
      "Chino Shorts",
      "Flowy Shorts",
      "Drawstring Shorts",
      "Button-Fly Shorts",
      "Distressed Shorts",
      "Mom Shorts",
      "Pleated Shorts",
      "Elastic Waist Shorts",
      "Embroidered Shorts",
      "Printed Shorts",
    ],
    colors: [
      '["blue", "black", "white"]',
      '["khaki", "navy", "gray"]',
      '["pink", "coral", "mint"]',
      '["olive", "burgundy", "cream"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [18, 55],
  },
  "womens-jeans": {
    names: [
      "Skinny Jeans",
      "Straight Leg Jeans",
      "Bootcut Jeans",
      "High-Waisted Jeans",
      "Mom Jeans",
      "Boyfriend Jeans",
      "Wide Leg Jeans",
      "Flare Jeans",
      "Cropped Jeans",
      "Distressed Jeans",
      "Dark Wash Jeans",
      "Light Wash Jeans",
      "Black Jeans",
      "White Jeans",
      "Jeggings",
      "Ripped Jeans",
      "Vintage Jeans",
      "Stretch Jeans",
      "Raw Hem Jeans",
      "High-Rise Jeans",
    ],
    colors: [
      '["blue", "black", "gray"]',
      '["light-blue", "dark-blue", "white"]',
      '["indigo", "navy", "charcoal"]',
    ],
    sizes: [
      '["24", "26", "28", "30", "32"]',
      '["25", "27", "29", "31", "33"]',
      '["XS", "S", "M", "L", "XL"]',
    ],
    priceRange: [35, 95],
  },
  "womens-trousers": {
    names: [
      "Dress Pants",
      "Wide Leg Trousers",
      "Cropped Pants",
      "Palazzo Pants",
      "Chinos",
      "Cargo Pants",
      "Pleated Trousers",
      "Straight Leg Pants",
      "High-Waisted Pants",
      "Culottes",
      "Linen Pants",
      "Tailored Trousers",
      "Joggers",
      "Paper Bag Pants",
      "Flare Pants",
      "Ankle Pants",
      "Work Pants",
      "Casual Trousers",
      "Printed Pants",
      "Stretch Pants",
    ],
    colors: [
      '["black", "navy", "gray"]',
      '["beige", "brown", "olive"]',
      '["burgundy", "cream", "charcoal"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [30, 85],
  },
  "womens-dresses": {
    names: [
      "Maxi Dress",
      "Mini Dress",
      "Midi Dress",
      "A-Line Dress",
      "Bodycon Dress",
      "Wrap Dress",
      "Shift Dress",
      "Sundress",
      "Cocktail Dress",
      "Evening Dress",
      "Casual Dress",
      "Floral Dress",
      "Little Black Dress",
      "Sweater Dress",
      "Shirt Dress",
      "Off-Shoulder Dress",
      "Halter Dress",
      "Slip Dress",
      "Fit and Flare Dress",
      "Boho Dress",
    ],
    colors: [
      '["black", "navy", "red"]',
      '["pink", "blue", "white"]',
      '["green", "purple", "yellow"]',
      '["burgundy", "coral", "sage"]',
    ],
    sizes: ['["XS", "S", "M", "L", "XL"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [40, 120],
  },

  // Men's categories
  "mens-t-shirts": {
    names: [
      "Basic T-Shirt",
      "V-Neck Tee",
      "Polo Shirt",
      "Henley Shirt",
      "Graphic Tee",
      "Long Sleeve Tee",
      "Tank Top",
      "Muscle Tee",
      "Pocket Tee",
      "Striped T-Shirt",
      "Solid Color Tee",
      "Athletic Tee",
      "Vintage Tee",
      "Crew Neck Tee",
      "Raglan Tee",
      "Fitted T-Shirt",
      "Oversized Tee",
      "Performance Tee",
      "Cotton Blend Tee",
      "Designer T-Shirt",
    ],
    colors: [
      '["black", "white", "gray"]',
      '["navy", "blue", "green"]',
      '["red", "burgundy", "orange"]',
      '["khaki", "brown", "charcoal"]',
    ],
    sizes: ['["S", "M", "L", "XL", "XXL"]', '["M", "L", "XL", "XXL", "XXXL"]'],
    priceRange: [15, 50],
  },
  "mens-shirts": {
    names: [
      "Dress Shirt",
      "Casual Button-Down",
      "Oxford Shirt",
      "Flannel Shirt",
      "Denim Shirt",
      "Linen Shirt",
      "Plaid Shirt",
      "Striped Shirt",
      "Chambray Shirt",
      "Hawaiian Shirt",
      "Work Shirt",
      "Polo Shirt",
      "Henley Shirt",
      "Western Shirt",
      "Military Shirt",
      "Vintage Shirt",
      "Short Sleeve Shirt",
      "Wrinkle-Free Shirt",
      "Slim Fit Shirt",
      "Regular Fit Shirt",
    ],
    colors: [
      '["white", "blue", "black"]',
      '["gray", "navy", "burgundy"]',
      '["green", "brown", "tan"]',
      '["pink", "purple", "orange"]',
    ],
    sizes: ['["S", "M", "L", "XL", "XXL"]', '["M", "L", "XL", "XXL", "XXXL"]'],
    priceRange: [25, 90],
  },
  "mens-jackets": {
    names: [
      "Leather Jacket",
      "Denim Jacket",
      "Bomber Jacket",
      "Blazer",
      "Windbreaker",
      "Puffer Jacket",
      "Varsity Jacket",
      "Military Jacket",
      "Peacoat",
      "Trench Coat",
      "Hoodie Jacket",
      "Fleece Jacket",
      "Rain Jacket",
      "Wool Coat",
      "Suede Jacket",
      "Moto Jacket",
      "Track Jacket",
      "Utility Jacket",
      "Sherpa Jacket",
      "Quilted Jacket",
    ],
    colors: [
      '["black", "brown", "navy"]',
      '["gray", "olive", "burgundy"]',
      '["charcoal", "tan", "forest"]',
      '["blue", "khaki", "maroon"]',
    ],
    sizes: ['["S", "M", "L", "XL", "XXL"]', '["M", "L", "XL", "XXL", "XXXL"]'],
    priceRange: [50, 180],
  },
  "mens-shoes": {
    names: [
      "Dress Shoes",
      "Sneakers",
      "Boots",
      "Loafers",
      "Oxford Shoes",
      "Running Shoes",
      "Casual Shoes",
      "Work Boots",
      "Athletic Shoes",
      "Desert Boots",
      "Chelsea Boots",
      "Hiking Boots",
      "Basketball Shoes",
      "Tennis Shoes",
      "Boat Shoes",
      "Slip-On Shoes",
      "High-Top Sneakers",
      "Formal Shoes",
      "Combat Boots",
      "Driving Shoes",
    ],
    colors: [
      '["black", "brown", "tan"]',
      '["white", "gray", "navy"]',
      '["burgundy", "olive", "charcoal"]',
      '["blue", "red", "green"]',
    ],
    sizes: [
      '["7", "8", "9", "10", "11"]',
      '["8", "9", "10", "11", "12"]',
      '["7.5", "8.5", "9.5", "10.5", "11.5"]',
    ],
    priceRange: [40, 150],
  },
  "mens-jeans": {
    names: [
      "Straight Leg Jeans",
      "Slim Fit Jeans",
      "Skinny Jeans",
      "Bootcut Jeans",
      "Regular Fit Jeans",
      "Relaxed Fit Jeans",
      "Tapered Jeans",
      "Raw Denim Jeans",
      "Distressed Jeans",
      "Dark Wash Jeans",
      "Light Wash Jeans",
      "Black Jeans",
      "Vintage Jeans",
      "Stretch Jeans",
      "Carpenter Jeans",
      "Acid Wash Jeans",
      "High-Rise Jeans",
      "Low-Rise Jeans",
      "Selvedge Jeans",
      "Ripped Jeans",
    ],
    colors: [
      '["blue", "black", "gray"]',
      '["indigo", "dark-blue", "light-blue"]',
      '["navy", "charcoal", "stone"]',
    ],
    sizes: [
      '["30", "32", "34", "36", "38"]',
      '["28", "30", "32", "34", "36"]',
      '["S", "M", "L", "XL", "XXL"]',
    ],
    priceRange: [40, 120],
  },
  "mens-trousers": {
    names: [
      "Dress Pants",
      "Chinos",
      "Cargo Pants",
      "Khakis",
      "Suit Pants",
      "Casual Trousers",
      "Work Pants",
      "Pleated Pants",
      "Flat Front Pants",
      "Corduroy Pants",
      "Linen Pants",
      "Wool Pants",
      "Cotton Pants",
      "Stretch Pants",
      "Slim Fit Pants",
      "Regular Fit Pants",
      "Relaxed Fit Pants",
      "Tapered Pants",
      "Straight Leg Pants",
      "Wide Leg Pants",
    ],
    colors: [
      '["black", "navy", "gray"]',
      '["khaki", "brown", "olive"]',
      '["burgundy", "charcoal", "tan"]',
      '["blue", "green", "beige"]',
    ],
    sizes: ['["30", "32", "34", "36", "38"]', '["S", "M", "L", "XL", "XXL"]'],
    priceRange: [35, 100],
  },

  // Kids categories
  "girls-clothing": {
    names: [
      "Princess Dress",
      "Casual T-Shirt",
      "Denim Jacket",
      "Leggings",
      "Tutu Skirt",
      "Cardigan",
      "Romper",
      "Blouse",
      "Shorts Set",
      "Sweater",
      "Tank Top",
      "Hoodie",
      "Jumpsuit",
      "Polo Shirt",
      "Sundress",
      "School Uniform",
      "Party Dress",
      "Pajama Set",
      "Track Suit",
      "Winter Coat",
    ],
    colors: [
      '["pink", "purple", "white"]',
      '["blue", "yellow", "green"]',
      '["red", "orange", "lavender"]',
      '["mint", "coral", "rainbow"]',
    ],
    sizes: [
      '["2T", "3T", "4T", "5T", "6"]',
      '["4", "5", "6", "7", "8"]',
      '["6", "7", "8", "9", "10"]',
    ],
    priceRange: [15, 60],
  },
  "girls-shoes": {
    names: [
      "Mary Jane Shoes",
      "Sneakers",
      "Ballet Flats",
      "Sandals",
      "Boots",
      "School Shoes",
      "Party Shoes",
      "Athletic Shoes",
      "Rain Boots",
      "Slip-On Shoes",
      "High-Top Sneakers",
      "Dress Shoes",
      "Casual Shoes",
      "Light-Up Shoes",
      "Velcro Shoes",
      "Canvas Shoes",
      "Winter Boots",
      "Summer Sandals",
      "Dance Shoes",
      "Character Shoes",
    ],
    colors: [
      '["pink", "purple", "white"]',
      '["blue", "red", "yellow"]',
      '["black", "silver", "gold"]',
      '["rainbow", "glitter", "sparkle"]',
    ],
    sizes: [
      '["5", "6", "7", "8", "9"]',
      '["8", "9", "10", "11", "12"]',
      '["10", "11", "12", "13", "1"]',
    ],
    priceRange: [20, 70],
  },
  "boys-clothing": {
    names: [
      "Graphic T-Shirt",
      "Polo Shirt",
      "Jeans",
      "Shorts",
      "Hoodie",
      "Button-Down Shirt",
      "Cargo Pants",
      "Track Pants",
      "Tank Top",
      "Sweater",
      "Jacket",
      "Pajama Set",
      "School Uniform",
      "Athletic Wear",
      "Casual Shirt",
      "Sweatshirt",
      "Dress Shirt",
      "Khaki Pants",
      "Denim Jacket",
      "Winter Coat",
    ],
    colors: [
      '["blue", "green", "black"]',
      '["red", "orange", "gray"]',
      '["navy", "brown", "white"]',
      '["yellow", "purple", "camouflage"]',
    ],
    sizes: [
      '["2T", "3T", "4T", "5T", "6"]',
      '["4", "5", "6", "7", "8"]',
      '["6", "7", "8", "9", "10"]',
    ],
    priceRange: [15, 65],
  },
  "boys-shoes": {
    names: [
      "Sneakers",
      "Athletic Shoes",
      "Boots",
      "Sandals",
      "Dress Shoes",
      "Casual Shoes",
      "High-Top Sneakers",
      "Running Shoes",
      "Basketball Shoes",
      "Soccer Cleats",
      "Rain Boots",
      "Hiking Boots",
      "Slip-On Shoes",
      "Velcro Shoes",
      "Canvas Shoes",
      "School Shoes",
      "Light-Up Shoes",
      "Skate Shoes",
      "Water Shoes",
      "Winter Boots",
    ],
    colors: [
      '["blue", "black", "red"]',
      '["green", "gray", "white"]',
      '["orange", "yellow", "navy"]',
      '["brown", "camouflage", "neon"]',
    ],
    sizes: [
      '["5", "6", "7", "8", "9"]',
      '["8", "9", "10", "11", "12"]',
      '["10", "11", "12", "13", "1"]',
    ],
    priceRange: [20, 75],
  },

  // Accessories categories
  glasses: {
    names: [
      "Sunglasses",
      "Reading Glasses",
      "Blue Light Glasses",
      "Prescription Glasses",
      "Fashion Glasses",
      "Aviator Sunglasses",
      "Cat Eye Glasses",
      "Round Glasses",
      "Square Glasses",
      "Oversized Glasses",
      "Vintage Glasses",
      "Sports Glasses",
      "Safety Glasses",
      "Computer Glasses",
      "Polarized Sunglasses",
      "Designer Glasses",
      "Bifocal Glasses",
      "Progressive Glasses",
      "Transition Glasses",
      "Kids Glasses",
    ],
    colors: [
      '["black", "brown", "gold"]',
      '["silver", "rose-gold", "tortoise"]',
      '["blue", "red", "green"]',
      '["clear", "gradient", "mirrored"]',
    ],
    sizes: ['["Small", "Medium", "Large"]', '["One Size"]'],
    priceRange: [25, 150],
  },
  watches: {
    names: [
      "Digital Watch",
      "Analog Watch",
      "Smart Watch",
      "Sports Watch",
      "Dress Watch",
      "Casual Watch",
      "Luxury Watch",
      "Fitness Tracker",
      "Chronograph Watch",
      "Automatic Watch",
      "Quartz Watch",
      "Leather Strap Watch",
      "Metal Band Watch",
      "Rubber Strap Watch",
      "Vintage Watch",
      "Minimalist Watch",
      "Diving Watch",
      "Pilot Watch",
      "Fashion Watch",
      "Kids Watch",
    ],
    colors: [
      '["black", "silver", "gold"]',
      '["rose-gold", "bronze", "titanium"]',
      '["blue", "red", "green"]',
      '["white", "brown", "navy"]',
    ],
    sizes: [
      '["Small", "Medium", "Large"]',
      '["38mm", "42mm", "44mm"]',
      '["One Size"]',
    ],
    priceRange: [30, 300],
  },
  gloves: {
    names: [
      "Leather Gloves",
      "Winter Gloves",
      "Work Gloves",
      "Driving Gloves",
      "Fingerless Gloves",
      "Touchscreen Gloves",
      "Wool Gloves",
      "Rubber Gloves",
      "Gardening Gloves",
      "Sports Gloves",
      "Formal Gloves",
      "Casual Gloves",
      "Waterproof Gloves",
      "Heated Gloves",
      "Cycling Gloves",
      "Running Gloves",
      "Fashion Gloves",
      "Medical Gloves",
      "Safety Gloves",
      "Kids Gloves",
    ],
    colors: [
      '["black", "brown", "gray"]',
      '["white", "navy", "burgundy"]',
      '["red", "blue", "green"]',
      '["tan", "olive", "purple"]',
    ],
    sizes: [
      '["XS", "S", "M", "L", "XL"]',
      '["Small", "Medium", "Large"]',
      '["One Size"]',
    ],
    priceRange: [15, 80],
  },
  belts: {
    names: [
      "Leather Belt",
      "Canvas Belt",
      "Chain Belt",
      "Dress Belt",
      "Casual Belt",
      "Western Belt",
      "Braided Belt",
      "Reversible Belt",
      "Designer Belt",
      "Wide Belt",
      "Skinny Belt",
      "Elastic Belt",
      "Rope Belt",
      "Metal Belt",
      "Fabric Belt",
      "Vintage Belt",
      "Fashion Belt",
      "Work Belt",
      "Sports Belt",
      "Kids Belt",
    ],
    colors: [
      '["black", "brown", "tan"]',
      '["white", "navy", "gray"]',
      '["red", "blue", "green"]',
      '["gold", "silver", "bronze"]',
    ],
    sizes: [
      '["28", "30", "32", "34", "36"]',
      '["S", "M", "L", "XL", "XXL"]',
      '["One Size"]',
    ],
    priceRange: [20, 120],
  },
  hats: {
    names: [
      "Baseball Cap",
      "Beanie",
      "Fedora",
      "Sun Hat",
      "Bucket Hat",
      "Snapback",
      "Trucker Hat",
      "Beret",
      "Cowboy Hat",
      "Winter Hat",
      "Visor",
      "Newsboy Cap",
      "Boater Hat",
      "Panama Hat",
      "Cloche Hat",
      "Brimmed Hat",
      "Knit Hat",
      "Wool Hat",
      "Straw Hat",
      "Kids Hat",
    ],
    colors: [
      '["black", "navy", "gray"]',
      '["white", "brown", "khaki"]',
      '["red", "blue", "green"]',
      '["pink", "purple", "yellow"]',
    ],
    sizes: [
      '["One Size", "Adjustable"]',
      '["S/M", "L/XL"]',
      '["Small", "Medium", "Large"]',
    ],
    priceRange: [15, 75],
  },
  bags: {
    names: [
      "Handbag",
      "Backpack",
      "Tote Bag",
      "Crossbody Bag",
      "Clutch",
      "Messenger Bag",
      "Duffel Bag",
      "Shoulder Bag",
      "Satchel",
      "Hobo Bag",
      "Evening Bag",
      "Travel Bag",
      "Laptop Bag",
      "Gym Bag",
      "Beach Bag",
      "Shopping Bag",
      "Diaper Bag",
      "Camera Bag",
      "School Bag",
      "Vintage Bag",
    ],
    colors: [
      '["black", "brown", "navy"]',
      '["white", "gray", "beige"]',
      '["red", "pink", "purple"]',
      '["green", "blue", "burgundy"]',
    ],
    sizes: ['["Small", "Medium", "Large"]', '["One Size"]'],
    priceRange: [25, 200],
  },
  wallets: {
    names: [
      "Leather Wallet",
      "Bifold Wallet",
      "Trifold Wallet",
      "Card Holder",
      "Money Clip",
      "Coin Purse",
      "Travel Wallet",
      "Phone Wallet",
      "Minimalist Wallet",
      "RFID Wallet",
      "Designer Wallet",
      "Vintage Wallet",
      "Slim Wallet",
      "Long Wallet",
      "Zip Wallet",
      "Clutch Wallet",
      "Business Wallet",
      "Sports Wallet",
      "Kids Wallet",
      "Smart Wallet",
    ],
    colors: [
      '["black", "brown", "tan"]',
      '["navy", "gray", "burgundy"]',
      '["red", "blue", "green"]',
      '["pink", "purple", "white"]',
    ],
    sizes: ['["One Size"]', '["Small", "Medium", "Large"]'],
    priceRange: [20, 150],
  },
};

// Function to generate random product data
const generateProduct = (categorySlug, categoryId, index) => {
  const template = productTemplates[categorySlug];
  if (!template) {
    // Default template for categories without specific templates
    return {
      name: `${categorySlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())} Item ${index + 1}`,
      slug: `${categorySlug}-item-${index + 1}`,
      description: `High-quality ${categorySlug.replace(
        /-/g,
        " "
      )} perfect for any occasion.`,
      originalPrice: Math.floor(Math.random() * 50) + 30,
      salePrice: Math.floor(Math.random() * 40) + 20,
      discount: Math.floor(Math.random() * 30) + 10,
      image: `https://via.placeholder.com/300x400?text=${encodeURIComponent(
        categorySlug.replace(/-/g, " ")
      )}`,
      colors: '["black", "white", "gray"]',
      sizes: '["S", "M", "L", "XL"]',
      categoryId: categoryId,
      stock: Math.floor(Math.random() * 100) + 10,
      sku: `${categorySlug.toUpperCase()}-${String(index + 1).padStart(
        3,
        "0"
      )}`,
      isActive: true,
      isFeatured: Math.random() > 0.8,
      tags: `["${categorySlug}", "fashion", "clothing"]`,
      weight: (Math.random() * 2 + 0.5).toFixed(2),
      dimensions: '{"length": 30, "width": 20, "height": 2}',
    };
  }

  const name = template.names[index % template.names.length];
  const colors =
    template.colors[Math.floor(Math.random() * template.colors.length)];
  const sizes =
    template.sizes[Math.floor(Math.random() * template.sizes.length)];
  const originalPrice =
    Math.floor(
      Math.random() * (template.priceRange[1] - template.priceRange[0])
    ) + template.priceRange[0];
  const discount = Math.floor(Math.random() * 30) + 10;
  const salePrice = Math.floor((originalPrice * (100 - discount)) / 100);

  return {
    name: name,
    slug: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    description: `Premium ${name.toLowerCase()} crafted with attention to detail and comfort.`,
    originalPrice: originalPrice,
    salePrice: salePrice,
    discount: discount,
    image: `https://via.placeholder.com/300x400?text=${encodeURIComponent(
      name
    )}`,
    colors: colors,
    sizes: sizes,
    categoryId: categoryId,
    stock: Math.floor(Math.random() * 100) + 10,
    sku: `${categorySlug.toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
    isActive: true,
    isFeatured: Math.random() > 0.8,
    tags: `["${categorySlug}", "fashion", "clothing"]`,
    weight: (Math.random() * 2 + 0.5).toFixed(2),
    dimensions: '{"length": 30, "width": 20, "height": 2}',
  };
};

// Main function to generate products for all categories
const generateAllProducts = async () => {
  try {
    console.log("🔍 Fetching categories...");

    // Fetch all categories
    const categoriesResponse = await axios.get(`${API_BASE}/categories`);
    const categories = categoriesResponse.data.data.categories;

    console.log(`📊 Found ${categories.length} categories`);
    console.log("");

    for (const category of categories) {
      console.log(
        `🏷️  Processing category: ${category.name} (${category.slug})`
      );

      // Generate 20 products for this category
      const products = [];
      for (let i = 0; i < 20; i++) {
        const product = generateProduct(category.slug, category.id, i);
        products.push(product);
      }

      // Insert products in batches of 5 to avoid overwhelming the server
      for (let i = 0; i < products.length; i += 5) {
        const batch = products.slice(i, i + 5);

        for (const product of batch) {
          try {
            await axios.post(`${API_BASE}/products`, product);
            process.stdout.write("✅");
          } catch (error) {
            process.stdout.write("❌");
            console.error(
              `\nError creating product ${product.name}:`,
              error.response?.data?.message || error.message
            );
          }
        }

        // Small delay between batches
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      console.log(`\n   ✅ Created 20 products for ${category.name}`);
      console.log("");
    }

    console.log("🎉 Product generation completed!");

    // Fetch final count
    const productsResponse = await axios.get(`${API_BASE}/products`);
    console.log(
      `📈 Total products in database: ${productsResponse.data.data.totalCount}`
    );
  } catch (error) {
    console.error("❌ Error:", error.response?.data?.message || error.message);
  }
};

// Run the script
generateAllProducts();
