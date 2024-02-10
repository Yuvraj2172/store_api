const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price : {$gte : 120} });
  res.status(200).json({ products, nHits: products.length });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products  route " });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};