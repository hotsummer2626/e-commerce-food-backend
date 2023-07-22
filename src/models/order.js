const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
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
