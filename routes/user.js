var express = require("express");
var router = express.Router();
const qrcode = require("qrcode");
const User = require("../models/user");

router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (user)
      res.status(400).send({
        msg: "Email already taken."
      });

    //creates new user
    const newuser = new User(req.body);

    qrcode.toDataURL(newuser.id, async (err, url) => {
      if (err) throw "QR Code wasn't created.";

      newuser.qrURL = url;
      console.log(newuser);

      const saveduser = await newuser.save();
      res.status(201).render("index", {
        title: "Sign Up",
        patient: saveduser
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        {
          email: req.body.email
        },
        {
          phoneNumber: req.body.phoneNumber
        }
      ]
    });

    if (!user || req.body.password != user.password) {
      res.status(404).send({
        msg: "Wrong credentials"
      });
    } else {
      res.render("index", {
        patient: user
      });

      // res.send(user);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

module.exports = router;
