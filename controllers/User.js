const User = require("../models/User/User");
const Review = require("../models/Review/UserReview");
const { generateToken } = require("../auth/jwt");
const _ = require('lodash');

const {
  validateRegistrationInputs,
  validateUserLoginInputs,
  validateReviewInputs,
} = require("../utils/validator");


const Register = async (req, res) => {
  try {
    const result = await validateRegistrationInputs.validateAsync(req.body);
    const { first_name, last_name, email, password, confirm_password } = result;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(405).send("user with email already exist");

    const user = await User.create({first_name, last_name, email, password, confirm_password});
    return res.status(201).send({ user: _.pick(user, ['first_name', 'last_name', 'email', 'createdAt']) });

  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};



const Login = async (req, res) => {
  try {
    const result = await validateUserLoginInputs.validateAsync(req.body);
    const { email } = result;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("user not found");

    const token = generateToken(user);
    return res.status(200).send({ user: _.pick(user, ['email']), token });
    
  } catch (err) {
    return res.status(400).send(err);
  }
};

const UserReview = async (req, res) => {
  try {
    const validated = await validateReviewInputs.validateAsync(req.body);
    const { review } = validated;
    const user = req.params.id;
    
    const result = await Review.create({ review, user });
    return res.status(200).send({data: _.pick(result, ['review'])});
    
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};


const AllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'first_name last_name -_id');
    return res.status(200).send(reviews);

  } catch (error) {
    return res.status(400).send(error);
  }
}


module.exports = {
  Register,
  Login,
  UserReview,
  AllReviews
};
