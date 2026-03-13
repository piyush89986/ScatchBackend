const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.model");

/**
 * CREATE PRODUCT (FOR REACT ADMIN)
 */
router.post("/create", upload.single("image"), async function (req, res) {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let product = await productModel.create({
      image: req.file ? req.file.buffer : null,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
