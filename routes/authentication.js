const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const authenticate = require("../models/userModel");
const authenticateToken = require('../middlewares/auth');
require('dotenv').config()

router.post("/register", authenticateToken, async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      dob,
      status,
      password,
    } = req.body;
    let newUser = new authenticate({
      firstname,
      lastname,
      email,
      phone,
      address,
      dob,
      status,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword ", hashedPassword);
    newUser.password = hashedPassword;
    await newUser.save();
    const token = getGeneratedAccessToken({ userId: newUser._id, email: newUser.email });
    const userObject = newUser.toObject();
    res.status(201).json({...userObject, access_token: token });
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

router.post("/login", authenticateToken, async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByEmail(username);
  if(!user || !await bcrypt.compare(password, user.password)){
    return res.status(401).send('Invalid credentials');
  }
  const token = getGeneratedAccessToken({ userId: user._id, email: user.email })
  console.log('Token ', token);
  const userObject = user.toObject();
  delete userObject.password;
  res.json({ ...userObject, access_token: token });
})

async function findUserByEmail(email){
  try{
    const user = await authenticate.findOne({ email }).exec();
    console.log('user ', user);
    return user;
  }catch(err){
    console.error('Error finding user by email ', err);
  }
}

function getGeneratedAccessToken(payload){
  const token = jwt.sign(payload, process.env.JWT_SECRET );
  return token;
}

module.exports = router;
