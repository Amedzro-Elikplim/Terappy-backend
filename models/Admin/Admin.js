const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: [true, 'provide email']
    },
    password: {
        type: String,
        required: [true, 'provide password']
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
});

module.exports = new model("Admin", AdminSchema);