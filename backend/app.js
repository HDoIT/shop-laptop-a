const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const errorMiddleware = require("./middleware/error");

// Config
require("dotenv").config({ path: "config/config.env" });

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Route Imports
const product = require("./routes/productRoute");
const category = require("./routes/categoryRoute");
const user = require("./routes/userRoute");
const cart = require("./routes/cartRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const blog = require("./routes/blogRoute");
const contact = require("./routes/contactRoute");
const wishlist = require("./routes/wishlistRoute");
const banner = require("./routes/bannerRoute");

app.use("/api/v1", product);
app.use("/api/v1", category);
app.use("/api/v1", user);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", blog);
app.use("/api/v1", contact);
app.use("/api/v1", wishlist);
app.use("/api/v1", banner);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
