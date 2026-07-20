require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", require("./src/routes/products"));
app.use("/auth", require("./src/routes/auth"));
app.use("/cart", require("./src/routes/cart"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
