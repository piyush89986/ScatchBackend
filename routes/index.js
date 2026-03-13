const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const router = express.Router();

/**
 * HOME / ROOT (React handles UI)
 */
router.get("/", (req, res) => {
  res.json({
    loggedIn: false,
  });
});

/**
 * SHOP PRODUCTS
 */
router.get("/shop", isLoggedin, async function (req, res) {
  let products = await productModel.find();

  products = products.map((product) => ({
    ...product._doc,
    image: product.image ? product.image.toString("base64") : null,
  }));

  res.json({
    success: true,
    products,
  });
});

/**
 * CART DATA
 */
router.get("/cart", isLoggedin, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("card");

 

  let bill = 0;
  if (user.card.length > 0) {
    bill = Number(user.card[0].price) + 20 - Number(user.card[0].discount || 0);
  }

  res.json({
    success: true,
    user,
    bill,
  });
});

/**
 * ADD TO CART
 */
router.post("/addtocart/:productid", isLoggedin, async function (req, res) {
  let user = req.user;
  user.card.push(req.params.productid);
  await user.save();

  res.json({
    success: true,
    message: "Added to cart",
  });
});

module.exports = router;
