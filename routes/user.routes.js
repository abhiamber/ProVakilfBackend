const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.moldel");
const {
  validateName,
  validatePassword,
  validateEmail,
} = require("../middleWare/validator");

router.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ err: "All field required" });
    }
    const userExist = await User.find({ email });
    if (userExist) {
      return res.status(403).json({ err: "Email already taken" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        err: "Invalid email address",
      });
    }
    if (!validateName(name)) {
      return res.status(400).json({
        err: "Invalid Name",
      });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Invalid Password Provided",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userDetails = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = await new User(userDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ err: "Email field required" });
    }
    if (password.length === 0) {
      return res.status(400).json({ err: "Password field required" });
    }

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      res.status(404).json({ err: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ err: "Incorrect email or password" });
    }

    const payload = { user: { id: isUserExist._id } };
    const bearerToken = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 360000,
    });

    res.cookie("token", bearerToken, { expires: new Date() + 9999 });
    console.log("User logged In Successfully");

    res.status(200).json({
      msg: "Signin success",
      bearerToken,
      user: isUserExist,
    });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Signout success" });
});

module.exports = router;
