const express = require("express");
const { register, login, updateById } = require("../controllers/user");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:userId", authGuard, updateById);

module.exports = router;
