const express = require("express");
const userRouter = require("./user");
const imageRouter = require("./image");
const productRouter = require("./product");
const stripeRouter = require("./stripe");
const orderRouter = require("./order");

const router = express.Router();

router.use("/users", userRouter);
router.use("/images", imageRouter);
router.use("/products", productRouter);
router.use("/stripe", stripeRouter);
router.use("/orders", orderRouter);

module.exports = router;
