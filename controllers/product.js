const Product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const products = await Product.find({ price: { $gte: 120, $lte: 125 } });
  res.status(200).json({ nHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const {
    featured,
    company,
    name,
    rating,
    sort,
    fields,
    limit,
    skip,
    page,
    pageSize,
    numericFilters,
  } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$lte",
    };
    const regex = /\b(<|>|=|>=|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {
          ...queryObject[field],
          [operator]: Number(value),
        };
      }
    });
    console.log(queryObject);
    // console.log(filters);
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    let filter = fields.split(",").join(" ");
    result = result.select(filter);
  }

  if (skip) {
    result = result.skip(skip);
  }

  if (limit) {
    result = result.limit(limit);
  }

  const pageNumber = Number(page);
  const noOfItems = Number(pageSize);

  result = result.skip((pageNumber - 1) * noOfItems).limit(noOfItems);

  const products = await result;

  res.status(200).json({ nHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
