const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ]
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    qrURL: {
      type: String
    },
    nodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Node"
      }
    ],
    chainVerified: {
      type: String,
      default: "Valid"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userModel);
