const prisma = require("../prisma");
const getAllProducts = async (req, res) => {
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    res.json(products);
};
const getProductById = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
};
module.exports = { getAllProducts, getProductById };