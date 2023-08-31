const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

//function for signing tokens
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '4d'})
}

//for login
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        
        const token = createToken(user._id);
        res.status(200).json({user,token})
    } catch (e){
        res.status(400).json({msg:e.message})
    }
}

//for signup
const signupUser = async(req,res)=>{

    try{
        const user = await User.signup(req.body);

        const token = createToken(user._id);
        res.status(200).json({user,token})

    } catch(e){
        res.status(400).json({msg:e.message})
    }
}

module.exports = { loginUser, signupUser }