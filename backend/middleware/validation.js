const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateRegister = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('mobileNumber')
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage('Mobile number must be between 8 and 20 characters'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('gender')
    .isIn(['Male', 'Female'])
    .withMessage('Gender must be either Male or Female'),
  
  body('country')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country must be between 2 and 50 characters'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters')
];

// Validation rules for user login
const validateLogin = [
  body('telephone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for product creation
const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Product name must be between 2 and 200 characters'),
  
  body('originalPrice')
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  
  body('salePrice')
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),
  
  body('discount')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Discount must be between 0 and 100'),
  
  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('Valid category ID is required'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  
  body('colors')
    .optional()
    .isArray()
    .withMessage('Colors must be an array'),
  
  body('sizes')
    .optional()
    .isArray()
    .withMessage('Sizes must be an array')
];

// Middleware to handle validation errors
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

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  handleValidationErrors
};
