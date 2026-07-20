const prisma = require("../prisma");

const addToCart = async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ error: "productId is required" });

  const parsedProductId = parseInt(productId, 10);
  if (Number.isNaN(parsedProductId))
    return res.status(400).json({ error: "Invalid productId" });

  const product = await prisma.product.findUnique({ where: { id: parsedProductId } });
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = await prisma.cartItem.findFirst({
    where: { userId: req.user.userId, productId: parsedProductId },
  });

  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 },
      include: { product: true },
    });
    return res.json(updated);
  }

  const item = await prisma.cartItem.create({
    data: { userId: req.user.userId, productId: parsedProductId },
    include: { product: true },
  });
  res.status(201).json(item);
};

const getCart = async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user.userId },
    include: { product: true },
    orderBy: { id: "asc" },
  });
  res.json(items);
};

module.exports = { addToCart, getCart };
