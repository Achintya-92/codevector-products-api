import express from "express";
import Product from "../models/db.js";
 import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const  MONGO_URI = process.env.MONGO_URI;
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