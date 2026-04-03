require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// DB
require("./config/mongoose.connection");

// Routes
const ownersRouter = require("./routes/ownersRouter");
const productRouter = require("./routes/productRouter");
const index = require("./routes/index");
const userRouter = require("./routes/userRouter");

// ✅ CORS (simple version)
app.use(
  cors({
    origin: ["https://scatch-frontend-gamma.vercel.app", "http://localhost:5173"],
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// ✅ Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});