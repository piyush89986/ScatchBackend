const express = require("express");
const jwt = require("jsonwebtoken");
const isLoggedin = require("../middlewares/auth");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

const router = express.Router();

/**
 * AUTH CHECK (HOME)
 */
router.get("/", (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      loggedIn: true,
      user: decoded,
    });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});

/**
 * SHOP PRODUCTS
 */
router.get("/shop", isAuthenticated, async (req, res) => {
  try {
    const products = await productModel.find().lean();

    const formattedProducts = products.map((product) => ({
      ...product,
      image: product.image
        ? product.image.toString("base64")
        : null,
    }));

    res.json({
      success: true,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Shop error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * CART DATA
 */
router.get("/cart", isAuthenticated, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("card")
      .lean();

    let bill = 0;

    if (user?.card?.length > 0) {
      const item = user.card[0];
      bill = Number(item.price) + 20 - Number(item.discount || 0);
    }

    res.json({
      success: true,
      user,
      bill,
    });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({
      success: false,
    });
  }
});

/**
 * ADD TO CART
 */
router.post("/addtocart/:productid", isAuthenticated, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    user.card.push(req.params.productid);
    await user.save();

    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;