const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();

// CRUD + Advanced routes
router.route('/')
  .get(getProducts)
  .post(auth, validateProduct, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(auth, validateProduct, updateProduct)
  .delete(auth, deleteProduct);

router.get('/stats/category', getProductStats);

module.exports = router;
