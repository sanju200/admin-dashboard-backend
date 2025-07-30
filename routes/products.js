const express = require('express');
const router = express.Router();
const Products = require('../models/productModel'); 
const Ratings = require('../models/ratingModel');
const authenticateToken = require('../middlewares/auth');

// Define a route
router.get('/', authenticateToken, async (req, res) => {
    try{
        const data = await Products.find({});
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/ratings', authenticateToken, async (req, res) => {
    try{
        const data = await Ratings.find({});
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/ratings/average', authenticateToken, async (req, res) => {
    try{
        const data = await Ratings.find({});
        const formatedData = data.map((item) => {
            console.log('single item Data ', item.title);
            const total = item.reviews.reduce((sum, review) => sum + review.rating, 0);
            console.log('total ', total);
            const count = item.reviews.length;
            const average = count > 0 ? (total/count).toFixed(2): 0;

            return {
                _id: item._id,
                title: item.title,
                averageRating: +average,
                totalReviews: count
            }
        })
        res.json(formatedData);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

module.exports = router;