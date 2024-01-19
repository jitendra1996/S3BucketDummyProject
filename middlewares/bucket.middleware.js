const Bucket = require('../models/bucket.model');
const path = require('path');

/**
 * Checks if a bucket with the given name already exists.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object.
 * @throws {Error} - If there is an internal server error.
 */
exports.isBucketAlreadyExists =async (req,res,next) => {
    try {
        const bucketName = req.body.bucketName;
        
        if (!bucketName) {
            return res.json({ status: 400, message: 'Invalid bucket name', success: false });
        }
        
        const bucketPath = path.join('buckets',`${bucketName}-${req.session.user.id}`);
        const bucketExist = await Bucket.findOne({bucketPath});
        if(bucketExist){
            return res.json({status:409,message:`Bucket already exists`,success:false});
        }
        next();
    } catch (error) {
        return res.json({status:500,message:"Internal Server Error",success:false});
    }
}