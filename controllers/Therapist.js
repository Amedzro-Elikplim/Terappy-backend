const Therapist = require("../models/Therapist/Register");
const Review = require('../models/Review/TherapistReview');
const { validateTherapistRegistrationInputs, validateReviewInputs } = require("../utils/validator");
const { generateToken } = require("../auth/jwt");
const _ = require("lodash");

const Register = async (req, res) => {
  try {
    const validatedInput =
      await validateTherapistRegistrationInputs.validateAsync(req.body);
    const { email, password } = validatedInput;

    const isAvailable = await Therapist.findOne({ email });
    if (isAvailable) return res.status(401).send("email already exists");

    const therapist = await Therapist.create({ email, password, });
    return res.status(201).send({user: _.pick(therapist, ['email', 'createdAt'])});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const Login = async (req, res) => {
  try {
    const validateInput = await validateTherapistRegistrationInputs.validateAsync(req.body);
    const { email } = validateInput;

    const user = await Therapist.findOne({ email });
    if (!user) return res.status(400).send("user not found");

    const token = generateToken(user);
    if (token)
      return res.status(200).send({ user: _.pick(user, ["email"]), token });
  } catch (error) {
    res.status(400).send(error);
  }
};


const TherapistReview = async (req, res) => {
  try {
    const validated = await validateReviewInputs.validateAsync(req.body);
    const { review } = validated;
    const therapist = req.params.id;

    const result = await Review.create({ review, therapist });
    return res.status(200).send({ data: _.pick(result, ['review'])});
     
  } catch (error) {
    return res.status(400).send(error);
  }
}

const AllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('therapist');
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(400).send(error)
  }
}

module.exports = {
  Register,
  Login,
  TherapistReview,
  AllReviews
};
