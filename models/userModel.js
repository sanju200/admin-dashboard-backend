const mongoose = require('mongoose');

const users = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    dob: String,
    status: String,
});

module.exports = mongoose.model('users', users);