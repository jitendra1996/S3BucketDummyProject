const path = require('path');

const UploadedFile = require('../models/uploadedFile.model');
const Bucket= require('../models/bucket.model');


/**
 * Stores file details in the database.
 * @param {string} userId - The ID of the user.
 * @param {string} bucketName - The name of the bucket.
 * @param {object} file - The file object containing the `originalname`, `mimetype`, and `path` properties.
 * @returns {Promise<void>} - A promise that resolves when the file details are stored in the database.
 */
exports.storeFileDetailsInDB = async (userId, bucketId, file) => {
  try {
    const { originalname, mimetype, path: filepath } = file;

    const uploadedFile = new UploadedFile({
      filename: originalname,
      mimetype,
      filepath,
      bucketId,
      userId,
    });

    await uploadedFile.save();
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};


/**
 * Modifies an array of file details into a nested object structure based on user and bucket IDs.
 * @param {Array} fileListData - An array of file details objects.
 * @returns {Object} - The modified file details organized by user and bucket IDs.
 */
exports.modifyFileDetailsObject = (fileListData) => {
  const result = {};

  fileListData.forEach((fileData) => {
    const { _id: fileId, filename, filepath, bucketId, userId } = fileData;
    const { _id: buckId, bucketName, bucketPath } = bucketId;
    const { _id: UId, username, email } = userId;

    if (!result[UId]) {
      result[UId] = {
        id: UId,
        username,
        email,
      };
    }

    if (!result[UId][buckId]) {
      result[UId][buckId] = {
        id: buckId,
        bucketName,
        bucketPath,
        fileLists: [],
      };
    }

    result[UId][buckId].fileLists.push({
      id: fileId,
      filename,
      filepath,
    });
  });

  return result;
};