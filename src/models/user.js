const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const roleList = ["client", "admin"];

const schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        url: String,
        publicId: String,
    },
    name: {
        first: String,
        last: String,
    },
    phone: String,
    address: String,
    balance: {
        type: Number,
        default: 0,
    },
    favorite: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    shoppingCart: [
        {
            _id: false,
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
        },
    ],
    role: {
        type: String,
        enum: roleList,
        default: "client",
    },
});

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model("User", schema);
