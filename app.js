const express = require("express");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

module.exports = app;