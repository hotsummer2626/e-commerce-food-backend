const express = require("express");
const {
    create,
    get,
    updateById,
    deleteById,
} = require("../controllers/product");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.post("/", authGuard, create);
router.put("/:productId", authGuard, updateById);
router.get("/", get);
router.delete("/:productId", authGuard, deleteById);

module.exports = router;
