const Client = require("../models/Client/Client");
const Review = require("../models/Review/ClientReview");
const { generateToken } = require("../auth/jwt");
const _ = require("lodash");


const {
  validateRegistrationInputs,
  validateUserLoginInputs,
  validateReviewInputs,
} = require("../utils/validator");

const Register = async (req, res) => {
  try {
    const result = await validateRegistrationInputs.validateAsync(req.body);
    const { first_name, last_name, email, password } = result;

    const userExist = await Client.findOne({ email });
    if (userExist) return res.status(405).send("user with email already exist");

    const user = await Client.create({ first_name, last_name, email, password });
    const token = generateToken(user._id);

    return res
      .status(201)
      .header("x-authorization-header", token)
      .send({
        user: _.pick(user, ["first_name", "last_name", "email", "createdAt"]),
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

const Login = async (req, res) => {
  try {
    const result = await validateUserLoginInputs.validateAsync(req.body);
    const { email } = result;

    const user = await Client.findOne({ email });
    if (!user) return res.status(400).send("user not found");

    const token = generateToken(user._id);
    return res
      .status(200)
      .header("x-authorization-header", token)
      .send({ user: _.pick(user, ["email"]) });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const ClientReview = async (req, res) => {
  try {
    const validated = await validateReviewInputs.validateAsync(req.body);
    const { review } = validated;
    const user = Buffer.from(req.user.id).toString("hex");

    const result = await Review.create({ review, user });
    return res.status(200).send({ data: _.pick(result, ["review"]) });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const Me = async (req, res) => {
  try {

    const id = Buffer.from(req.user.id).toString("hex");
    const user = await Client.findById(id).select("-_id -password -__v");
    if (!user) res.status(400).send("user not found");

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  Register,
  Login,
  ClientReview,
  Me,
};
