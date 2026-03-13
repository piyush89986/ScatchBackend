require("dotenv").config();
const express = require(`express`);
const app = express();
const cors = require("cors");
const db = require("./config/mongoose.connection");
const cookieParser = require("cookie-parser");
const path = require(`path`);
const ownersRouter = require(`./routes/ownersRouter`);
const productRouter = require(`./routes/productRouter`);
const index = require(`./routes/index`);
const userRouter = require(`./routes/userRouter`);
const expressSession = require(`express-session`);
const flash = require(`connect-flash`);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: flash,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(cors({
  origin: "https://scatch-frontend-gamma.vercel.app/",
  credentials: true,
}));

app.use(express.json());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.listen(3000);
