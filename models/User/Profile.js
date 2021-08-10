const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const userProfileSchema = new Schema({
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true, "provide your date of birth"],
  },
  gender: {
    type: String,
    required: [true, "provide your gender"],
  },
});

module.exports = model("User Profile", userProfileSchema);
