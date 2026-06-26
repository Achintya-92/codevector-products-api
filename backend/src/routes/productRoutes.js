import express from "express";
import Product from "../models/db.js";


const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
if (category) {
  filter.category = category;
}
    const products = await Product.find(filter)
      .sort({ updatedAt:-1, _id:-1})
      .skip(20).limit(20)

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