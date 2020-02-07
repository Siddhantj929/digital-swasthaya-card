var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Node = require("../models/node");
const Prescs = require("../models/prescription");
const Test = require("../models/tests");
const Authority = require("../models/authority");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("home");
});

router.get("/:aId/:userId", async (req, res) => {
  try {
    const nodes = await Node.find({ patientId: req.params.userId });
    const prescs = await Prescs.find({ patientId: req.params.userId });
    const tests = await Test.find({ patientId: req.params.userId });

    let user = await User.findById(req.params.userId);
    user.nodes = nodes;
    user.prescription = prescs;
    user.testingsRecommended = tests;

    const a = await Authority.findById(req.params.aId);

    console.log(user);

    res.status(200).render("authority_nodes", {
      patient: user,
      a: a
    });
  } catch (err) {
    res.status(500).send({
      msg: err
    });
  }
});

module.exports = router;
