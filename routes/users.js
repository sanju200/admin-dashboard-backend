// routes/users.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authenticateToken = require('../middlewares/auth');
require('dotenv').config();

// Define a route
router.get('/', authenticateToken, async (req, res) => {
    try{
        const data = await User.find({});
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/', authenticateToken, async (req, res ) => {
    debugger;
    try{
        const { firstname, lastname, email, phone, address, dob, status, role, password} = req.body;
        let newUser = new User({ firstname, lastname, email, phone, address, dob, status, role });
        console.log(req.body);
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashedPassword ", hashedPassword);
            newUser.password = hashedPassword;
        }
        await newUser.save();
        const token = getGeneratedAccessToken({ userId: newUser._id, email: newUser.email });
        const userObject = newUser.toObject();
        res.status(201).json({...userObject, access_token: token});
    } catch (err) {
        if(err.code === 11000){
            return res.status(409).json({message: 'Email already exists'});
        }
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try{
        const {firstname, lastname, email, phone, address, dob, status, role, password } = req.body;
        let updatedUser = { firstname, lastname, email, phone, address, dob, status, role };
        if(req.body.password){
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedUser.password = hashedPassword;
        }
        updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedUser,
            { new: true, runValidators: true }
        );
        console.log('updatedUser ', );
        const token = getGeneratedAccessToken({ userId: updatedUser._id, email: updatedUser.email });
        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }
        const userObject = updatedUser.toObject();
        res.json({ ...userObject, access_token: token });
    }catch(err){
        if(err.name === 'ValidationError') {
            return res.status(400).json({message: err.message});
        }
        res.status(500).json({message: err.message });
    }
})

router.delete('/:id', authenticateToken, async (req, res) => {
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

function getGeneratedAccessToken(payload){
  const token = jwt.sign(payload, process.env.JWT_SECRET );
  return token;
}

module.exports = router;