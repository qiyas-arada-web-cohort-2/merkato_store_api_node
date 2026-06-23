require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TODO: mount routers here

app.use("/products", require("./src/routes/products"));
