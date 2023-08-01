const express = require("express");
const multer = require("multer");
const { upload, deleteByPublicId } = require("../controllers/image");
const authGuard = require("../middlewares/authGuard");

const multerUpload = multer({ dest: "uploads/", preservePath: true });
const router = express.Router();

router.post("/", authGuard, multerUpload.single("file"), upload);
router.delete("/", authGuard, deleteByPublicId);

module.exports = router;
