// import user model
const User = require('../models/user.model');

// import utils
const {encryptPassword} = require('../utils/user.util');

/**
 * Function: postLoggedInSuccessfully
 * Description: Handles the response after a user has successfully logged in.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response containing the status, message, success flag, and user details.
 * @throws {Error} - If an error occurs during the process.
 */
exports.postLoggedInSuccessfully = (req,res)=>{
    try {
        return res.json({status:200,message:"User logged in successfully",success:true,userDetails:req.session.user});
    } catch (error) {
        console.error("🚀 ~ router.post ~ error:", error)
        return res.json({status:400,message:"User logged in failed",success:false});
    }
}

/**
 * Function: postSignUpSuccessfully
 * Description: Handles the registration of a new user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the status, message, success flag, and user details.
 * @throws {Error} - If there is an error in user registration.
 */
exports.postSignUpSuccessfully = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        const hashedPassword = await encryptPassword(password);
        const newUserCreated = new User({username,email,password:hashedPassword});
        await newUserCreated.save();
        return res.json({status:200,message:"New user registered successfully",success:true,userDetails:{username:newUserCreated.username,email:newUserCreated.email,id:newUserCreated._id}});
    } catch (error) {
        console.error("🚀 ~ exports.postSignUpSuccessfully= ~ error:", error);
        return res.json({status:400,message:"Error in user registration",success:false});
    }
}

/**
 * Function: getLogoutSuccessfully
 * Description: Logs out the user and destroys the session.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response object.
 * 
 * @throws {Error} - If there is an error in user logout.
 * 
 */
exports.getLogoutSuccessfully = (req,res) => {
    try {
        req.session.destroy(error=>{
            if(error){
                console.log(error);
                return res.json({status:404,message:'Unable to logout',success:false});
            }else{
                return res.json({status:200,message:"Logged out successfully",success:true});
            }
        });
    } catch (error) {
        console.log("🚀 ~ error:", error)
        return res.json({status:400,message:"Error in user logout",success:false});
    }
}