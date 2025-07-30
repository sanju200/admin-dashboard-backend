const mongoose = require('mongoose');

const users = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    password: {
        type: String,
        match: ['^[a-zA-Z0-9]{3,30}$']
    },
});

module.exports = mongoose.model('users', users);