const express = require("express");
const { get, getByUserId } = require("../controllers/order");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.get("/", authGuard, get);
router.get("/:userId", authGuard, getByUserId);

module.exports = router;
