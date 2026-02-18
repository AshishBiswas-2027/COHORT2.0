const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require ( "crypto ")

const authRouter = express.Router()//app.js ko chhod k kisi aur file me routes create karne k liye

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })
    
    if (isUserAlreadyExists) {
        res.status(400).json({
            message:"User already exists with this email address"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({ name, email, password:hash})

    const token = jwt.sign({
        id: user._id,
        email : user.email
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token",token)
    
    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })
})

authRouter.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({message:"user with this email doesnt exist"})
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
    
    if (!isPasswordMatched) {
        return res.status(401).json({ message: "password is wrong" })
    }
    else {
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("jwt_token", token)
        
        res.status(200).json({
            message: "user verified successfully",
            user
        })
    }
})



module.exports = authRouter