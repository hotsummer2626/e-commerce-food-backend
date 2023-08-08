const express = require("express");
const {
    register,
    login,
    updateById,
    getCurrentUser,
} = require("../controllers/user");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:userId", authGuard, updateById);
router.get("/me", authGuard, getCurrentUser);

module.exports = router;
