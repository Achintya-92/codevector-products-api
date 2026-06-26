import express from "express";
import Product from "../models/db.js";
import mongoose from "mongoose";


const router = express.Router();
router.get("/", async (req, res) => {
  try {
   const { category, cursor, productId } = req.query;
    const filter = {};
if (category) {
  filter.category = category;
}

if(cursor && productId){
    filter.$or = [
        {
            updatedAt:{
                $lt : new Date(cursor),
            },
        },
          
        {
            updatedAt: new Date(cursor),
            _id:{
                $lt: new mongoose.Types.ObjectId(productId),
            }
        }
    ]
}
    const products = await Product.find(filter)
      .sort({ updatedAt:-1, _id:-1})
      .limit(20)

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