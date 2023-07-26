const express = require("express");
const multer = require("multer");
const { upload } = require("../controllers/image");
const authGuard = require("../middlewares/authGuard");

const multerUpload = multer({ dest: "uploads/", preservePath: true });
const router = express.Router();

router.post("/", authGuard, multerUpload.single("file"), upload);

module.exports = router;
