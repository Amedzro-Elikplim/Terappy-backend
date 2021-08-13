const Therapist = require("../models/Therapist/Therapist");
const Review = require("../models/Review/TherapistReview");

const {
  validateTherapistRegistrationInputs,
  validateReviewInputs,
  validateTherapistProfileInput,
  validateUserLoginInputs,
} = require("../utils/validator");

const { generateToken } = require("../auth/jwt");
const _ = require("lodash");

const Register = async (req, res) => {
  try {
    const validatedInput =
      await validateTherapistRegistrationInputs.validateAsync(req.body);
    const { email, password, first_name, last_name } = validatedInput;

    const isAvailable = await Therapist.findOne({ email });
    if (isAvailable) return res.status(401).send("email already exists");

    const therapist = await Therapist.create({
      email,
      password,
      first_name,
      last_name,
    });

    const token = generateToken(therapist._id);

    return res
      .status(201)
      .header("x-authorization-header", token)
      .send({
        user: _.pick(therapist, [
          "email",
          "first_name",
          "last_name",
          "createdAt",
        ]),
      });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

const Login = async (req, res) => {
  try {
    const validateInput = await validateUserLoginInputs.validateAsync(req.body);
    const { email } = validateInput;

    const user = await Therapist.findOne({ email });
    if (!user) return res.status(400).send("user not found");

    const token = generateToken(user._id);
    return res
      .status(200)
      .header("x-authorization-header", token)
      .send({ user: _.pick(user, ["email"]) });
  } catch (error) {
    res.status(400).send(error);
  }
};

const TherapistReview = async (req, res) => {
  try {
    const validated = await validateReviewInputs.validateAsync(req.body);
    const { review } = validated;
    const therapist = Buffer.from(req.user.id).toString("hex");

    const result = await Review.create({ review, therapist });
    return res.status(200).send({ data: _.pick(result, ["review"]) });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const Profile = async (req, res) => {
  try {
    const id = Buffer.from(req.user.id).toString("hex");
    const validated = await validateTherapistProfileInput.validateAsync(
      req.body
    );

    const {
      gender,
      dob,
      country,
      address,
      area_of_specialty,
      employment_status,
      work_experience,
      profile_picture,
      proof_of_profession,
    } = validated;

    const data = {
      gender,
      dob,
      country,
      address,
      area_of_specialty,
      employment_status,
      work_experience,
      profile_picture,
      proof_of_profession,
    };

    const result = await Therapist.findByIdAndUpdate(id, data, { new: true });

    const response = _.pick(result, [
      "gender",
      "dob",
      "country",
      "address",
      "area_of_specialty",
      "employment_status",
      "work_experience",
    ]);

    return res.status(200).send({ response });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const Me = async (req, res) => {
  try {
    const id = Buffer.from(req.user.id).toString("hex");
    const user = await Therapist.findById(id).select("-_id -__v -password");
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  Register,
  Login,
  TherapistReview,
  Profile,
  Me,
};
