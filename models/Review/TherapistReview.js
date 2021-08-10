const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const reviewSchema = new Schema({
  review: {
    type: String,
    required: [true, "write the review"],
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: [true, 'ref is required']
  }
});

module.exports = model("TherapistReview", reviewSchema);
