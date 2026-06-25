import express from "express";
import Product from "../models/db.js";
 import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const  MONGO_URI = process.env.MONGO_URI;
const router = express.Router();

// Get Products
router.get("/seeds", async (req, res) => {
const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Home",
];
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    const batchSize = 5000;
    const totalProducts = 200000;

    for (let i = 0; i < totalProducts; i += batchSize) {
      const products = [];

      for (let j = 0; j < batchSize; j++) {
        const randomDate = new Date(
          Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        );

        products.push({
          name: `Product ${i + j + 1}`,
          category:
            categories[Math.floor(Math.random() * categories.length)],
          price: Math.floor(Math.random() * 10000) + 100,
          createdAt: randomDate,
          updatedAt: randomDate,
        });
      }

      await Product.insertMany(products);

      console.log(`${i + batchSize} products inserted`);
    }

    console.log("200,000 products inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});


export default router;