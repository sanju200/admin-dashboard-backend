const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const Ratings = new mongoose.Schema({
    reviews: [{
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        },
        reviewerName: {
           type: String
        },
        reviewerEmail: {
            type: String,
            required: [validateEmail, 'Please fill the a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }
    }],
    title: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Ratings', Ratings);