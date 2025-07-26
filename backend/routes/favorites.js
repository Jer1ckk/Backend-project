const express = require('express');
const router = express.Router();
const { 
  getFavorites, 
  addToFavorites, 
  removeFromFavorites, 
  toggleFavorite 
} = require('../controllers/favoriteController');
const { authenticate } = require('../middleware/auth');
const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validateProductId = [
  body('productId')
    .isInt({ min: 1 })
    .withMessage('Valid product ID is required')
];

const validateProductIdParam = [
  param('productId')
    .isInt({ min: 1 })
    .withMessage('Valid product ID is required')
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

// @route   GET /api/favorites
// @desc    Get user's favorite products
// @access  Private
router.get('/', getFavorites);

// @route   POST /api/favorites
// @desc    Add product to favorites
// @access  Private
router.post('/', validateProductId, handleValidationErrors, addToFavorites);

// @route   DELETE /api/favorites/:productId
// @desc    Remove product from favorites
// @access  Private
router.delete('/:productId', validateProductIdParam, handleValidationErrors, removeFromFavorites);

// @route   POST /api/favorites/toggle
// @desc    Toggle favorite status of a product
// @access  Private
router.post('/toggle', validateProductId, handleValidationErrors, toggleFavorite);

module.exports = router;
