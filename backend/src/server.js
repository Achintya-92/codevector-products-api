import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

import productRoutes from "./routes/productRoutes.js";




// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Product API Running",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use("/api/products", productRoutes);