const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        first: String,
        last: String,
    },
    phone: Number,
    address: String,
    balance: {
        type: Number,
        default: 0,
    },
    favorite: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    shoppingCart: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
        },
    ],
});

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model("User", schema);
