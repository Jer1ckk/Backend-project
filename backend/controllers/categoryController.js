const { Category, Product } = require('../models');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const { includeProducts = false } = req.query;
    
    const include = [];
    
    if (includeProducts === 'true') {
      include.push({
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false,
        attributes: ['id', 'name', 'slug', 'salePrice', 'originalPrice', 'image']
      });
    }

    const categories = await Category.findAll({
      where: { isActive: true },
      include,
      order: [['sortOrder', 'ASC'], ['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get single category by ID or slug
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const whereClause = { isActive: true };
    
    // Check if id is numeric (ID) or string (slug)
    if (isNaN(id)) {
      whereClause.slug = id;
    } else {
      whereClause.id = id;
    }

    const category = await Category.findOne({
      where: whereClause,
      include: [
        {
          model: Product,
          as: 'products',
          where: { isActive: true },
          required: false,
          attributes: ['id', 'name', 'slug', 'salePrice', 'originalPrice', 'image', 'discount']
        }
      ]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new category
const createCategory = async (req, res) => {
  try {
    const { name, description, parentId, sortOrder } = req.body;
    
    // Check if parent category exists (if parentId provided)
    if (parentId) {
      const parentCategory = await Category.findByPk(parentId);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: 'Parent category not found'
        });
      }
    }

    const category = await Category.create({
      name,
      description,
      parentId,
      sortOrder
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Create category error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory
};
