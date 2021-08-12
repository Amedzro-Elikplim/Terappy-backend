const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const registerSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "please provide your first name"],
  },
  last_name: {
    type: String,
    required: [true, "please provide your last name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  //professional background
  area_of_specialty: {
    type: String,
  },
  employment_status: {
    type: String,
  },
  work_experience: {
    type: String,
  },
  proof_of_profession: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Therapist", registerSchema);
