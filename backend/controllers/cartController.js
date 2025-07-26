const { CartItem, Product, Category } = require('../models');
const { Op } = require('sequelize');

// Get user's cart items
const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          as: 'product',
          where: { isActive: true },
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['id', 'name', 'slug']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Calculate totals
    let totalItems = 0;
    let subtotal = 0;

    const formattedItems = cartItems.map(item => {
      const itemData = item.toJSON();
      const itemTotal = parseFloat(item.priceAtTime) * item.quantity;
      
      totalItems += item.quantity;
      subtotal += itemTotal;
      
      return {
        ...itemData,
        itemTotal: itemTotal.toFixed(2)
      };
    });

    res.json({
      success: true,
      data: {
        items: formattedItems,
        summary: {
          totalItems,
          subtotal: subtotal.toFixed(2),
          // You can add tax, shipping, etc. here
          total: subtotal.toFixed(2)
        }
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedColor, selectedSize } = req.body;

    // Check if product exists and is active
    const product = await Product.findOne({
      where: { id: productId, isActive: true }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`
      });
    }

    // Check if item already exists in cart with same specifications
    const existingCartItem = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId,
        selectedColor: selectedColor || null,
        selectedSize: selectedSize || null
      }
    });

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available in stock`
        });
      }

      await existingCartItem.update({
        quantity: newQuantity,
        priceAtTime: product.salePrice // Update price in case it changed
      });

      // Get updated cart item with product details
      const updatedCartItem = await CartItem.findByPk(existingCartItem.id, {
        include: [
          {
            model: Product,
            as: 'product',
            include: [
              {
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'slug']
              }
            ]
          }
        ]
      });

      return res.json({
        success: true,
        message: 'Cart item updated successfully',
        data: {
          cartItem: updatedCartItem
        }
      });
    }

    // Create new cart item
    const cartItem = await CartItem.create({
      userId: req.user.id,
      productId,
      quantity,
      selectedColor,
      selectedSize,
      priceAtTime: product.salePrice
    });

    // Get cart item with product details
    const cartItemWithProduct = await CartItem.findByPk(cartItem.id, {
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['id', 'name', 'slug']
            }
          ]
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: {
        cartItem: cartItemWithProduct
      }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({
      where: { id, userId: req.user.id },
      include: [
        {
          model: Product,
          as: 'product'
        }
      ]
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check stock availability
    if (cartItem.product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${cartItem.product.stock} items available in stock`
      });
    }

    await cartItem.update({
      quantity,
      priceAtTime: cartItem.product.salePrice // Update price in case it changed
    });

    // Get updated cart item with product details
    const updatedCartItem = await CartItem.findByPk(cartItem.id, {
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Category,
              as: 'category',
              attributes: ['id', 'name', 'slug']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: {
        cartItem: updatedCartItem
      }
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findOne({
      where: { id, userId: req.user.id }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    await CartItem.destroy({
      where: { userId: req.user.id }
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
