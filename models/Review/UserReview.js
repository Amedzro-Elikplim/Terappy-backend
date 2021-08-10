const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const reviewSchema = new Schema({
  review: {
    type: String,
    required: [true, "write the review"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ref is required']
  }
});

module.exports = model("UserReviews", reviewSchema);
