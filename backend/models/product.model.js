import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } // creates createdAt and updatedAt fields automatically
);

const Product = mongoose.model("Product", productSchema);

export default Product;
// This code defines a Mongoose schema and model for a Product entity.
// The schema includes fields for name, price, and image, with timestamps for creation and updates.
