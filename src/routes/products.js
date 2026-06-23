const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } =
    require("../controllers/productsController");
const authenticate = require("../middleware/authenticate");
router.get("/", authenticate, getAllProducts);
router.get("/:id", getProductById);
module.exports = router;