const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./authRouterModel");
const restrict = require("./authenticate-middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await Users.create({
      username,

      password: await bcrypt.hash(password, 14),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const token = generateToken(user);
    res.cookie(
      "token",
      jwt.sign(payload, "the shire was too beautiful to behold")
    );
    res.json({
      message: `Welcome ${user.username}!`,
      token,
    });
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, "the shire was too beautiful to behold", options); // this method is synchronous
}

module.exports = router;
