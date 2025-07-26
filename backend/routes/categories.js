const express = require('express');
const router = express.Router();
const { getCategories, getCategory, createCategory } = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

// @route   GET /api/categories/:id
// @desc    Get single category by ID or slug
// @access  Public
router.get('/:id', getCategory);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin only - for now just authenticated)
router.post('/', authenticate, createCategory);

module.exports = router;
