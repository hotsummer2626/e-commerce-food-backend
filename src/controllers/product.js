const Product = require("../models/product");

const create = async (req, res) => {
    const { imgSrc, name, price, category } = req.body;

    try {
        const newProduct = new Product({ imgSrc, name, price, category });

        await newProduct.save();
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

const get = async (req, res) => {
    try {
        const products = await Product.find().exec();

        if (!products) {
            return res.status(404).send({ error: "Not founded" });
        }

        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

const updateById = async (req, res) => {
    try {
        const { productId } = req.params;
        const { imgSrc, name, price, category } = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: productId },
            {
                imgSrc,
                name,
                price,
                category,
            },
            { new: true }
        ).exec();

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

const deleteById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndDelete(productId).exec();

        if (!product) {
            return res.status(404).send({ error: "Product not founded" });
        }

        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

module.exports = {
    create,
    get,
    updateById,
    deleteById,
};
