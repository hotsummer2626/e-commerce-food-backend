const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");

const router = express.Router();

router.use("/users", userRouter);

module.exports = router;
