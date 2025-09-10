const Product = require('../model/Product');

const addProduct = async (req, res) => {
    try {
        const { name, description, price, brand, stock, category, imageUrl } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            brand,
            stock,
            category,
            imageUrl
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById
};