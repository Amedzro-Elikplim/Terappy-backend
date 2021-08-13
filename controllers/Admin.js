const Admin = require("../models/Admin/Admin");
const ClientReview = require("../models/Review/ClientReview");
const Client = require("../models/Client/Client");
const Therapist = require("../models/Therapist/Therapist");
const TherapistReview = require("../models/Review/TherapistReview");
const { validateAdminInput } = require("../utils/validator");
const _ = require("lodash");
const { generateAdminToken } = require("../auth/jwt");

const Register = async (req, res) => {
  try {
    const validated = await validateAdminInput.validateAsync(req.body);
    const { email, password } = validated;

    const isAvailable = await Admin.findOne({ email });
    if (isAvailable) res.status(403).send("admin with email already exist");

    const user = await Admin.create({ email, password });
    const token = generateAdminToken(user);
    return res
      .status(200)
      .header("x-authorization-token", token)
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

    const token = generateAdminToken(user);

    return res
      .status(200)
      .header("x-authorization-token", token)
      .send("login successful");
  } catch (error) {
    return res.status(400).send(error);
  }
};

const ClientReviews = async (req, res) => {
  try {
    const reviews = await ClientReview.find().populate(
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
    const reviews = await TherapistReview.find().populate(
      "therapist",
      "first_name last_name -_id"
    );
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const DeleteClient = async (req, res) => {
  try {
    const userID = req.params.id;
    const isAvailable = await Client.findById(userID);

    if (!isAvailable) return res.status(400).send("user not found");

    const { email } = isAvailable;
    const result = await Client.findOneAndDelete({ email });

    return res
      .status(200)
      .send(_.pick(result, ["email", "first_name", "last_name"]));
  } catch (error) {
    return res.status(400).send(error);
  }
};

const DeleteTherapist = async (req, res) => {
  try {
    const therapistID = req.params.id;
    const isAvailable = await Therapist.findById(therapistID);
    if (!isAvailable) return res.status(400).send("therapist not found");

    const { email } = isAvailable;
    const result = await Therapist.findOneAndDelete({ email });
    return res
      .status(200)
      .send(_.pick(result, ["email", "first_name", "last_name"]));
  } catch (error) {
    return res.status(400).send(error);
  }
};

const AllClients = async (req, res) => {
  const users = await Client.find().select("-_id -__v");
  return res.status(200).send(users);
};

const AllTherapists = async (req, res) => {
  const therapists = await Therapist.find().select("-_id -__v");
  return res.status(200).send(therapists);
};

module.exports = {
  Register,
  Login,
  ClientReviews,
  TherapistReviews,
  DeleteClient,
  DeleteTherapist,
  AllClients,
  AllTherapists,
};
