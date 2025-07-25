const mongoose = require('mongoose');

const Ratings = new mongoose.Schema({
    reviews: [{
        rating: Number,
        comment: String,
        date: Date,
        reviewerName: String,
        reviewerEmail: String
    }],
    title: String,
});

module.exports = mongoose.model('Ratings', Ratings);