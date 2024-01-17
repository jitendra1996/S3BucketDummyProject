const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.isUserExist = async (req,res,next)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const isUserExist = await User.findOne({email:email});
        if(!isUserExist) {
            return res.json({status:204,message:"Email not found",success:false});
        }
        const isPasswordMatched = await bcrypt.compare(password,isUserExist.password);
        if(!isPasswordMatched){
            return res.json({status:401,message:"Invalid password",success:false});
        }
        next();
    } catch (error) {
        console.error("🚀 ~ exports.isUserExist= ~ error:", error)
    }
};

exports.isEmailExist = async (req,res,next)=>{
    try {
        const email = req.body.email;
        const isUserExist = await User.findOne({email:email});
        if(!isUserExist){
            next();
        }else{
            return res.json({status:409,message:'Email already exists',success:false});
        } 
    } catch (error) {
        console.error("🚀 ~ exports.isEmailExist= ~ error:", error)
    }
}