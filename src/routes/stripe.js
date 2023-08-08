const express = require("express");
const {
    create,
    update,
    deleteProduct,
    checkout,
    webhooks,
} = require("../controllers/stripe");
const authGuard = require("../middlewares/authGuard");

const router = express.Router();

router.post("/", authGuard, create);
router.put("/:productId/:priceId", authGuard, update);
router.delete("/:productId", authGuard, deleteProduct);
router.post("/checkout",authGuard, checkout);
router.post("/webhook", express.raw({ type: "application/json" }), webhooks);

module.exports = router;
