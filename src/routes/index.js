const express = require("express");
const userRouter = require("./user");
const imageRouter = require("./image");

const router = express.Router();

router.use("/users", userRouter);
router.use("/images", imageRouter);

module.exports = router;
