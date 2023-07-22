const { validateToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const contentArr = authHeader.split(" ");
    if (contentArr.length !== 2 || contentArr[0] !== "Bearer") {
        return res.status(400).json({ error: "Invalid header format" });
    }
    const decoded = validateToken(contentArr[1]);
    if (!decoded) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
};
