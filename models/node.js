const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nodeModel = Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    authorityId: {
      type: Schema.Types.ObjectId,
      ref: "Authority"
    },
    diagnosis: {
      type: String
    },
    prescription: {
      type: String
    },
    symptoms: {
      type: String
    },
    comments: {
      type: String
    },
    testingsRecommended: {
      type: String
    },
    testingsDone: [
      {
        name: String,
        report: String,
        files: [String]
      }
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Node", nodeModel);
