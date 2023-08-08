const { Schema, model } = require("mongoose");

const categoryList = [
    "bakery",
    "burger",
    "beverage",
    "chicken",
    "pizza",
    "seafood",
];

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imgSrc: {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    price: {
        type: Number,
        required: true,
    },
    liked: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: {
        type: String,
        enum: categoryList,
    },
    stripe: {
        productId: { type: String, required: true },
        priceId: { type: String, required: true },
    },
});

module.exports = model("Product", schema);
