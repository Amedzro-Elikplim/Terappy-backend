const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const therapistProfileSchema = new Schema({
  //personal information
  first_name: {
    type: String,
    required: [true, "provide your first name"],
  },
  last_name: {
    type: String,
    required: [true, "provide your last name"],
  },
  gender: {
    type: String,
    required: [true, "provide your gender"],
  },
  dob: {
    type: Date,
    required: [true, "provide your date of birth"],
  },
  country: {
    type: String,
    required: [true, "provide your country name"],
  },
  address: {
    type: String,
    required: [true, "provide your address"],
  },
  profile_picture: {
    required: [true, "please provide your profile picture"],
  },
  //professional background
  area_of_specialty: {
    type: String,
    required: [true, "provide your area of specialty"],
  },
  employment_status: {
    type: String,
    required: [true, "provide your employment status"],
  },
  work_experience: {
    type: String,
    required: [true, "provide your work experience"],
  },
  proof_of_profession: {
    required: [true, "provide proof of profession"],
  },
});

module.exports = model("Therapist Profile", therapistProfileSchema);