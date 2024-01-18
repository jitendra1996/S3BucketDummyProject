const Bucket = require('../models/bucket.model');


/**
 * Modifies an array of bucket list data to create a new object with a specific structure.
 * @param {Array} bucketLists - An array of bucket list data objects.
 * @returns {Object} - An object containing the modified bucket list data.
 */
exports.modifiedAllBucketListData = (bucketLists,userType='user') => {
  const finalBucketList = {};

  bucketLists.forEach(bucketData => {
    const { _id, userId, bucketName, bucketPath } = bucketData;
    const { _id: user_id, username, email } = userId;

    if (finalBucketList[user_id]) {
      finalBucketList[user_id].bucketLists.push({
        bucketId: _id,
        bucketName,
        bucketPath: userType === 'admin' ? bucketPath : ''
      });
    } else {
      finalBucketList[user_id] = {
        userId: user_id,
        username,
        email,
        bucketLists: [{
          bucketId: _id,
          bucketName,
          bucketPath: userType === 'admin' ? bucketPath : ''
        }]
      };
    }
  });

  return finalBucketList;
}


/**
 * Store bucket details in the database.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} bucketName - The name of the bucket.
 * @param {string} bucketPath - The path of the bucket.
 * @returns {Promise} - A promise that resolves when the bucket details are stored in the database.
 * @throws {Error} - If there is an error while storing the bucket details.
 */
exports.storeBucketDetailsInDB = async (userId,bucketName,bucketPath) => {
    try {
        const newBucketCreated = new Bucket({userId: userId, bucketName: bucketName, bucketPath: bucketPath});
        await newBucketCreated.save();
    } catch (error) {
        console.error(error);
    }
}