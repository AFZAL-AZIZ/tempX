const express = require("express");

const productRouter = require("./routes/productRoutes");

const app = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use("/api/products", productRouter);

module.exports = app;