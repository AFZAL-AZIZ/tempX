const express = require("express");
const {getAllProducts, createProduct, getProduct, updateProduct, deleteProduct} = require("./../controllers/productController"); 
const {protect} = require('./../controllers/authController');

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(protect, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;