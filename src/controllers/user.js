const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }

        const newUser = new User({ email, password });
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
    const user = await User.findOne({ email }).exec();
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
};

module.exports = {
    register,
    login,
};
