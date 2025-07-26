const { sequelize } = require("../config/database");

// Import all models
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Favorite = require("./Favorite");
const CartItem = require("./CartItem");

// Define associations
// Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

// User has many Favorites
User.hasMany(Favorite, {
  foreignKey: "userId",
  as: "favorites",
});
Favorite.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Product has many Favorites
Product.hasMany(Favorite, {
  foreignKey: "productId",
  as: "favorites",
});
Favorite.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// User has many CartItems
User.hasMany(CartItem, {
  foreignKey: "userId",
  as: "cartItems",
});
CartItem.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Product has many CartItems
Product.hasMany(CartItem, {
  foreignKey: "productId",
  as: "cartItems",
});
CartItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

// Note: Many-to-many relationships are handled through the basic associations above

// Export all models and sequelize instance
module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Favorite,
  CartItem,
};
