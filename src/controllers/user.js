const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }

        const newUser = new User({ email, name, password });
        if (password !== "") {
            await newUser.hashPassword();
        }
        await newUser.save();
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .populate("favorite")
            .populate("shoppingCart.product")
            .exec();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            return res
                .status(401)
                .json({ error: "Email or password is incorrect" });
        }
        delete user._doc.password;
        const token = generateToken(user._doc);
        return res.status(200).json({ ...user._doc, token });
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

const updateById = async (req, res) => {
    const { userId } = req.params;
    const { avatar, name, email, phone, address, shoppingCart } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            {
                ...(avatar ? { avatar } : {}),
                ...(name ? { name } : {}),
                ...(email ? { email } : {}),
                ...(phone ? { phone } : {}),
                ...(address ? { address } : {}),
                ...(shoppingCart ? { shoppingCart } : {}),
            },
            { new: true }
        )
            .populate("favorite")
            .populate("shoppingCart.product")
            .exec();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        delete user._doc.password;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

const getCurrentUser = async (req, res) => {
    const currentUser = req.user;

    if (!currentUser) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    try {
        const user = await User.findById(currentUser._id)
            .populate("favorite")
            .populate("shoppingCart.product")
            .exec();

        if (!user) {
            return res.status(404).send({ error: "User not founded" });
        }

        delete user._doc.password;
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).json({ error: "Something unexpected happened" });
    }
};

module.exports = {
    register,
    login,
    updateById,
    getCurrentUser,
};
