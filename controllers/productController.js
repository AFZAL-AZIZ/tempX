/** @type {import('mongoose').Model<any>} */
const product = require("./../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products: products
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err
    });
  }
};

exports.getProduct = (req, res) => {
  res.json({
    status: "handler not completed",
  });
};

exports.updateProduct = (req, res) => {
  res.json({
    status: "handler not completed",
  });
};

exports.deleteProduct = (req, res) => {
  res.json({
    status: "handler not completed",
  });
};
