const express = require("express");
const userRouter = require("./user");
const imageRouter = require("./image");
const productRouter = require("./product");

const router = express.Router();

router.use("/users", userRouter);
router.use("/images", imageRouter);
router.use("/products", productRouter);

module.exports = router;
