const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
    maxLength: [20, "name cannot be greater than 20 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "marcos", "liddy", "caressa"],
      message: `{VALUE} is not supported`,
    },

    // enum: ["ikea", "marcos", "liddy", "caressa"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
