const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testsModel = Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    suggestedBy: {
      type: Schema.Types.ObjectId,
      ref: "Authority"
    },
    conductedBy: {
      type: Schema.Types.ObjectId,
      ref: "Authority"
    },
    name: String,
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "PENDING"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tests", testsModel);
