const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById } = require('../controller/product');

router.post('/products', addProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

module.exports = router;