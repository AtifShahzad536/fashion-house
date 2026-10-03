import Product from '../models/Product.js';
import Category from '../models/Category.js';

/**
 * @route   GET /api/products
 * @desc    Fetch products with search, multi-filters, sorting and pagination
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.limit) || 16;
    const page = Number(req.query.page) || 1;

    const query = {};

    // Search keyword
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { shortDescription: { $regex: req.query.keyword, $options: 'i' } },
        { fabric: { $regex: req.query.keyword, $options: 'i' } },
        { embroideryWork: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    // Category filter by slug or ID
    if (req.query.category) {
      if (req.query.category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = req.query.category;
      } else {
        const cat = await Category.findOne({ slug: req.query.category });
        if (cat) query.category = cat._id;
      }
    }

    // Occasion filter
    if (req.query.occasion) {
      const occasions = req.query.occasion.split(',');
      query.occasion = { $in: occasions };
    }

    // Fabric filter
    if (req.query.fabric) {
      const fabrics = req.query.fabric.split(',');
      query.fabric = { $regex: fabrics.join('|'), $options: 'i' };
    }

    // Price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Color filter
    if (req.query.color) {
      query['colors.name'] = { $regex: req.query.color, $options: 'i' };
    }

    // Featured / New / Bestseller
    if (req.query.featured === 'true') query.isFeatured = true;
    if (req.query.bestseller === 'true') query.isBestSeller = true;
    if (req.query.newArrival === 'true') query.isNewArrival = true;

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (req.query.sort === 'price-asc') sortOptions = { price: 1 };
    if (req.query.sort === 'price-desc') sortOptions = { price: -1 };
    if (req.query.sort === 'rating') sortOptions = { rating: -1 };
    if (req.query.sort === 'popular') sortOptions = { isBestSeller: -1, rating: -1 };

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/:slugOrId
 * @desc    Fetch single product by slug or id
 * @access  Public
 */
export const getProductBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let product;

    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(slugOrId).populate('category', 'name slug');
    } else {
      product = await Product.findOne({ slug: slugOrId }).populate('category', 'name slug');
    }

    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: 'Lehenga not found in atelier catalog' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/featured/curated
 * @desc    Fetch featured homepage collections (New arrivals, bestsellers, editorial)
 * @access  Public
 */
export const getCuratedCollections = async (req, res, next) => {
  try {
    let [featured, newArrivals, bestSellers, bridalCollection] = await Promise.all([
      Product.find({ isFeatured: true }).populate('category', 'name slug').limit(16),
      Product.find({ isNewArrival: true }).populate('category', 'name slug').limit(16),
      Product.find({ isBestSeller: true }).populate('category', 'name slug').limit(16),
      Product.find({ occasion: 'Bridal' }).populate('category', 'name slug').limit(16),
    ]);

    if (newArrivals.length < 12) {
      newArrivals = await Product.find({}).sort({ createdAt: -1 }).populate('category', 'name slug').limit(16);
    }
    if (bestSellers.length < 8) {
      bestSellers = await Product.find({}).sort({ rating: -1, createdAt: -1 }).populate('category', 'name slug').limit(16);
    }
    if (featured.length < 8) {
      featured = await Product.find({}).sort({ createdAt: -1 }).populate('category', 'name slug').limit(16);
    }

    res.json({
      success: true,
      data: {
        featured,
        newArrivals,
        bestSellers,
        bridalCollection,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/products
 * @desc    Create a product (Admin)
 * @access  Private/Admin
 */
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({ success: true, message: 'Lehenga created successfully', data: createdProduct });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (Admin)
 * @access  Private/Admin
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (Admin)
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product removed from collection' });
  } catch (error) {
    next(error);
  }
};
