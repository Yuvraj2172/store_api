const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose.connect(url, console.log("CONNECTED TO THE DB"), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
