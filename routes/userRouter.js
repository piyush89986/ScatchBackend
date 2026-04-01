const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");

/**
 * CHECK USER AUTH STATUS
 */
router.get("/me", (req, res) => {
  if (req.user) {
    return res.json({
      loggedIn: true,
      user: req.user,
    });
  }

  return res.json({
    loggedIn: false,
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

/**
 * LOGOUT
 */
router.get("/logout", logoutUser);

module.exports = router;