const Order = require("../models/order");

const get = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("products.productId")
            .populate("user")
            .exec();

        if (!orders) {
            return res.status(404).send({ error: "Orders not founded" });
        }

        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: "Something unexpected happened" });
    }
};

const getByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user: userId })
            .populate("products.productId")
            .populate("user")
            .exec();

        if (!orders) {
            return res.status(404).send({ error: "Orders not founded" });
        }

        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: "Something unexpected happened" });
    }
};

module.exports = { get, getByUserId };
