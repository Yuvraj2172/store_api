require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const port = process.env.PORT || 3000;
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler");
const productsRouter = require("./routes/products");
//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1> <a href= "api/v1/products" >products route</a>`);
});

app.use("/api/v1/products", productsRouter);

//products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //connect db
    app.listen(port, () => {
      console.log(`Server is listening to ${port}`);
    });
  } catch (err) {}
};

start();
