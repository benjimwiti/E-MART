import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { handleDB404 } from "../utils/database404.js";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }
    const product = new Product({ ...req.fields });
    console.log(`probing`, product)
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    handleDB404(product, res)
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      res.json({
        error: `you can only review a product once`,
        previousReview: alreadyReviewed
      })
      console.log("user has already reviewed")
      return
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    const currentProductRating = product.rating

    await product.save();
    res.status(201).json({
      message: "Review added",
      newRating: currentProductRating
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

class ObjectId extends mongoose.Types.ObjectId {
  constructor(id) {
    super(id)
  }
}

export const deleteProductReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req.body
    const userId = new ObjectId(user)
    const product = await Product.findById(id)
    const { reviews } = product
    const reviewToDelete = reviews.find((review) => review.user.equals(userId))
    const newReviewArray = reviews.filter((review) => !review.user.equals(userId))
    product.reviews = newReviewArray
    //recalculate 
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save()
    console.log(`probing probing`, reviewToDelete)
    res.status(200)
      .json({
        message: `deleted review ; ${reviewToDelete.comment}`,
        previousReview: reviewToDelete
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    throw new Error(`error: ${error.message}`)
  }
});

export const updateProductReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const reviewUpdate = req.body
    const { user } = req.body
    const userId = new ObjectId(user)
    const product = await Product.findById(id)
    const { reviews } = product
    const newReviewArray = reviews.filter((review) => !review.user?.equals(userId))
    console.log(`probing......`, newReviewArray)
    product.reviews = newReviewArray
    product.reviews.push(reviewUpdate)
    //recalculate
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save()

    res.status(200)
      .json({
        message: `updated review`,
        updatedReview: reviewUpdate
      });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    throw new Error(`error: ${error.message}`)
  }
});





const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Server Error ${error.message}`
    });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
