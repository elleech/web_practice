const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

// env file
require("dotenv").config();

// create server
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// connect to mongodb atlas
const url = process.env.ATLAS_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

// setup routes
app.use("/customers", require("./routes/customerRouter"));
app.use("/salespeople", require("./routes/salespersonRouter"));
app.use("/employees", require("./routes/employeeRouter"));
app.use("/products", require("./routes/productRouter"));
app.use("/buys", require("./routes/buyRouter"));
app.use("/reports", require("./routes/reportRouter"));

// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
