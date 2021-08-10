const Joi = require("joi");

const validateRegistrationInputs = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().required(),
});

const validateUserLoginInputs = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateTherapistRegistrationInputs = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateReviewInputs = Joi.object({
  review: Joi.string().required(),
});

const validateTherapistProfileInput = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().required(),
  dob: Joi.number().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  area_of_specialty: Joi.string().required(),
  employment_status: Joi.string().required(),
  work_experience: Joi.string().required(),
});

module.exports = {
  validateRegistrationInputs,
  validateUserLoginInputs,
  validateTherapistRegistrationInputs,
  validateReviewInputs,
  validateTherapistProfileInput,
};
