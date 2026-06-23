const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { addToCart, getCart } = require("../controllers/cartController");
router.post("/", authenticate, addToCart);
router.get("/", authenticate, getCart);
module.exports = router;