import express from "express";
import Product from "../models/db.js";

const router = express.Router();

// Get Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ updatedAt: -1, _id: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;