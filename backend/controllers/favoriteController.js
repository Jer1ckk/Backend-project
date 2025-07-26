const { Favorite, Product, Category } = require('../models');

// Get user's favorite products
const getFavorites = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: favorites } = await Favorite.findAndCountAll({
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
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    const products = favorites.map(favorite => ({
      ...favorite.product.toJSON(),
      isFavorite: true,
      favoriteId: favorite.id,
      favoriteDate: favorite.createdAt
    }));

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Add product to favorites
const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findOne({
      where: { id: productId, isActive: true }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Product is already in favorites'
      });
    }

    // Add to favorites
    const favorite = await Favorite.create({
      userId: req.user.id,
      productId
    });

    // Get the favorite with product details
    const favoriteWithProduct = await Favorite.findByPk(favorite.id, {
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
      message: 'Product added to favorites',
      data: {
        favorite: favoriteWithProduct
      }
    });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Remove product from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;

    const favorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in favorites'
      });
    }

    await favorite.destroy();

    res.json({
      success: true,
      message: 'Product removed from favorites'
    });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Toggle favorite status
const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findOne({
      where: { id: productId, isActive: true }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });

    if (existingFavorite) {
      // Remove from favorites
      await existingFavorite.destroy();
      
      res.json({
        success: true,
        message: 'Product removed from favorites',
        data: {
          isFavorite: false
        }
      });
    } else {
      // Add to favorites
      const favorite = await Favorite.create({
        userId: req.user.id,
        productId
      });

      res.json({
        success: true,
        message: 'Product added to favorites',
        data: {
          isFavorite: true,
          favoriteId: favorite.id
        }
      });
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite
};
