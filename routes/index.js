var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Node = require("../models/node");
const Authority = require("../models/authority");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("home");
});

router.get("/:aId/:userId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    const nodes = await Node.find({ patientId: req.params.userId });
    user.nodes = nodes;
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
