const Product = require('../model/Product');
const { setUpRedis } = require("../utils/redis");

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

        const redis = setUpRedis();
        const key = `product:${req.params.id}`;
        
        // Look in cache first
        const cached = await redis.get(key);
        if(cached) {
            res.status(200).json(JSON.parse(cached));
        }

        // Fallback to DB - if product is not in cache
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Store in Cache
        await redis.set(key,  JSON.stringify(product), 'EX', 600);

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