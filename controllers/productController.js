/** @type {import('mongoose').Model<any>} */
const product = require("./../models/productModel");

exports.getAllProducts = (req, res) => {
  product
    .find()
    .then((products) => {
      res.status(200).json({
        status: "success",
        results: products.length,
        data: {
          products: products
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "failed",
      });
    });
};

exports.createProduct = (req, res) => {
  product
    .create(req.body)
    .then((newProduct) => {
      res.status(201).json({
        status: "success",
        data: {
          product: newProduct
        }
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err
      });
    });
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
