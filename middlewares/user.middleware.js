const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

/**
 * Checks if a user exists in the database and verifies their password.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object.
 * @throws {Error} - If an error occurs during the process.
 */
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
        req.session.user={
            username:isUserExist.username,
            email:isUserExist.email,
            id:isUserExist.id,
        },
        req.session.isLoggedIn = true;
        req.session.save((err)=>{
            if(err){
                console.log(err);
            } 
        });
        next();
    } catch (error) {
        return res.json({status:500,message:"Something went wrong",success:false});
    }
};

/**
 * Checks if the given email already exists in the User collection.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a JSON response indicating the status and success of the operation.
 * @throws {Error} - Throws an error if there is an error while checking the email existence.
 */
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
        console.error("🚀 ~ exports.isEmailExist= ~ error:", error);
        return res.json({status:500,message:"Something went wrong",success:false});
    }
}

/**
 * Checks if the user is authorized.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 * @throws {Error} If the user is unauthorized.
 */
exports.isUserAuthorized = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.json({status:401,message:"Unauthorized user",success:false});
    }
    next();
}