var express = require("express");
var router = express.Router();
const Authority = require("../models/authority");
const User = require("../models/user");
const Node = require("../models/node");

router.get("/signup", function(req, res, next) {
  res.render("authority/signup");
});

router.get("/login", function(req, res, next) {
  res.render("authority/login");
});

router.post("/signup", async (req, res) => {
  try {
    const authority = await Authority.findOne({
      email: req.body.email
    });

    if (authority) res.status(400).send("Authority Email already exists!");

    //creates new authority
    const newauthority = new Authority(req.body);
    const savedauthority = await newauthority.save();

    res.status(201).render("authority", {
      a: savedauthority,
      patients: []
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const authority = await Authority.findOne({
      $or: [
        {
          authorityName: req.body.authorityName
        },
        {
          email: req.body.email
        }
      ]
    });

    if (!authority) {
      res.status(404).send("The authority does not exist!");
    } else {
      const patientIds = await Node.find({
        authorityId: authority.id
      });

      const patients = await User.find({
        _id: {
          $in: patientIds
        }
      });

      if (authority.password == req.body.password)
        res.status(200).render("authority", {
          a: authority,
          patients
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
