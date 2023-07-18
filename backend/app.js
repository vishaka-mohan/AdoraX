const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
require("dotenv").config();

const path = require("path");
const cors = require("cors");
app.use(express.json());
require("dotenv").config();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:8085"],
  })
);
const connectDB = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  return next();
});
app.use(cookieParser());

const publisherRoutes = require("./routes/publisherRoutes");

app.use("/publisher", publisherRoutes);

const advertiserRoutes = require("./routes/advertiserRoutes");

app.use("/advertiser", advertiserRoutes);

app.listen(process.env.PORT || 5000, function () {
  console.log("Server Started at http://localhost:5000/");
});
