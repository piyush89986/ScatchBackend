const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { genrateToken } = require("../utils/genrateToken");

/**
 * REGISTER USER
 */
module.exports.registerUser = async function (req, res) {
  try {
    const { email, fullname, password } = req.body;

    if (!email || !fullname || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      fullname,
      password: hashedPassword,
    });

    const token = genrateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // HTTPS me true
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * LOGIN USER
 */
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    let token = genrateToken(user);
    
    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * LOGOUT USER
 */
module.exports.logout = function (req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
