const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');
const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validateAddToCart = [
  body('productId')
    .isInt({ min: 1 })
    .withMessage('Valid product ID is required'),
  body('quantity')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Quantity must be between 1 and 100'),
  body('selectedColor')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Selected color must be between 1 and 50 characters'),
  body('selectedSize')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Selected size must be between 1 and 20 characters')
];

const validateUpdateCartItem = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid cart item ID is required'),
  body('quantity')
    .isInt({ min: 1, max: 100 })
    .withMessage('Quantity must be between 1 and 100')
];

const validateCartItemId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid cart item ID is required')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// All routes require authentication
router.use(authenticate);

// @route   GET /api/cart
// @desc    Get user's cart items
// @access  Private
router.get('/', getCart);

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', validateAddToCart, handleValidationErrors, addToCart);

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Private
router.put('/:id', validateUpdateCartItem, handleValidationErrors, updateCartItem);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', validateCartItemId, handleValidationErrors, removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', clearCart);

module.exports = router;
