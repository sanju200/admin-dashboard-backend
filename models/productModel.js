const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    sku: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    dimensions: {
        width: Number,
        height: Number,
        depth: Number
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
});

module.exports = mongoose.model('Products', Products);


