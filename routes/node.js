const express = require("express");
const router = express.Router();
// const { addNode, getAllNodes } = require("../services/node");
// const io = require("../socket");
// const User = require("../models/user");
const Node = require("../models/node");
const Test = require("../models/tests");
const Presc = require("../models/prescription");
// var otpGenerator = require("otp-generator");
// const fetch = require("node-fetch");
// const ElasticEmail = require("../services/email");

// router.get("/:userId", async (req, res) => {
//   try {
//     res.status(200).send(await getAllNodes(req.params.userId));
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.post("/:aId/:userId", async (req, res) => {
  try {
    console.log("in the route, going to create node");
    console.log(req.body);

    const nodeBody = { ...req.body };
    const prescs = [];
    const tests = [];

    nodeBody.name.forEach(async (e, i) => {
      prescs.push(
        await new Presc({
          name: nodeBody.name[i],
          quantity: nodeBody.quantity[i],
          dosage: nodeBody.dosage[i],
          patientId: req.params.userId,
          suggestedBy: req.params.aId
        }).save()
      );
    });

    nodeBody.testingsRecommended.forEach(async (e, i) => {
      tests.push(
        await new Test({
          name: e,
          patientId: req.params.userId,
          suggestedBy: req.params.aId
        }).save()
      );
    });

    delete nodeBody.name;
    delete nodeBody.quantity;
    delete nodeBody.dosage;

    nodeBody.testingsRecommended = tests;
    nodeBody.prescriptions = prescs;

    const newNode = new Node(nodeBody);
    newNode.status = "COMPLETED";
    await newNode.save();

    console.log("new node", newNode);

    res.redirect(`/${req.params.aId}/${req.params.userId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// const user = await User.findById(req.params.userId);

// fetch("https://api.elasticemail.com/v2/email/send", {
//   method: "POST",
//   body: JSON.stringify({
//     bodyText: `
//       Diagnosis: ${req.body.diagnosis}
//       Symptoms: ${req.body.symptoms}
//       Prescriptions: ${req.body.prescription}

//       Confirmation OTP: ${otp}

//       Please only provide the OTP to the doctor if satisfied. Thanks!
//       `,
//     from: "siddhantj929@gmail.com",
//     subject: "Confirm MedShare Record",
//     to: user.email,
//     isTransactional: true,
//     apikey:
//       "EC2143F35744D5D8335E5108BE1AF0BA6DDC74020CF6FD581873FC3DFEBB5D7A8B2E5BAFE095FFA3562D677CCF8C64B1"
//   })
// })
//   .then(raw => raw.json())
//   .then(data => {
//     if (data.success) {
//       res.render("otp", { nodeId: newNode.id });
//     } else {
//       res.send(data.error);
//     }
//   });

// router.post("/otp", async (req, res) => {
//   const node = await Node.findById(req.body.nodeId);
//   if (node && node.otp == req.body.otp) {
//     node.status = "COMPLETED";
//     await node.save();
//     res.status(200).send("OTP Confirmed! Your consulation was accepted.");
//   } else {
//     res.status(400).send("Wrong OTP");
//   }
// });

// const getConfirmation = async data => {
//   io.sockets
//     .in(data.patientId)
//     .emit("confirm_node", { msg: "Confirm", data }, async _data => {
//       if (!_data.isConfirmed) return false;
//       else {
//         const node = await addNode(data);
//         return node;
//       }
//     });
// };

module.exports = router;
