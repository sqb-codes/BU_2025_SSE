const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById } = require('../controller/productController');

router.post('/addProduct', addProduct);
router.get('/getProducts', getAllProducts);
router.get('/getProduct/:id', getProductById);

module.exports = router;