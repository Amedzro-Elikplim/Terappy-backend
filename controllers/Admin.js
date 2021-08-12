const Admin = require("../models/Admin/Admin");
const UserReview = require("../models/Review/UserReview");
const TherapistReview = require("../models/Review/TherapistReview");
const { validateAdminInput } = require("../utils/validator");
const _ = require("lodash");
const { generateToken } = require("../auth/jwt");

const Register = async (req, res) => {
  try {
    const validated = await validateAdminInput.validateAsync(req.body);
    const { email, password } = validated;

    const result = await Admin.create({ email, password });
    return res
      .status(200)
      .send({ admin: _.pick(result, ["email", "isAdmin"]) });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const Login = async (req, res) => {
  try {
    const validated = await validateAdminInput.validateAsync(req.body);
    const { email } = validated;

    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).send("user not found");

    const token = generateToken(user);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const UserReviews = async (req, res) => {
  try {
    const reviews = await UserReview.find().populate(
      "user",
      "first_name last_name -_id"
    );
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const TherapistReviews = async (req, res) => {
  try {
    const reviews = await TherapistReview.find().populate("therapist", "first_name last_name -_id");
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  Register,
  Login,
  UserReviews,
  TherapistReviews,
};
