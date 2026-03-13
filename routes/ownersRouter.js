const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");

/**
 * CREATE OWNER (ONLY IN DEVELOPMENT)
 */
if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    try {
      let owners = await ownerModel.find();

      if (owners.length > 0) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to create a new owner",
        });
      }

      let { fullname, email, password } = req.body;

      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        owner: createdOwner,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  });
}

/**
 * ADMIN DATA (FOR REACT)
 */
router.get("/admin", function (req, res) {
  let success = req.flash("success");

  res.json({
    success: success.length > 0 ? success[0] : "",
  });
});

module.exports = router;
