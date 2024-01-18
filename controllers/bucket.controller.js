const path = require('path');
const fs = require('fs');

// Utility functions import
const {storeBucketDetailsInDB,modifiedAllBucketListData} = require('../utils/bucket.util');

// Bucket Model import 
const Bucket = require('../models/bucket.model');

/**
 * Creates a new bucket.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with status, message, and success properties.
 * @throws {Error} If there is an error creating the bucket.
 */
exports.postCreateBucket = (req, res) => {
  const bucketName = req.body.bucketName;

  if (!bucketName) {
    return res.json({ status: 400, message: 'Invalid bucket name', success: false });
  }

  const rootBucket = 'buckets';
  const subBucketPath = path.join(rootBucket, `${bucketName}-${req.session.user.id}`);

  try {
    if (!fs.existsSync(rootBucket)) {
      fs.mkdirSync(rootBucket);
    }

    if (!fs.existsSync(subBucketPath)) {
      fs.mkdirSync(subBucketPath);
      storeBucketDetailsInDB(req.session.user.id, bucketName, subBucketPath);
    }

    return res.json({ status: 200, message: 'Bucket created successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: 'Error creating bucket', success: false });
  }
}

/**
 * Retrieves a list of bucket objects from a database and returns them as a JSON response.
 * If no buckets are found, it returns a 404 status code with an error message.
 * If buckets are found, it returns a 200 status code with a success message and the modified bucket list data.
 * 
 * @param {object} req - The request object containing information about the HTTP request.
 * @param {object} res - The response object used to send the HTTP response.
 * @returns {object} - JSON response object.
 */
exports.getListOfAllBuckets = async (req, res) => {
  try {
    const bucketLists = await Bucket.find().populate('userId').exec();

    if (bucketLists.length === 0) {
      return res.status(404).json({ status: 404, message: 'No buckets found', success: false });
    }

    return res.status(200).json({
      status: 200,
      message: 'List of buckets found',
      success: true,
      bucketLists: modifiedAllBucketListData(bucketLists,'admin')
    });
  } catch (error) {
    console.error('Error getting buckets:', error);
    return res.status(500).json({ status: 500, message: 'Error getting buckets', success: false });
  }
};

/**
 * Retrieves the list of buckets for a particular user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the list of buckets.
 * @throws {Error} If there is an error retrieving the buckets.
 */
exports.getParticularUserBucketsList = async (req, res) => {
    try {
        const userBucketLists = await Bucket.find({userId:req.session.user.id}).populate('userId').exec();
        if (userBucketLists.length === 0) {
            return res.status(404).json({ status: 404, message: 'No buckets found', success: false });
          }
      
          return res.status(200).json({
            status: 200,
            message: 'List of buckets found',
            success: true,
            bucketLists: modifiedAllBucketListData(userBucketLists)
          });
    } catch (error) {
        console.log("🚀 ~ exports.getParticularUserBucketsList= ~ error:", error);
        return res.status(500).json({ status: 500, message:"Error getting buckets", success:false});
    }
};