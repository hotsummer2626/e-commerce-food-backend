const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        buyerName: {
            first: String,
            last: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: String,
        user: { type: Schema.Types.ObjectId, ref: "User" },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: Number,
            },
        ],
    },
    {
        timestamps: { createdAt: true },
    }
);

module.exports = model("Order", schema);
