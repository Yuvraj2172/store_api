require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("success!!! ho gya ji connect");
    console.log("saare delete kar die, for a fresh start");
    await Product.deleteMany();
    console.log("dobara s bana rha hoo saare products");
    await Product.create(jsonProducts);
    console.log("ban gye ji ban gye, gidda karo ");
    console.log("lo chali main");
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
};

start();
