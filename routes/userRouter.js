const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authControllers");

const isAuthenticated = require("../middlewares/auth");

/**
 * CHECK USER AUTH STATUS
 */
router.get("/me", isAuthenticated, (req, res) => {
  return res.json({
    loggedIn: true,
    user: req.user,
  });
});

/**
 * REGISTER
 */
router.post("/register", registerUser);

/**
 * LOGIN
 */
router.post("/login", loginUser);

module.exports = router;