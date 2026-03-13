const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authControllers");

/**
 * CHECK AUTH / USER STATUS (OPTIONAL BUT USEFUL FOR REACT)
 */
router.get("/users", function (req, res) {
  if (req.user) {
    return res.json({
      loggedIn: true,
      user: req.user,
    });
  }

  res.json({
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
router.get("/logout", logout);

module.exports = router;
