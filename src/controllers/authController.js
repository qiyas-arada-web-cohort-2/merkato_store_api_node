const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");
const register = async (req, res) => {
const { email, password } = req.body;
if (!email || !password)
return res.status(400).json({ error: "Email and password are required" });
const existing = await prisma.user.findUnique({ where: { email } });
if (existing)
return res.status(409).json({ error: "Email already registered" });
const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { email, password: hashed } });
res.status(201).json({ id: user.id, email: user.email });
};
const login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password)
return res.status(400).json({ error: "Email and password are required" });
const user = await prisma.user.findUnique({ where: { email } });
if (!user) return res.status(401).json({ error: "Invalid credentials" });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ error: "Invalid credentials" });
const token = jwt.sign(
{ userId: user.id, email: user.email },
process.env.JWT_SECRET,
{ expiresIn: "7d" }
);
res.json({ token });
};
module.exports = { register, login };