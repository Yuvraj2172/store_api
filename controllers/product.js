const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gte: 120 } });
  res.status(200).json({ products, nHits: products.length });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  console.log(queryObject);
  console.log(req.query);
  // const products = await Product.find(req.query);
  const products = await Product.find(queryObject);
  res.status(200).json({ nHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
