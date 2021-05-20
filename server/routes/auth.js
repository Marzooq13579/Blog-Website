const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const requireLogin = require('../middleware/requireLogin')

dotenv.config();


router.get("/", (req, res) => {
  res.send("Hello");
});



router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.status(422).json({ error: "Please enter all the fields" });
  }

  User.findOne({ email: email })
    .then((saveduser) => {
      if (saveduser) {
        return res.status(422).json({ error: "user already exists" });
      }

      bcrypt.hash(password, 10).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "User saved!" });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "please provide all the fileds" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res
          .status(422)
          .json({ error: "User doesn't exist please signup" });
      }

      bcrypt
        .compare(password, savedUser.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
            const {_id,name,email} = savedUser
            res.json({token,user:{_id,name,email}})
          } else {
            res.json({ message: "Invalid email or password" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
