const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescModel = Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    suggestedBy: {
      type: Schema.Types.ObjectId,
      ref: "Authority"
    },
    suppliedBy: {
      type: Schema.Types.ObjectId,
      ref: "Authority"
    },
    name: String,
    amount: Number,
    quantity: Number,
    dosage: String,
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

module.exports = mongoose.model("Presc", prescModel);
