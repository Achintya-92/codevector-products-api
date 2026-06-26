import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { seedProducts } from "../seed.js";
import Product from "./models/db.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codevector-products-api.vercel.app"
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

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
  .then(async () => {
    console.log("MongoDB Connected");

const count = await Product.countDocuments();
console.log(count);

if (count == 0) {
  console.log("Seeding database...");
  await seedProducts();
}

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });


app.use("/api/products", productRoutes);
