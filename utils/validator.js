const Joi = require('joi');


const validateRegistrationInputs = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required()
});


const validateUserLoginInputs = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    validateRegistrationInputs,
    validateUserLoginInputs
}