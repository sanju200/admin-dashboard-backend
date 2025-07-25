const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    image: String,
    price: String,
    discountPercentage: Number,
    rating: Number,
    brand: String,
    sku: String,
    weight: Number,
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


