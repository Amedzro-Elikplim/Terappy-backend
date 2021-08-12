const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const therapistProfileSchema = new Schema({
  //personal information
  gender: {
    type: String,
    required: [true, "provide your gender"],
  },
  dob: {
    type: String,
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
    type: String,
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
    type: String,
    required: [true, "provide proof of profession"],
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: [true, "ref required"],
  },
});

module.exports = model("TherapistProfile", therapistProfileSchema);
