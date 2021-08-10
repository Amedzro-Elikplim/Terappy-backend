const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const registerSchema = new Schema({
  email: {
    type: String,
    required: [true, "please provide your email"],
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Therapist", registerSchema);
