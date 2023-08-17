const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    mobile: {
      type: String
    },
    otp: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
