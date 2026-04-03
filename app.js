require("dotenv").config();
const isAuthenticated = require("./middlewares/auth");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/mongoose.connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const productRouter = require("./routes/productRouter");
const index = require("./routes/index");
const userRouter = require("./routes/userRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");

// 🔥 CORS सबसे पहले
app.use(
  cors({
    origin: ["https://scatch-frontend-gamma.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
);

app.use(isAuthenticated);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  }),
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000);
