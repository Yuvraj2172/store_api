const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("-name -price");
  res.status(200).json({ nHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query);
  const { featured, company, name, rating, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (rating) {
    queryObject.rating = Number(rating);
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const products = await result;
  res.status(200).json({ nHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
