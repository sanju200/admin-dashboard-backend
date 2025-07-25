// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Define a route
router.get('/', async (req, res) => {
    try{
        const data = await User.find({});
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res ) => {
    try{
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            dob: req.body.dob,
            status: req.body.status,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if(err.code === 11000){
            return res.status(409).json({message: 'Email already exists'});
        }
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }

        res.json(updatedUser);
    }catch(err){
        if(err.name === 'ValidationError') {
            return res.status(400).json({message: err.message});
        }
        res.status(500).json({message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);

        if(!deleteUser){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({message: 'User deleted successfully', deleteUser});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


module.exports = router;