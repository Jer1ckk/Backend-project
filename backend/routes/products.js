const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct } = require('../controllers/productController');
const { optionalAuth, authenticate } = require('../middleware/auth');
const { validateProduct, handleValidationErrors } = require('../middleware/validation');

// @route   GET /api/products
// @desc    Get all products with optional filtering
// @access  Public (with optional auth for favorites)
router.get('/', optionalAuth, getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID or slug
// @access  Public (with optional auth for favorites)
router.get('/:id', optionalAuth, getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only - for now just authenticated)
router.post('/', authenticate, validateProduct, handleValidationErrors, createProduct);

module.exports = router;
