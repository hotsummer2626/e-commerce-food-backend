const Product = require("../models/product");
const User = require("../models/user");

const create = async (req, res) => {
    const { imgSrc, name, price, category, stripe } = req.body;

    try {
        const newProduct = new Product({
            imgSrc,
            name,
            price,
            category,
            stripe,
        });

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
    const { productId } = req.params;
    const { action } = req.query;
    try {
        if (action && action === "setLiked") {
            const { userId } = req.body;

            const product = await Product.findOneAndUpdate(
                { _id: productId },
                { $addToSet: { liked: userId } }
            ).exec();

            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { favorite: productId } },
                { new: true }
            )
                .populate("favorite")
                .populate("shoppingCart.product")
                .exec();

            if (!product || !user) {
                return res
                    .status(404)
                    .json({ error: "Product or user not found" });
            }

            delete user._doc.password;

            return res.status(200).json({ product, user });
        }

        if (action && action === "setDisliked") {
            const { userId } = req.body;

            const product = await Product.findOneAndUpdate(
                { _id: productId },
                { $pull: { liked: userId } }
            ).exec();

            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { favorite: productId } },
                { new: true }
            )
                .populate("favorite")
                .populate("shoppingCart.product")
                .exec();

            if (!product || !user) {
                return res
                    .status(404)
                    .json({ error: "Product or user not found" });
            }

            delete user._doc.password;

            return res.status(200).json({ product, user });
        }

        const { name, price, category, stripe } = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: productId },
            {
                name,
                price,
                category,
                stripe,
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
