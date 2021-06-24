const mongoose = require('mongoose');

const {model, Schema} = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "provide your first name"]
    },
    last_name: {
        type: String,
        required: [true, "provide your last name"]
    },
    email: {
        type: String,
        required: [true, "provide your email"]
    },
    password: {
        type: String,
        required: [true, "provide your password"]
    },
    confirm_password: {
        type: String,
        required: [true, "password must be the same"]
    }
})

 

module.exports = model("User", userSchema);