const { Product, Category, Favorite } = require('../models');
const { Op } = require('sequelize');

// Get all products with optional filtering
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      featured
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { isActive: true };
    const include = [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      }
    ];

    // Add user favorites if authenticated
    if (req.user) {
      include.push({
        model: Favorite,
        as: 'favorites',
        where: { userId: req.user.id },
        required: false,
        attributes: ['id']
      });
    }

    // Filter by category
    if (category) {
      whereClause.categoryId = category;
    }

    // Search functionality
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      whereClause.salePrice = {};
      if (minPrice) whereClause.salePrice[Op.gte] = minPrice;
      if (maxPrice) whereClause.salePrice[Op.lte] = maxPrice;
    }

    // Featured products filter
    if (featured === 'true') {
      whereClause.isFeatured = true;
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where: whereClause,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      distinct: true
    });

    // Format products with favorite status
    const formattedProducts = products.map(product => {
      const productData = product.toJSON();
      productData.isFavorite = req.user ? productData.favorites.length > 0 : false;
      delete productData.favorites;
      return productData;
    });

    res.json({
      success: true,
      data: {
        products: formattedProducts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get single product by ID or slug
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const whereClause = { isActive: true };
    
    // Check if id is numeric (ID) or string (slug)
    if (isNaN(id)) {
      whereClause.slug = id;
    } else {
      whereClause.id = id;
    }

    const include = [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name', 'slug']
      }
    ];

    // Add user favorites if authenticated
    if (req.user) {
      include.push({
        model: Favorite,
        as: 'favorites',
        where: { userId: req.user.id },
        required: false,
        attributes: ['id']
      });
    }

    const product = await Product.findOne({
      where: whereClause,
      include
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const productData = product.toJSON();
    productData.isFavorite = req.user ? productData.favorites.length > 0 : false;
    delete productData.favorites;

    res.json({
      success: true,
      data: {
        product: productData
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new product (Admin only - for now, we'll skip admin check)
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Check if category exists
    const category = await Category.findByPk(productData.categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }

    const product = await Product.create(productData);
    
    // Fetch the created product with category
    const createdProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        product: createdProduct
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    
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
  getProducts,
  getProduct,
  createProduct
};
