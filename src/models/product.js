const { Schema, model } = require("mongoose");

const categoryList = [
    "bakery",
    "burger",
    "beverage",
    "chicken",
    "pizza",
    "seafood",
];

const ingredientList = ["beef", "chicken", "vege"];

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imgSrc: {
        url: String,
        publicId: String,
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
    ingredient: {
        type: String,
        enum: ingredientList,
    },
});

module.exports = model("Product", schema);
